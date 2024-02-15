document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', function(event) {
    if (event.target.id.startsWith('delete-post-')) {
      // Use event.target to access the clicked element
      const postId = event.target.id.replace('delete-post-', '');
      if (postId) {
        console.log('Delete button clicked for post ID:', postId);
        deletePost(postId);
      }
    }
  });
});

async function deletePost(postId) {
  try {
    const response = await fetch(`/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Post deleted successfully');
      location.reload();
    } else {
      const error = await response.json();
      console.error('Failed to delete post:', error.message);
      alert('Failed to delete post: ' + error.message);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}