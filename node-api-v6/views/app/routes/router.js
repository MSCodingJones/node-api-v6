const express = require('express')
const router = express.Router()
const PORT =process.env.PORT || 3000
const fetch =(...args)=> import('node-fetch').then(({ default:fetch}) => fetch(...args))

// const colorSwitch = require('../../public/js/app')
router.use(express.static('public'))

// created an array of tables inside of database
const tables = ['album', 'artist', 'band', 'label', 'genre']

// Root Route => localhost:3000/api
router.get('/api', (req, res)=> {
    res.json({
        'Albums': `http://localhost:${PORT}/api/album`,
        'Artists': `http://localhost:${PORT}/api/artist`,
        'Bands': `http://localhost:${PORT}/api/band`,
        'Genres': `http://localhost:${PORT}/api/genre`,
        'Labels': `http://localhost:${PORT}/api/label`
    })
})


// loop through tables array and build router.use()
tables.forEach(table => {
    router.use(`/api/${table}`, require(`./api/${table}Routes`))
})

let albumCount;

fetch(`http://localhost:${PORT}/api/album/count`)
    .then(res => res.json())
    .then(data => {
        albumCount = data.count
    })


let genreInfo
fetch(`http://localhost:${PORT}/api/genre/sort`)
    .then(res => res.json())
    .then(data => {
        genreInfo = data
    })
  
 
    
// localhost:3000
router.get('/', (req, res)=> {

    const url = `http://localhost:${PORT}/api/album`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let idx = Math.floor(Math.random() * data.length)
            const randomImage = data[idx].album_cover
            const albumTitle = data[idx].title
            const albumId = data[idx].album_id
            res.render('pages/home', {
                title: 'Home',
                name: 'My Album Database',
                data,
                id: albumId,
                image: randomImage,
                albumTitle: albumTitle
            })
        
        })
})

// loop through array and build ALL routes and render ALL pages
tables.forEach(table => {
    router.get(`/${table}`, (req, res)=> {
        const url = `http://localhost:${PORT}/api/${table}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                res.render(`pages/${table}`, {
                    title: `All ${table}s`,
                    name: `${table}s`,
                    genreInfo,
                    data
                })
            })
    }) 

    router.get(`/${table}/sort`, (req, res)=> {
        const url = `http://localhost:${PORT}/api/${table}/sort`

         fetch(url)
            .then(res => res.json())
            .then(data => {
                res.render(`pages/${table}`, {
                    title: `All ${table}s`,
                    name: `${table}s`,
                    data,
                    genreInfo
                })
            })
    })
})

router.get('/artist/form', (req, res)=> {
    res.render('pages/artist_form', {
        title: 'Artist Form',
        name: 'Artist Form'
    })
})

router.get('/artist/:id', (req, res)=> {

    const id = req.params.id
    const url = `http://localhost:${PORT}/api/artist/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {

        // refactored to get info correctly
        const artist = data[0].alias == '' ? `${data[0].fName} ${data[0].lName}` : `${data[0].alias}`
        res.render('pages/artist_single', {
            title: artist,
            name: artist,
            data,
            genreInfo
        })
    })

})

router.get('/band/:id', (req, res)=> {

    const id = req.params.id
    const url = `http://localhost:${PORT}/api/band/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {

        res.render('pages/band_single', {
            title: `${data[0].band}`,
            name: `${data[0].band}`,
            data,
            genreInfo
        })
    })

})
router.get('/artist/form', (req, res)=> {
    res.render('pages/artist_form', {
        title: 'Artist Form',
        name: 'Artist Form'
    })
})

router.get('/album/:id', (req, res)=> {

    const id = req.params.id
    const url = `http://localhost:${PORT}/api/album/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/album_single', {
                title: `${data.title}`,
                name: `${data.title}`,
                data,
                count: albumCount,
                genreInfo
            })
        })
})

router.get('/label/:id', (req, res)=> {

    const id = req.params.id
    const url = `http://localhost:${PORT}/api/label/${id}`

    fetch(url)
        .then(res=> res.json())
        .then(data => {

            let label = data[0].label
            res.render('pages/label_single', {
                title: label,
                name: label,
                data,
                genreInfo
            })
       })
})

router.get('/genre/:id', (req, res)=> {

    const id = req.params.id
    const url = `http://localhost:${PORT}/api/genre/${id}`

    fetch(url)
        .then(res=> res.json())
        .then(data => {
            res.render('pages/genre_single', {
                title: `${data[0].genre}`,
                name: `${data[0].genre}`,
                data,
                genreInfo
            })
       })
})

// router.post('/artistProcess', (req, res)=> {
//    console.log(req.body)

//    res.render('pages/process-page', {
//       title: 'Process Page',
//        name: 'Process Page'
//    })
// })


router.get('*', (req, res)=> {
    if (req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 error',
            name: '404 Error'
        })    
    }
})

module.exports = router