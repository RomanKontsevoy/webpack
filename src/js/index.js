import style from '../css/style.css'
import '../scss/typography.scss';
import '../scss/style.scss'
import $ from 'jquery'

$('.h1').html("Some text");

const arr = [1, 2, 3, 4];

console.log(...arr);

setInterval(()=>{
    let el = document.querySelector('.h2');
    el.innerHTML -= -1;
}, 5000)