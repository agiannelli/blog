const express = require('express')
const secured = require('../lib/middleware/secured')
const router = express.Router()

/* GET user profile. */
router.get('/admin/user', secured(), function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user
    res.render('admin', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Profile page',
        pageBody: 'pages/admin/user'
    })
})

router.get('/admin/post', secured(), function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user
    res.render('admin', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Add Post',
        pageBody: 'pages/admin/post'
    })
})

module.exports = router
