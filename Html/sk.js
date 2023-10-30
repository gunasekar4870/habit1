// Get the search bar input element
const input = document.querySelector('#search-bar input');

// Add an event listener to the input element for the `keyup` event
input.addEventListener('keyup', (event) => {
  // Get the search query from the input element
  const query = event.target.value;

  // Make an AJAX request to the Instagram API to search for posts with the given query
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.instagram.com/v1/search/?q=${query}`);
  xhr.onload = function() {
    // Get the response from the Instagram API
    const response = JSON.parse(this.responseText);

    // Get the posts from the response
    const posts = response.data;

    // Display the posts in the search results
    const results = document.querySelector('#search-results');
    results.innerHTML = '';
    for (const post of posts) {
      const result = document.createElement('div');
      result.classList.add('result');
      result.innerHTML = `
        <img src="${post.images.thumbnail.url}" />
        <p>${post.caption}</p>
      `;
      results.appendChild(result);
    }
  };

  // Send the AJAX request
  xhr.send();
});
