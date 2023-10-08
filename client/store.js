// Endpoint where the definitions will be sent
const endPointRoot = "http://localhost:3000/api/definitions/";


// Constants for the HTTP methods being used
const POST = "POST";
const GET = "GET";


// Event listener to ensure the DOM content is loaded before our code runs
document.addEventListener("DOMContentLoaded", function () 
{
    // Select the form element from the page
    const form = document.querySelector("form");

    // Add an event listener to handle form submissions
    form.addEventListener("submit", function (event) 
    {
        // Prevent the form from doing its default submit action (e.g., page refresh)
        event.preventDefault();

        // Get values from the input fields
        const word       = document.getElementById("word").value;
        const definition = document.getElementById("definition").value;
        const data       = { word: word, definition: definition };

        // Make a POST request to the server with the word and its definition
        fetch(endPointRoot, 
        {
            method: POST,
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => 
        {
            // If the response is not OK (e.g., status 404 or 500), reject the promise
            if(!response.ok) 
            {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => 
        {
            // Response received successfully
            // TODO: Add any required logic here if needed.

            // Clear the input fields after successfully sending data
            document.getElementById("word").value       = "";
            document.getElementById("definition").value = "";
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
