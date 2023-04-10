import { createContext, useContext, useReducer } from "react";

const ChatContext = createContext()

const initialState = {
    name: null,
    sitcomDecade: null,
    randomlySelectedSitcom: null,
    topics: [],  
    studentInterests: null,
    chatResponse: null,
    currentlyLoading: null,
    currentStepIndex: 0
}

export const useChatContext = () => {
    return useContext(ChatContext)
}

const reducer = (state, action) => {
    
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload.name
            }
        case 'setSitcomDecade':
            return {
                ...state,
                sitcomDecade: action.payload.sitcomDecade
            }

        case 'setRandomlySelectedSitcom':
            return {
                ...state,
                randomlySelectedSitcom: action.payload.sitcomTitle
            }
        case 'setStudentType':
            return {
                ...state,
                studentType: action.payload.studentType
            }
            
        case 'setSelectedCollege':
            return {
                ...state,
                selectedCollege: action.payload.selectedCollege
            }

        case 'setTopic':
            return {
                ...state,
                topics: [action.payload.topic, ...state.topics]
            }

        case 'clearAllTopics':
            return {
                ...state,
                topics: []
            }

        case 'setInterests':
            return {
                ...state,
                // interests: action.payload.interests
                studentInterests: action.payload.studentInterests
            }
            
        case 'setCurrentlyLoading':
            return {
                ...state,
                currentlyLoading: action.payload.currentlyLoading
            }

        case 'setChatResponse':
            return {
                ...state,
                chatResponse: action.payload.chatResponse
            }

        case 'setStepIndex':
            return {
                ...state,
                stepIndex: action.payload.stepIndex
            }
            
        default:
            return state
    }
} 

const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            { children }
        </ChatContext.Provider>
    )
}

export default ChatProvider