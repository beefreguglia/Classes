module.exports = {

    age: function (timestamp) {

        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month <= 0 && today.getDate() < birthDate.getDate()) {

            age = age - 1

        }

        return age

    },

    date: function(timestamp){

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`

    },

    graduation: function(grad){

        if(grad == 'EMC'){

            return 'Ensino médio completo'

        }

        if(grad == 'ESC'){

            return 'Ensino superior completo'

        }

        if(grad == 'mestrado'){

            return 'Mestrado'

        }

        if(grad == 'doutorado'){

            return 'Doutorado'

        }

    },

    type: function(type){

        if(type == 'P'){

            return 'Presencial'

        }
        else{

            return 'Á Distância'

        }


    },

    ano: function(ano){

        if(ano == "5"){

            return '5 ano do ensino fundamental'

        }
        if(ano == "6"){

            return '6 ano do ensino fundamental'

        }
        if(ano == "7"){

            return '7 ano do ensino fundamental'

        }
        if(ano == "8"){

            return '8 ano do ensino fundamental'

        }
        if(ano == "1"){

            return '1 ano do ensino médio'

        }
        if(ano == "2"){

            return '2 ano do ensino médio'

        }
        if(ano == "3"){

            return '3 ano do ensino médio'

        }

    }

}