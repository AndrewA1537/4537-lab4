// Import required modules

const HTTP = require("http"); // HTTP module for creating server
const PATH = require("path"); // Path module for handling file and directory paths
const URL  = require("url");  // URL module for URL resolution and parsing
const FS   = require("fs");   // File System module for interacting with the file system
const CORS = require("cors"); // Import the cors package

// =====================================================================================================================

const SERVICE_ROOT_ENDPOINT = "/api/definitions/";

const PORT = process.env.PORT || 3000;

const POST = "POST";
const GET  = "GET";


const server = HTTP.createServer((req, res) => 
{
    CORS()(req, res, () => 
    {
        if(req.method === POST && req.url === SERVICE_ROOT_ENDPOINT) 
        {
            let body = "";

            req.on("data", (chunk) => 
            {
                body += chunk.toString();
            });

            req.on("end", () => 
            {
                try 
                {
                    const data = JSON.parse(body);

                    // Here, you can handle the POST data as needed, e.g., saving it to a file or a database.
                    // For this example, we'll just send a simple response.
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(
                        JSON.stringify({
                            success: true,
                            message: "Definition added successfully!",
                        })
                    );
                } 
                catch(error)
                {
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
        else
        {
            // Handle other routes or methods, if needed.
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
        }
    });
});

server.listen(PORT, () => 
{
    console.log(`Server is listening on port ${PORT}`);
});
