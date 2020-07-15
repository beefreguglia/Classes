const fs = require('fs')
const data = require('../data.json')
const {age, date, ano} = require('../utils')

exports.pagehome = function(req, res){
    
    let stud = []

    for(let index = 1;index < data.students.length+1; index++){

        const foundStudent = data.students.find(function(student){

            return student.id == index

        })
        if (!foundStudent) {

            return res.send("Student not found")
    
        }

        stud.push({

            ...foundStudent,
            ano: ano(foundStudent.ano)
            
        }) 


    }

    return res.render("students/page-home", {students: stud})

}

//Show Pronto
exports.show = function(req, res){

    const { id } = req.params

    const foundStudent = data.students.find(function (student) {

        return student.id == id

    })

    if (!foundStudent) {

        return res.send("Student not found")

    }

    const student = {

        ...foundStudent,
        age: age(foundStudent.birth),
        ano: ano(foundStudent.ano)

    }

    return res.render('students/show', { student })

}

//Post refeito
exports.post = function(req, res){

    const keys = Object.keys(req.body)
    
    for(key of keys){

        if(req.body[key] == ""){

            return res.send('Preencha todos os campos por favor !')

        }

    }

    let {avatar_url, name, birth, email, ano, carga_horaria} = req.body

    birth = Date.parse(req.body.birth)
   
    let id = 1
    const lastStudent = data.students[data.students.length-1]

    if(lastStudent){

        id = lastStudent.id + 1

    }
    data.students.push({

        id,
        name,
        avatar_url,
        birth,
        email,    
        ano,
        carga_horaria

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send("Write Error")

        }

        return res.redirect("/students")

    })

}

exports.create = function(req, res){

    return res.render("students/create")

}

exports.edit = function (req, res) {

    const { id } = req.params

    const foundStudent = data.students.find(function (student) {

        return student.id == id

    })

    if (!foundStudent) {

        return res.send("Student not found")

    }

    const student  = {

        ...foundStudent,
        birth: date(foundStudent.birth)

    }

    return res.render('students/edit', {student})

}

exports.update = function(req, res){

    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){

        if (id == student.id){

            index = foundIndex
            return true

        }

    })

    if (!foundStudent) {

        return res.send("Student not found")

    }

    const student = {

        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)

    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send('Write file ERROR')

        }

        return res.redirect(`/students/${id}`)

    })
}

exports.delete = function(req, res){

    const { id } = req.body

    const filteredStudents = data.students.filter(function(student){

        return student.id != id

    })

    data.students = filteredStudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

        if(err){

            return res.send("Write file ERROR!")

        }

        return res.redirect("/students")

    })

}