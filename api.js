// GET Request - Fetches data from the server
async function fetchItems() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${API_CONFIG.KEY}` <-- Uncomment when you plug in your real API key
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    throw error; // Pass the error up to be handled by app.js UI
  }
}

// POST Request - Sends new data to the server
async function createItem(payload) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${API_CONFIG.KEY}` <-- Uncomment when you plug in your real API key
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to submit data (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}