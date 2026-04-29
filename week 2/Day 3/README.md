# Week 2 - Day 3 - Employee Dashboard
Intern Name
Alishba Fiaz

# What I Learned Today
* How to retrieve data from an external API using the Fetch API
* Parsing and working with JSON responses
* Filtering datasets using the `.filter()` method
* Alphabetically ordering data with `.sort()`
* Dynamically building and inserting elements into the DOM
* Implementing real-time search functionality using input event listeners
* Applying conditional CSS classes based on data values
* Handling API errors gracefully using `.catch()`
* Toggling dynamic content visibility based on user interaction

# Features
* Retrieves live user data from the JSONPlaceholder API
* Presents users in a responsive card layout displaying name, email, and city
* Filters out users whose geographic latitude (`geo.lat`) is greater than or equal to 0
* Orders the filtered results alphabetically by name
* Supports live search filtering by username or email address
* A "Show Details" button on each card reveals the full address and company catchPhrase
* Ensures only one user's detail panel is open at any given time
* Applies distinctive gold styling to cards where the zipcode begins with the digit 5
* Displays a "Failed to fetch users" message if the API request is unsuccessful
* Displays a "No users found" message when no search results match

## Technologies Used
* HTML
* CSS
* JavaScript (Fetch API)