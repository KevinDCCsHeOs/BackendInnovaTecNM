const express = require('express');
const app = express();

const usuariosRouter = require('./usuarios');
const adminitradorRouter = require('./administradores');
const administradorOficinaRouter = require('./administradorOficina');
const autoRouter = require('./auto');
const maquinariaRouter = require('./maquinaria');
const maquinariaOficinaRouter = require('./maquinariaOficina');
const mensajeRouter = require('./mensaje');
const oficinasRouter = require('./oficinas');
const productoOficinaRouter = require('./productoOficina');
const productosRouter = require('./productos');
const productoTrabajadorRouter = require('./productoTrabajador');
const reservaRouter = require('./reserva');
const reservaMaquinariaRouter = require('./reservaMaquinaria');
const serviciosRouter = require('./servicios');
const trabajadorRouter = require('./trabajador');

app.use('/usuarios', usuariosRouter);
app.use('/administradores', adminitradorRouter);
app.use('/administradorOficina', administradorOficinaRouter);
app.use('/auto',autoRouter);
app.use('/maquinaria',maquinariaRouter);
app.use('/maquinariaOficina',maquinariaOficinaRouter);
app.use('/mensaje',mensajeRouter);
app.use('/oficinas',oficinasRouter);
app.use('/productoOficina',productoOficinaRouter);
app.use('/productos',productosRouter);
app.use('/productoTrabajador',productoTrabajadorRouter);
app.use('/reserva',reservaRouter);
app.use('/reservaMaquinaria',reservaMaquinariaRouter);
app.use('/servicios',serviciosRouter);
app.use('/trabajadorRouter',trabajadorRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});