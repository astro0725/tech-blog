document.getElementById('create-comment').addEventListener('click', function() {
  const body = document.getElementById('comment-body').value;

  fetch('/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ body }), 
  })
  .then(response => {
    if (response.ok) { 
      return response.json(); 
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Success:', data);
    // Optionally, clear the textarea after successful submission
    document.getElementById('comment-body').value = '';
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
