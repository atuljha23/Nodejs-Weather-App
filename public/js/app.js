const weatherForm = document.querySelector('form')
const searchterm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#dynamic')

// Add forecast images from the API
function appendImage(imageSource, Id) {
    var imagecount = document.getElementById('image').childNodes.length;
    var img = document.createElement("IMG");
    img.setAttribute("id", imagecount + 1);
    img.src = imageSource;
    document.getElementById(Id).appendChild(img);
}
function removeImage(ImageId) {
    var elem = document.getElementById(ImageId);
    elem.parentElement.removeChild(elem);
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchterm.value;
    // Try catch method to avoid app to crash if no image is availalbe to delete on first session.
    try {
        removeImage("1");
    }
    catch (e) {
        console.log('First session, no image deletion required.')
    }
    messageOne.textContent = 'Loading.....';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = `Error: ${data.error}`;
                messageTwo.textContent = `Forecast: Error Try again!!`;
                messageThree.textContent = `Local Time: Error Try again!!`;
            }
            else {
                appendImage(data.forecast.image, "image")
                messageOne.textContent = `Location: ${data.location}`;
                messageTwo.textContent = `Forecast: ${data.forecast.forecastTemp}`;
                // messageThree.textContent = `Local Time: ${data.forecast.forecastTime}`;
            }
        })
    })
})