const { Router } = require('express')
const { crearUsuario, login, logout, allUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/authusuarios.controllers')
const { validarUser, crearUsuarioParams, loginParams } = require('../middleware/userValidator.middleware')

const routesUser = Router()



routesUser.post('/register',
    crearUsuarioParams,
    validarUser,
    crearUsuario)

routesUser.get('/', allUsuarios)

routesUser.post('/login', loginParams, validarUser, login)

routesUser.patch('/update/:id', actualizarUsuario)

routesUser.delete('/delete/:id',eliminarUsuario )

routesUser.get('/logout', logout)


module.exports = { routesUser }