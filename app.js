const itemsContainer = document.getElementById('items-container');
const dataForm = document.getElementById('data-form');
const errorBox = document.getElementById('error-box');

// Helper to show/hide errors in the red box
function showError(message) {
  if (message) {
    errorBox.textContent = message;
    errorBox.classList.remove('hidden');
  } else {
    errorBox.textContent = '';
    errorBox.classList.add('hidden');
  }
}

// Render retrieved data cards onto the screen
function displayItems(items) {
  itemsContainer.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.body || item.description || ''}</p>
    `;
    itemsContainer.appendChild(card);
  });
}

// Initial page load (GET Action)
async function loadDashboard() {
  try {
    showError(null); // Clear previous errors
    const data = await fetchItems();
    displayItems(data);
  } catch (err) {
    showError(`Error loading page: ${err.message}`);
    itemsContainer.innerHTML = 'Failed to load items.';
  }
}

// Form Submission (POST Action)
dataForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const titleValue = document.getElementById('input-title').value;
  const bodyValue = document.getElementById('input-body').value;
  
  const payload = {
    title: titleValue,
    body: bodyValue,
    userId: 1 // Mock user ID for the API
  };

  try {
    showError(null);
    const newRecord = await createItem(payload);
    
    alert('Item successfully created!');
    
    // Locally prepend (add to the top) the newly created item
    const currentContainerHTML = itemsContainer.innerHTML;
    itemsContainer.innerHTML = `
      <div class="card newly-added">
        <h3>${newRecord.title} (Just Added!)</h3>
        <p>${newRecord.body}</p>
      </div>
    ` + currentContainerHTML;

    dataForm.reset(); // Clear the form input fields
  } catch (err) {
    showError(`Submission failed: ${err.message}`);
  }
});

// Run load on start
loadDashboard();