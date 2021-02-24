const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))     //this syntax allows you to use external files like style.css , images etc
 // (press ctrl + /)

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
 })


app.post("/",function(req, res){
  const firstName = req.body.fn;
  const lastName = req.body.ln;
  const emailId = req.body.email;
  //res.send("thank you");
  //console.log(firstName,lastName,emailId);
  const data = {

    members: [
      {
        email_address: emailId,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };


//converting javascript into JSON
  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/52bddd88ce";

 const options = {
     method: "POST",
     auth: "design:a9b030035f0f82ba1999aa3e6cd9144f5-us7"
 }

  const request = https.request(url,options, function(response){

     if(response.statusCode == 200){
       //res.send("successfully subscribed");
       res.sendFile(__dirname + "/success.html");
     } else{
      // res.send("There was an error signing up , Please try again!");
      res.sendFile(__dirname + "/failure.html");
     }


    response.on("data", function(data){
      console.log(JSON.parse(data));
      //console.log(data);
  });
});

request.write(jsonData);
request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000, function(){
  console.log("server is running on port 3000");
})


//9b030035f0f82ba1999aa3e6cd9144f5-us7
//52bddd88ce
