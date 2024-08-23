const express = require('express')
const router = express.Router()

// localhost:3000/api/genre

// Destructure genreDao
const { genreDao: dao } = require('../../daos/dao')

// localhost:3000/api/genre
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

// localhost:3000/api/genre/count
router.get('/count', (req, res)=> {
    dao.countAll(res, dao.table)
})

router.get('/sort', (req, res)=> {
    dao.sort(req, res, dao.table)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

router.post('/create', (req, res)=> {
    dao.update(req, res)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res)
})

module.exports = router