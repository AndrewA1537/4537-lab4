// URL for the API endpoint
const endPointRoot = "http://localhost:3000/api/definitions/";
const GET          = "GET";


// Wait until the DOM content has loaded before running the script
document.addEventListener("DOMContentLoaded", function ()
{
    // Get references to the form and the div to display search results
    const form            = document.getElementById("searchForm");
    const searchResultDiv = document.getElementById("searchResult");

    // Add an event listener to the form to handle submissions
    form.addEventListener("submit", function (event) 
    {
        // Prevent the form from its default submission behavior
        event.preventDefault();

        // Extract the search term from the input field
        const searchTerm = document.getElementById("searchTerm").value;

        // Send a GET request to the server to search for the term
        fetch(endPointRoot + "?word=" + searchTerm, 
        {
            method: GET,
            headers: 
            {
                "Content-Type": "application/json",
            },
        })
        .then((response) => 
        {
            // If the HTTP response isn't in the 200-299 range, reject the promise
            if(!response.ok) 
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((jsonResponse) => 
        {
            // Display the definition if found, otherwise display an error message
            if(jsonResponse.success) 
            {
                searchResultDiv.textContent = jsonResponse.definition;
            } 
            else 
            {
                searchResultDiv.textContent = "Word not found!";
            }
        })
        .catch((error) => 
        {
            // Handle any errors that occurred during the fetch
            console.error
            (
                "There was an issue with the fetch operation:",
                error.message
            );
        });
    });
});
