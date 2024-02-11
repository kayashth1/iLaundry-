// const LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
// const {User} = require("./database")

// exports.initializingPassport  = (passport) =>{
// passport.use(new LocalStrategy(async(username,password,done) =>{
// try {
//     const user = await User.findOne({ username});
 
// if(!user) return done(null, false);

// if(user.password !== password) return done(null,false);

// return done(null,user);
// } catch (error) {
//     return done(error,false);
// }


// }))

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(async function(id, done) {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (err) {
//       done(err, false);
//     }
//   });

// };


// exports.isAuthenticated = (req,res,next) =>{
//     if (req.user) {
//       return next();
//     }
//     else{
      
//       res.redirect("/joinus");
//     }
// };

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('./database');

exports.initializingPassport = (passport) => {
  // Local strategy
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) return done(null, false);
      if (user.password !== password) return done(null, false);

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Google strategy
  passport.use(new GoogleStrategy({
    clientID: '641219956541-829t3q4ie3qe1tdeb7bl5j65h7tfipih.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:3000/auth/google/main",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if the user already exists in your database
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      // If the user doesn't exist, create a new user in your database
      const newUser = new User({
        username: profile.displayName,
        googleId: profile.id,
        // Add other necessary fields as needed
      });

      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }));

  // Serialization and deserialization functions remain the same as in your existing code
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};

exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    res.redirect('/joinus');
  }
};

