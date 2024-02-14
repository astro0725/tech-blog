document.addEventListener('DOMContentLoaded', function() {
  var openModalButton = document.getElementById('open-modal');
  var modal = document.getElementById('create-post-modal');
  function openModal() {
    modal.style.display = 'grid';
  }
  openModalButton.addEventListener('click', openModal);

  var closeModalButton = document.getElementById('close-modal');

  function closeModal() {
    modal.style.display = 'none'; 
  }
  closeModalButton.addEventListener('click', closeModal);
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
    modal.style.display = 'none';
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
