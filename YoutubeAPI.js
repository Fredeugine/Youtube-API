const express = require('express')
const cors = require('cors')

const app= express()
const port = 8000

//applying CORS middleware to the API to prevent requests to different domains
app.use(cors())
app.use(express.json())

// Handlers
 var currentID = 1
 var currentID2 = 1
var history = []
var bookmarks = []
//List all history videos
app.get('/history', (req,res)=>{

    const uniqueUrls = new Set();
    const uniqueHistory = [];
// check for duplicates in history urls
    for (const video of history) {
        if (!uniqueUrls.has(video.url)) {
            uniqueUrls.add(video.url);
            uniqueHistory.push(video);
        }
    }
//set history to a new array without duplications
    history = uniqueHistory;
    res.json(history)
})

// add a watched video to history
app.post('/history', (req,res)=>{
    var {url} = req.body
    history.push({
        id: currentID,
        url: url
    })
    currentID++
    res.json(history)
})
app.get('/bookmarks', (req,res)=>{

    const uniqueUrls = new Set();
    const uniqueBookmarks = [];

// check for duplicates in history urls
    for (const video of bookmarks) {
        if (!uniqueUrls.has(video.url)) {
            uniqueUrls.add(video.url);
            uniqueBookmarks.push(video);
        }
    }
//set bookmarks to a new array without duplications
    bookmarks = uniqueBookmarks;
    res.json(bookmarks)
})

// add a watched video to bookmarks
app.post('/bookmarks', (req,res)=>{
    var {url} = req.body
    bookmarks.push({
        id: currentID2,
        url: url
    })
    currentID2++
})

app.listen(port,()=>{
    console.log('Backend server started on port ' + port)
})
