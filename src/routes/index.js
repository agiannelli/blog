const express = require('express')
const router = express.Router()

router.get('', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

router.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog'
    })
})

router.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Admin'
    })
})

module.exports = router
