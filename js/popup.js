const tabOps = document.querySelectorAll('.tabOps');
const popup = document.querySelector('.popup-wrapper');
const closebtn = document.querySelectorAll('.popup-close');
let sessionLock = document.querySelector('#sessionLock').innerHTML;
// console.log(sessionLock);

//If a session has not been started lock the tabs
if (!Boolean(sessionLock)){
  //Add event listener to tabs because if we click without being logged in they should not work
  tabOps.forEach(tab =>{
    tab.setAttribute("disabled", "");
    tab.addEventListener('click', ()=>{
      popup.style.display = "block";
    })
  });

  //Add event listener to the close button to close the popup
  closebtn.forEach(btn =>{
    btn.addEventListener('click', e =>{
      popup.style.display='none';
  });
  });
}
