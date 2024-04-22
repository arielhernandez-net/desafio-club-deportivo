const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const file = 'deportes.json';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(__dirname + '/public/index.html');
  });

app.get('/deportes', (req, res) => {
    const deportes = jsonfile.readFileSync(file);
    res.json(deportes);
  });

app.post('/agregar', (req, res) => {
    const { nombre, precio } = req.body;
    const deportes = jsonfile.readFileSync(file);
    deportes.push({ nombre, precio });
    jsonfile.writeFileSync(file, deportes);
    res.json({ message: 'Deporte agregado con éxito' });
  });

app.put('/editar/:nombre', (req, res) => {
  const { nombre } = req.params;
  const { precio } = req.body;
  const deportes = jsonfile.readFileSync(file);
  const index = deportes.findIndex(deporte => deporte.nombre === nombre);
  if (index !== -1) {
    deportes[index].precio = precio;
    jsonfile.writeFileSync(file, deportes);
    res.json({ message: 'Deporte editado con éxito' });
  } else {
    res.status(404).json({ message: 'Deporte no encontrado' });
  }
});

app.delete('/eliminar/:nombre', (req, res) => {
  const { nombre } = req.params;
  const deportes = jsonfile.readFileSync(file);
  const index = deportes.findIndex(deporte => deporte.nombre === nombre);
  if (index !== -1) {
    deportes.splice(index, 1);
    jsonfile.writeFileSync(file, deportes);
    res.json({ message: 'Deporte eliminado con éxito' });
  } else {
    res.status(404).json({ message: 'Deporte no encontrado' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});