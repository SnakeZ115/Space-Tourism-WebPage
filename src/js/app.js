const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

async function getInfo() {
    const file = './data/data.json';
    const res = await fetch(file);
    const data = await res.json();
    const { destinations } = data;
    return destinations;
}

// Destination page

const menuButtons = document.querySelectorAll('.menu button');
menuButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const destination = button.dataset.destination;
        const destinations = await getInfo();
        for (let i = 0; i < destinations.length; i++) {
            if(destinations[i].name === destination) {
                updateDOM(destinations[i]);
                break;
            }
        }
    });
});


function updateDOM(destination) {

    const destinationImg = document.querySelector('.destination-img img');
    destinationImg.src = destination.images.png;
    destinationImg.alt = `${destination.name} image`;
    
    const destinationName = document.querySelector('.destination-name');
    destinationName.textContent = destination.name;

    const destinationDesc = document.querySelector('.destination-desc');
    destinationDesc.textContent = destination.description;

    const destinationDistance = document.querySelector('.distance p');
    destinationDistance.textContent = destination.distance;

    const destinationTravelTime = document.querySelector('.travel-time p');
    destinationTravelTime.textContent = destination.travel;
}