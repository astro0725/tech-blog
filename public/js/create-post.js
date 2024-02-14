document.addEventListener('DOMContentLoaded', function() {
  const openModalLink = document.getElementById('open-modal');
  const closeModalLink = document.getElementById('close-modal');
  const modal = document.getElementById('create-post-modal');

  // Toggle modal visibility
  const toggleModal = (isVisible) => {
    modal.classList.toggle('hidden', !isVisible);
  };

  // Open modal event listener
  openModalLink.addEventListener('click', (event) => {
    event.preventDefault();
    toggleModal(true);
  });

  // Close modal event listener
  closeModalLink.addEventListener('click', (event) => {
    event.preventDefault();
    toggleModal(false);
  });

  // Close modal if clicked outside of modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      toggleModal(false);
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