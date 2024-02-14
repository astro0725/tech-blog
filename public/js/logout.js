document.getElementById('logoutBtn').addEventListener('click', async function(event) {
  event.preventDefault();

  try {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
        const data = await response.json(); 
        window.location.href = data.redirectUrl; 
        console.log('User logged out successfully!');
    } else {
      console.error('Failed to sign out:', response.statusText);
    }
  } catch (error) {
    console.error('Error signing out user:', error.message);
  }
});
