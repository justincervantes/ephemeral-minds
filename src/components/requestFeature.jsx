import React, {useState} from 'react'
import { toast } from 'react-toastify'
import { sendFeatureRequest } from '../services/requestFeatureService'
function RequestFeature() {

    const [feature, setFeature] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        
        if(feature) {
            const response = await sendFeatureRequest({request: feature})
            if(response) {
                toast.success("Feature submitted successfully!")
            }
        } else {
            toast.error("Feature field must not be empty!")
        }
        
    }
    
    function handleChange(event) {
        setFeature(event.target.value)
    }
    
    return (
        <>
            <h1 style={{paddingTop: "15px"}}>Feature Request</h1>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Description of feature request</label>
                    <textarea onChange={handleChange} className="form-control" rows="3"></textarea>
                </div>
                <p><small>Note: Feature requests are things you'd like to be able to do on this website. Requests are sent to all active developers and are integrated into our roadmap wherever possible. If the development team has questions about your request or are unable to implement the request, they will contact you at the email associated with your account. If you have any questions or concerns please contact the project lead, Justin at cervantes.jfa@gmail.com</small></p>
                <button disabled={feature ? false : true} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default RequestFeature
