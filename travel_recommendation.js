const searchForm = document.getElementById('searchForm');
const resultsDiv = document.getElementById('countries');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = searchForm.querySelector('input[name="search"]').value.toLowerCase();

  fetch('./travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
      const filteredResults = [];

      // Filter all categories based on searchTerm
      data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchTerm) ||
          country.cities.some(city => city.name.toLowerCase().includes(searchTerm))) {
          filteredResults.push(country);
        }
      });
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchTerm)) {
          filteredResults.push(temple);
        }
      });
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchTerm)) {
          filteredResults.push(beach);
        }
      });

      // Clear previous results
      resultsDiv.innerHTML = '';

      // Display filtered results in cards
      filteredResults.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        // Add card content (name, image, description)
        card.innerHTML = `
          <h3>${result.name}</h3>
          <img src="${result.imageUrl}" alt="${result.name}">
          <p>${result.description}</p>
        `;

        resultsDiv.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

searchForm.addEventListener('reset', (event) => {
  event.preventDefault();
  filteredResults.length =0;
})
