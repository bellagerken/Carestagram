import {useState} from 'react'

function NewCharityForm({addCharity, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="charity-form">
            <h2>Add New Volunteer Opportunity</h2>
            {formSubmitted ? <h1>Thank you!</h1> :
            <form onSubmit={event => {
                addCharity(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="name" placeholder="Title" required/>
                <input onChange={updatePostFormData} type="text" name="location" placeholder="Location" required/>
                <input onChange={updatePostFormData} type="text" name="date" placeholder="Date" required/>
                <input onChange={updatePostFormData} type="text" name="time" placeholder="Time" required/>
                <input onChange={updatePostFormData} type="text" name="description" placeholder="Description" required/>
                <input type="submit" value="Post"/>
            </form>}
        </div>
    )
}

export default NewCharityForm