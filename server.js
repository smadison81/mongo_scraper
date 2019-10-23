//require dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars")
var bodyParser = require("body-parser");

//Port is either host provided or 3000
var PORT = process.env.PORT || 3000;

//Setup Express
var app = express();

//Setup Express Router
var router = express.Router();

//Setup Routes
require("./config/routes")(router);

//Set public folder as the static directory
app.use(express.static(__dirname + "/public"));

//Set Express Handlebars
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

//Set Body Parser
app.use(bodyParser.urlencoded({
    extended: false

}))

//All request go through router
app.use(router);

//Local or Deployed Switch
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(error){

    if (error){

        console.log(error);

    }
    else{

        console.log("mongoose connection is successful")

    }
})


//Port connection output
app.listen(PORT, function(){

    console.log("Listening on port: " + PORT);

})