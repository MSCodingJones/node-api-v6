const express = require('express')
const router = express.Router()

const { profileDao: dao } = require('../../daos/dao')

// localhost:3000/api/user
router.get('/', (req, res)=> {
    dao.findAll(res, dao.table)
})

// localhost:3000/api/user/sort
router.get('/sort', (req, res)=> {
    dao.sort(res, dao.table)
})

// localhost:3000/api/user/:id
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

router.post('/create', (req, res)=> {
   dao.create(req, res, dao.table)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res)
})

module.exports = router