// import express
const { application } = require('express');
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

// pemanggilan koneksi db
// const db = require('./connection/db')

// use express
const app = express()


// request =  client -> server
// response = server -> client

// set default view engine
app.set('view engine', 'hbs');

// static folder
app.use('/public', express.static('public'))

// body parser
app.use(express.urlencoded({ extended: false }))

let month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
]

// get = mengirimkan request, tanpa ada info yang dikirimkan
// post = mengirimkan request, beserta adanya ingfo yang dikirimkan

const projects = [
    {
        title: "Vanitas Vanitatum",
        start: "20-07-2022",
        end: "22-07-2022",
        description: "Sefirot (/sfɪˈroʊt, ˈsfɪroʊt/; Hebrew: סְפִירוֹת səp̄īrōṯ), meaning emanations, are the 10 attributes/emanations in Kabbalah, through which Ein Sof (The Infinite) reveals itself and continuously creates both the physical realm and the chain of higher metaphysical realms (Seder hishtalshelus). The term is alternatively transliterated into English as sephirot/sephiroth, singular sefirah/sephirah, etc.",
        author: "Black Suit",
        posted_at: "07 Juli 2022 17:00 WIB"
    }
]

const isLogin = true

// root endpoint
app.get('/', function (req, res) {
    let title = "Personal Web"
    res.render('index', { title })
})

app.get('/contact', function (req, res) {
    res.render('contact-me')
})

app.get('/project', function (req, res) {

    if (!isLogin) {
        return res.redirect('/')
    }

    res.render('my-project')
})

app.get('/delete-project/:id', function(req, res) {
    let id = req.params.id

    projects.splice(id, 1);
    res.redirect('/list')
})

app.get('/edit-project/:id', function(req, res) {
    let id = req.params.id
    res.render('edit-project', { data: projects[id] })
})

app.post('/edit-project', function(req, res) {
    let id = req.params.id

    function test() {
        edit = edit.map((item, index) => {
            if (index == 0) {
                return {
                    ...item,
                    title: req.body.id,
                    start: req.body.id,
                    end: req.body.id,
                    description: req.body.id,
                    author: req.body.id,
                    posted_at: req.body.id,
                }
            } else {
                return item
            }
        })
        console.log(edit);
    }


    res.redirect('/list')
})

app.get('/detail', function (req, res) {
    res.render('project-detail')
})

app.post('/list', function (req, res) {

    let { title, start, end, description } = req.body
    let date = new Date()

    let project = {
        title,
        start,
        end,
        description,
        author:"Black Suit",
        posted_at: getFullTime(date)
    }

    projects.push(project)

    // console.log(projects);

    res.redirect('/list')
})

app.get('/list', function (req, res) {
    let dataProjects = projects.map(function (data) {
        return {
            ...data,
            isLogin: isLogin
        }
    })

    res.render('project-list', { 
        isLogin, 
        project: dataProjects })
})

app.get('/list/:id', function (req, res) {
    let id = req.params.id

    res.render('project-detail', { data: projects[id] })
})

function getFullTime(time) {

    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hour = time.getHours()
    let minute = time.getMinutes()

    return `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`
}

function getDistanceTime(time) {

    let distance = new Date() - new Date(time)

    let miliseconds = 1000
    let secondInMinutes = 60
    let minuteInHour = 60
    let secondInHour = secondInMinutes * minuteInHour //3600
    let hourInDay = 23

    let dayDistance = distance / (miliseconds * secondInHour * hourInDay)


    if (dayDistance >= 1) {
        const dayDate = Math.floor(dayDistance) + ' day ago'
        return dayDate
    } else {
        let hourDistance = Math.floor(distance / (miliseconds * secondInHour))
        if (hourDistance > 0) {
            return hourDistance + ' hour ago'
        } else {
            let minuteDistance = Math.floor(distance / (miliseconds * secondInMinutes))
            if (minuteDistance > 0) {
                return minuteDistance + ' minute ago'
            } else {
                let secondDistance = Math.floor(distance / miliseconds)
                return secondDistance + ' second ago'
            }
        }
    }
}

// port
const port = 5000
app.listen(port, function () {
    console.log(`server running on port : ${port}`);
})