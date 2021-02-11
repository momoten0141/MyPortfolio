const newTodo = (todo,checked)=>{
    // 新しくtodoを生成
    if(checked){
        $('#todoList').prepend(`<li class="todo-item"><span class="todo"><input class="checkbox" type="checkbox" checked="checked"><span class="todo-txt line-through">${todo}</span></span><span class="far fa-trash-alt"></span></li>`);
    }else{
        $('#todoList').prepend(`<li class="todo-item"><span class="todo"><input class="checkbox" type="checkbox"><span class="todo-txt">${todo}</span></span><span class="far fa-edit"></span></li>`);
    }

    // 生成したtodoにdata-todo-idを付与
    $('#todoList > .todo-item:first').attr('data-todo-id',`${$('#todoList > .todo-item').length}`);
}

// クッキーをセット
const setCookie = (id,todo,checked)=>{
    const data = JSON.stringify({todo: todo, checked: checked});
    Cookies.set(id, data, { expires: 1/144 });
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
        const data = JSON.parse(Cookies.get(id));
        const todo = data.todo;
        const checked = data.checked;
        newTodo(todo,checked);
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
        const checked = false;
        setCookie(id,todo,checked);
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
        let todo;
        let checked;
         if($(`#todoList > .todo-item:nth-last-child(${i})`).text()){
            todo = $(`#todoList > .todo-item:nth-last-child(${i})`).text();
            checked = $(`#todoList > .todo-item:nth-last-child(${i})`).find('.checkbox').prop("checked");
        }else{
            todo= $.trim($(`#todoList > .todo-item:nth-last-child(${i})`).find('.todo-txt').val());
            checked = false;
        }
        setCookie(i,todo,checked);
    }
    // クッキーを基にtodoを再生成
    $('#todoList > ').remove();
    setAllTodo();
});

// 編集アイコンをクリックした時の処理
$(document).on('click','.fa-edit',function(){
    const id = $(this).parent().attr('data-todo-id');
    // const todo = Cookies.get(id);
    const data = JSON.parse(Cookies.get(id));
    const todo = data.todo; 
    $(this).toggleClass('fa-edit');
    $(this).toggleClass('fa-check-circle');
    $(this).parent().find('.todo').replaceWith(`<span class="todo todo-edit"><input class="todo-txt" type="text" value="${todo}"></span>`);
});

// 編集画面でチェックを入れた時の処理
$(document).on('click','.fa-check-circle',function(){
    const todo= $.trim($(this).parent().find('.todo-txt').val());
    const id = $(this).parent().attr('data-todo-id');
    setCookie(id,todo,false);
    $(this).toggleClass('fa-edit');
    $(this).toggleClass('fa-check-circle');
    $(this).parent().find('.todo').replaceWith(`<span class="todo"><input class="checkbox" type="checkbox"><span class="todo-txt">${todo}</span></span>`);
});

// チェックボックスにチェックを入れた時の処理
$(document).on('click','.checkbox',function(){
    $(this).parents('.todo-item').find('.far').toggleClass('fa-trash-alt');
    $(this).parents('.todo-item').find('.far').toggleClass('fa-edit');
    $(this).parent().find('.todo-txt').toggleClass('line-through');
    const id = $(this).parents('.todo-item').attr('data-todo-id');
    const todo = $(this).parent().find('.todo-txt').text();
    setCookie(id,todo,true);
});