function VolunteerDetails({currentVolunteer, logout}) {

   if (currentVolunteer){
    return (
        <div className="volunteer-detail">
          <h1>Welcome {currentVolunteer.username}!</h1>
          <button className="logout-button"onClick={logout}>Logout</button>
        </div>
      )}
   else {
    return <h1>Please login or signup</h1>
  }
}
  
  export default VolunteerDetails