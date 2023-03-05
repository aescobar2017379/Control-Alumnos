const { request, response } = require('express');


//Operador rest u operador spread 
const tieneRole = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}

const esMaestroRole = (req = request, res = response, next) => {
    //Si no viene el usuario    
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }
    //Verificar que el rol sea ADMIN_ROLE    
    const { rol, nombre } = req.usuario;
    if (rol !== 'ROL_MAESTRO') {
        return res.status(500).json({
            msg: `${nombre} no es profesor - No tiene acceso a esta funcion`
        });
        
    }
    next();
}

const esAlumnoRole = (req = request, res = response, next) => {
    //Si no viene el usuario    
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se requiere verificar el role sin validar el token primero'
        });
    }
    //Verificar que el rol sea ADMIN_ROLE    
    const { rol, nombre } = req.usuario;
    if (rol !== 'ROL_ALUMNO') {
        return res.status(500).json({
            msg: `${nombre} no es profesor - No tiene acceso a esta funcion`
        });
        
    }
    next();
}

const rolCursoValido = ( ...roles ) => {

    return (req = request, res= response, next) => {
        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}

module.exports = {
    tieneRole,
    rolCursoValido,
    esMaestroRole,
    esAlumnoRole
}