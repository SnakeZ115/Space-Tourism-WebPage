const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

async function getInfo(section) {
    const file = './data/data.json';
    const res = await fetch(file);
    const data = await res.json();
    switch (section) {
        case "destinations":
            const { destinations } = data;
            return destinations;
        case "crew":
            const { crew } = data;
            return crew;
        case "technology":
            const { technology } = data;
            return technology;
        default:
            break;
    }

}

window.addEventListener('DOMContentLoaded', async () => {
    const page = document.body.className;
    switch (page) {
        case "destination-page":
            const destinations = await getInfo("destinations");
            updateDestination(destinations[0]);
            break;
        case "crew-page":
            const crew = await getInfo("crew");
            updateMember(crew[0]);
            break;
        case "technology-page":
            const technology = await getInfo("technology");
            updateTechnology(technology[0]);
            break;
        default:
            break;
    }
});

// Destination page

const menuButtons = document.querySelectorAll('.menu button');
menuButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
        const activeButton = document.querySelector('button.active');
        console.log(activeButton);
        activeButton.classList.remove('active');
        button.classList.add('active');
        const destination = button.dataset.destination;
        const destinations = await getInfo("destinations");
        for (let i = 0; i < destinations.length; i++) {
            if(destinations[i].name === destination) {
                updateDestination(destinations[i]);
                break;
            }
        }
    });
});


function updateDestination(destination) {

    const destinationImg = document.querySelector('.destination-img');
    destinationImg.innerHTML = `
        <source srcset="${destination.images.webp}" type="image/webp">
        <img src="${destination.images.png}" alt="${destination.name} image">
    `;
    
    const destinationName = document.querySelector('.destination-name');
    destinationName.textContent = destination.name;

    const destinationDesc = document.querySelector('.destination-desc');
    destinationDesc.textContent = destination.description;

    const destinationDistance = document.querySelector('.distance p');
    destinationDistance.textContent = destination.distance;

    const destinationTravelTime = document.querySelector('.travel-time p');
    destinationTravelTime.textContent = destination.travel;

}

// Crew page

const paginationButtons = document.querySelectorAll('.pagination span');
paginationButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const activeButton = document.querySelector('span.active');
        activeButton.classList.remove('active');
        button.classList.add('active');
        const member = button.dataset.crew;
        const members = await getInfo("crew");
        updateMember(members[member]);
    });
});

function updateMember(member) {
    const memberRole = document.querySelector('.crew-role');
    memberRole.textContent = member.role;

    const memberName = document.querySelector('.crew-name');
    memberName.textContent = member.name;

    const memberBio = document.querySelector('.crew-desc');
    memberBio.textContent = member.bio;

    const memberImg = document.querySelector('.crew-img');
    memberImg.innerHTML = `
        <source srcset="${member.images.webp}" type="image/webp">
        <img src="${member.images.png}" alt="${member.name} image">
    `;
}

// Technology page

const techPagination = document.querySelectorAll('.technology-pagination span');
techPagination.forEach(button => {
    button.addEventListener('click', async () => {
        const activeButton = document.querySelector('span.active');
        activeButton.classList.remove('active');
        button.classList.add('active');
        const tech = button.dataset.tech;
        const techs = await getInfo("technology");
        updateTechnology(techs[tech]);
    });
});

function updateTechnology(technology) {
    const technologyImg = document.querySelector('.technology-img img');
    const mq = window.matchMedia("(min-width: 1200px)"); // media querie for js
    if(mq.matches) {
        technologyImg.src = technology.images.portrait;
    } else {
        technologyImg.src = technology.images.landscape;
    }
    technologyImg.alt = `${technology.name} image`;

    const technologyName = document.querySelector('.technology-desc h2');
    technologyName.textContent = technology.name;

    const technologyDesc = document.querySelector('.technology-desc p');
    technologyDesc.textContent = technology.description;
}

const mq = window.matchMedia("(min-width: 1200px)");

mq.addEventListener("change", async (e) => {
    const active = document.querySelector('.active');
    const data = await getInfo("technology");
    const img = document.querySelector('.technology-img img');
    if (e.matches) {
        img.src = data[active.dataset.tech].images.portrait;
    } else {
        img.src = data[active.dataset.tech].images.landscape;
    }
});
