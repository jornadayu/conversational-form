import './styles/_cf-base.scss'
import './styles/_cf-variables.scss'
import './styles/conversational-form-dark-custom.scss'

export { useConversationalForm } from './components/chatbot/chatbot'
export {
  useChatbotAutoSave,
  answersAsChatbotFormat
} from './components/chatbot/useChatbotAutosave'

export { ConversationalForm } from './scripts/cf/ConversationalForm'
export { Dictionary } from './scripts/cf/data/Dictionary'
export { ButtonTag } from './scripts/cf/form-tags/ButtonTag'
export { InputTag } from './scripts/cf/form-tags/InputTag'
export { OptionTag } from './scripts/cf/form-tags/OptionTag'
export { SelectTag } from './scripts/cf/form-tags/SelectTag'
export { CfRobotMessageTag } from './scripts/cf/form-tags/CfRobotMessageTag'
export { Tag } from './scripts/cf/form-tags/Tag'
export { TagGroup } from './scripts/cf/form-tags/TagGroup'
export { createTag } from './scripts/cf/form-tags/TagHelpers'
export { EventDispatcher } from './scripts/cf/logic/EventDispatcher'
export { FlowManager } from './scripts/cf/logic/FlowManager'
export { MicrophoneBridge } from './scripts/cf/logic/MicrophoneBridge'
export { Helpers } from './scripts/cf/logic/Helpers'
export { TagsParser } from './scripts/cf/parsing/TagsParser'
export { ChatList } from './scripts/cf/ui/chat/ChatList'
export { ChatResponse } from './scripts/cf/ui/chat/ChatResponse'
export { Button } from './scripts/cf/ui/control-elements/Button'
export { CheckboxButton } from './scripts/cf/ui/control-elements/CheckboxButton'
export { ControlElement } from './scripts/cf/ui/control-elements/ControlElement'
export { ControlElements } from './scripts/cf/ui/control-elements/ControlElements'
export { OptionButton } from './scripts/cf/ui/control-elements/OptionButton'
export { OptionsList } from './scripts/cf/ui/control-elements/OptionsList'
export { RadioButton } from './scripts/cf/ui/control-elements/RadioButton'
export { UploadFileUI } from './scripts/cf/ui/control-elements/UploadFileUI'
export { UserInputElement } from './scripts/cf/ui/inputs/UserInputElement'
export { UserInputSubmitButton } from './scripts/cf/ui/inputs/UserInputSubmitButton'
export { UserTextInput } from './scripts/cf/ui/inputs/UserTextInput'
export { BasicElement } from './scripts/cf/ui/BasicElement'
export { ProgressBar } from './scripts/cf/ui/ProgressBar'
export { ScrollController } from './scripts/cf/ui/ScrollController'

export type {
  FormlessTag,
  ConversationalFormOptions,
  ConversationalFormlessOptions,
  FormlessTagType,
  FormlessTagChild
} from './scripts/cf/ConversationalForm'

export type { Answer } from './components/chatbot/useChatbotAutosave'
