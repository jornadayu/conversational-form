# Jornadayu-Conversation-Form

This project is a fork of the original library [conversational-form](https://github.com/space10-community/conversational-form) made by [SPACE10](https://space10.com).
This fork is not affiliated with or endorsed by the original library and changes have been made since the original fork.

Current and original copyright notices are both available at [LICENSE.md](LICENSE.md).

## Quick Start

To download and install the latest release of Conversational Form, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/jornadayu/conversational-form.git
   ```

2. Install with npm:

   ```bash
   npm build
   ```

3. Install with yarn:

   ```bash
   yarn build
   ```

## How to run the example

1. Run the command bellow:

   ```bash
   yarn example
   ```

   then the chatbot example will run on `localhost:9000`

**Note:** For an example of how to use the library, you can navigate to the `examples` folder and check out the `Chatbot.tsx` component. It will give you an idea of how to utilize the `Jornadayu-Conversational-Form` library.
See more at [examples](./examples/src/Chatbot.tsx)

## Code example

```tsx
import {
  useConversationalForm,
  FormlessTag,
  ConversationalForm
} from '@jornadayu/conversational-form'
import '@jornadayu/conversational-form/dist/style.css'

const Chatbot: React.FC = () => {
  const tags: FormlessTag[] = [
    {
      tag: 'cf-robot-message',
      name: 'name',
      id: '0',
      'cf-questions': 'Hello, this is a example of conversational form.'
    },
    {
      name: 'name',
      id: '1',
      'cf-questions': 'Whats your name?',
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

  const onInvalid = (instance: ConversationalForm) => {
    instance.addRobotChatResponse(
      'You already answered this form. Reload the page to start again.'
    )
    window.localStorage.removeItem(autoSaveKey)
    instance.stop()
  }

  useConversationalForm({
    validateAlreadyAnswered: {
      questionVerificationTagId: '2',
      validate: (value: string) => value !== 'Yes',
      onInvalid
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
```
