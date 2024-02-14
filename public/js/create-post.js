document.addEventListener('DOMContentLoaded', function() {
  var openModalLink = document.getElementById('open-modal');
  var closeModalLink = document.getElementById('close-modal');
  var modal = document.getElementById('create-post-modal');

  openModalLink.addEventListener('click', openModal);

  function openModal(event) {
    event.preventDefault();
    modal.classList.remove('hidden');
  }

  closeModalLink.addEventListener('click', closeModal);
  function closeModal(event) {
    event.preventDefault();
    modal.classList.add('hidden');
  }

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  });
});

document.getElementById('create-post').addEventListener('click', function() {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;

  fetch('/post', {
    method: 'POST',
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
    var modal = document.getElementById('create-post-modal');
    modal.classList.add('hidden');
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});