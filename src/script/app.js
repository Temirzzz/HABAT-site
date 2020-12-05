// получаем все стрелки. При клике переворачиваем их и показываем скрытый блок

document.querySelectorAll('.arrow__btn').forEach(element => {
    element.addEventListener('click', cartToggle)
}) 

function cartToggle() {
    this.classList.toggle('rotate')
    this.parentElement.nextSibling.nextSibling.nextSibling.classList.toggle('hiden__wrapper')
}

// запрещаем прокрутку мобильного меню

document.querySelector('.menu__box').onmouseenter = disableScrolling

function disableScrolling() {
    let x = window.scrollX
    let y = window.scrollY
    window.onscroll= function() {
        window.scrollTo(x, y)
    }
}

document.querySelector('.menu__box').onmouseout = enableScrolling

function enableScrolling(){
    window.onscroll = function(){}
}