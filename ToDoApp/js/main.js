const newTodo = todo=>{
    // 新しくtodoを生成
    $('#todoList').prepend(`<li class="todo-item"><span class="todo"><input class="checkbox" type="checkbox"><span class="todo-txt">${todo}</span></span><span class="far fa-edit"></span></li>`);
    // 生成したtodoにdata-todo-idを付与
    $('#todoList > .todo-item:first').attr('data-todo-id',`${$('#todoList > .todo-item').length}`);
}

// クッキーをセット
const setCookie = (id,todo)=>{
    Cookies.set(id, todo, { expires: 1/144 });
}

// 全てのクッキーを削除
const deleteAllCookie = ()=>{
    for(let id in Cookies.get()){
        Cookies.remove(id);
    }
}

// クッキー保存分todoを生成
const setAllTodo = ()=>{
    for(let id in Cookies.get()){
        const todo = Cookies.get(id);
        newTodo(todo);
    }
}



// クッキーに保存されている全てのtodoを生成
setAllTodo();

// todoを入力した時の処理
$('#addTodo').submit(e=>{
    e.preventDefault();
    // todoを取得
    const todo = $.trim($('#enterTodo').val());
    if(todo.length){
        newTodo(todo);
        const id = $('#todoList > .todo-item:first').attr('data-todo-id');
        setCookie(id,todo);
        $('#addTodo')[0].reset();
    }
});

// ゴミ箱アイコンをクリックした時の処理
$(document).on('click','.fa-trash-alt',function(){
    // 洗濯したtodoを削除
    $(this).parent().remove();
    // 全てのクッキーを削除
    deleteAllCookie();
    // 全てのtodoを取得してクッキーセット
    const todoNum = $('#todoList > .todo-item').length;
    for(let i=1;i<=todoNum;i++){
        const todo = $(`#todoList > .todo-item:nth-last-child(${i})`).text();
        setCookie(i,todo);
    }
    // クッキーを基にtodoを再生成
    $('#todoList > ').remove();
    setAllTodo();
});

// 編集アイコンをクリックした時の処理
$(document).on('click','.fa-edit',function(){
    const id = $(this).parent().attr('data-todo-id');
    const todo = Cookies.get(id);
    $(this).toggleClass('fa-edit');
    $(this).toggleClass('fa-check-circle');
    $(this).parent().find('.todo').replaceWith(`<span class="todo todo-edit"><input class="todo-txt" type="text" value="${todo}"></span>`);
});

// 編集画面でチェックを入れた時の処理
$(document).on('click','.fa-check-circle',function(){
    const todo= $.trim($(this).parent().find('.todo-txt').val());
    const id = $(this).parent().attr('data-todo-id');
    setCookie(id,todo);
    $(this).toggleClass('fa-edit');
    $(this).toggleClass('fa-check-circle');
    $(this).parent().find('.todo').replaceWith(`<span class="todo"><input class="checkbox" type="checkbox"><span class="todo-txt">${todo}</span></span>`);
});

// チェックボックスにチェックを入れた時の処理
$(document).on('click','.checkbox',function(){
    $(this).parents('.todo-item').find('.far').toggleClass('fa-trash-alt');
    $(this).parents('.todo-item').find('.far').toggleClass('fa-edit');
    $(this).parent().find('.todo-txt').toggleClass('line-through');
});