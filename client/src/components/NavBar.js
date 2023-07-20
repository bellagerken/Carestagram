import {NavLink} from "react-router-dom"

function NavBar({user, onLogout}){

        function handleLogout() {
            fetch("/logout", {
              method: "DELETE",
            }).then(() => onLogout());
          }
    return (
        <nav className="nav">
            <div className="nav-a">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/posts">Explore Posts</NavLink>
                <NavLink to="/update_post">Update Post</NavLink>
                <NavLink to="/charities">Volunteer Events</NavLink>
                <NavLink to="/add_charity">Add New Volunteer Opportunity</NavLink>
                <NavLink to="/volunteer">Account</NavLink>
            </div>
            {/* {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <NavLink to="/login">Click Here to Login</NavLink>
      )} */}
        </nav>
    )}
export default NavBar;