document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.open-edit-modal').forEach(button => {
    button.addEventListener('click', function() {
      const postId = this.getAttribute('data-post-id');
      
      fetch(`/post/${postId}`)
        .then(response => response.json())
        .then(data => {
          // Directly target the inputs without using an index
          document.querySelector('#edit-title').value = data.title;
          document.querySelector('#edit-body').value = data.body;
          
          // Save the postId in a data attribute on the Save button for later use
          document.querySelector('#edit-post').setAttribute('data-post-id', postId);

          document.querySelector('#edit-post-modal').style.display = 'grid';
        })
        .catch(error => console.error('Error fetching post data:', error));
    });
  });

  document.querySelector('#edit-post').addEventListener('click', function() {
    const postId = this.getAttribute('data-post-id');
    const title = document.querySelector('#edit-title').value;
    const body = document.querySelector('#edit-body').value;

    fetch(`/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector('#edit-post-modal').style.display = 'none';
      // Refresh or update UI here
    })
    .catch(error => console.error('Error updating post:', error));
  });

  document.querySelectorAll('.cancel').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelector('#edit-post-modal').style.display = 'none';
    });
  });
});