import React, { useState } from "react";

function Login({attemptLogin, logout}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)
  
    function handleSubmit(e) {
      e.preventDefault()
      attemptLogin({username, password})
    }
  
    return (
        <div>
      <form onSubmit={handleSubmit}>
  
        <input type="text"
        onChange={handleChangeUsername}
        value={username}
        placeholder='username'
        />
  
        <input type="password"
        onChange={handleChangePassword}
        value={password}
        placeholder='password'
        />
  
        <input type="submit"
        value='Login'
        />
  
      </form>
      </div>
    )
  
  }
  
  export default Login