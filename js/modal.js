const modal = () => {
  const modal = document.querySelector('.modal');
  const courseButton = document.querySelector('.course__button');
  const assemblyButton = document.querySelector('.assembly__button');

  function openModal() {
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.display = '';
    }
  }

  if (courseButton) {
    courseButton.addEventListener('click', openModal);
  }

  if (assemblyButton) {
    assemblyButton.addEventListener('click', openModal);
  }

  modal.addEventListener('click', (event) => {
    const modalContent = event.target.closest('.modal__inner');

    if (!modalContent) {
      closeModal();
    }
  });

  const button = document.createElement('button');
  button.classList.add('modal__button-close');
  button.textContent = 'X';
  const container = document.querySelector('.modal__inner');
  container.appendChild(button);
  button.addEventListener('click', closeModal);
};

modal();
