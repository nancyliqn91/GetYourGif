import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getGif(word) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${word}&rating=g`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response);
    } else {
      printError(this, response, word);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse) {
 
  // const url = `${apiResponse.data.images.url}`;
  // fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       const gifUrl = data.data.image_url;
  //       document.getElementById('gifImage').src = gifUrl;
  //     })
  // document.getElementById('gifImage').src = gifUrl;

  const gifUrl = `${apiResponse.data.images.downsized.url}`;
  const gifImage = new Image();
  gifImage.src = gifUrl;
  gifImage.alt = "GIF";
  document.getElementById('gifImageContainer').appendChild(gifImage); 
}

function printError(request, apiResponse, word) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${word}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const word = document.querySelector('#gif').value;
  document.querySelector('#gif').value = null;
  getGif(word);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});