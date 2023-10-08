// Import required modules
const HTTP = require("http");
const URL  = require("url");
const CORS = require("cors");


// Define constants for the service's endpoint and default port
const SERVICE_ROOT_ENDPOINT = "/api/definitions/";
const PORT = process.env.PORT || 10000;
const POST = "POST";
const GET  = "GET";


// Array to store definitions in memory
let definitions = [];


// Create the server
const server = HTTP.createServer((req, res) => 
{
    // Use CORS middleware to handle CORS headers
    CORS()(req, res, () => 
    {
        // Handle POST requests to add new definitions
        if(req.method === POST && req.url === SERVICE_ROOT_ENDPOINT) 
        {
            let body = "";

            // Concatenate incoming chunks of data to form the complete request body
            req.on("data", (chunk) => 
            {
                body += chunk.toString();
            });

            req.on("end", () => 
            {
                try 
                {
                    const data = JSON.parse(body);

                    // Check if the word already exists in the definitions array
                    const existingDefinition = definitions.find(
                        (def) => def.word === data.word
                    );

                    if(existingDefinition) 
                    {
                        // Send a response indicating that the word already exists
                        res.writeHead(409, 
                        {
                            "Content-Type": "application/json",
                        });
                        res.end(
                            JSON.stringify({
                                success: false,
                                message: `Warning! '${data.word}' already exists.`,
                            })
                        );
                    } 
                    else
                    {
                        // Add the received definition to the in-memory array
                        definitions.push(data);

                        // Send a success response
                        res.writeHead(200, {
                            "Content-Type": "application/json",
                        });
                        res.end(
                            JSON.stringify({
                                success: true,
                                message: `Request #${definitions.length} (the number of total entries in your dictionary)\nNew entry recorded:\n"${data.word} : ${data.definition}"`,
                            })
                        );
                    }
                } 
                catch(error)
                {
                    // Handle invalid JSON in request body
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            success: false,
                            message: "Invalid JSON data",
                        })
                    );
                }
            });
        }
        // Handle GET requests to retrieve definitions
        else if(req.method === GET && req.url.startsWith(SERVICE_ROOT_ENDPOINT))
        {
            const parsedURL  = URL.parse(req.url, true);
            const searchTerm = parsedURL.query.word;

            // Search for the definition in the in-memory array
            const foundDefinition = definitions.find(
                (def) => def.word === searchTerm
            );

            if(foundDefinition)
            {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        success: true,
                        definition: foundDefinition.definition,
                    })
                );
            } 
            else
            {
                // Send a not found response if the word doesn't exist in the definitions array
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(
                    JSON.stringify({
                        success: false,
                        message: "Word not found!",
                    })
                );
            }
        } 
        else
        {
            // Handle all other routes/methods
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
        }
    });
});


// Start the server
server.listen(PORT, () => 
{
    console.log(`Server is listening on port ${PORT}`);
});
