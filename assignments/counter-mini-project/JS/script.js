const digitElement = document.querySelector("#digit-container span");
const increment = document.querySelector("#increment");
const setZero = document.querySelector("#setZero");
const decrement = document.querySelector("#decrement");
let num = 0;

increment.addEventListener("click", () => {
    num++;
    digitElement.innerText = num;
})

setZero.addEventListener("click", () => {
    num = 0;
    digitElement.innerText = num;
})

decrement.addEventListener("click", () => {
    num--;
    digitElement.innerText = num;
})