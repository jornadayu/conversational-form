/* eslint-disable no-param-reassign */
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef
} from 'react'
import {
  FormlessTag,
  ConversationalForm as ConversationalFormCf,
  ConversationalFormOptions
} from '../../scripts/cf/ConversationalForm'

import { FlowDTO } from '../../scripts/cf/logic/FlowManager'
import {
  Answer,
  UseChatbotAutoSaveOptions,
  useChatbotAutoSave
} from './useChatbotAutosave'

type Options = {
  /**
   * Automatically start conversational bot on first mount
   *
   * If false you can start it manually by calling `startChatbot`
   * @default true
   */
  startOnMount?: boolean
  /**
   * Callback that runs in every chatbot answer
   */
  onStep?: (dto: FlowDTO, currentAnswers: Answer[]) => void
  /**
   * Start conversational bot once when 'startWhen' is true
   *
   * @default false
   */
  startWhen?: boolean
  /**
   * Auto-save to localStorage?
   *
   * @default true
   */
  autoSave?: boolean
  autoSaveOptions?: UseChatbotAutoSaveOptions
  tags: FormlessTag[]
  onSubmit: (data: Answer[]) => Promise<any> | void
  onError?: (error: any) => void
  validate?: (email: string) => Promise<boolean>
  /** @default Email already used */
  invalidEmailMessage?: string
  userAvatar?: string
  conversationalFormOptions?: Partial<ConversationalFormOptions>
  /**
   * Validate already answered questions
   * @example
   * This method will be called only on the question with the id 'email'
   * validateAlreadyAnswered: {
   *  questionVerificationTagId: 'email',
   *  validate: (email) => email !== 'email@example.com',
   *  onInvalid: (instance) => {
   *   instance.addRobotChatResponse('Email already used')
   *   instance.stop()
   *  },
   *  stopOnInvalid: true
   * }
   * @example
   * This method will be called on every question
   * validateAlreadyAnswered: {
   *  onInvalid: (instance, question, answer) => {
   *  if (question.current?.tag?.id === 'email' && answer !== validEmail) {
   *    instance.addRobotChatResponse('Your email is invalid.')
   *    // In this case, we dont want to continue the chatbot, so we return false and call the onerror method to invalidate the answer and show the error message
   *    return { continueChatbot: false, callOnError: true }
   *    }
   *  return { continueChatbot: true }
   *  },
   *  stopOnInvalid: true
   *
   * @default undefined
   * */
  validateAlreadyAnswered?: {
    validate?: (answer: string) => Promise<boolean> | boolean | undefined
    onInvalid: (
      instance: ConversationalFormCf,
      currentQuestion: MutableRefObject<FlowDTO | undefined>,
      answer?: string
    ) =>
      | {
          continueChatbot?: boolean
          callOnError?: boolean
        }
      | Promise<{ continueChatbot?: boolean; callOnError?: boolean }>
      | void

    /** @default true */
    stopOnInvalid?: boolean
    questionVerificationTagId?: string
  }
}

export type UseConversationalForm = {
  (options: Options): {
    cfInstance: MutableRefObject<ConversationalFormCf | undefined>
    currentQuestion: MutableRefObject<FlowDTO | undefined>
    answersRef: MutableRefObject<Answer[]>
    startedAt: MutableRefObject<Date | undefined>
    finishedAt: MutableRefObject<Date | undefined>
    startBot: () => void
  }
}

export const useConversationalForm: UseConversationalForm = ({
  tags,
  onSubmit,
  onStep,
  onError,
  autoSave = true,
  startOnMount = true,
  startWhen = false,
  userAvatar,
  conversationalFormOptions,
  autoSaveOptions,
  validateAlreadyAnswered
}) => {
  const cfInstance = useRef<ConversationalFormCf>()
  const currentQuestion = useRef<FlowDTO>()
  const { addAnswer, clearAnswers, answersRef } = useChatbotAutoSave({
    active: autoSave || autoSaveOptions?.active,
    ...autoSaveOptions
  })
  const startedAt = useRef<Date>()
  const finishedAt = useRef<Date>()

  const submit = useCallback(async () => {
    try {
      finishedAt.current = new Date()
      await onSubmit(answersRef.current)
      clearAnswers()
    } catch (e) {
      onError?.(e)
    } finally {
      if (import.meta.env.PROD) {
        clearAnswers()
      }
    }
  }, [answersRef, clearAnswers, onSubmit, onError])

  const startBot = useCallback(() => {
    startedAt.current = new Date()
    let lastAnsweredIndex = -1

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i]
      if (tag?.multiple === false || tag?.multiple === undefined) {
        delete tag?.multiple
      }
      const existingAnswer = answersRef.current.find(
        (answer) =>
          answer.question === tag?.id?.toString() ||
          answer.question === tag?.name
      )

      if (existingAnswer) {
        lastAnsweredIndex = i
      }
    }

    const instance = ConversationalFormCf.startTheConversation({
      options: {
        userImage: userAvatar,
        preventAutoFocus: false,
        suppressLog: import.meta.env.PROD,
        // Remove animations/response delays in Dev
        animationsEnabled: import.meta.env.PROD,
        userInterfaceOptions: {
          controlElementsInAnimationDelay: import.meta.env.DEV ? 0 : 250,
          robot: {
            robotResponseTime: 0,
            chainedResponseTime: import.meta.env.DEV ? 0 : 450
          }
        },
        submitCallback() {
          submit()
        },
        async flowStepCallback(dto, success, error) {
          currentQuestion.current = dto
          onStep?.(dto, answersRef.current)

          const {
            questionVerificationTagId,
            validate,
            onInvalid,
            stopOnInvalid = true
          } = validateAlreadyAnswered || {}

          if (questionVerificationTagId) {
            if (
              validateAlreadyAnswered &&
              currentQuestion?.current?.tag?.id === questionVerificationTagId &&
              currentQuestion.current.text
            ) {
              if (await validate?.(currentQuestion.current.text)) {
                addAnswer(dto)
                success()
              } else {
                if (onInvalid) {
                  const onValidation = await onInvalid(
                    instance,
                    currentQuestion,
                    currentQuestion.current.text
                  )
                  if (stopOnInvalid) instance.stop()
                  if (onValidation) {
                    const { continueChatbot, callOnError } = onValidation
                    if (continueChatbot && !callOnError) {
                      addAnswer(dto)
                      success()
                    }
                    if (callOnError) {
                      error()
                    }
                  }
                }
              }
            } else {
              addAnswer(dto)
              success()
            }
          } else {
            if (validateAlreadyAnswered && currentQuestion.current.text) {
              if (onInvalid) {
                const onValidation = await onInvalid(
                  instance,
                  currentQuestion,
                  currentQuestion.current.text
                )
                if (stopOnInvalid) instance.stop()
                if (onValidation) {
                  const { continueChatbot, callOnError } = onValidation
                  if (continueChatbot && !callOnError) {
                    addAnswer(dto)
                    success()
                  }
                  if (callOnError) {
                    error()
                  }
                }
              }
            } else {
              addAnswer(dto)
              success()
            }
          }
        },
        ...conversationalFormOptions
      },
      // Filter already saved answers
      tags: tags.filter(
        (tag, index) =>
          !answersRef.current.some(
            (answer) =>
              answer.question === tag.id?.toString() ||
              answer.question === tag.name
          ) && index > lastAnsweredIndex
      )
    })

    if (answersRef.current.length) {
      tags.forEach((tag, index) => {
        const existingAnswer = answersRef.current.find(
          (answer) =>
            answer.question === tag.id?.toString() ||
            answer.question === tag.name
        )

        if (existingAnswer || index < lastAnsweredIndex) {
          let message = tag['cf-questions']
          for (let i = 0; i < answersRef.current.length; i++) {
            const answerRef = answersRef.current[i]
            if (!answerRef) continue
            const { question, answer } = answerRef

            // TODO: Optimize
            // Replace {some_input_name} with actual value, in questions
            // Example 'Hello {first_name}' -> 'Hello John'
            if (tag['cf-questions'].includes(`{${question}}`) && answer) {
              message = tag['cf-questions'].replaceAll(
                `{${question}}`,
                answer.toString()
              )
            }
          }
          instance.addRobotChatResponse(message)

          if (existingAnswer?.answer) {
            // Add 'fake' answers for auto-saved answered questions
            instance.addUserChatResponse(existingAnswer.answer.toString())
          }
        }
      })
    }

    cfInstance.current = instance

    // Disable browser auto-translation
    document.body.setAttribute('translate', 'no')
  }, [
    answersRef,
    conversationalFormOptions,
    submit,
    tags,
    userAvatar,
    onStep,
    addAnswer,
    validateAlreadyAnswered
  ])

  useLayoutEffect(() => {
    if (startOnMount) {
      startBot()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (startWhen && !startedAt.current) {
      startBot()
    }
  }, [startWhen, startedAt, startBot])

  return {
    cfInstance,
    answersRef,
    currentQuestion,
    startBot,
    startedAt,
    finishedAt,
    addAnswer
  }
}
