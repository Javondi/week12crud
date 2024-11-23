//Create a CRD application (CRUD without update) using json-server or another APICreate a CRD application (CRUD without update) using json-server or another API
const entityListElement = document.getElementById('entityList');
const fetchButton = document.getElementById('fetchEntities');
const createForm = document.getElementById('createEntityForm');
const deleteForm = document.getElementById('deleteEntityForm');
const createMessageElement = document.getElementById('createMessage');
const deleteMessageElement = document.getElementById('deleteMessage');

const ENDPOINT_URL = "https://673e9c9ea9bc276ec4b4ff64.mockapi.io/TestingAPi";

// Fetch and display entities
async function fetchEntities() {
  entityListElement.innerHTML = '<p>Loading...</p>';
  try {
    const response = await fetch(ENDPOINT_URL);
    if (response.ok) {
      const entities = await response.json();
      if (entities.length > 0) {
        entityListElement.innerHTML = '';
        entities.forEach(entity => {
          const entityItem = document.createElement('div');
          entityItem.className = 'entity-item';
          entityItem.innerHTML = `
            <span>ID: ${entity.id} | Name: ${entity.name}</span>
            <button class="delete-button" onclick="deleteEntity('${entity.id}')">Delete</button>
          `;
          entityListElement.appendChild(entityItem);
        });
      } else {
        entityListElement.innerHTML = '<p>No entities found.</p>';
      }
    } else {
      throw new Error('Failed to fetch entities.');
    }
  } catch (error) {
    entityListElement.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  }
}

// Create a new entity
createForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const entityName = document.getElementById('entityName').value;

  try {
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: entityName }),
    });

    if (response.ok) {
      createMessageElement.textContent = 'Entity created successfully!';
      createMessageElement.className = 'success';
      createForm.reset();
      fetchEntities(); // Refresh the entity list
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create entity.');
    }
  } catch (error) {
    createMessageElement.textContent = `Error: ${error.message}`;
    createMessageElement.className = 'error';
  }
});

// Delete an entity
async function deleteEntity(entityId) {
  if (!confirm(`Are you sure you want to delete entity ID ${entityId}?`)) return;
  try {
    const response = await fetch(`${ENDPOINT_URL}/${entityId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      deleteMessageElement.textContent = 'Entity deleted successfully!';
      deleteMessageElement.className = 'success';
      fetchEntities(); // Refresh the entity list
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unable to delete entity.');
    }
  } catch (error) {
    deleteMessageElement.textContent = `Error: ${error.message}`;
    deleteMessageElement.className = 'error';
  }
}

// Handle delete form submission
deleteForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const entityId = document.getElementById('entityId').value;
  if (entityId) {
    await deleteEntity(entityId);
    deleteForm.reset();
  }
});

// Attach event listener to fetch button
fetchButton.addEventListener('click', fetchEntities);

// Initial fetch on page load
fetchEntities();

//form to create/post new entities
//Build a way for users to delete entities
//Include a way to get entities from the API and display them
//You do NOT need update, but you can add it if you'd like
//Use Bootstrap and/or CSS to style your projectconsole.log("CRD application started");
//console.log("Using fetch and async/await to interact with the API");
//console.log("Using a form to create/post new entities");
//console.log("Building a way for users to delete entities");
//console.log("Including a way to get entities from the API and display them");
