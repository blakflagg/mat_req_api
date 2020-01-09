const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/index');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
},
    (username, password, done) => {
        try {
            console.log('in passport');
            db.User.findOne({
                where: {
                    email_address: username
                },
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'bad email' });
                } else {
                    if (user.validatePassword(password)) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'bad password' });
                    }
                }
            })
        } catch (err) {
            done(err);
        }
    }
)
);
