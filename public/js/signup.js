document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    console.log('Signup form found.');

    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      console.log('Username:', username);
      console.log('Password:', password);

      try {
        const response = await fetch('/signup', {
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
          throw new Error('Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error.message);
      }
    });
  } else {
    console.log('Signup form not found');
  }
});