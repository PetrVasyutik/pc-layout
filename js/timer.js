const timer = () => {
  const daysBlock = document.querySelector('.timer__days');
  const hoursBlock = document.querySelector('.timer__hours');
  const minutesBlock = document.querySelector('.timer__minutes');
  const secondsBlock = document.querySelector('.timer__seconds');

  let interval;

  const numWord = (value, words) => {
    // Если значение отрицательное или равно 0, возвращаем множественное число
    if (value <= 0) {
      return words[2];
    }

    const num = Math.abs(value) % 100;
    const lastNum = num % 10;

    if (num > 10 && num < 20) { return words[2]; }
    if (lastNum > 1 && lastNum < 5) { return words[1]; }
    if (lastNum === 1) { return words[0]; }

    return words[2];
  };

  const updateTimer = () => {
    const date = new Date();
    const dateDeadline = new Date('13 november 2025').getTime();
    const timeRemaining = (dateDeadline - date) / 1000;

    const days = Math.floor(timeRemaining / 60 / 60 / 24);
    const hours = Math.floor((timeRemaining / 60 / 60) % 24);
    const minutes = Math.floor((timeRemaining / 60) % 60);
    const seconds = Math.floor(timeRemaining % 60);

    const fDays = days < 10 ? '0' + days : days;
    const fHours = hours < 10 ? '0' + hours : hours;
    const fMinutes = minutes < 10 ? '0' + minutes : minutes;
    const fSeconds = seconds < 10 ? '0' + seconds : seconds;

    daysBlock.textContent = fDays;
    hoursBlock.textContent = fHours;
    minutesBlock.textContent = fMinutes;
    secondsBlock.textContent = fSeconds;

    secondsBlock.nextElementSibling.textContent = numWord(seconds, ['секунда', 'секунды', 'секунд']);
    minutesBlock.nextElementSibling.textContent = numWord(minutes, ['минута', 'минуты', 'минут']);
    hoursBlock.nextElementSibling.textContent = numWord(hours, ['час', 'часа', 'часов']);
    daysBlock.nextElementSibling.textContent = numWord(days, ['день', 'дня', 'дней']);

    if (timeRemaining <= 0) {
      clearInterval(interval);
      const timerBlocks = [daysBlock, hoursBlock, minutesBlock, secondsBlock];
      timerBlocks.forEach((block) => {
        block.textContent = '00';
        block.style.color = 'red';
      });
    }
  };

  updateTimer();
  interval = setInterval(updateTimer, 500);
};

timer();
