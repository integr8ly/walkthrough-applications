const io = require('socket.io-client');

fetch('/api/fruits')
  .then(resp => resp.json())
  .then(fruit => refreshList(fruit))
  .then(() => {
    const socket = io();

    socket.on('fruit', (fruitList) => {
      refreshList(fruitList);
    });
  });

function handleCreateFruit(e) {
  e.preventDefault();

  const fruitNameElem = document.getElementById('fruitInput');
  const fruitName = fruitNameElem.value;

  fetch('/api/fruits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: fruitName })
  });

  fruitNameElem.value = '';

  return false;
}

const fruitForm = document.getElementById('fruitForm');
fruitForm.addEventListener('submit', handleCreateFruit);

function buildFruitElem(fruit) {
  const fruitElem = document.createElement('tr');
  const fruitIDElem = document.createElement('td');
  fruitIDElem.setAttribute('data-label', 'ID');
  fruitIDElem.textContent = fruit.id;
  const fruitNameElem = document.createElement('td');
  fruitNameElem.setAttribute('data-label', 'Name');
  fruitNameElem.textContent = fruit.name;

  const fruitActionElem = document.createElement('td');
  fruitActionElem.setAttribute('data-label', 'Actions');
  deleteElem = document.createElement('i');
  deleteElem.className = 'fa fa-trash';
  deleteElem.style = 'font-size:25px;color:#C9190B;'
  deleteElem.onclick = deleteFruit.bind(null, fruit.id);
  fruitActionElem.appendChild(deleteElem);

  fruitElem.appendChild(fruitIDElem);
  fruitElem.appendChild(fruitNameElem);
  fruitElem.appendChild(fruitActionElem);
  console.log('build')

  return fruitElem;
}

function deleteFruit(fruitID) {
  fetch(`/api/fruits/${fruitID}`, {
    method: 'DELETE'
  });
}

function refreshList(fruitList) {
  const fruitListElem = document.getElementById('fruitList');
  const fruitElems = fruitList.map(f => buildFruitElem(f));
  // remove existing children
  while (!!fruitListElem.firstChild) {
    fruitListElem.removeChild(fruitListElem.firstChild);
  }
  fruitElems.forEach(e => fruitListElem.appendChild(e));
}
