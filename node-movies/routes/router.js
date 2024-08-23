const express = require('express')
const router = express.Router()

router.use(express.static('public'))

router.use('/movies', require('./api/moviesRoutes'))

// localhost:3000
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'My Movies App',
        name: 'My Movie App'
    })
})

// Error page
router.get('*', (req, res)=> {
    if(req.url === '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error',
            name: '404 Error'
        })
    }
})
