import Post from './Post'
import { useState} from 'react'

function PostList({posts, deletePost, updatePostFormData, addComment, addPost, deleteComment, volunteers}){

    const postComponents = posts.map(post => {
        return <Post key={post.id} post={post} deletePost={deletePost} updatePostFormData={updatePostFormData} addComment={addComment} deleteComment={deleteComment} volunteers={volunteers}/>
    })

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
            <div>
            <h2>Add New Comment Here</h2>
            {formSubmitted ? <h1>Thanks for adding a new comment!</h1> :
            <form onSubmit={event => {
                addComment(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="comment_post" placeholder="Write comment here" required/>
                <input onChange={updatePostFormData} type="text" name="post_id" placeholder="# Post you want to add comment to" required/>
                <input type="submit" value="Add Comment"/>
            </form>}
            </div>
            <div className="post-list">{postComponents}</div>
        </div>
        )
}

export default PostList