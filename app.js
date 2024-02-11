const express = require("express");
const path = require('path');
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
const {connectMongoose,User,CallRequest} = require("./database.js")
const ejs = require("ejs");
const passport = require("passport");
const { initializingPassport,isAuthenticated } = require("./passportConfig.js");
const session = require('express-session');
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors');
const Dotenv = require('dotenv-webpack');

// module.exports = {
//   // other webpack configurations...
//   plugins: [
//     new Dotenv(),
//   ],
// };

// const stripe_key = process.env.stripe_key;

const stripe = require('stripe')('sk_test_51OXsEpSBoERWRPWyS6BdFvOviKjMTV4aLtxNWnrdGJBNWsYobzBDnMepBFhVSB3l6alh3bAqKF7P8Ojw6z8Q1Px400rr739w5W');

app.use(express.static("public"));
app.use('/images', express.static("public"));
app.use(express.static(path.join(__dirname)));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

function isLoggedin(req,res,next){
  req.user ? next() : res.sendStatus(401);
}

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.json());

connectMongoose();

initializingPassport(passport);

// <---------Google Authentication code is given Below---->
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/main',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to a page
    res.redirect('/main');
  }
);
app.get("/", function(req, res){
    res.render("home");
  });

  app.get("/joinus", function(req, res){
    res.render("index.ejs");
  });
  
  app.get("/register", function(req, res){
    res.render("index.ejs");
  });


app.post("/register", async (req,res)=>{
const user = await User.findOne({username:req.body.username});
if(user){
return res.status(400).send("User ALready Created");

}
  
const newUser = await User.create(req.body);

// res.status(201).send(newUser);
passport.authenticate("local")(req, res, function(){
  res.redirect("/main");
});
// res.redirect("/main");

})


app.post("/login",passport.authenticate("local",{failureRedirect:"/joinus"},), async (req,res) =>{
res.redirect("/main")
})

app.get("/main", isAuthenticated,function(req, res) {
// res.send(req.send);
res.render("main.ejs")
})

{
// app.get("/main", function(req, res){
//   User.find({"secret": {$ne: null}}, function(err, foundUsers){
//     if (err){
//       console.log(err);
//     } else {
//       if (foundUsers) {
//         res.render("main", {usersWithSecrets: foundUsers});
//       }
//     }
//   });
// });
}


app.get('/logout', function(req, res) {
  req.logout(function(err) {
      if (err) {
          console.error(err);
          return next(err);
      }
      res.redirect('/'); // Redirect to the home page or any other page after logout
  });
});

//Now starts processing of schendule button which will redirect to having a call request.

app.post("/order",function(req, res) {
res.redirect("/schedule")
})
app.get("/schedule",isAuthenticated,(req,res)=>{
res.render("schedule.ejs")
})






// exports.connectMongoose = () => {
//     mongoose
//     .connect("mongodb://127.0.0.1:27017/passport")
//     .then((e)=> console.log(`connected to mongodb:${e.connect.host}`))
//     .catch((e)=>console.log(e)) ;
//   }




  
  
  // const CallRequest = require('./database.js');
  
  app.post('/request-call', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const nameofuser = req.body.nameofuser;

  // Assuming you have a CallRequest model defined in database.js
  const newCallRequest = new CallRequest({
      phoneNumber,
      nameofuser,
  });

  try {
      // Save the new call request to the MongoDB database
      await newCallRequest.save();

      // console.log("Call request saved successfully:", newCallRequest);

      // Respond to the client
      // res.send("Call request received and saved successfully!");
      res.redirect("/main")
  } catch (error) {
      console.error("Error saving call request:", error);
      res.status(500).send("Internal Server Error");
  }
});


//Now below this service section is being made by which we can order our product;
app.get("/home",(req,res) =>{
  res.redirect("/main")
})
app.get("/service", isAuthenticated,(req,res) =>{
  res.render("service.ejs")
})


// app.get('/script.js', (req, res) => {
//   res.setHeader('Content-Type', 'application/javascript');
//   // Your logic to send the script.js file
// });

// Serve the script.js file
app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  
  // Read the content of script.js
  const scriptFilePath = path.join(__dirname, 'script.js');
  
  fs.readFile(scriptFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading script.js:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});

// Stripe Integration

dotenv.config();

app.get("/success",isAuthenticated,(req,res)=>{
  res.render("success.ejs")
  })
app.get("/cancel",isAuthenticated,(req,res)=>{
  res.render("cancel.ejs")
  })


let stripeGateway = stripe;
let  DOMAIN = 'http://localhost:3000';

app.post('/stripe-checkout', async (req, res) => {
  try {
    const items = req.body.items;
      const lineItems = req.body.items.map((item) => {
          const unitAmount = Math.round(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * 100);
          console.log('item-price:', item.price);
          console.log("unitAmount:", unitAmount);
          return {
              price_data: {
                  currency: 'usd',
                  product_data: {
                      name: item.title,
                      images: [item.productImg]
                  },
                  unit_amount: unitAmount,
              },
              quantity: item.quantity,
          };
      });

      console.log('lineItems', lineItems);

      // Create Checkout Session
      const session = await stripeGateway.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          success_url: `${DOMAIN}/success`,
          cancel_url: `${DOMAIN}/cancel`,
          line_items: lineItems,
          // Asking Address In Stripe Checkout
          billing_address_collection: 'required'
      });

      res.json({ url: session.url });
  } catch (error) {
      console.error('Error creating checkout session:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.listen(3000,() =>{
    console.log("listening on port 3000")
})