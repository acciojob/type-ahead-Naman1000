const typeahead = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');
let timeoutId;

typeahead.addEventListener('input', () => {
    const query = typeahead.value.trim();

    // Clear previous timeout
    clearTimeout(timeoutId);

    // Don't make an API request if the input is empty
    if (query === '') {
        suggestionsList.innerHTML = '';
        return;
    }

    // Set a timeout to debounce the API request
    timeoutId = setTimeout(() => {
        fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous suggestions
                suggestionsList.innerHTML = '';

                // Display new suggestions
                data.forEach(term => {
                    const li = document.createElement('li');
                    li.textContent = term;
                    li.addEventListener('click', () => {
                        typeahead.value = term; // Fill input with clicked suggestion
                        suggestionsList.innerHTML = ''; // Clear suggestions
                    });
                    suggestionsList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching suggestions:', error);
            });
    }, 500); // Debounce time of 500ms
});