const { json } = require('express');
const Usuario = require('../models/usuario.model')
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const allUsuarios = async (req, res) => {
try {
    
    const usuarios = await Usuario.find({})
    
    res.status(200).json({
        ok: true,
        data: usuarios
    })

} catch (error) {
    console.log(error);
}
}


const crearUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {

        let usuariobuscado = await Usuario.findOne({ email })

        if (usuariobuscado) {
            return res.status(400).json({
                ok: false,
                msg: 'un usuario existe en ese correo'
            })
        }

        
        const usuario = new Usuario(req.body)
        // encriptamos
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save();

        res.json({
            ok: true,
            msg: "registro",
            uid: usuario.id,
            name: usuario.name

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador del sistema'
        })
    }



}

const actualizarUsuario = async(req, res) => {
const {id} = req.params;

const userbuscado = await Usuario.findByIdAndUpdate({_id: id}, req.body)

res.status(201).json(
    {
        ok: true,
        msg: 'usuario actualizado'
    }
)

}

const eliminarUsuario = async(req, res) => {
    const {id} = req.params;
    const userbuscado = await Usuario.findByIdAndUpdate({_id: id}, {status:'deleted'})
    res.status(201).json(
        {
            ok: true,
            msg: 'usuario eliminado correctamente'
        }
    )
}

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        let usuariobuscado = await Usuario.findOne({ email })

        if (!usuariobuscado) {
            return res.status(400).json({
                ok: false,
                msg: 'el usuario no existe con ese email'
            })
        }

        // confirmar password
        const validPassword = bcrypt.compareSync(password, usuariobuscado.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            })
        }

        const token = await generarJWT(usuariobuscado.id, usuariobuscado.name)

        res.json({
            ok: true,
            uid: usuariobuscado.id,
            name: usuariobuscado.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador del sistema'
        })
    }
}

const logout = (req, res) => {
    res.json({
        ok: 'logout'
    })
}



module.exports = { crearUsuario, login, logout, allUsuarios, actualizarUsuario,eliminarUsuario  }