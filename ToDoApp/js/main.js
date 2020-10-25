'use strict';

const add = document.querySelector('.add');
const todoList = document.querySelector('.todoList');


function newTodo(todo){
    todoList.innerHTML += `<li class ="item">${todo}</li>`;
}

add.addEventListener('submit',e => {
    e.preventDefault();

    const todo = add.querySelector('.txt').value.trim();
    if (todo.length) {
        newTodo(todo);
    }
})