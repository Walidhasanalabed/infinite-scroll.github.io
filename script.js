const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apikey = "JeFdZaqp1gc3JCX6PnDQ0YUVhp1aE-HVSZiuGBdJw9E";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${initialCount}`;

// Updating the API url with new count of scroll
function updateAPIURLWithNewCount(picCount) {
  `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // Change the background image to the latest loaded image
    // const latestPhoto = photosArray[totalImages - 1];
    // document.getElementById(
    //   "background-container"
    // ).style.backgroundImage = `url('${latestPhoto.urls.regular}')`;
  }
}

// Help Function To Set Attributes On DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add To DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Set the first image as the background image
  const firstPhoto = photosArray[0];
  document.getElementById(
    "background-container"
  ).style.backgroundImage = `url('${firstPhoto.urls.regular}')`;

  // Run function for each method object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, Check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos unsplash API
async function getphotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // catch errors
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getphotos();
  }
});

// On load
getphotos();
