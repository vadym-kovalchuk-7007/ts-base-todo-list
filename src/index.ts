import { v4 as uuid } from 'uuid';

const list = <HTMLUListElement>document.getElementById('list');
const form = <HTMLFormElement>document.getElementById('task-form');
const input = <HTMLInputElement>document.getElementById('task-title');

interface Task {
  completed: boolean;
  createdAt: Date;
  id: string;
  title: string;
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input?.value) return;

  const newTask: Task = {
    completed: false,
    createdAt: new Date(),
    id: uuid(),
    title: input.value,
  };
  addItemToList(newTask);
  input.value = '';
});

const addItemToList = (task: Task) => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  label.dataset.uid = task.id;
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
};

list.addEventListener(
  'click',
  (evt) => {
    const target = evt.target as HTMLInputElement;
    const targetType = target.type;
    if (targetType === 'checkbox') {
      const label = target.closest('label');
      if (label) {
        label.style.textDecoration = target.checked ? 'line-through' : '';
      }
    }
  },
  false,
);
