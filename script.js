// Select HTML elements
const searchResultsContainer = document.querySelector('.search-results');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const resetBtn = document.querySelector('#resetBtn');
const clearBtn = document.querySelector('#clearBtn');

// Fetch travel data from the JSON file
let travelData = [];

fetch('see_love_travel_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        travelData = data; // Store the fetched data
        console.log(travelData); // Log data for debugging
    })
    .catch(error => {
        console.error('Fetch operation failed:', error);
    });

// Function to display travel recommendations
function displayRecommendations(recommendations) {
    // Clear any existing content
    searchResultsContainer.innerHTML = '';

    if (recommendations.length > 0) {
        recommendations.forEach(recommendation => {
            const recommendationCard = document.createElement('div');
            recommendationCard.classList.add('recommendation-card');
            
            recommendationCard.innerHTML = `
                <img src="${recommendation.imageUrl}" alt="${recommendation.name}">
                <h3>${recommendation.name}</h3>
                <p>${recommendation.description}</p>
            `;

            searchResultsContainer.appendChild(recommendationCard);
        });
    } else {
        searchResultsContainer.innerHTML = '<p>No results found for your search.</p>';
    }
}

// Function to handle keyword search
function handleSearch() {
    const searchQuery = searchInput.value.toLowerCase().trim();

    if (searchQuery === '') {
        searchResultsContainer.innerHTML = '<p>Please enter a keyword to search.</p>';
        return;
    }

    // Keyword variations for beaches, temples, and countries
    const keywords = {
        beach: ['beach', 'beaches'],
        temple: ['temple', 'temples'],
        country: ['country', 'countries']
    };

    // Filter recommendations based on the search query
    const filteredRecommendations = travelData.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchQuery);
        const descriptionMatch = item.description.toLowerCase().includes(searchQuery);

        const keywordMatch = (
            keywords.beach.includes(searchQuery) && item.description.toLowerCase().includes('beach') ||
            keywords.temple.includes(searchQuery) && item.description.toLowerCase().includes('temple') ||
            keywords.country.includes(searchQuery) && item.description.toLowerCase().includes('country')
        );

        return nameMatch || descriptionMatch || keywordMatch;
    });

    // Display the filtered recommendations
    displayRecommendations(filteredRecommendations);
}

// Function to clear search results
function clearResults() {
    searchResultsContainer.innerHTML = ''; // Clear the search results
}

// Event listeners
searchBtn.addEventListener('click', handleSearch); // Search button listener
resetBtn.addEventListener('click', () => {
    searchInput.value = ''; // Clear the input field
    searchResultsContainer.innerHTML = ''; // Clear the search results
});
clearBtn.addEventListener('click', clearResults); // Clear button listener (only clears results)
