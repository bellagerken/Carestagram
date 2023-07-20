import {useState} from 'react'

function UpdatePostForm({updatePost, setIdToUpdate, updatePatchFormData, posts}){

    const [updateFormSubmitted, setUpdateFormSubmitted] = useState(false)

    return (
        <div className="update-post-form">
            <h2>Update Post</h2>
            {updateFormSubmitted ? <h1>Post Updated!</h1> :
            <form onSubmit={event => {
                updatePost(event)
                setUpdateFormSubmitted(updateFormSubmitted => !updateFormSubmitted)
            }}>
                <label>Choose a Post: </label>
                <select onChange={(event) => {
                    setIdToUpdate(event.target.value)
                }} name="id">
                {posts.map(post => {
                    return <option key={post.id} value={post.id}>{`${post.id}: ${post.image}: ${post.caption}`}</option>
                })}
                </select>
                <input onChange={updatePatchFormData} type="text" name="image" placeholder="Post image"/>
                <input onChange={updatePatchFormData} type="text" name="caption" placeholder="Post caption"/>
                <input type="submit" value="Update Post"/>
            </form>}
        </div>
    )
}

export default UpdatePostForm