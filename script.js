const input = document.getElementById("typeahead");
const suggestionsList = document.getElementById("suggestions-list");

let debounceTimeout;

// Listen for input changes
input.addEventListener("input", () => {
  clearTimeout(debounceTimeout); // clear previous timeout

  debounceTimeout = setTimeout(() => {
    const query = input.value.trim();

    // If input is empty, clear suggestions and skip fetch
    if (query === "") {
      clearSuggestions();
      return;
    }

    // Fetch suggestions from the API
    fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(suggestions => {
        updateSuggestions(suggestions);
      })
      .catch(error => {
        console.error("Failed to fetch suggestions:", error);
      });

  }, 500); // 500ms debounce delay
});

// Clears current suggestions
function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

// Updates suggestion list
function updateSuggestions(suggestions) {
  clearSuggestions();

  suggestions.forEach(term => {
    const li = document.createElement("li");
    li.textContent = term;

    // On click: fill input and clear suggestions
    li.addEventListener("click", () => {
      input.value = term;
      clearSuggestions();
    });

    suggestionsList.appendChild(li);
  });
}
