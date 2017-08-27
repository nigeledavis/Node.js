
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
  
  else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Bad gateway error");
    response.end();
  }


};


fs.readFile('listings.json', 'utf8', function(err, data) {
if (err) throw err;
listingData = data;

http.createServer(requestHandler).listen(8080);
console.log('Server started');
});
