const form = document.querySelector('form');
const input = document.querySelector('input');

const submitted = (e) => {
    e.preventDefault();
    if (input.value === '') return;
    createTodo();
    form.reset();
};

const createTodo = () => {
    const value = input.value;
    const todos = document.querySelector('.todos');
    const todo = document.createElement('div');
    const icon1 = document.createElement('i');
    const icon2 = document.createElement('i');
    const iconContainer = document.createElement('div');
    const heading = document.createElement('h2');
    const elems = [iconContainer, heading, todo, todos];
    todos.className = 'todos flex-col';
    todo.className = 'todo flex-reg';
    iconContainer.className = 'icons';
    icon1.className = 'fa-solid fa-pen-to-square';
    icon2.className = 'fa-regular fa-circle-xmark';
    iconContainer.appendChild(icon1);
    iconContainer.appendChild(icon2);
    heading.innerHTML = value;
    append(elems);
};

const append = (elems) => {
    elems[3].appendChild(elems[2]);
    elems[2].appendChild(elems[1]);
    elems[2].appendChild(elems[0]);
    addFunctionality();
};

const addFunctionality = () => {
    const iconsX = document.querySelectorAll('.fa-circle-xmark');
    const iconsEdit = document.querySelectorAll('.fa-pen-to-square');
    const headings = document.querySelectorAll('.todo h2');
    const allTodos = Array.from(document.querySelectorAll('.todo'));
    headings.forEach((heading) => {
        heading.addEventListener('dblclick', crossOut);
    })
    iconsX.forEach((icon) => {
        icon.addEventListener('click', deleteElem);
    });
    iconsEdit.forEach((icon) => {
        icon.addEventListener('click', edit);
    });
    allTodos.forEach((todo) => {
        todo.addEventListener('dragstart', start);
    });
    allTodos.forEach((todo) => {
        todo.addEventListener('dragmove', move);
    });
    allTodos.forEach((todo) => {
        todo.addEventListener('dragend', updateList);
    });
};

const start = (e) => {
    e.preventDefault();
};

const move = (e) => {

};

const updateList = (e) => {

};

const edit = (e) => {
    const newInput = document.querySelector('.new-input');
    const todo = e.target.parentElement.parentElement;
    const editInput = document.createElement('input');
    editInput.className = 'new-input';
    editInput.addEventListener('keyup', editValue);
    if (newInput) return;
    todo.appendChild(editInput);
};

const editValue = (e) => {
    const newInput = document.querySelector('.new-input');
    const value = newInput.value;
    if (e.key === 'Enter') updateTodo(value, e.target);
};

const updateTodo = (value, elem) => {
    const heading = elem.parentElement.firstElementChild;
    const parent = elem.parentElement;
    heading.innerHTML = value;
    parent.removeChild(elem);
};

const crossOut = (e) => {
    e.target.classList.toggle('cross');
};

const deleteElem = (e) => {
    const todo = e.target.parentElement.parentElement;
    const todos = document.querySelector('.todos');
    todos.removeChild(todo);
};

input.focus();
form.addEventListener('submit', submitted);