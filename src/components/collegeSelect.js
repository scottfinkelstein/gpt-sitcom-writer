import { useState, useEffect } from "react"
import { useChatContext } from "../contexts/ChatContext"
import { changeStep } from "../functions"
import { Configuration, OpenAIApi } from 'openai'
const CollegeSelect = ({ step }) => {
    const { state, dispatch } = useChatContext()

    const [colleges, setColleges] = useState([])
    const [schoolColors, setSchoolColors] = useState([])

    const setSelectedCollege = (college) => {
        dispatch({ type: 'setSelectedCollege', payload: {selectedCollege: college } })
        // getSchoolColors(college)
    }

    const openai = new OpenAIApi(new Configuration({ apiKey: process.env.REACT_APP_OPENAI_API_KEY }))

    const getSchoolColors = async (schoolName) => {
        const message = [
            {role: 'system', content: 'You know every single school color for every College and University in the United States. Please return colors for the provided schoo in the following format: [{"name": "color_name", "hex": "color_hex"}]'},
            {role: 'user', content: `Get the colors for ${schoolName} in the following format [{"name": "color_name", "hex": "color_hex"}]. Just return the data. No other content in your response.`}
        ]

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: message
        })
        const res = response.data.choices[0].message.content.trim()
        const colors = JSON.parse(res)
        document.querySelector('main').style.background = colors[0].hex
    }

    useEffect(() => {
        let collegeArray = []
        fetch('http://universities.hipolabs.com/search?country=United%20States')
            .then((response) => {
                return response.json()
            }).then((items) => {
                items.forEach((item) => {
                    console.log(item.name)
                    collegeArray.push(item.name)
                })
                setColleges(collegeArray)
            })
            .catch((err) => {
                console.error('Error retrieving Colleges API: ' + err)
            }) 
    }, [])

    return (
        <section className={`step step-${step}`}>
            <h3>What College / University do you attend?</h3>
            <select className="college-select" id="college-select" onChange={ () => { setSelectedCollege(document.getElementById('college-select').options[document.getElementById('college-select').selectedIndex].value) } }>
                <option>-----Select a College-----</option>
                {colleges.map((object, i) => <option>{ object }</option>)}
            </select>
            <div className='btn-group'>
                <button type='button' className='btn-next' onClick={ () => { changeStep('next') } }>Next</button>
          </div>
        </section>
    )
}

export default CollegeSelect