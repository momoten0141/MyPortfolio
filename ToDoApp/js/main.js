const newTodo = todo=>{
    $('#todoList').prepend(`<li class="todo-item"><span class="todo"><input class="checkbox" type="checkbox"><span class="todo-txt">${todo}</span></span><span class="far fa-edit"></span></li>`);
}

const setCookie = todo=>{
    Cookies.set(todo, todo, { expires: 1/144 });
}

const deleteCookie = todo=>{
    Cookies.remove(todo);
}


// 保存数分todoを生成
for(let todo in Cookies.get()){
    newTodo(todo);
}

// todoを入力した時の処理
$('#addTodo').submit(e=>{
    e.preventDefault();
    const todo = $.trim($('#enterTodo').val());
    if(todo.length){
        setCookie(todo);
        newTodo(todo);
        $('#addTodo')[0].reset();
    }
});

// ゴミ箱アイコンをクリックした時の処理
$(document).on('click','.fa-trash-alt',function(){
    const todo = $(this).parent().find('.todo-txt').text();
    deleteCookie(todo);
    $(this).parent().remove();
});

// チェックを入れた時の処理
$(document).on('click','.checkbox',function(){
    $(this).parents('.todo-item').find('.far').toggleClass('fa-trash-alt');
    $(this).parents('.todo-item').find('.far').toggleClass('fa-edit');
    $(this).parent().find('.todo-txt').toggleClass('line-through');
});