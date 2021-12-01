const form = document.forms.todoForm;
const input = document.querySelector('.todo-input');
const ul = document.querySelector('.todo-list');

function checkInputValidation() {
  const regexp = /^[\w\s]{2,15}$/;
  return regexp.test(input.value);
}

function createListItem(elem) {
  let li = document.createElement('li');
  li.innerHTML = `&#6145 ${elem}<button class="remove-todo">&#10006;</button>`;
  li.classList.add('list-item');
  return li;
}

function removeElem(el) {
  el.closest('li').remove();
}

function toggleElem(el, toggleClass) {
  el.classList.toggle(toggleClass);
}

function changeList(event) {
  let target = event.target;

  switch (target.tagName) {
    case 'BUTTON':
      removeElem(target);
      break;
    case 'LI':
      toggleElem(target, 'done');
      break;
    default:
      console.log('error');
  }
}

let errorMessage = createErrorMessage();

function createErrorMessage() {
  let message = document.createElement('p');
  message.innerText = 'Invalid data';
  message.classList.add('error-message');
  return message;
}

function addErrorMessage() {
  form.after(errorMessage);
}

function removeErrorMessage() {
  errorMessage.remove();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (checkInputValidation()) {
    let data = createListItem(input.value);
    ul.append(data);
    input.value = '';
  }
});

input.addEventListener('change', () => {
  if (checkInputValidation()) {
    input.classList.remove('invalid-input');
    removeErrorMessage();
  } else {
    input.classList.add('invalid-input');
    addErrorMessage();
  }
});

ul.addEventListener('click', changeList);
