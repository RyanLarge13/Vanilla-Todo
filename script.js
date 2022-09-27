const form = document.querySelector("form");
const input = document.querySelector("input");
let list = [];
let dragStartIndex;
console.log(window.innerWidth)

const submitted = (e) => {
  e.preventDefault();
  if (input.value === "") return;
  createTodo();
  form.reset();
};

const createTodo = () => {
  const value = input.value;
  const todo = document.createElement("div");
  todo.className = "todo flex-reg";
  todo.innerHTML = `<h2>${value}</h2>
    <div class="icons flex-reg">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-regular fa-circle-xmark"></i>
    </div>`;
  list.push(todo);
  append();
  addFunctionality();
};

const append = () => {
  const todos = document.querySelector(".todos");
  for (let k = 0; k < list.length; k++) {
    todos.appendChild(list[k]);
  }
};

const addFunctionality = () => {
  const iconsX = document.querySelectorAll(".fa-circle-xmark");
  const iconsEdit = document.querySelectorAll(".fa-pen-to-square");
  const headings = document.querySelectorAll(".todo h2");
  headings.forEach((heading) => {
    heading.addEventListener("dblclick", crossOut);
  });
  iconsX.forEach((icon) => {
    icon.addEventListener("click", deleteElem);
  });
  iconsEdit.forEach((icon) => {
    icon.addEventListener("click", edit);
  });
  list
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => {
      return a.sort - b.sort;
    })
    .map((a) => a.value)
    .forEach((todo, index) => {
      todo.setAttribute("draggable", true);
      todo.setAttribute("data-index", index);
    });
  addDraglisteners();
};

const addDraglisteners = () => {
  const allItems = document.querySelectorAll(".todo");
  allItems.forEach((item) => {
    item.addEventListener("dragstart", start);
    item.addEventListener("dragover", over);
    item.addEventListener("dragleave", leave);
    item.addEventListener("dragenter", enter);
    item.addEventListener("drop", drop);
  });
};

const start = (e) => {
  // console.log('started);
  dragStartIndex = e.target.closest("div").getAttribute("data-index");
};

const over = (e) => {
  e.preventDefault();
  const todoUnder = e.target;
  todoUnder.classList.add('scale');
};

const leave = (e) => {
  e.preventDefault();
  const todoUnder = e.target;
  todoUnder.classList.remove("scale");
};

const enter = (e) => {
    
};

const drop = (e) => {
  e.preventDefault();
  const dragEndIndex = e.target.getAttribute("data-index");
  const todoUnder = e.target;
  todoUnder.classList.remove("scale");
  swapItems(dragStartIndex, dragEndIndex);
};

const swapItems = (fromIndex, toIndex) => {
  const todos = document.querySelector(".todos");
  todos.appendChild(list[fromIndex]);
  todos.appendChild(list[toIndex]);
};

const edit = (e) => {
  const newInput = document.querySelector(".new-input");
  const todo = e.target.parentElement.parentElement;
  const editInput = document.createElement("input");
  editInput.className = "new-input";
  editInput.addEventListener("keyup", editValue);
  if (newInput && e) return todo.removeChild(newInput);
  if (newInput) return editValue;
  todo.appendChild(editInput);
  editInput.focus();
};

const editValue = (e) => {
  const newInput = document.querySelector(".new-input");
  const value = newInput.value;
  if (e.key === "Enter") updateTodo(value, e.target);
};

const updateTodo = (value, elem) => {
  const heading = elem.parentElement.firstElementChild;
  const parent = elem.parentElement;
  heading.innerHTML = value;
  parent.removeChild(elem);
};

const crossOut = (e) => {
  e.target.classList.toggle("cross");
};

const deleteElem = (e) => {
  const todo = e.target.parentElement.parentElement;
  const todos = document.querySelector(".todos");
  todos.removeChild(todo);
  list.splice(list.indexOf(todo), 1);
};

input.focus();
form.addEventListener("submit", submitted);
