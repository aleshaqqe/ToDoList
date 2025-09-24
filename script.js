const tasks = [];

function render() {
  const taskList = document.querySelector('.todolist__list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';

    // текст задачи
    const span = document.createElement('span');
    span.textContent = task;

    // контейнер для кнопок
    const action = document.createElement('div');
    action.className = 'actions';

    const priority = document.createElement('button');
    priority.className = 'btn2';
    priority.textContent = 'Priority';
    priority.addEventListener('click', () => {
      priorityTask(index);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn2 btn3';
    removeBtn.textContent = 'Delete';
    removeBtn.addEventListener('click', () => {
      remove(index);
    });

    const redactBtn = document.createElement('button');
    redactBtn.className = 'redactBtn btn2 btn3';
    redactBtn.textContent = 'Змінити';
    redactBtn.addEventListener('click', () => {
      editTask(index, li, span, redactBtn);
    });

    action.appendChild(priority);
    action.appendChild(removeBtn);
    action.appendChild(redactBtn);

    li.appendChild(span);
    li.appendChild(action);
    taskList.appendChild(li);

    requestAnimationFrame(() => {
      li.classList.add('show');
    });
  });
}

function editTask(index, li, span, button) {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = tasks[index];

  li.replaceChild(editInput, span); // заменяем span на input

  button.textContent = 'Зберегти';

  button.onclick = () => {
    tasks[index] = editInput.value.trim() || tasks[index];
    render();
  };

  // возможность сохранить по Enter
  editInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      tasks[index] = editInput.value.trim() || tasks[index];
      render();
    }
  });

  editInput.focus();
}

function addTask() {
  const input = document.querySelector('.todolist__input');

  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    input.value = '';
    render();
  }
}

function remove(index) {
  const taskList = document.querySelector('.todolist__list');
  const li = taskList.children[index];
  li.classList.add('hide');

  li.addEventListener(
    'transitionend',
    () => {
      tasks.splice(index, 1);
      render();
    },
    { once: true }
  );
}

function priorityTask(index) {
  const [item] = tasks.splice(index, 1);
  tasks.unshift(item);
  render();
}

const input = document.querySelector('.todolist__input');

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
document.querySelector('.btn').addEventListener('click', addTask);

render();
