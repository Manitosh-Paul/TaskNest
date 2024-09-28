//Selectors
const ul = document.querySelector(".to-do-container ul");
const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form");
const inputField = document.querySelector(".input-data");
const selectField = document.querySelector(".filter");
let selectValue = selectField.value;
let editStatus = false;
let editItem;
let itemBeforeEdit;
let ischeck = false;

//Event Listners
document.addEventListener("DOMContentLoaded", getFromLocal);
addBtn.addEventListener("click", addItem);
ul.addEventListener("click", completed);
ul.addEventListener("click", deleteTodo);
ul.addEventListener("click", editTodo);
selectField.addEventListener("input", displayFilter);

//Functions
function addItem(event) {
  event.preventDefault();
  const inputData = inputField.value;
  if (inputData.trim() === "") {
    alert("Please provide Data");
    return;
  }

  if (editStatus) {
    editItem.innerText = inputData;
    editLocal(itemBeforeEdit, inputData);
    editStatus = false;
    inputField.value = "";
    return;
  }

  //create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item-div");

  //create li
  const newTodoList = document.createElement("li");
  newTodoList.innerText = inputData;
  newTodoList.classList.add("todo-item");
  todoDiv.appendChild(newTodoList);

  //save to local storage
  saveToLocal(inputData);

  //Checked button
  const btnCheck = document.createElement("button");
  btnCheck.innerHTML = '<i class="fa-solid fa-check"></i>';
  btnCheck.classList.add("check-btn");
  todoDiv.appendChild(btnCheck);

  //edit button
  const btnedit = document.createElement("button");
  btnedit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  btnedit.classList.add("edit-btn");
  todoDiv.appendChild(btnedit);

  //deleted button
  const btnTrash = document.createElement("button");
  btnTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';
  btnTrash.classList.add("trash-btn");
  todoDiv.appendChild(btnTrash);

  //append to ul
  ul.appendChild(todoDiv);

  inputField.value = "";
}

function completed(e) {
  const btnCheck = e.target.closest(".check-btn");
  if (btnCheck) {
    const parentDiv = btnCheck.parentElement;
    const todoItem = parentDiv.children[0].innerText;
    parentDiv.classList.toggle("completed");
    const itag = btnCheck.querySelector("i");
    if (itag.classList.contains("fa-check")) {
      itag.classList.remove("fa-check");
      itag.classList.add("fa-xmark");
      ischeck = true;
      setCompletedStatus(todoItem);
    } else {
      itag.classList.remove("fa-xmark");
      itag.classList.add("fa-check");
      ischeck = false;
      setCompletedStatus(todoItem);
    }
  }
}

function setCompletedStatus(item) {
  let todo = keyExists();
  let toggleCompleted = completedExists();
  let index = todo.indexOf(item);
  if (ischeck) {
    toggleCompleted[index] = 1;
  } else {
    toggleCompleted[index] = 0;
  }
  localStorage.setItem("toggleCompleted", JSON.stringify(toggleCompleted));
}

function editTodo(e) {
  const editbtn = e.target.classList.contains("edit-btn");
  const todoItem = e.target.parentElement.children[0];
  if (editbtn) {
    editStatus = true;
    inputField.value = todoItem.innerText;
    itemBeforeEdit = todoItem.innerText;
    editItem = todoItem;
  }
}

function deleteTodo(e) {
  const btnTrash = e.target.closest(".trash-btn");
  if (btnTrash) {
    const parentDiv = btnTrash.parentElement;
    deleteFromLocal(parentDiv.children[0].innerText);
    parentDiv.classList.add("deleted");
    parentDiv.addEventListener("transitionend", () => {
      parentDiv.remove();
    });
  }
}

function displayFilter(e) {
  selectValue = e.target.value;
  const listItems = ul.childNodes;
  listItems.forEach((todo) => {
    switch (selectValue) {
      case "all":
        todo.style.display = "flex";
        break;
      case "checked":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unchecked":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
    }
  });
}

function saveToLocal(todo) {
  let todos = keyExists();
  todos.push(todo);
  let toggleCompleted = completedExists();
  toggleCompleted.push(0);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("toggleCompleted", JSON.stringify(toggleCompleted));
}

function getFromLocal() {
  let todos = keyExists();
  let toggleCompleted = completedExists();
  let i = 0;
  todos.forEach((todoItem) => {
    //create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item-div");

    //create li
    const newTodoList = document.createElement("li");
    newTodoList.innerText = todoItem;
    newTodoList.classList.add("todo-item");
    todoDiv.appendChild(newTodoList);

    //Checked button
    const btnCheck = document.createElement("button");
    if (toggleCompleted[i] == 0) {
      btnCheck.innerHTML = '<i class="fa-solid fa-check"></i>';
      todoDiv.classList.remove("completed");
    } else {
      btnCheck.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      todoDiv.classList.add("completed");
    }
    // btnCheck.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnCheck.classList.add("check-btn");
    todoDiv.appendChild(btnCheck);
    i = i + 1;

    //edit button
    const btnedit = document.createElement("button");
    btnedit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    btnedit.classList.add("edit-btn");
    todoDiv.appendChild(btnedit);

    //deleted button
    const btnTrash = document.createElement("button");
    btnTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';
    btnTrash.classList.add("trash-btn");
    todoDiv.appendChild(btnTrash);

    //append to ul
    ul.appendChild(todoDiv);
  });
}

function editLocal(itemBeforeEdit, itemAfterEdit) {
  let todos = keyExists();
  const index = todos.indexOf(itemBeforeEdit);
  todos[index] = itemAfterEdit;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteFromLocal(text) {
  let todos = keyExists();
  let toggleCompleted = completedExists();
  const index = todos.indexOf(text);
  todos.splice(index, 1);
  toggleCompleted.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("toggleCompleted", JSON.stringify(toggleCompleted));
}

function keyExists() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function completedExists() {
  let toggleCompleted;
  if (localStorage.getItem("toggleCompleted") === null) {
    toggleCompleted = [];
  } else {
    toggleCompleted = JSON.parse(localStorage.getItem("toggleCompleted"));
  }
  return toggleCompleted;
}
