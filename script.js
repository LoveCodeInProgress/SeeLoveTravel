// Select HTML elements
const searchResultsContainer = document.querySelector('.search-results');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const resetBtn = document.querySelector('#resetBtn');
const clearBtn = document.querySelector('#clearBtn');

// Fetch travel data from the JSON file
let travelData = [];

fetchData();

async function fetchData() {
    console.log("fetching");
    try {
      const response = await fetch("see_love_travel_api.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      travelData = data;
      console.log(travelData);
    } catch (error) {
      console.error("Fetch operation failed:", error);
    }
  }

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

function handleSearch() {
    const keyword = searchInput.value.toLowerCase().trim();

    if (keyword === '') {
        searchResultsContainer.innerHTML = '<p>Please enter a keyword to search.</p>';
        return;
    }

    // Filter recommendations based on the search query
    let results = [];

    if (keyword === "beach" || keyword === "beaches") {
        console.log("Beach");
        results = travelData.beaches;
    } else if (keyword === "temple" || keyword === "temples") {
        results = travelData.temples;
    } else {
        travelData.countries.forEach((country) => {
            if (country.name.toLowerCase().includes(keyword)) {
                results.push(...country.cities);
            }
        });
    }

    // Display the filtered recommendations
    displayRecommendations(results);
}


    // Display the filtered recommendations
    displayRecommendations(results);
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

