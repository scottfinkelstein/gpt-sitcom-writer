import { changeStep } from "../functions";
import { useChatContext } from "../contexts/ChatContext";

import { Configuration, OpenAIApi } from 'openai'
import { useState } from "react";

const Interests = ({ step }) => {
    const { state, dispatch } = useChatContext()

    const [interests, setInterests] = useState(null)

    // const addInterest = (interest) => {
    //     setInterests(interest)
    // }

    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY }))

    const getChatResponse = async (interests) => {
        dispatch({ type: 'setCurrentlyLoading', payload: { currentlyLoading: true } })
        const message = [
            { role: 'system', content: `You are ChatChi, a friendly student advisor at ${ state.selectedCollege }. Keep your responses as brief and to the point as possible, while acknowledging the user's name and degree type (i.e. undergraduate or graduate). Wrap the major names you return back in <strong> tags.`},
            { role: 'user', content: `My name is ${state.studentName} and I am ${state.studentType} can you provide me with a few majors currently offered by ${ state.selectedCollege } that might be a good fit for me based on my following interests as follows? ${ interests }` }
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: message
        })
        const res = response.data.choices[0].message.content.trim();
        dispatch({type: 'setChatResponse', payload: { chatResponse: res } })
        dispatch({ type: 'setCurrentlyLoading', payload: { currentlyLoading: false } })
    }

    return (
        <section className={`step step-${step}`}>
            <h3>What are your interests?</h3>  
            <div class="input-group">
            <textarea className="interests-text" id="interests-text"></textarea>
            </div>
            {/* <ul className="interests">
                <li><a href="#" onClick={ () => addInterest('Biology') }>Biology</a></li>
                <li><a href="#" onClick={ () => addInterest('Computer Science') }>Computer Science</a></li>
                <li><a href="#" onClick={ () => addInterest('Art') }>Art</a></li>
            </ul> */}
            <div>{ interests }</div>
            <div className='btn-group'>
            <button type='button' className='btn-prev' onClick={ () => { getChatResponse(document.getElementById('interests-text').value); changeStep('next') } }>Submit</button>
            </div>
        </section>  
    )
}

export default Interests