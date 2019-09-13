const tabOps = document.querySelectorAll('.tabOps');
const popup = document.querySelector('.popup-wrapper');
const closebtn = document.querySelectorAll('.popup-close');
// console.log(closebtn);

// console.log(tabOps);
console.log(popup);
//Add event listener to tabs because if we click without being logged in they should not work
tabOps.forEach(tab =>{
  tab.addEventListener('click', ()=>{
    popup.style.display = "block";
    // console.log('I made it this far');
  })
});
//Close the popup
// closebtn.addEventListener('click', e=> {
//   popup.style.display = "none";
// });
  // console.log('And now I am not sure if I want to work');
closebtn.forEach(btn =>{
  btn.addEventListener('click', e =>{
    popup.style.display='none';
});
});
