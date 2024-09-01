const API_URL = "https://jsonplaceholder.typicode.com/posts";
const dataContainer = document.getElementById("data-container");

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    dataContainer.textContent = "Failed to load data.";
  }
}

function displayData(data) {
  console.log("data", data);
  const postsHtml = data
    .map(
      (post) => `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        </div>
    `
    )
    .join("");
  dataContainer.innerHTML = postsHtml;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

fetchData();
