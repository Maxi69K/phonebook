// main three buttons
const conBtn = document.querySelector('#conBtn');
const addConBtn = document.querySelector('#addConBtn');
const editDelBtn = document.querySelector('#editDelBtn');
// mainView
const mainView = document.querySelector('#mainView');
const mainBody = document.querySelector('#mainBody');
// formView
const formView = document.querySelector('#formView');
const conName = document.querySelector('#conName');
const conNamber = document.querySelector('#conNamber');
const conNamber2 = document.querySelector('#conNamber2');
const conNamber3 = document.querySelector('#conNamber3');
const conEmail = document.querySelector('#conEmail');
const saveBtn = document.querySelector('#saveBtn');
// editFormView
const editFormView = document.querySelector('#editFormView');
const econName = document.querySelector('#econName');
const econNamber = document.querySelector('#econNamber');
const econNamber2 = document.querySelector('#econNamber2');
const econNamber3 = document.querySelector('#econNamber3');
const econEmail = document.querySelector('#econEmail');
const editBtn = document.querySelector('#editBtn');
// editView
const editView = document.querySelector('#editView');
const editBody = document.querySelector('#editBody');
// search
const search = document.querySelector('#search');
// id
let id;
// db
let db = [];

// EventListener
addConBtn.addEventListener('click', showForm);
conBtn.addEventListener('click', showMainView);
saveBtn.addEventListener('click', saveContact);
editDelBtn.addEventListener('click', showEditView);
editBtn.addEventListener('click', changeContact);
search.addEventListener("keyup", searchContact);

createTable();

// functions
function searchContact() {
    const filter = search.value.toUpperCase();
    let tr;
    if (localStorage.getItem('db') != false) {
        for (let i = 0; i < db.length; i++) {
            tr = mainBody.getElementsByTagName('tr')[i];
            td = tr.getElementsByTagName('td')[0];
            if (td.textContent.toUpperCase().indexOf(filter) > -1) {
                tr.style.display = '';
            } else {
                tr.style.display = 'none';
            }

        }
    }
}

function createTable() {
    if (localStorage.getItem('db') !== null) {
        db = JSON.parse(localStorage.getItem('db'));
        db.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    let text = '';
    for (let i = 0; i < db.length; i++) {
        text += '<tr>';
        text += '<td>' + db[i].name + '</td>';
        text += '<td>' + db[i].number + '</td>';
        text += '<td>' + db[i].number2 + '</td>';
        text += '<td>' + db[i].number3 + '</td>';
        text += '<td>' + db[i].email + '</td>';
        text += '</tr>';
    }
    mainBody.innerHTML = text;
}

function createEditTable() {
    let text = '';
    for (let i = 0; i < db.length; i++) {
        text += '<tr>';
        text += '<td>' + db[i].name + '</td>';
        text += '<td>' + db[i].number + '</td>';
        text += '<td>' + db[i].number2 + '</td>';
        text += '<td>' + db[i].number3 + '</td>';
        text += '<td>' + db[i].email + '</td>';
        text += '<td><button data-id="' + i + '" class="btn btn-warning edit">Edit</button></td>';
        text += '<td><button id="' + i + '" class="btn btn-danger delete">Delete</button></td>';
        text += '</tr>';
    }
    editBody.innerHTML = text;
    const deleteBtns = document.querySelectorAll('.delete');
    const editBtns = document.querySelectorAll('.edit');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', deleteContakt);
        editBtns[i].addEventListener('click', editContact);
    }
}

function changeContact() {
    const conName = econName.value;
    const conNamber = econNamber.value;
    const conNamber2 = econNamber2.value;
    const conNamber3 = econNamber3.value;
    const conEmail = econEmail.value;
    db[id] = {
        name: conName,
        number: conNamber,
        number2: conNamber2,
        number3: conNamber3,
        email: conEmail
    };

    localStorage.setItem('db', JSON.stringify(db));

    createTable();
    showMainView();
}

function editContact() {
    editView.style.display = 'none';
    mainView.style.display = 'none';
    formView.style.display = 'none';
    editFormView.style.display = 'block';

    id = this.getAttribute('data-id');

    econName.value = db[id].name;
    econNamber.value = db[id].number;
    econNamber2.value = db[id].number2;
    econNamber3.value = db[id].number3;
    econEmail.value = db[id].email;
}

function deleteContakt() {
    const id = this.id;
    db = JSON.parse(localStorage.getItem('db'));
    db.splice(id, 1);
    localStorage.setItem('db', JSON.stringify(db));
    createTable();
    showMainView();
}

function showEditView() {
    createEditTable();
    mainView.style.display = 'none';
    formView.style.display = 'none';
    editFormView.style.display = 'none';
    editView.style.display = 'block';
}

function showForm() {
	clrAddContactTable();
    mainView.style.display = 'none';
    editView.style.display = 'none';
    editFormView.style.display = 'none';
    formView.style.display = 'block';
	conName.focus();
}

function showMainView() {
    formView.style.display = 'none';
    editView.style.display = 'none';
    editFormView.style.display = 'none';
    mainView.style.display = 'block';
}

function saveContact() {
    let name = conName.value;
    let number = conNamber.value;
    let number2 = conNamber2.value;
    let number3 = conNamber3.value;
    let email = conEmail.value;

    let newContact = {
        name: name,
        number: number,
        number2: number2,
        number3: number3,
        email: email
    }

    if (localStorage.getItem('db') === null) {
        db = [];
        db.push(newContact);
        localStorage.setItem('db', JSON.stringify(db));
    } else {
        db = JSON.parse(localStorage.getItem('db'));
        db.push(newContact);
        localStorage.setItem('db', JSON.stringify(db));
    }

    db.push(newContact);
    createTable();
    showMainView();
}

function clrAddContactTable() {
    conName.value = '';
    conNamber.value = '';
    conNamber2.value = '';
    conNamber3.value = '';
    conEmail.value = '';
}

// date & time
const timer = document.getElementById('timer');
let loop;

function display() {
    const t = new Date();

    const h = ('0' + t.getHours()).slice(-2);
    const m = ('0' + t.getMinutes()).slice(-2);
    const s = ('0' + t.getSeconds()).slice(-2);

    const day = t.getDate();
    const month = t.getMonth() + 1;
    const years = t.getFullYear();

    tdisplay = ' ⌚ ' + h + ':' + m + ':' + s + 'h';
    ddisplay = ' ➥ ' + day + '.' + month + '.' + years;
    timer.innerHTML = ddisplay + ' ' + tdisplay;
}

loop = setInterval(display, 1000);