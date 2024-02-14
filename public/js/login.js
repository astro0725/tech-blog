document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    console.log('Login form found.');

    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      console.log('Username:', username);
      console.log('Password:', password);

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password}),
        });

        console.log('Response received:', response);

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            window.location.href = data.redirectUrl; 
          }
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error.message);
      }
    });
  } else {
    console.log('Login form not found');
  }
});