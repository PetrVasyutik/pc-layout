const sendForm = () => {
  const form = document.querySelector('.modal');
  const textInput = form.querySelector('input[type="text"]');
  const telInput = form.querySelector('input[type="tel"]');
  const emailInput = form.querySelector('input[type="email"]');
  const submitButton = form.querySelector('button[type="submit"]');

  // Функция для создания сообщения об ошибке
  const showError = (input, message) => {
    // Удаляем предыдущее сообщение об ошибке, если есть
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Добавляем класс ошибки к полю
    input.classList.add('error');
    input.parentElement.classList.add('error');

    // Создаем элемент с сообщением об ошибке
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
  };

  // Функция для удаления ошибки
  const removeError = (input) => {
    input.classList.remove('error');
    input.parentElement.classList.remove('error');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  };

  // Функция для показа сообщения об успехе/ошибке
  const showMessage = (message, isSuccess = true) => {
    // Удаляем предыдущее сообщение, если есть
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${isSuccess ? 'success' : 'error'}`;
    messageElement.textContent = message;

    const modalInner = form.querySelector('.modal__inner');
    modalInner.insertBefore(messageElement, modalInner.querySelector('.modal__elements'));

    // Автоматически скрываем сообщение через 5 секунд
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  };

  // Валидация имени
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Поле имени обязательно для заполнения';
    }
    if (name.trim().length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    return null;
  };

  // Валидация телефона
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return 'Поле телефона обязательно для заполнения';
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return 'Некорректный формат телефона';
    }
    if (phone.replace(/\D/g, '').length < 10) {
      return 'Телефон должен содержать минимум 10 цифр';
    }
    return null;
  };

  // Валидация email
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Поле email обязательно для заполнения';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Некорректный формат email';
    }
    return null;
  };

  // Обработка отправки формы
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Удаляем все предыдущие ошибки
    [textInput, telInput, emailInput].forEach(input => removeError(input));

    // Валидация полей
    const nameError = validateName(textInput.value);
    const phoneError = validatePhone(telInput.value);
    const emailError = validateEmail(emailInput.value);

    let hasErrors = false;

    if (nameError) {
      showError(textInput, nameError);
      hasErrors = true;
    }

    if (phoneError) {
      showError(telInput, phoneError);
      hasErrors = true;
    }

    if (emailError) {
      showError(emailInput, emailError);
      hasErrors = true;
    }

    // Если есть ошибки валидации, не отправляем форму
    if (hasErrors) {
      return;
    }

    // Блокируем кнопку отправки
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    const sendObject = {
      text: textInput.value.trim(),
      tel: telInput.value.trim(),
      email: emailInput.value.trim(),
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(sendObject),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Успешно отправлено:', data);

      // Показываем сообщение об успехе
      showMessage('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', true);

      // Очищаем форму
      form.reset();
      [textInput, telInput, emailInput].forEach(input => removeError(input));

    } catch (error) {
      console.error('Ошибка:', error);

      // Определяем тип ошибки
      let errorMessage = 'Произошла ошибка при отправке формы. ';

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage += 'Проверьте подключение к интернету.';
      } else if (error.message.includes('Ошибка сервера')) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Попробуйте еще раз позже.';
      }

      showMessage(errorMessage, false);
    } finally {
      // Разблокируем кнопку отправки
      submitButton.disabled = false;
      submitButton.textContent = 'Отправить';
    }
  });

  // Удаление ошибок при вводе
  [textInput, telInput, emailInput].forEach(input => {
    input.addEventListener('input', () => {
      removeError(input);
    });
  });

  // Функция полной очистки формы
  const clearForm = () => {
    // Очищаем все поля
    form.reset();

    // Удаляем все ошибки более тщательно
    [textInput, telInput, emailInput].forEach(input => {
      // Убираем классы ошибок с input и его родителя
      input.classList.remove('error');
      if (input.parentElement) {
        input.parentElement.classList.remove('error');
      }

      // Удаляем все сообщения об ошибках
      const errorMessages = input.parentElement?.querySelectorAll('.error-message');
      if (errorMessages) {
        errorMessages.forEach(msg => msg.remove());
      }
    });

    // Удаляем все общие сообщения формы (на случай, если их несколько)
    const formMessages = form.querySelectorAll('.form-message');
    formMessages.forEach(msg => msg.remove());

    // Разблокируем кнопку и возвращаем исходный текст
    submitButton.disabled = false;
    submitButton.textContent = 'Отправить';
  };

  // Экспортируем функцию очистки для использования в других модулях
  window.clearForm = clearForm;

  // Очищаем форму при открытии модального окна (на случай, если остались старые данные)
  let previousDisplay = form.style.display || '';
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const currentDisplay = form.style.display || '';
        // Если модальное окно открывается (становится flex из не-flex состояния)
        if (previousDisplay !== 'flex' && currentDisplay === 'flex') {
          // Очищаем форму при открытии, чтобы убрать все старые ошибки
          clearForm();
        }
        previousDisplay = currentDisplay;
      }
    });
  });

  observer.observe(form, {
    attributes: true,
    attributeFilter: ['style']
  });
};

sendForm();
