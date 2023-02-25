const LocalStrategy = require('Passport-local').Strategy;
const passport = require('passport');
const { User } = require("./database.js")

exports.initializingPassport = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                // Checking User Available  
                const user = await User.findOne({ username });
                // if user not available      
                if (!user) return done(null, false);
                // If Password Doesn't Match
                if (user.password !== password) return done(null, false);
                // Success Proceed to Login

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    )
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });
    
    passport.deserializeUser(async(id,done)=>{
        try{
            const user = await User.findById(id);
            done(null, user);
        }catch(error){
            done(error, false);
        }
    });
};

exports.isAuthenticated = (req, res, next) => {
    if (req.user) return next();

    res.redirect("login");
}




