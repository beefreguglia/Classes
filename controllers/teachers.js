const fs = require('fs')
const data = require('../data.json')
const {age, date, graduation, type} = require('../utils')

exports.pagehome = function(req, res){
    
    let teach = []

    for(let index = 1;index < data.teachers.length+1; index++){

        const foundTeacher = data.teachers.find(function(teacher){

            return teacher.id == index

        })
        if (!foundTeacher) {

            return res.send("Teacher not found")
    
        }

        teach.push({

            ...foundTeacher,
            subjects: foundTeacher.subjects.split(",")
            

        }) 


    }

    return res.render("teachers/page-home", {teachers: teach})

}

exports.show = function(req, res){

    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {

        return teacher.id == id

    })

    if (!foundTeacher) {

        return res.send("Teacher not found")

    }

    const teacher = {

        ...foundTeacher,
        age: age(foundTeacher.birth),
        grau_escolaridade: graduation(foundTeacher.grau_escolaridade),
        type: type(foundTeacher.type),
        subjects: foundTeacher.subjects.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)


    }

    return res.render('teachers/show', { teacher })

}

exports.post = function(req, res){

    const keys = Object.keys(req.body)
    
    for(key of keys){

        if(req.body[key] == ""){

            return res.send('Preencha todos os campos por favor !')

        }

    }

    let {avatar_url, name, birth, grau_escolaridade, type, subjects} = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({

        id,
        name,
        avatar_url,
        birth,
        grau_escolaridade,    
        type,
        subjects,
        created_at

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send("Write Error")

        }

        return res.redirect("/teachers")

    })

}

exports.create = function(req, res){

    return res.render("teachers/create")

}

exports.edit = function (req, res) {

    const { id } = req.params

    const foundTeacher = data.teachers.find(function (teacher) {

        return teacher.id == id

    })

    if (!foundTeacher) {

        return res.send("Teacher not found")

    }

    const teacher  = {

        ...foundTeacher,
        birth: date(foundTeacher.birth)

    }

    return res.render('teachers/edit', {teacher})

}

exports.update = function(req, res){

    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){

        if (id == teacher.id){

            index = foundIndex
            return true

        }

    })

    if (!foundTeacher) {

        return res.send("Teacher not found")

    }

    const teacher = {

        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send('Write file ERROR')

        }

        return res.redirect(`/teachers/${id}`)

    })
}

exports.delete = function(req, res){

    const { id } = req.body

    const filteredTeachers = data.teachers.filter(function(teacher){

        return teacher.id != id

    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send("Write file ERROR!")

        }

        return res.redirect("/teachers")

    })

}