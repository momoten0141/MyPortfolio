'use strict';

const add = document.querySelector('.add');
const todoList = document.querySelector('.todoList');

function newTodo(todo){
    todoList.innerHTML += `<li class ="todo"><p class="txt"><input type="checkbox" class="checkbox">${todo}</p><i class="delete visibility far fa-trash-alt"></i></li>`;
}

function getCookie(todo){
    newTodo(todo);
}

function setCookie(todo){
    Cookies.set(todo, todo, { expires: 1/144 });
}

function deleteCookie(todo){
    Cookies.remove(todo);
}

for (var todo in Cookies.get()) {
    getCookie(todo);
}

add.addEventListener('submit',e => {
    e.preventDefault();

    const todo = add.querySelector('.txt').value.trim();
    if (todo.length) {
        setCookie(todo);
        newTodo(todo);
        add.reset();
    }
});

todoList.addEventListener('click',e => {
    if (e.target.classList.contains('delete')){
        const todo = e.target.parentElement.querySelector('.txt').textContent;
        deleteCookie(todo);
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains('checkbox')){
        const txt = e.target.parentElement;
        const deleteBtn = e.target.parentElement.parentElement.querySelector('.delete');
        if (txt.classList.contains('checked')){
            txt.classList.remove('checked');
            deleteBtn.classList.add('visibility');
        }else{
            txt.classList.add('checked');
            deleteBtn.classList.remove('visibility');
        }
    }
});