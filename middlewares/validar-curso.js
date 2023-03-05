const { request, response } = require('express');


//Operador rest u operador spread 
const tieneCurso = ( ...cursos ) => {

    return (req = request, res= response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el curso sin validar el token primero'
            })
        }

        if (!cursos.includes( req.usuario.curso)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos cursos: ${ cursos }`
            })

        }

        next();

    }

}


module.exports = {
    tieneCurso
}