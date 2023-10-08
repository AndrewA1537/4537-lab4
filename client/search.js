document.addEventListener("DOMContentLoaded", function () 
{
    const form = document.getElementById("searchForm");
    const searchResultDiv = document.getElementById("searchResult");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const searchTerm = document.getElementById("searchTerm").value;

        // Assuming your API uses query parameters to get search results
        fetch(endPointRoot + "?word=" + searchTerm, {
            method: GET,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonResponse) => {
                if (jsonResponse.success) {
                    searchResultDiv.textContent = jsonResponse.definition;
                } else {
                    searchResultDiv.textContent = "Word not found!";
                }
            })
            .catch((error) => {
                console.error(
                    "There was an issue with the fetch operation:",
                    error.message
                );
            });
    });
});
