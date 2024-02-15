document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id^=open-edit-]').forEach(button => {
    button.addEventListener('click', function() {
      const postId = this.getAttribute('data-post-id');
      const modal = document.querySelector(`#edit-modalbox-${postId}`);
      modal.style.display = 'grid';
    });
  });

  document.querySelectorAll('[id^=close-edit-modal-]').forEach(button => {
    button.addEventListener('click', function() {
      const postId = this.getAttribute('id').replace('close-edit-modal-', '');
      const modal = document.querySelector(`#edit-modalbox-${postId}`);
      modal.style.display = 'none';
    });
  });

  document.querySelectorAll('[id^=edit-post-]').forEach(button => {
    button.addEventListener('click', function() {
      const postId = this.getAttribute('id').replace('edit-post-', '');
      const title = document.querySelector(`#edit-title-${postId}`).value;
      const body = document.querySelector(`#edit-body-${postId}`).value;

      fetch(`/post/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Close the modal and refresh the page or update the UI as needed
        document.querySelector(`#edit-modalbox-${postId}`).style.display = 'none';
        location.reload();
      })
      .catch(error => console.error('Error updating post:', error));
    });
  });
});