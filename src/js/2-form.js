// напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.
const formData = { email: '', message: '' };

const LS_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('input[name="email"]');
const textarea = document.querySelector('textarea');

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const value = event.target.value;
  const key = event.target.name;

  formData[key] = value;
  //   console.log(event.target.name);
  //   console.log(event.target.value);
  //   console.log(formData);
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

pulloutKEY(); //отримаю дані зі сховища

function pulloutKEY() {
  const contents = JSON.parse(localStorage.getItem(LS_KEY));
  //   console.log(contents);

  if (contents) {
    //при перезавантаженні сторінки, якщо в сховищі є дані, тоді вони з'являться у формі
    inputEmail.value = contents.email || '';
    textarea.value = contents.message || '';
    // записуємо дані зі сховища у змінну
    formData.email = contents.email || '';
    formData.message = contents.message || '';
  }
}
console.log(formData);

function handleSubmit(event) {
  event.preventDefault();
  //   console.log(inputEmail.value);
  //   console.log(textarea.value);
  //   console.log(event.currentTarget.elements.email.value);
  //   console.log(event.currentTarget.elements.message.value);
  const emailValue = inputEmail.value.trim();
  const messageValue = textarea.value.trim();
  if (emailValue === '' || messageValue === '') {
    alert('Fill please all fields');
    return;
  }

  console.log({
    email: emailValue,
    message: messageValue,
  });
  event.currentTarget.reset(); // очищаю форму
  localStorage.removeItem(LS_KEY); //очищаю сховище
  // очищаю об'єкт
  formData.email = '';
  formData.message = '';
}
