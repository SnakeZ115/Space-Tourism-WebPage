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
        default:
            break;
    }

}

// Destination page

const menuButtons = document.querySelectorAll('.menu button');
menuButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();
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

// Crew page

const paginationButtons = document.querySelectorAll('.pagination span');
paginationButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const activeButton = document.querySelector('.active');
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

    const memberImg = document.querySelector('.crew-img img')
    memberImg.src = member.images.png;
    memberImg.alt = `${member.name} image`;
}