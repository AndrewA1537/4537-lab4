// Import required modules

const HTTP = require("http"); // HTTP module for creating server
const PATH = require("path"); // Path module for handling file and directory paths
const URL = require("url");   // URL module for URL resolution and parsing
const FS = require("fs");     // File System module for interacting with the file system

// ===================================================================================================================== 

const SERVICE_ROOT_ENDPOINT = "/api/definitions/";

const POST = "POST";
const GET = "GET";
