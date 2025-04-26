function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSec = time % 3600;
  // console.log(remainingSec);
  const minute = parseInt(remainingSec / 60);
  // console.log(minute);
  remainingSec = remainingSec % 60;
  return `${hour}h ${minute} mins ${remainingSec} secs`;
}
function removeactiveClass() {
  const buttons = document.getElementsByClassName("ctg-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}

function loaadctgVideos(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeactiveClass(); //removing active class;
      const actvbtn = document.getElementById(`btn-${id}`);
      console.log(actvbtn);
      actvbtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((err) => console.log("Error:-", err));
}

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
    const ctgbtn = document.createElement("div");
    // ctgbtn.classList = "btn";
    // ctgbtn.innerText = item.category;
    ctgbtn.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loaadctgVideos(${item.category_id})" class="btn ctg-btn">
    ${item.category}
    </button>
    `;
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
  videoSec.innerHTML = "";
  if (video.length === 0) {
    videoSec.innerHTML = `No Content Here`;
    return;
  }
  video.forEach((vcard) => {
    console.log(vcard); // -- getting each videos
    const videoCard = document.createElement("div");
    videoCard.classList = "card bg-base-100";
    videoCard.innerHTML = `
    <figure class="h-[13rem] relative">
    <img
    class="w-full object-cover"
      src=${vcard.thumbnail}
      alt="Shoes" />
      ${
        vcard.others.posted_date?.length === 0
          ? ""
          : `<span class="right-2 bottom-2 absolute bg-black text-white rounded p-1">
          ${getTime(vcard.others.posted_date)}
        </span>`
      }
  </figure>
  <div class="pt-4 flex items-center gap-3">
    <div>
    <img class="w-10 h-10 object-cover rounded-full" src=${
      vcard.authors[0].profile_picture
    }/>
    </div>
   <div>
    <div>
    <h2 class="font-bold">${vcard.title}</h2>
    </div>
    <div class="flex items-center gap-2">
    <p class="">${vcard.authors[0].profile_name}</p>
    <div>
    ${
      vcard.authors[0].verified === true
        ? '<i class="fa-solid fa-certificate"></i>'
        : ""
    }
    </div>
    </div>
   </div>
   </div>
    `;
    videoSec.appendChild(videoCard);
  });
}

loadVideos();
