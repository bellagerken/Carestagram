import {useState} from 'react'

function NewPostForm({addPost, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="post-form">
            <h2>Add New Post Here</h2>
            {formSubmitted ? <h1>Thanks for adding a new post!</h1> :
            <form onSubmit={event => {
                addPost(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="image" placeholder="Image URL" required/>
                <input onChange={updatePostFormData} type="text" name="caption" placeholder="Post caption" required/>
                <input type="submit" value="Add Post"/>
            </form>}
        </div>
    )
}

export default NewPostForm