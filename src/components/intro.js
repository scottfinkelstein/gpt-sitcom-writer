
import { changeStep } from "../functions"

const Intro = ({ step }) => {
    // useEffect(() => {
    //     new TypeIt('#intro-copy', {
    //         strings: ["<p>Hello, I'm Chatchi. Your AI-powered student club advisor.</p><p>I can help you find some student clubs to spark your interest.</p><p>But first, tell me about yourself...</p>"],
    //         speed: 75,
    //         loop: false
    //     }).go()
    // }, [])
    return (
        <section className={`step step-${step} active`}>
            <div id="intro-copy">
                <h3>Sitcom Casting Director</h3>
                <p>Ever dreamed about having a leading role in a classic sitcom? Today is your lucky day!. Let's get started.</p>
            </div>
            
            <div className='btn-group'>
            <button type='button' className='btn-next' onClick={ () => { changeStep('next')} }>Next</button>
            </div>
        </section>
    )
}

export default Intro