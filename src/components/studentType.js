import { useChatContext } from "../contexts/ChatContext"
import { changeStep } from "../functions"
const StudentType = ({ step }) => {
    const { state, dispatch } = useChatContext()

    const setStudentType = (studentType) => {
        dispatch({ type: 'setStudentType', payload: { studentType: studentType } })
    }

    return (
        <section className={`step step-${ step }`}>
            <h3>I am</h3>
            { state.studentType }
            <ul className="student-type">
                <li><a href="#" onClick={ () => setStudentType('an undergraduate student') }>An Undergraduate</a></li>
                <li><a href="#" onClick={ () => setStudentType('a graduate student') }>A Graduate Student</a></li>
            </ul>
            <div className="btn-group">
                <button type="button" className="btn-next" onClick={ () => { changeStep('next') } }>Next</button>
            </div>
        </section>
    )
}

export default StudentType