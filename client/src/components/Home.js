function Home({ currentVolunteer }) {
    if (currentVolunteer) {
      return <h1 className="welcome">Welcome, {currentVolunteer.username}!</h1>;
    } else {
      return (
    <div className="aboutpage">
        <h1 className="line1">Welcome to Carestagram!✨</h1>
        <p className="line2">Please Signup or Login to get started.</p>
        <p className="line7">About:</p>
        <p className="line3">Explore social media posts by people choosing to make a difference in the world. </p>
        <p className="line4">Have you recently volunteered? Post about your experience to our feed.</p>
        <p className="line5">Hosting an event and need volunteers? Spread the word by posting information about your cause to our dashboard.</p>
        <p className="line6">Interact with other volunteers and organizations by engaging with their posts.</p>
    </div>
   ) }
  }
  
  export default Home;