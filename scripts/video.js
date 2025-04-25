function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log("Error:-", err));
}

// Displaying Categories:----

function displayCategories(categories) {
  // console.log(categories);
  const ctg = document.getElementById("categories-btn");
  categories.forEach((item) => {
    // console.log(item);
    const ctgbtn = document.createElement("button");
    ctgbtn.classList = "btn";
    ctgbtn.innerText = item.category;
    ctg.appendChild(ctgbtn);
  });
}

loadCategories();

// Load Videos & Display them:---------------------

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log("Error:-", err));
}

function displayVideos(video) {
  // console.log(video);
  const videoSec = document.getElementById("videos");
  video.forEach((vcard) => {
    // console.log(vcard); -- getting each videos
    const videoCard = document.createElement("div");
    videoCard.classList = "card bg-base-100";
    videoCard.innerHTML = `
    <figure>
    <img
      src=${vcard.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;
    videoSec.appendChild(videoCard);
  });
}

loadVideos();
