import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"

import NavBar from './NavBar'
import CharityList from './CharityList'
import PostList from './PostList'
import NewPostForm from './NewPostForm'
import NewCharityForm from './NewCharityForm'
import UpdatePostForm from './UpdatePostForm'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import VolunteerDetails from './VolunteerDetails';

function App() {

  const [charities, setCharities] = useState([])
  const [posts, setPosts] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [comments, setComments] = useState([])
  const [postFormData, setPostFormData] = useState({})
  const [idToUpdate, setIdToUpdate] = useState(0)
  const [patchFormData, setPatchFormData] = useState({})
  const [currentVolunteer, setCurrentVolunteer] = useState(null)

  useEffect(() => {
    fetch('/charities')
    .then(response => response.json())
    .then(charityData => setCharities(charityData))
  }, [])

  useEffect(() => {
    fetch('/posts')
    .then(response => response.json())
    .then(postData => setPosts(postData))
  }, [])


  useEffect(() => {
    fetch('/comments')
    .then(response => response.json())
    .then(commentData => setComments(commentData))
  }, [])

  useEffect(() => {
    fetch('/volunteers')
    .then(response => response.json())
    .then(volunteerData => setVolunteers(volunteerData))
  }, [])

  useEffect(() => {
    if(posts.length > 0 && posts[0].id){
      setIdToUpdate(posts[0].id)
    }
  }, [posts])

  useEffect(() => {
    if(comments.length > 0 && comments[0].id){
      setIdToUpdate(comments[0].id)
    }
  }, [comments])

  useEffect(() => {
    if(charities.length > 0 && charities[0].id){
      setIdToUpdate(charities[0].id)
    }
  }, [charities])

  useEffect(() => {
    fetch('/current_session')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(volunteer => setCurrentVolunteer(volunteer))
      }
    })
  }, [])



  function attemptLogin(volunteerInfo) {
    console.log(volunteerInfo)
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(volunteerInfo)
    })
    .then(res => {
      if (res.ok) {
        res.json()
        .then(volunteer => setCurrentVolunteer(volunteer))
      }
    })
  }
  function attemptSignup(volunteerInfo) {
   
    fetch('/volunteers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(volunteerInfo)
    })
    .then(res => {
      if (res.ok) {
        res.json()
        .then(volunteer => setCurrentVolunteer(volunteer))
      }
    })
  }

  function logout() {
    setCurrentVolunteer(null)
    fetch('/logout', { method: 'DELETE' })
  }

  function addPost(event){
    event.preventDefault()

    fetch('/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({...postFormData, volunteer_id: currentVolunteer.id})
    })
    .then(response => response.json())
    .then(newPost => setPosts(posts => [...posts, newPost]))
  }

  function updatePost(event){
    event.preventDefault()
    fetch(`/posts/${idToUpdate}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(patchFormData)
    })
    .then(response => response.json())
    .then(updatedPost => {
      setPosts(posts => {
        return posts.map(post => {
          if(post.id === updatedPost.id){
            return updatedPost
          }
          else{
            return post
          }
        })
      })
    })
  }

  // function updateCharity(event){
  //   event.preventDefault()
  //   fetch(`/charities/${idToUpdate}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(postFormData)
  //   })
  //   .then(response => response.json())
  //   .then(updatedCharity => {
  //     setCharities(charities => {
  //       return charities.map(charity => {
  //         if(charity.id === updatedCharity.id){
  //           return updatedCharity
  //         }
  //         else{
  //           return charity
  //         }
  //       })
  //     })
  //   })
  // }

  function deletePost(id){
    fetch(`/posts/${id}`, {
      method: "DELETE"
    })
    .then(() => setPosts(posts => {
      return posts.filter(post => {
        return post.id !== id
      })
    }))
  }

  function addCharity(event){
    event.preventDefault()

    fetch('/charities', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(postFormData)
    })
    .then(response => response.json())
    .then(newCharity => setCharities(charities => [...charities, newCharity]))
  }


    function addComment(event){
      // event.preventDefault()
  
      fetch('/comments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({...postFormData, volunteer_id: currentVolunteer.id})
      })
      // .then(response => response.json())
      // .then(newComment => setComments(comments => [...comments, newComment]))
    }

      function deleteComment(id){
        fetch(`/comments/${id}`, {
          method: "DELETE"
        })
        .then(() => setComments(comments => {
          return comments.filter(comment => {
            return comment.id !== id
          })
        }))
      }

      function deleteCharity(id){
        fetch(`/charities/${id}`, {
          method: "DELETE"
        })
        .then(() => setCharities(charities => {
          return charities.filter(charity => {
            return charity.id !== id
          })
        }))
      }

    // function addComment(event){
    //   event.preventDefault()
  
      // fetch('/posts', {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Accept": "application/json"
      //   },
      //   body: JSON.stringify(postFormData)
      // })
      // .then(response => response.json())
      // .then(newComment => setPosts(posts.comments => [...posts.comments, newComment]))}
    

  function updatePostFormData(event){
    setPostFormData({...postFormData,[event.target.name]: event.target.value})
  }

  function updatePatchFormData(event){
    setPatchFormData({...patchFormData, [event.target.name]: event.target.value})
  }

console.log(posts[0])
  return (
    <div className="app">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home currentVolunteer={currentVolunteer}/>
        </Route>
        <Route path="/charities">
          <CharityList charities={charities} deleteCharity={deleteCharity}/>
        </Route>
        <Route path="/posts">
          <PostList posts={posts} deletePost={deletePost} addComment={addComment} updatePostFormData={updatePostFormData} addPost={addPost} deleteComment={deleteComment} volunteers={volunteers}/>
        </Route>
        <Route path="/update_post">
          <UpdatePostForm updatePost={updatePost} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} posts={posts}/>
        </Route>
        <Route path='/add_charity'>
          <NewCharityForm addCharity={addCharity} updatePostFormData={updatePostFormData}/>
        </Route>
        <Route exact path="/login">
        { !currentVolunteer ? <Login attemptLogin={attemptLogin} logout={logout} /> : null }
        </Route>
        <Route path="/signup">
        { !currentVolunteer ? <Signup attemptSignup={attemptSignup} /> : null }
        </Route>
        <Route path="/add_post">
          <NewPostForm addPost={addPost} updatePostFormData={updatePostFormData}/>
        </Route>
        <Route path="/volunteer">
        { currentVolunteer ? <VolunteerDetails currentVolunteer={currentVolunteer} logout={logout} /> : null }
        </Route>
      </Switch> 
    </div>
  );
}

export default App;

