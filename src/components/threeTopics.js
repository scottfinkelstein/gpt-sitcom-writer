import { useChatContext } from '../contexts/ChatContext'
import { changeStep } from '../functions'

const ThreeTopics = ({ step }) => {
    const { state, dispatch } = useChatContext()

    const addTopics = () => {
        const topicElements = document.querySelectorAll('.topic')
        topicElements.forEach((topic) => {
            dispatch({ type: 'setTopic', payload: { topic: topic.value } })
        })
    }
    return (
        <section className={ `step step-${step}` }>
            <h3>Enter in three topics that you want included in the script.</h3>
            <div className='input-group'>
                <input type="text" id="topic-1" className='topic' />
                <input type="text" id="topic-2" className='topic' />
                <input type="text" id="topic-3" className='topic' />
            </div>
            <div className='btn-group'>
                <button type='button' className='btn-next' onClick={ () => { addTopics(); changeStep('next') } }>Next</button>
            </div>
        </section>
    )
}

export default ThreeTopics