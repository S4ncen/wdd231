// Define the URL of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the div element with id 'cards'
const cards = document.querySelector('#cards');

// Create an asynchronous function to fetch the JSON data
async function getProphetData() {
    // Fetch the data from the URL
    const response = await fetch(url);

    // Convert the response into a JSON object
    const data = await response.json();

    // Call displayProphets function and pass the 'prophets' array
    displayProphets(data.prophets);
}

// Define the displayProphets function as an arrow function
const displayProphets = (prophets) => {
    // Use forEach loop to process each prophet record
    prophets.forEach((prophet) => {
        // Create a section element for the card
        const card = document.createElement('section');
        card.classList.add('prophet-card');

        // Create the h2 element for the prophet's full name
        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Create the img element for the prophet's portrait
        const portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `${prophet.name} ${prophet.lastname} portrait`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '300');

        // Add other information
        const birthdate = document.createElement('p');
        birthdate.textContent = `Birthdate: ${prophet.birthdate}`;

        const birthplace = document.createElement("p");
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Append the h2, img, and other details to the card section
        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);


        // Append the card to the "cards" div
        cards.appendChild(card);
    });
}

// Call the function to test the fetch and response
getProphetData();