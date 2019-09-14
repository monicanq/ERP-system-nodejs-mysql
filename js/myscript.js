const form = document.querySelector('form');
const usernamePattern = /^[a-zA-Z]{3,15}$/;
const passwordPattern = /^[0-9]{4}$/
const msg = document.querySelector('.loginMessage');


//This will be handled by the backend
// form.addEventListener('submit', e =>{
//   e.preventDefault();
//   const username = form.username.value;
//   const password = form.password.value;
//   if (usernamePattern.test(username)){
//     console.log('The username is correct, let me validate it');
//     // msg.innerHTML = 'The username is correct, let me validate it.';
//   } else{
//     console.log('The username is not valid');
//     // msg.innerHTML = 'The username is not valid';
//   }
//   if (passwordPattern.test(password)){
//     console.log('Correct password');
//   } else {
//     msg.innerHTML += ' The password is not correct';
//   }
// })

form.username.addEventListener('keyup', e =>{
  if (usernamePattern.test(e.target.value)){
    form.username.setAttribute('class', 'correct');
  } else{
    form.username.setAttribute('class', 'wrong');
  }
})
