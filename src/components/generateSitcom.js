import { Configuration, OpenAIApi } from "openai"
import { useChatContext } from "../contexts/ChatContext"
import { changeStep } from "../functions"
import { useMemo } from "react"

const GenerateSitcom = ({ step }) => {
    const { state, dispatch } = useChatContext()

    useMemo(() => {
        fetch(`https://zdimqpe9ee.execute-api.us-east-1.amazonaws.com/sitcoms/decade/${state.sitcomDecade}`)
            .then((response) => {
                return response.json()
            })
            .then((sitcoms) => {
                const randomIndex = Math.floor(Math.random() * sitcoms.length);
                dispatch({ type: 'setRandomlySelectedSitcom', payload: { sitcomTitle: sitcoms[randomIndex].title }})
            })
    }, [state.sitcomDecade, dispatch])

    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY }))

    const getChatResponse = async () => {
        dispatch({ type: 'setCurrentlyLoading', payload: { currentlyLoading: true } })
        const message = [
            { role: 'system', content: `You are a sitcom writer. The user will provide you with information that you will use to put them into a randomly chosen sitcom from the given decade.`},
            { role: 'user', content: `My name is ${state.name}. Please write a script for the sitcom series ${ state.randomlySelectedSitcom } staring myself as a supporting character and weave in the following topics: ${ state.topics.toString() }. Introduce the script by naming the selected show.` }
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            // model: 'gpt-4',
            messages: message
        })
        const res = response.data.choices[0].message.content.trim();
        dispatch({type: 'setChatResponse', payload: { chatResponse: res } })
        dispatch({ type: 'setCurrentlyLoading', payload: { currentlyLoading: false } })
    }

    return (
        <section className={ `step step-${step}` }>
            <button className="btn-next" onClick={ () => { getChatResponse(); changeStep('next') } }>Cast me in a randomly selected { state.sitcomDecade } Sitcom</button>
        </section>
    )
}

export default GenerateSitcom