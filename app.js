const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'ducekproject.cnway0a4kqcb.us-east-2.rds.amazonaws.com',
  user: 'adminkevin',
  password: '<R4ns0mw4r3>',
  database: 'ducekDB',
  port: 3306
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

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

//--------------------------------------------------------------------------------------------------------------------------------------------
//                                              Metodos para agregar en la base de datos :)
//--------------------------------------------------------------------------------------------------------------------------------------------

app.post('/usuarios', (req, res) => {
    const datosUsuario = req.body;
  
    const requiredFields = ['nombre', 'apellidos', 'telefono', 'correoElectronico', 'contraseña', 'fechaDeNacimiento', 'genero'];
    for (const field of requiredFields) {
      if (!(field in datosUsuario)) {
        return res.status(400).json({ error: `El campo ${field} es requerido` });
      }
    }
  
    connection.query('INSERT INTO Usuario SET ?', datosUsuario, (error, results) => {
      if (error) {
        console.error('Error al agregar usuario:', error);
        return res.status(500).json({ error: 'Error al agregar usuario' });
      }
      res.status(201).json({ id: results.insertId, message: 'Usuario agregado correctamente' });
    });
});
//metodo unicamente para agregar informacion en los apartados de tarjeta de la tabla de usuarios
app.put('/usuarios/:correoElectronico/tarjeta', (req, res) => {
    const correoElectronico = req.params.correoElectronico;
    const { numeroDetarjeta, tipoTarjeta, fechaDeVencimiento, cvv } = req.body;
  
    const actualizarQuery = 'UPDATE Usuario SET numeroDetarjeta = ?, tipoTarjeta = ?, fechaDeVencimiento = ?, cvv = ? WHERE correoElectronico = ?';
  
    connection.query(actualizarQuery, [numeroDetarjeta, tipoTarjeta, fechaDeVencimiento, cvv, correoElectronico], (error, results) => {
        if (error) {
            console.error('Error al actualizar los datos de la tarjeta:', error);
            res.status(500).json({ error: 'Error al actualizar los datos de la tarjeta' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: 'Tarjeta actualizada correctamente' });
    });
});
//
app.post('/servicio', (req, res) => {
    const datosServicio = req.body;

    const requiredFields = ['tipoDeServicio','descripcion','tariaPorHora','maquinariaRequerida'];
    for(const field of requiredFields){
        if(!(field in datosServicio)){
            return res.status(400).json({error: `El campo ${field} es requerido`});
        }
    }
    connection.query(`INSERT INTO Servicio SET ?`, datosServicio, (error, results) => {
        if(error){
            console.error('Error al agregar un servicio:', error);
            return res.status(500).json({error: 'Error al agregar un servicio'});
        }
        res.status(201).json({id:results.insertId,message: 'Servicio agregado correctamente'});
    })
});
//
app.post('/maquinaria', (req, res) => {
    const datosMaquinaria = req.body;

    const requiredFields = ['nombre', 'tipo', 'descripcion'];
    for (const field of requiredFields) {
        if (!(field in datosMaquinaria)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Maquinaria SET ?`, datosMaquinaria, (error, results) => {
        if (error) {
            console.error('Error al agregar maquinaria:', error);
            return res.status(500).json({ error: 'Error al agregar maquinaria' });
        }
        res.status(201).json({ id: results.insertId, message: 'Maquinaria agregada correctamente' });
    });
});
//
app.post('/mensaje', (req, res) => {
    const datosMensaje = req.body;

    const requiredFields = ['idUsuario', 'mensaje'];
    for (const field of requiredFields) {
        if (!(field in datosMensaje)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Mensaje SET ?`, datosMensaje, (error, results) => {
        if (error) {
            console.error('Error al agregar mensaje:', error);
            return res.status(500).json({ error: 'Error al agregar mensaje' });
        }
        res.status(201).json({ id: results.insertId, message: 'Mensaje agregado correctamente' });
    });
});
//
app.post('/trabajador', (req, res) => {
    const datosTrabajador = req.body;

    const requiredFields = ['discapacidad', 'identificacionOficianINE', 'codigoPostal', 'estado', 'ciudad', 'calle', 'numero', 'idUsuario'];
    for (const field of requiredFields) {
        if (!(field in datosTrabajador)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Trabajador SET ?`, datosTrabajador, (error, results) => {
        if (error) {
            console.error('Error al agregar trabajador:', error);
            return res.status(500).json({ error: 'Error al agregar trabajador' });
        }
        res.status(201).json({ id: results.insertId, message: 'Trabajador agregado correctamente' });
    });
});
//
app.post('/productos', (req, res) => {
    const datosProducto = req.body;

    const requiredFields = ['nombre', 'descripcion'];
    for (const field of requiredFields) {
        if (!(field in datosProducto)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Productos SET ?`, datosProducto, (error, results) => {
        if (error) {
            console.error('Error al agregar producto:', error);
            return res.status(500).json({ error: 'Error al agregar producto' });
        }
        res.status(201).json({ id: results.insertId, message: 'Producto agregado correctamente' });
    });
});

app.post('/producto-trabajador', (req, res) => {
    const datosProductoTrabajador = req.body;

    const requiredFields = ['idProducto', 'idTrabajador', 'estado'];
    for (const field of requiredFields) {
        if (!(field in datosProductoTrabajador)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO ProductoTrabajador SET ?`, datosProductoTrabajador, (error, results) => {
        if (error) {
            console.error('Error al agregar relación producto-trabajador:', error);
            return res.status(500).json({ error: 'Error al agregar relación producto-trabajador' });
        }
        res.status(201).json({ id: results.insertId, message: 'Relación producto-trabajador agregada correctamente' });
    });
});

app.post('/oficinas', (req, res) => {
    const datosOficina = req.body;

    const requiredFields = ['nombre', 'codigoPostal', 'ciudad', 'colonia', 'calle', 'telefono'];
    for (const field of requiredFields) {
        if (!(field in datosOficina)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Oficinas SET ?`, datosOficina, (error, results) => {
        if (error) {
            console.error('Error al agregar oficina:', error);
            return res.status(500).json({ error: 'Error al agregar oficina' });
        }
        res.status(201).json({ id: results.insertId, message: 'Oficina agregada correctamente' });
    });
});

app.post('/maquinaria-oficina', (req, res) => {
    const datosMaquinariaOficina = req.body;

    const requiredFields = ['idMaquinaria', 'idOficina', 'estado'];
    for (const field of requiredFields) {
        if (!(field in datosMaquinariaOficina)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO MaquinariaOficina SET ?`, datosMaquinariaOficina, (error, results) => {
        if (error) {
            console.error('Error al agregar relación maquinaria-oficina:', error);
            return res.status(500).json({ error: 'Error al agregar relación maquinaria-oficina' });
        }
        res.status(201).json({ id: results.insertId, message: 'Relación maquinaria-oficina agregada correctamente' });
    });
});

app.post('/producto-oficina', (req, res) => {
    const datosProductoOficina = req.body;

    const requiredFields = ['idProducto', 'idOficina', 'estado'];
    for (const field of requiredFields) {
        if (!(field in datosProductoOficina)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO ProductoOficina SET ?`, datosProductoOficina, (error, results) => {
        if (error) {
            console.error('Error al agregar relación producto-oficina:', error);
            return res.status(500).json({ error: 'Error al agregar relación producto-oficina' });
        }
        res.status(201).json({ id: results.insertId, message: 'Relación producto-oficina agregada correctamente' });
    });
});

app.post('/administradores', (req, res) => {
    const datosAdministrador = req.body;

    const requiredFields = ['nombreDeUsuarioAd', 'nombre', 'apellido', 'correoElectronico', 'telefono', 'contraseña', 'estadodeLaCuenta'];
    for (const field of requiredFields) {
        if (!(field in datosAdministrador)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Administradores SET ?`, datosAdministrador, (error, results) => {
        if (error) {
            console.error('Error al agregar administrador:', error);
            return res.status(500).json({ error: 'Error al agregar administrador' });
        }
        res.status(201).json({ id: results.insertId, message: 'Administrador agregado correctamente' });
    });
});

app.post('/administrador-oficina', (req, res) => {
    const datosAdministradorOficina = req.body;

    const requiredFields = ['idAdministrador', 'idOficina'];
    for (const field of requiredFields) {
        if (!(field in datosAdministradorOficina)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO AdministradorOficina SET ?`, datosAdministradorOficina, (error, results) => {
        if (error) {
            console.error('Error al asignar administrador a oficina:', error);
            return res.status(500).json({ error: 'Error al asignar administrador a oficina' });
        }
        res.status(201).json({ id: results.insertId, message: 'Administrador asignado a oficina correctamente' });
    });
});

app.post('/autos', (req, res) => {
    const datosAuto = req.body;

    const requiredFields = ['modelo', 'marca', 'placas', 'color', 'idUsuario'];
    for (const field of requiredFields) {
        if (!(field in datosAuto)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Auto SET ?`, datosAuto, (error, results) => {
        if (error) {
            console.error('Error al agregar auto:', error);
            return res.status(500).json({ error: 'Error al agregar auto' });
        }
        res.status(201).json({ id: results.insertId, message: 'Auto agregado correctamente' });
    });
});

app.post('/reservas', (req, res) => {
    const datosReserva = req.body;

    const requiredFields = ['idUsuario', 'fecha', 'hora', 'estadoDeLaReserva', 'detallesDelServicio', 'codigoPostal', 'ciudad', 'colonia', 'calle', 'idAuto', 'idServicio'];
    for (const field of requiredFields) {
        if (!(field in datosReserva)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO Reserva SET ?`, datosReserva, (error, results) => {
        if (error) {
            console.error('Error al agregar reserva:', error);
            return res.status(500).json({ error: 'Error al agregar reserva' });
        }
        res.status(201).json({ id: results.insertId, message: 'Reserva agregada correctamente' });
    });
});

app.post('/reserva-maquinaria', (req, res) => {
    const datosReservaMaquinaria = req.body;

    const requiredFields = ['idMaquinaria', 'idReserva'];
    for (const field of requiredFields) {
        if (!(field in datosReservaMaquinaria)) {
            return res.status(400).json({ error: `El campo ${field} es requerido` });
        }
    }

    connection.query(`INSERT INTO ReservaMaquinaria SET ?`, datosReservaMaquinaria, (error, results) => {
        if (error) {
            console.error('Error al agregar reserva de maquinaria:', error);
            return res.status(500).json({ error: 'Error al agregar reserva de maquinaria' });
        }
        res.status(201).json({ id: results.insertId, message: 'Reserva de maquinaria agregada correctamente' });
    });
});
