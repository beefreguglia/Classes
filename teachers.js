const fs = require('fs')
const data = require('./data.json')

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