import { useEffect } from "react"
import { useChatContext } from "../contexts/ChatContext"
import TypeIt from 'typeit'

const ChatResponse = ({ step }) => {
    const { state, dispatch } = useChatContext()

    const reset = () => {
        dispatch({ type: 'setName', payload: { name: null } })
        dispatch({ type: 'setChatResponse', payload: { chatResponse: null } })
        dispatch({ type: 'clearAllTopics' })

        document.querySelector('.student-name').value = ''
        document.querySelector('.step-6').classList.remove('active')
        document.querySelector('.step-1').classList.add('active')
    }

    useEffect(() => {
      if (state.chatResponse !== null) {
        new TypeIt('#response-copy', {
          strings: state.chatResponse,
          speed: 17,
          waitUntilVisible: true
        }).go()
      }
    }, [state.chatResponse])

    return (
        <section className={`step step-${step}`}>
          { state.currentlyLoading && 
            <div className="loading">
              <span className="loading">Writing your script...</span>
            </div>
          } 

          { state.chatResponse !== null &&

            <div>
              <div id="response-copy"></div>
              <div className='btn-group'>
                <button type='button' className='btn-prev' onClick={ () => { reset() } }>Start Over</button>
              </div>
            </div>
          }
        </section> 
    )
}

export default ChatResponse