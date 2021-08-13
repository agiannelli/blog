const express = require('express')
const router = express.Router()

router.get('/portfolio', (req, res) => {
    res.render('site', {
        title: 'Portfolio',
        pageBody: 'pages/portfolio'
    })
})

router.get('/portfolio/chuck-norris', (req, res) => {
    res.render('site', {
        title: 'Chuck Norris Joke Generator',
        pageBody: 'pages/portfolio/chucknorris'
    })
})

router.get('/portfolio/weather', (req, res) => {
    res.render('site', {
        title: 'Weather App',
        pageBody: 'pages/portfolio/weather'
    })
})

router.get('/portfolio/*', (req, res) => {
    res.render('site', {
        title: '404 - Project Not Found -',
        errorMessage: 'Project article not found.',
        pageBody: '/pages/404'
    })
})

module.exports = router
