import { changeStep } from "../functions";
import { useChatContext } from "../contexts/ChatContext";
const Name = ({ step }) => {
    const { state, dispatch } = useChatContext()

    const setName = (name) => {
        dispatch({ type: 'setName', payload: { name: name } })
    }

    return (
        <section className={`step step-${ step }`}>
          <h3>What is your name?</h3>
          <p>{ state.name }</p>
          <div className='input-group'>
            <input type="text" autoComplete="off" name="student-name" className='student-name' id="student-name" />
          </div>
          <div className='btn-group'>
            {/* <button type='button' className='btn-prev' onClick={ () => { changeStep('prev') } }>Previous</button> */}
            <button type='button' className='btn-next' onClick={ () => { setName(document.getElementById('student-name').value); changeStep('next') } }>Next</button>
          </div>
        </section>  
    )
}

export default Name