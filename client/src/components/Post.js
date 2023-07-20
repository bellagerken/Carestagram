import {useState} from 'react'

function Post({post, deletePost, updatePostFormData, addComment, deleteComment, volunteers}){
    const [formSubmitted, setFormSubmitted] = useState(false)

    console.log(post[5])

    return (
        <div className="card-container">
        <div className="card">
            <h2>{post.id}</h2>
            <img src={post.image} alt={post.caption} className="post-image"/>
            <div className="post-caption">@{post.volunteer.username} : {post.caption} </div>
            <p>Comments:</p>
            <div className="comment-container">{post.comments.map(comment => {
                return (
                    [<p key={comment.id} className="comment-section">@{comment.volunteer.username}: {comment.comment_post}</p>,
                <button className="delete-comment"key={comment.comment_post}onClick={() => deleteComment(comment.id)}>Delete Comment</button>])
            })}</div>
            <button className="delete-post"onClick={() => deletePost(post.id)}>Delete Post</button>
        </div>
        </div>
    )
}

export default Post