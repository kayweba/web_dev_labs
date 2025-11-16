const burger = document.querySelector('.header__burger');
const closeBtn = document.querySelector('.header__close');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__nav-link');

// Открытие меню
burger.addEventListener('click', function (e) {
  burger.style.opacity = '0',
  burger.style.visibility = 'hidden'
  nav.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// Закрытие меню
closeBtn.addEventListener('click', function () {
  burger.style.opacity = '1',
  nav.classList.remove('active');
  document.body.style.overflow = '';
  burger.style.visibility = 'visible'
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    nav.classList.remove('active');
    document.body.style.overflow = '';
  });
});
