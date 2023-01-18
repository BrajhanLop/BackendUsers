const { validationResult } = require('express-validator')
const { check } = require('express-validator')

const validarUser = (req, res, next) => {
const errors = validationResult(req)

if (!errors.isEmpty()) {
    return res.status(400)
    .json({
            ok: false,
            errors: errors.mapped()        
    })
}

next();
}

const crearUsuarioParams = [
    check('name', 'el nombre es requerido').not().isEmpty(),
    check('email', 'el email no debe ser vacio').isEmail(),
    check('password', 'debe tener minimo 6 caracteres').isLength({min: 6})
]

const loginParams = [
    check('email', 'el email no debe ser vacio').isEmail(),
    check('password', 'debe tener minimo 6 caracteres').isLength({min: 6})
]

module.exports = { validarUser, crearUsuarioParams, loginParams }