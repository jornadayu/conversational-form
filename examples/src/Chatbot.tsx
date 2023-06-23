import {
  useConversationalForm,
  FormlessTag,
  ConversationalForm,
  Answer
} from '@jornadayu/conversational-form'
import '@jornadayu/conversational-form/dist/style.css'
import { MutableRefObject, useRef } from 'react'
import { FlowDTO } from '../../dist/scripts/cf/logic/FlowManager'

const Chatbot: React.FC = () => {
  const tags: FormlessTag[] = [
    {
      tag: 'cf-robot-message',
      name: 'name',
      id: '0',
      'cf-questions': 'Hello, this is a example of conversational form.'
    },
    {
      name: 'email',
      id: 'email',
      'cf-questions': 'Whats your email? (email@example.com)',
      tag: 'input'
    },
    {
      name: 'email-validation',
      id: 'email-validation',
      'cf-questions': 'Please, type your email again.',
      tag: 'input'
    },
    {
      id: '2',
      name: 'did-you-answered',
      'cf-questions': 'Did you already answered this form?',
      children: [
        { tag: 'option', value: 'yes', 'cf-label': 'Yes' },
        { tag: 'option', value: 'no', 'cf-label': 'No' }
      ],
      tag: 'select'
    },
    {
      id: '3',
      multiple: true,
      name: 'my-multi-select',
      'cf-questions': 'What are your favorite colors?',
      children: [
        { tag: 'option', value: 'red', 'cf-label': 'Red' },
        { tag: 'option', value: 'green', 'cf-label': 'Green' },
        { tag: 'option', value: 'blue', 'cf-label': 'Blue' },
        { tag: 'option', value: 'yellow', 'cf-label': 'Yellow' },
        { tag: 'option', value: 'black', 'cf-label': 'Black' },
        { tag: 'option', value: 'white', 'cf-label': 'White' },
        { tag: 'option', value: 'orange', 'cf-label': 'Orange' },
        { tag: 'option', value: 'purple', 'cf-label': 'Purple' },
        { tag: 'option', value: 'pink', 'cf-label': 'Pink' },
        { tag: 'option', value: 'brown', 'cf-label': 'Brown' },
        { tag: 'option', value: 'gray', 'cf-label': 'Gray' },
        { tag: 'option', value: 'other', 'cf-label': 'Other' }
      ],
      tag: 'select'
    },
    {
      id: '4',
      name: 'my-single-select',
      'cf-questions': 'Do you like this example?',
      children: [
        { tag: 'option', value: 'yes', 'cf-label': 'Yes' },
        { tag: 'option', value: 'loved', 'cf-label': 'Loved it!' },
        { tag: 'option', value: 'no', 'cf-label': 'No' }
      ],
      tag: 'select',
      multiple: undefined
    },
    {
      id: '5',
      name: 'appreciate_you_liked',
      'cf-questions': 'We appreciate you liked it!',
      'cf-conditional-my-single-select': 'yes||loved',
      tag: 'cf-robot-message'
    },
    {
      id: '6',
      name: 'sorry_you_didnt_like',
      'cf-questions': 'Sorry you didnt like it :/',
      'cf-conditional-my-single-select': 'no',
      tag: 'cf-robot-message'
    },
    {
      id: '7',
      name: 'end-message',
      'cf-questions': 'Thanks for your time! Reload the page to start again.',
      tag: 'cf-robot-message'
    }
  ]

  const autoSaveKey = 'test'

  const answersRef = useRef<Answer[]>(
    JSON.parse(localStorage.getItem(autoSaveKey) || '[]')
  )

  const onInvalid = (
    instance: ConversationalForm,
    question: MutableRefObject<FlowDTO | undefined>
  ) => {
    const emailTag = instance.getTag('email')
    const chatData = instance.getFormData(true)
    const validEmail = 'email@example.com'

    // Made this because instance lose the reference of the tag when the page is reloaded
    const emailAnswer =
      answersRef.current.find((answer) => answer.name === 'email')?.answer ||
      chatData['email'] ||
      emailTag?.value

    if (
      question.current?.tag?.id === 'email' &&
      question.current?.text !== validEmail
    ) {
      instance.addRobotChatResponse('Your email is invalid.')
      return { continueChatbot: false, callOnError: true }
    }

    if (
      question.current?.text !== emailAnswer &&
      question.current?.tag?.id === 'email-validation'
    ) {
      instance.addRobotChatResponse('Your email is not the same.')
      return { continueChatbot: false, callOnError: true }
    }

    return { continueChatbot: true }
  }

  const validateQuestion = (
    answer: string,
    instance?: ConversationalForm,
    question?: MutableRefObject<FlowDTO | undefined>
  ) => {
    const tagIdsToValidate = ['email', 'email-validation']
    if (tagIdsToValidate.includes(question?.current?.tag?.id as string)) {
      // you can validate the answer here
      return false
    }
    return true
  }

  useConversationalForm({
    validateAlreadyAnswered: {
      validate: validateQuestion,
      onInvalid,
      stopOnInvalid: false
    },
    onSubmit(data) {
      window.alert('Data: ' + JSON.stringify(data))
    },
    autoSave: true,
    userAvatar: 'https://placehold.co/100x100',
    tags: tags,
    conversationalFormOptions: {
      // remove this option to show the log of the chatbot
      suppressLog: true
    },
    autoSaveOptions: {
      key: autoSaveKey
    }
  })

  return <div />
}

export default Chatbot
