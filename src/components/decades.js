import { useChatContext } from "../contexts/ChatContext"
import { changeStep } from "../functions"

const Decades = ({ step }) => {
    
    const { state, dispatch } = useChatContext()

    const setSelectedDecade = (decade) => {
        dispatch({ type: 'setSitcomDecade', payload: { sitcomDecade: decade } })
    }

    const decades = [
        '1950s',
        '1960s',
        '1970s',
        '1980s',
        '1990s',
        '2000s'
    ]
    return (
        <section className={`step step-${ step }`}>
            <h3>Which decade do you want the random sitcom to be based on?</h3>
            <p>{ state.sitcomDecade }</p>
            <ul className="decade-select">
                { decades.map((decade, i) => <li><button onClick={ () => { setSelectedDecade(decade) } }>{decade}</button></li>) }
            </ul>
            <div className="btn-group">
            <button className="btn-next" onClick={ () => { changeStep('next') } }>Next</button>
            </div>
            
        </section>
    )
}

export default Decades