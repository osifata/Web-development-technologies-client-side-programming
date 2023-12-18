(() => {
    let todoList = document.querySelector('.todo-list');
    let addButton = todoList.querySelector('.todo-list__add-button');
    let delButton = todoList.querySelector('ul');
    let doneButton = todoList.querySelector('ul');
    let text = document.querySelector('.input_text');
    let ull = document.querySelector('.task-list');
    let prioritet = document.querySelector('.form_check__input');
    
    let taskList = todoList.querySelector('.task-list');
    let taskForm = todoList.querySelector('.task-form');
    let form = todoList.querySelector('form');
    let closeButton = taskForm.querySelector('.task-form__close-button');
    
    let formAction = '';
    let formItem;

    let editAction = e => {
        let btn = e.target;
        let item = btn.closest('.task-list__item');
        let prio = item.querySelector('.task-list__prio');
        let desc = item.querySelector('.task-list__description');
        form.reset();
        form.description.value = desc.textContent;
        form.prio.checked = (prio.textContent !== '');
        taskForm.classList.add('shown');
        formAction = 'edit';
        formItem = item;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (document.querySelector('input[name="dobavit"]:checked') && prioritet.checked===false){
            const taskText = text.value;
            const taskHtml = `<li class="task-list__item">
                                <label class="focus_zadacha"><input class="task-list__done" data-action="done" type="checkbox" name=""></label>
                                <span class="task-list__prio"></span>
                                <span class="task-list__description">${taskText}</span>
                                <div class="redaction">
                                    <button type="button" class="todo-list__edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><defs><style>.a{fill:none;}.b{fill:#707070;}</style></defs><g transform="translate(-548 -206)"><rect class="a" width="20" height="20" transform="translate(548 206)"/><g transform="translate(-323.826 -1200.024)"><path class="b" d="M877.534,1422.613l.971-.971-2.464-2.464-.971.971v1.12h1.344v1.344Zm5.377-9.634a.2.2,0,0,0-.224-.224c-.075,0-.149,0-.149.075l-5.6,5.6c-.075.075-.075.075-.075.149a.2.2,0,0,0,.224.224c.075,0,.149,0,.149-.075l5.6-5.6C882.911,1413.129,882.911,1413.054,882.911,1412.979Zm-.523-1.942,4.331,4.331-8.588,8.588H873.8v-4.331Zm7.02.971a1.237,1.237,0,0,1-.373.9l-1.718,1.718-4.331-4.331,1.718-1.718a1,1,0,0,1,.9-.373,1.572,1.572,0,0,1,.971.373l2.464,2.39A1.982,1.982,0,0,1,889.408,1412.009Z" transform="translate(0)"/></g></g></svg></button>
                                    <button type="button" data-action="delete" class="todo-list__delete-button"></button>
                                </div>
                            </li>`;
            ull.insertAdjacentHTML('beforeend', taskHtml);
        
            text.value="";
            text.focus();
        }
        else if(document.querySelector('input[name="dobavit"]:checked') && prioritet.checked===true){
            const taskText = text.value;
            const taskHtml = `<li class="task-list__item">
                                <label class="focus_zadacha"><input class="task-list__done" data-action="done" type="checkbox" name=""></label>
                                <span class="task-list__prio">⚡</span>
                                <span class="task-list__description">${taskText}</span>
                                <div class="redaction">
                                    <button type="button" class="todo-list__edit-button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><defs><style>.a{fill:none;}.b{fill:#707070;}</style></defs><g transform="translate(-548 -206)"><rect class="a" width="20" height="20" transform="translate(548 206)"/><g transform="translate(-323.826 -1200.024)"><path class="b" d="M877.534,1422.613l.971-.971-2.464-2.464-.971.971v1.12h1.344v1.344Zm5.377-9.634a.2.2,0,0,0-.224-.224c-.075,0-.149,0-.149.075l-5.6,5.6c-.075.075-.075.075-.075.149a.2.2,0,0,0,.224.224c.075,0,.149,0,.149-.075l5.6-5.6C882.911,1413.129,882.911,1413.054,882.911,1412.979Zm-.523-1.942,4.331,4.331-8.588,8.588H873.8v-4.331Zm7.02.971a1.237,1.237,0,0,1-.373.9l-1.718,1.718-4.331-4.331,1.718-1.718a1,1,0,0,1,.9-.373,1.572,1.572,0,0,1,.971.373l2.464,2.39A1.982,1.982,0,0,1,889.408,1412.009Z" transform="translate(0)"/></g></g></svg></button>
                                    <button type="button" data-action="delete" class="todo-list__delete-button"></button>
                                </div>
                            </li>`;
            ull.insertAdjacentHTML('beforeend', taskHtml);
        
            text.value="";
            text.focus();
        };
        switch (formAction) {
            case 'create':
                let item = taskList.firstElementChild.cloneNode(true);
                item.style.display = '';
                item.querySelector('.task-list__done').checked = false;
                item.querySelector('.task-list__description').textContent = form.description.value;
                item.querySelector('.task-list__prio').textContent = form.prio.checked ? '⚡' : '';
                item.textContent = form.description.value;
                taskList.append(item);
                item.addEventListener('click', editAction);
                taskForm.classList.toggle('shown');
                form.reset();
                break;

            case 'edit':
                
                formItem.querySelector('.task-list__description').textContent = form.description.value;
                formItem.querySelector('.task-list__prio').textContent = form.prio.checked ? '⚡' : '';
                break;
        }
    });


    addButton.addEventListener('click', e => {
        taskForm.classList.toggle('shown');
        formAction = 'create'
        form.reset();
        formItem = null;
    });

    closeButton.addEventListener('click', e => {
        if (document.querySelector('input[name="dobavit"]:checked')){
            taskForm.classList.remove('shown');
            document.querySelector(".todo-list__add-button").checked = false;
        }
        taskForm.classList.remove('shown');
    });

    let editButtons = todoList.querySelectorAll('.todo-list__edit-button');

    editButtons.forEach(btn => {
        btn.addEventListener('click', editAction);
    });

    delButton.addEventListener('click', e => {
        if (e.target.dataset.action === 'delete'){
            const parentNode = e.target.closest('li');
            parentNode.remove()
        }
    });

    doneButton.addEventListener('click', e => {
        if (e.target.dataset.action==='done'){
            const parentNode = e.target.closest('.task-list__item');
            const taskTitle = parentNode.querySelector('.task-list__description');
            taskTitle.classList.toggle('task-list__description--done');
            console.log(taskTitle)
        }
    });

})();