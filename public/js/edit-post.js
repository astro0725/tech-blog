document.addEventListener('DOMContentLoaded', function() {
  var openModalButton = document.getElementById('open-modal');
  var modal = document.getElementById('edit-post-modal');

  function openModal() {
    var postId = this.getAttribute('data-post-id');
    modal.setAttribute('data-post-id', postId); 
    modal.style.display = 'grid';
  }
  openModalButton.addEventListener('click', openModal);

  var closeModalButton = document.getElementById('close-modal');

  function closeModal() {
    modal.style.display = 'none'; 
  }
  closeModalButton.addEventListener('click', closeModal);
});

document.getElementById('edit-post').addEventListener('click', function() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const id = modal.getAttribute('data-post-id');

  fetch(`/post/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }), 
  })
  .then(response => {
    if (response.ok) { 
      return response.json(); 
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log('Success:', data);
    var modal = document.getElementById('edit-post-modal');
    modal.style.display = 'none';
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});