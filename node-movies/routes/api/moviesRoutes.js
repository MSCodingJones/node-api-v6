const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', (req, res)=> {

    axios.get('https://api.sampleapis.com/movies/movies')
        .then(resp => {
            res.render('pages/all', {
                title: 'All Movies',
                name: 'All Movies',
                data: resp.data
            })
        })
})

router.get('/:id', (req, res)=> {

    const id = req.params.id 

    axios.get(`https://api.sampleapis.com/movies/movies/${id}`)
        .then(resp => {
            res.render('pages/single', {
                title: resp.data.title,
                name: resp.data.title,
                data: resp.data
            })
        })
})

module.exports = router