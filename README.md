# AutoFix-Backend

<h2>DESCRIPTION</h2> 

<p>This repo is the API server to my Fullstack web application <a href="https://auto-fix.herokuapp.com">AutoFix</a></p>

<h2>Technologies</h2>

<ul>
	<li>Node.js</li>
	<li>Express</li>
	<li>Mocha</li>
	<li>Chai</li>
	<li>MongoDB</li>
	<li>Mongoose</li>
	<li>bcryptjs</li>
	<li>Passport</li>
</ul>

<h2>SECURITY</h2>
<ul>
	<li>Application uses JWT authentication </li>
	<li>Passwords are encrypted using bcrypt.js</li>
</ul>

<h2>API Documentation</h2>
<p>API endpoints for the back end include:</p>
<ul>Users
	<li>POST to '/api/auth' to create a new users</li>
	<li>POST to '/api/users' sign in exciting user</li>
</ul>

<ul>Cars
	<li>GET to '/api/cars' to view all existing cars that are registered</li>
	<li>GET to '/api/cars/:id' to view a single car by ID</li>
	<li>POST to '/api/cars' to register new car entry</li>
	<li>PUT to '/api/cars/:id' to edit an exciting car entry by ID</li>
  <li>DELETE to '/api/cars/:id' to delete a single car by ID</li>
</ul>

<ul>Fixs
	<li>GET to '/api/fixs/:carid' to view all fixes existing to a single car </li>
	<li>POST to '/api/fix' to add new fix entry</li>
	<li>PUT to '/api/fixs/:id' to edit an exciting fix entry by ID</li>
  <li>DELETE to '/api/fixs/:id' to delete a single fix by ID</li>
</ul>
