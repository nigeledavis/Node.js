
var http = require('http'), 

    fs = require('fs'), 

    url = require('url'),

    port = 8080;



/* Global variables */

var listingData, server;

var requestHandler = function(request, response) {

  var parsedUrl = url.parse(request.url);
  
  //if statement that determines whether client has issued a GET request to "listings"
  if (request.method == "GET" && parsedUrl.pathname == '/listings'){
    response.writeHead(200, {'Content-Type': 'application.json'});
    response.write(listingData);
    response.end();
  }
  
  //Else statement that writes "Bad gateway error" to the client if they did not issue a GET request to "listings"
  else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Bad gateway error");
    response.end();
  }


};

//function that reads data from the listings.json file and saves that data in the variable listingData
fs.readFile('listings.json', 'utf8', function(err, data) {
if (err) throw err;
listingData = data;

//starting the server on port 8080
http.createServer(requestHandler).listen(8080);
console.log('Server started');
});
