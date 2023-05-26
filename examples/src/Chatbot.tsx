import {
  useConversationalForm,
  FormlessTag,
  ConversationalForm,
  Tag
} from '@jornadayu/conversational-form'
import '@jornadayu/conversational-form/dist/style.css'

const Chatbot: React.FC = () => {
  const tags = [
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
      id: '3',
      name: 'did-you-answered',
      'cf-questions': 'Did you already answered this form?',
      children: [
        { tag: 'option', value: 'yes', 'cf-label': 'Yes' },
        { tag: 'option', value: 'no', 'cf-label': 'No' }
      ],
      tag: 'select'
    },
    {
      id: '4',
      name: 'my-single-select',
      'cf-questions': 'Do you like this example?',
      children: [
        { tag: 'option', value: 'yes', 'cf-label': 'Yes' },
        { tag: 'option', value: 'no', 'cf-label': 'No' }
      ],
      tag: 'select',
      multiple: undefined
    },
    {
      id: '5',
      name: 'end-message',
      'cf-questions': 'Thanks for your time! Reload the page to start again.',
      tag: 'cf-robot-message'
    }
  ] satisfies FormlessTag[]

  const tagsWithConditional: FormlessTag[] = [
    {
      id: '91369',
      name: 'educaco',
      'cf-questions': 'Qual o seu grau de escolaridade?',
      children: [
        {
          tag: 'option',
          value: 'Médio incompleto',
          'cf-label': 'Médio incompleto'
        },
        {
          tag: 'option',
          value: 'Médio completo',
          'cf-label': 'Médio completo'
        },
        {
          tag: 'option',
          value: 'Ensino técnico incompleto',
          'cf-label': 'Ensino técnico incompleto'
        },
        {
          tag: 'option',
          value: 'Ensino técnico completo',
          'cf-label': 'Ensino técnico completo'
        },
        {
          tag: 'option',
          value: 'Superior incompleto',
          'cf-label': 'Superior incompleto'
        },
        {
          tag: 'option',
          value: 'Superior Completo',
          'cf-label': 'Superior Completo'
        },
        {
          tag: 'option',
          value: 'Pós-graduação/MBA incompleto',
          'cf-label': 'Pós-graduação/MBA incompleto'
        },
        {
          tag: 'option',
          value: 'Pós-graduação/MBA completo',
          'cf-label': 'Pós-graduação/MBA completo'
        },
        {
          tag: 'option',
          value: 'Mestrado/Doutorado incompleto',
          'cf-label': 'Mestrado/Doutorado incompleto'
        },
        {
          tag: 'option',
          value: 'Mestrado/Doutorado completo',
          'cf-label': 'Mestrado/Doutorado completo'
        }
      ],
      tag: 'select'
    },
    {
      id: '91370',
      name: 'education_institution',
      'cf-questions':
        'Ótimo. E qual é a instituição da sua graduação? (Exemplo: USP)',
      'cf-conditional-educaco':
        'Pós-graduação/MBA incompleto||Pós-graduação/MBA completo||Mestrado/Doutorado incompleto||Mestrado/Doutorado completo||Superior incompleto||Superior Completo',
      tag: 'input',
      type: 'text'
    },
    {
      id: '5',
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

  const { cfInstance } = useConversationalForm({
    validateAlreadyAnswered: {
      questionVerificationTagId: '3',
      validate: (value: string) => value !== 'Yes',
      onInvalid
    },
    onSubmit(data) {
      window.alert('Data: ' + JSON.stringify(data))
    },
    autoSave: true,
    userAvatar: 'https://placehold.co/100x100',
    tags: tagsWithConditional,
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
