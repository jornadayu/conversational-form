import { describe, expect, test } from 'vitest'
import { answersAsChatbotFormat } from '../src/components/chatbot/useChatbotAutosave'

describe('answersAsChatbotFormat() helper', () => {
  describe('formatting and filtering', () => {
    test('formats answers correctly', () => {
      expect(
        answersAsChatbotFormat({
          answers: [
            {
              answer: 'Answer 1',
              question: 'Question 1',
              context: 'question',
              cfAnswer: ['Question 1', 'Answer 1']
            },
            {
              answer: 'Answer 2',
              question: 'Question 2',
              context: 'question',
              cfAnswer: ['Question 2', 'Answer 2']
            },
            {
              answer: ['Answer 3-1', 'Answer 3-2'],
              question: 'Question 3',
              context: 'question',
              cfAnswer: ['Question 3', ['Answer 3-1', 'Answer 3-2']]
            }
          ]
        })
      ).toMatchObject({
        'Question 1': 'Answer 1',
        'Question 2': 'Answer 2',
        'Question 3': ['Answer 3-1', 'Answer 3-2']
      })
    })

    test('formats and filters answers correctly', () => {
      expect(
        answersAsChatbotFormat({
          context: 'question',
          answers: [
            {
              answer: 'Answer 1',
              question: 'Question 1',
              context: 'question',
              cfAnswer: ['Question 1', 'Answer 1']
            },
            {
              answer: 'Answer 2',
              question: 'Question 2',
              context: 'person',
              cfAnswer: ['Question 2', 'Answer 2']
            },
            {
              answer: ['Answer 3-1', 'Answer 3-2'],
              question: 'Question 3',
              context: 'question',
              cfAnswer: ['Question 3', ['Answer 3-1', 'Answer 3-2']]
            }
          ]
        })
      ).toMatchObject({
        'Question 1': 'Answer 1',
        'Question 3': ['Answer 3-1', 'Answer 3-2']
      })
    })
  })
})
