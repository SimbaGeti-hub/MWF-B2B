function openDeleteModal(elem) {
  const id = elem.getAttribute('data-id');
  const taskName = elem.getAttribute('data-task');
  const deleteModal = document.getElementById('deleteModal');
  const deleteMessage = document.getElementById('deleteMessage');
  const deleteForm = document.getElementById('deleteForm');

  deleteMessage.textContent = `Are you sure you want to delete the task "${taskName}"?`;
  deleteForm.action = `/toDo/${id}?_method=DELETE`; // correct action for express method override

  deleteModal.style.display = 'block';
}

function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
}
