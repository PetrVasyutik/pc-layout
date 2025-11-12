const accordeon = () => {
  const contents = document.querySelectorAll('.program-line__content');
  const allDescr = document.querySelectorAll('.program-line__descr');

  contents.forEach((elem) => {
    const title = elem.querySelector('.program-line__title');
    const descr = elem.querySelector('.program-line__descr');

    descr.style.transition = 'height 0.3s';
    descr.style.overflow = 'hidden';

    // Устанавливаем начальную высоту
    if (!descr.classList.contains('active')) {
      descr.style.height = '0px';
    } else {
      descr.style.height = descr.scrollHeight + 'px';
    }

    title.addEventListener('click', () => {
      const wasActive = descr.classList.contains('active');

      allDescr.forEach((item) => {
        item.classList.remove('active');
        item.style.height = '0px';
      });

      if (!wasActive) {
        descr.classList.add('active');
        // Устанавливаем реальную высоту для анимации
        descr.style.height = descr.scrollHeight + 'px';
      }
    });
  });
};

accordeon();
