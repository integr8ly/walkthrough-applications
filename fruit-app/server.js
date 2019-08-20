const express = require('express');
const SocketIO = require('socket.io');
const isValidFruit = require('./util').isValidFruit;
const swaggerSpec = require('./swagger').swaggerSpec;

const fruitStore = [
  { id: 0, name: 'Apple' },
  { id: 1, name: 'Pear' },
  { id: 2, name: 'Orange' }
];

const app = require('express')();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

const server = require('http').createServer(app);

const io = new SocketIO(server);

io.on('connection', () => {
  console.log('new connection established');
});

/**
 * @swagger
 * /api/fruits:
 *   post:
 *     description: create a fruit
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fruit
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *       400:
 *         description: bad input
 */
app.post('/api/fruits', (req, res) => {
  const fruit = req.body || {};
  fruit.id = fruitStore.length;
  if (!isValidFruit(fruit)) {
    res.sendStatus(400);
    return;
  }
  fruitStore[fruit.id] = fruit;
  io.emit('fruit', getFruitStore());
  res.status(201).json(fruit);
});

/**
 * @swagger
 *
 * /api/fruits/{id}:
 *   get:
 *     description: get a fruit
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the fruit
 *         type: string
 *     responses:
 *       200:
 *         description: ok
 *       404:
 *         description: not found
 */
app.get('/api/fruits/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(400);
    return;
  }
  const foundFruit = fruitStore[id];
  if (!foundFruit) {
    res.sendStatus(404);
    return;
  }
  res.json(foundFruit);
});

/**
 * @swagger
 *
 * /api/fruits/{id}:
 *   put:
 *     description: update a fruit
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the fruit
 *         type: string
 *       - name: fruit
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *       400:
 *         description: bad input
 *       404:
 *         description: not found
 */
app.put('/api/fruits/:id', (req, res) => {
  const id = req.params.id;
  const fruit = req.body;
  if (!id) {
    res.sendStatus(400);
    return;
  }
  if (!isValidFruit(fruit)) {
    res.sendStatus(400);
    return;
  }
  if (!fruitStore[id]) {
    res.sendStatus(404);
    return;
  }
  fruitStore[id] = fruit;
  io.emit('fruit', getFruitStore());
  res.json(fruit);
});

/**
 * @swagger
 *
 * /api/fruits/{id}:
 *   delete:
 *     description: delete a fruit
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of the fruit
 *         type: string
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *       400:
 *         description: bad input
 */
app.delete('/api/fruits/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.sendStatus(400);
    return;
  }
  delete fruitStore[id];
  io.emit('fruit', getFruitStore());
  res.sendStatus(200);
});

/**
 * @swagger
 *
 * /api/fruits:
 *   get:
 *     description: list fruit
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: bad input
 */
app.get('/api/fruits', (_, res) => res.json(getFruitStore()));

app.get('/v2/api-docs', (_, res) => res.json(swaggerSpec));

function getFruitStore() {
  return fruitStore.filter(f => !!f);
}

server.listen(process.env.PORT || 8080, () => console.log('Started server'));
