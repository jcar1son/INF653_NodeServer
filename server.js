// Requiring modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const logEvents = require("./logEvents");
const events = require("events");

const myEvent = new events.EventEmitter();


// Creates the server and the request
http.createServer((req, res) => {
	
	//We parse the url to get the path and then join the directory
	const request = url.parse(req.url, true);
	const action = request.pathname;
	const filePath = path.join(__dirname,
		action).split("%20").join(" ");

		//logs the events
		myEvent.on("log", (msg) => {
			logEvents(msg);
		  });
		  
		  setTimeout(() => {
			myEvent.emit("log", "Log Event Emitted");
		  }, 2000);

	//We see if the file can be read
	fs.exists(filePath, function (exists) {

		

		//Get the file extension and checking to see if the image is a png or not
		const ext = path.extname(action);
		if (ext === ".png") {
			contentType = "image/png";
		}

		//We set the header to a text/plain and then read the file
		res.writeHead(200, {
			"Content-Type": "text/plain"
		});
		fs.readFile(filePath,
			function (err, content) {
				// Then were serve the image
				res.end(content);
			});
	});
})



//listens for the server on port 3000
.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
