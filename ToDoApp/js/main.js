'use strict';

const add = document.querySelector('.add');
const todoList = document.querySelector('.todoList');

function newTodo(todo){
    todoList.innerHTML += `<li class ="todo"><p class="txt">${todo}</p><i class="delete far fa-trash-alt"></i></li>`;
}

add.addEventListener('submit',e => {
    e.preventDefault();

    const todo = add.querySelector('.txt').value.trim();
    if (todo.length) {
        newTodo(todo);
        add.reset();
    }
});

todoList.addEventListener('click',e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});