// 1 - Dependencies
const express = require("express");
const path = require("path")
const mongoose = require('mongoose');
const passport = require("passport")
const expressSession = require("express-session")
const MongoStore = require("connect-mongo")
const moment = require ('moment')
const methodOverride = require('method-override')

require('dotenv').config();

// const UserModel = require("./models/userModel")

//import routes
// const classRoutes = require("./routes/classRoutes");
// const classRoutes = require("./routes/classRoutes")
// const authRoutes = require("./routes/authRoutes")
const stockRoutes = require("./routes/stockRoutes")
const salesRoutes = require("./routes/salesRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const reportsRoutes = require("./routes/reportsRoutes")
const suppliersRoutes = require("./routes/suppliersRoutes")
const toDoRoutes = require("./routes/toDoRoutes")
// 2 - Instantiations
const app = express();
const port = 3000

// 3 - Configurations
app.locals.moment = moment;
//setting up mongodb connections
mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });





//   mongoose.connect('mongodb://127.0.0.1:27017/mwf_todo', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'));
  




// setting view engine to pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))



// 4 - Middleware    
//MIDDLE WARE
//method-override
app.use(methodOverride('_method'));
// app.use(express.static('public'));  //static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"))
app.use(express.urlencoded({extended:true}))  // this helps to pass data from forms
app.use(express.json()); // optional for JSON
//express session configurations
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
  cookie: {maxAge:24*60*60*1000}  //one day - what we specified here is how long the cookie should last in a day
}))
//passport configs
app.use(passport.initialize());
app.use(passport.session());



// Authentication with passport local strategy
// passport.use(UserModel.createStrategy());
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

// Simple request time logger
app.use('/home', (req, res, next) => {           //this is where we add the file or route we are focusing on, which is "home" now, but you can put any route you want to focus on or leave it empty and i will monitor all routes
   console.log("A new request received at " + Date.now());

   // This function call tells that more processing is
   // required for the current request and is in the next middleware
   //function/route handler.
   next();  
});

// app.use((req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });


// 5 - Routes
//using imported routes

// app.use("/",classRoutes)
// app.use("/",authRoutes)
app.use("/",stockRoutes)
app.use("/",salesRoutes)
app.use("/",employeeRoutes)
app.use("/",authRoutes)
app.use("/",productRoutes)
app.use("/",reportsRoutes)
app.use("/",suppliersRoutes)
app.use("/",toDoRoutes)













//NON EXISTENT ROUTE
//this is a non existing route it should be at the bottom but above the app listen which is the last down.
app.use((req, res) => {
  res.status(404).send('oops! route not found.')
})
// 6 - Bootstrapping Server
//this should always be the last line in this file
app.listen(port, () => console.log(`listening on port ${port}`));