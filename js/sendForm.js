const sendForm = () => {
  const form = document.querySelector('.modal');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const text = form.querySelector('input[type="text"]');
    const tel = form.querySelector('input[type="tel"]');
    const email = form.querySelector('input[type="email"]');

    const sendObject = {
      text: text.value,
      tel: tel.value,
      email: email.value,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(sendObject),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  });
};

sendForm();
