
Welcome to Carestagram!

Carestagram is a flask / react application that allows users to discover volunteer opportunities, post about their volunteer experiences, and engage with other users' posts. 



## Setup

1. Fork and then Clone this repository.

2. Make sure that you are in the correct directory (folder) that contains a `Pipfile`, then run `pipenv install` in your terminal to install the required Python libraries.

3. Now that your `pipenv` virtual environment is ready to use, enter `pipenv shell` to enter the virtual environment.

4. Run `npm install --prefix client` in your terminal to install the dependencies for the React app.

5. Enter the command `cd server` in the terminal to move into the server directory.

6. Enter the command `python app.py` in the terminal to run the Flask app (make sure that you are in the `server` directory before running this terminal command).

7. In a new terminal, run `npm start --prefix client` in your terminal to run the React app in the browser. If your browser does not automatically open the page for you, open [http://localhost:4000](http://localhost:4000) to view it in your browser.

Backend:

The backend of Carestagram is built using a relational database with four tables: Volunteers, Charities, Posts, and Comments.

-Volunteers: This table contains a username and password column to store information about the users of the application.
-Charities: This table contains a name, date, time, location, and description column to store information about different volunteer events.
-Posts: This table contains an image, caption, and likes column to store information about posts from volunteers.
-Comments: This table contains a comment_post column to store inforamtion about comments made by volunteers. 

Frontend: 

The user lands on the homepage where they are asked to either signup or login, as well as an About section explaining how to navigate the application. 

In the navbar, users can direct themselves to either a login or signup form. Once logged in, they can confirm their user details by clicking on the Account button in the navbar.

Users are now able to explore volunteer opportunites, scroll through social media posts created by other volunteers, create their own posts, and engage in . If a user is hosting a charity event and is in need to volunteers, they can spread the word by posting the event to the dashbaord.

Lastly, when the user is finished browsing, they can logout by navigating back to their account page and clicking the logout button. 

