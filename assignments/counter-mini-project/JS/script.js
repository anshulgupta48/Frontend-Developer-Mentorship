// <======== Initializing Variables ========>
const digitElement = document.querySelector("#digit-container span");
const increment = document.querySelector("#increment");
const setZero = document.querySelector("#setZero");
const decrement = document.querySelector("#decrement");
let num = 0;


// <======== JS Program to Increase the Count of the Counter ========>
increment.addEventListener("click", () => {
    num++;
    digitElement.innerText = num;
})


// <======== JS Program to Reset the Count of the Counter ========>
setZero.addEventListener("click", () => {
    num = 0;
    digitElement.innerText = num;
})


// <======== JS Program to Decrease the Count of the Counter ========>
decrement.addEventListener("click", () => {
    num--;
    digitElement.innerText = num;
})