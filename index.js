let express = require("express");
let app = express();

app.get('/', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/index.html");
});

app.get('/aboutGame.html', function(req, res) {
    app.use(express.static(__dirname + "/static"));
    res.sendfile("static/aboutGame.html");
    console.log("Description of game visited.");
});

let port = process.env.PORT || 3200;
app.listen(port);

console.log("Server works on port " + port);
