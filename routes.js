const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req,res){

    return res.redirect('/teachers')
})

routes.get('/teachers', function(req, res){

    return res.render("teachers/page-home")

})

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/:id/edit', teachers.edit)

routes.get('/teachers/create', function(req, res){

    return res.render("teachers/create")

})

routes.post('/teachers', teachers.post)

module.exports = routes