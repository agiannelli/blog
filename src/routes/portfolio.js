const express = require('express')
const router = express.Router()

router.get('/portfolio', (req, res) => {
    res.render('portfolio', {})
})

router.get('/portfolio/chuck-norris', (req, res) => {
    res.render('portfolio/chuck-norris', {})
})

router.get('/portfolio/weather', (req, res) => {
    res.render('portfolio/weather', {})
})

router.get('/portfolio/*', (req, res) => {
    res.render('404', {
        title: '404 - Project Not Found -',
        errorMessage: 'Project article not found.'
    })
})

module.exports = router
