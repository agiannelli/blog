const path = require('path')
const express = require('express')
const hbs = require('hbs')
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')

const userInViews = require('./lib/middleware/userInViews')
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')
const portfolioRouter = require('./routes/portfolio')
const usersRouter = require('./routes/users')

dotenv.config()

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL ||
            'http://localhost:' + port + '/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile)
    }
)

passport.use(strategy)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

const app = express()
const port = process.env.PORT || 723

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../views/pages')
const partialsPath = path.join(__dirname, '../views/partials')

// Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// config express-session
var sess = {
    secret: 'CHANGE THIS SECRET',
    cookie: {},
    resave: false,
    saveUninitialized: true
}

if (app.get('env') === 'production') {
    // If you are using a hosting provider which uses a proxy (eg. Heroku),
    // comment in the following app.set configuration command
    //
    // Trust first proxy, to prevent "Unable to verify authorization request state."
    // errors with passport-auth0.
    // Ref: https://github.com/auth0/passport-auth0/issues/70#issuecomment-480771614
    // Ref: https://www.npmjs.com/package/express-session#cookiesecure
    app.set('trust proxy', 1)

    sess.cookie.secure = true // serve secure cookies, requires https
}

app.use(session(sess))

app.use(passport.initialize())
app.use(passport.session())

// Setup static directory to serve
app.use(express.static(publicDir))

app.use(userInViews())
app.use('/', authRouter)
app.use('/', indexRouter)
app.use('/', portfolioRouter)
app.use('/', apiRouter)
app.use('/', usersRouter)

// wildcard to redirect to 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Page Not Found',
        errorMessage: 'Page not found.'
    })
})

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
