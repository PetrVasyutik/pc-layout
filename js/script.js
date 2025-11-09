const contents = document.querySelectorAll('.program-line__content');
const allDescr = document.querySelectorAll('.program-line__descr');

contents.forEach((elem) => {
  const title = elem.querySelector('.program-line__title');
  const descr = elem.querySelector('.program-line__descr');

  title.addEventListener('click', () => {
    const wasActive = descr.classList.contains('active');

    allDescr.forEach((item) => item.classList.remove('active'));

    if (!wasActive) {
      descr.classList.add('active');
    }
  });
});
