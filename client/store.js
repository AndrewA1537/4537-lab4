const endPointRoot = "http://localhost:3000/api/definitions/";
const POST = "POST";
const GET = "GET";


document.addEventListener("DOMContentLoaded", function () 
{
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) 
    {
        event.preventDefault(); // Prevent the default form submission

        const word       = document.getElementById("word").value;
        const definition = document.getElementById("definition").value;
        const data       = { word: word, definition: definition };

        fetch(endPointRoot, {
            method: POST,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => 
            {
                if(!response.ok)
                {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonResponse) => 
            {
                console.log(jsonResponse);
                // Handle the response here

                // Clear input fields after successful submission
                document.getElementById("word").value       = "";
                document.getElementById("definition").value = "";
            })
            .catch((error) =>
            {
                // Handle the error here, both for failed network requests and when response.ok is false
                console.error(
                    "There was an issue with the fetch operation:",
                    error.message
                );
            });
    });
});
