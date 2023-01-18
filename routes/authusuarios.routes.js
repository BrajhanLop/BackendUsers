const { Router } = require('express')
const { crearUsuario, login, logout } = require('../controllers/authusuarios.controllers')
const { validarUser, crearUsuarioParams, loginParams } = require('../middleware/userValidator.middleware')

const routesUser = Router()

routesUser.post('/register',
    crearUsuarioParams,
    validarUser,
    crearUsuario)


routesUser.post('/login', loginParams, validarUser, login)


routesUser.get('/logout', logout)


module.exports = { routesUser }