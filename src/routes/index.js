const express = require('express')
const router = express.Router()

router.get('', (req, res) => {
    res.render('site', {
        title: 'Home',
        pageBody: 'pages/home'
    })
})

router.get('/about', (req, res) => {
    res.render('site', {
        title: 'About',
        pageBody: 'pages/about'
    })
})

router.get('/blog', (req, res) => {
    res.render('site', {
        title: 'Blog',
        pageBody: 'pages/blog'
    })
})

router.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Admin',
        pageBody: 'pages/admin'
    })
})

module.exports = router
