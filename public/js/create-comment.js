document.getElementById('create-comment').addEventListener('click', function() {
  const body = document.getElementById('comment-body').value;
  const postId = window.location.pathname.split('/').pop();

  fetch('/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_id: postId, body }),
  })
  .then(response => {
    if (response.ok) { 
      return response.json(); 
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Success:', data);
    document.getElementById('comment-body').value = ''; 
    location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
