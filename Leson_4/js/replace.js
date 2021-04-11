'use strict';
let block = document.getElementById('text-container');
document.getElementById('replace').addEventListener('click', () => {
    block.textContent = block.textContent.replace(/\B'|'\B/g, '"');
});

window.onload = () => {
    document.getElementById('myform').addEventListener('submit', e => {
        let valid = new Validator('myform');
        if(!valid.valid){
            e.preventDefault();
        }
    })
}