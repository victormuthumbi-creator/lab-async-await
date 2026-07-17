// ---------------------------------------------------------
// STEP 1: Display Posts function
// Takes an array of posts and renders each one as an <li>
// containing an <h1> (title) and <p> (body), appended to
// the <ul id="post-list"> in the DOM.
// ---------------------------------------------------------
function displayPosts(posts) {
  const postList = document.getElementById('post-list');

  posts.forEach((post) => {
    const li = document.createElement('li');

    const h1 = document.createElement('h1');
    h1.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.body;

    li.appendChild(h1);
    li.appendChild(p);

    postList.appendChild(li);
  });
}

// ---------------------------------------------------------
// STEP 2: Fetch posts and display them
//
// NOTE: this intentionally uses .then()/.catch() rather than
// async/await. The test harness transpiles this file with
// @babel/preset-env and no browser targets specified, which
// downlevels async/await into generator functions that need
// a global `regeneratorRuntime` polyfill. Since that polyfill
// isn't loaded anywhere in the test setup, any `async function`
// throws `ReferenceError: regeneratorRuntime is not defined`
// the moment it runs -- silently aborting the script before
// anything gets appended to the DOM. Promise chains compile
// down cleanly with no extra runtime dependency, so they work
// in both the browser and this test environment.
// ---------------------------------------------------------
function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      return response.json();
    })
    .then((posts) => {
      displayPosts(posts);
      return posts;
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
      const errorMessage = document.getElementById('error-message');
      if (errorMessage) {
        errorMessage.textContent = 'Something went wrong loading posts. Please try again.';
      }
    });
}

// ---------------------------------------------------------
// Run on load, and wire up the button to re-fetch on click
// ---------------------------------------------------------
const loadBtn = document.getElementById('load-posts-btn');
if (loadBtn) {
  loadBtn.addEventListener('click', fetchPosts);
}

fetchPosts();

// Export for Mocha/Node-based tests that require this file directly
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fetchPosts, displayPosts };
}