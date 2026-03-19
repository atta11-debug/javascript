const todoList = [{
    task: 'make dinner',
    duedate: '2024-06-30',
}, {
    task: 'wash dishes',
    duedate: '2024-07-01',
}];
renderTodoList();
function renderTodoList() {
    let todolistHTML = '';

    todoList.forEach((todoObject, index) => {
        // const todoObject = todoList[i];
        const { task, duedate } = todoObject;
        const html =
            `<div>${task}</div>
        <div>${duedate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>`;
        todolistHTML += html;
    });
    document.querySelector('.js-todo-list').innerHTML = todolistHTML;

    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
        })
    })

}

document.querySelector('.js-add-button')
    .addEventListener('click', () => {
        addTodo();
    })
function addTodo() {
    const element = document.querySelector('.js-name-input');
    const name = element.value;
    const dateElement = document.querySelector('.js-due-date-input');
    const duedate = dateElement.value;
    if (name && duedate) {

        todoList.push({ task: name, duedate: duedate });
    }
    else {
        alert('Please enter a task and due date');
    }

    console.log(todoList);
    element.value = '';
    dateElement.value = '';
    renderTodoList();
}
