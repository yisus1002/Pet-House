

const ham = document.querySelector('.ham');
const menu = document.querySelector('.menu-nav');
const barras = document.querySelectorAll('.ham span');



ham.addEventListener('click', () => {
    menu.classList.toggle('activado');
    barras.forEach(child => {child.classList.toggle('animado')});
    ham.classList.toggle('girar');
});

