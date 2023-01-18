//!01. importamos
const express = require('express');
const { dbConnection } = require('./database/config');
const { routesUser } = require('./routes/authusuarios.routes');
const cors = require('cors');
require('dotenv').config();

//!02. inicializamos
const app = express();

app.use(cors());
// base de datos
dbConnection();

// aqui redireccionamos el index.html para el caso '/
app.use( express.static('public') );

app.use(express.json())

// las rutas
app.use('/api/auth',routesUser)



//!05. escuchamos
app.listen(process.env.PORT, ()=>{
    console.log('servidor corriendos');
})

