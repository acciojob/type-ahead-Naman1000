//your JS code here. If required.
const input = document.getElementById("typeahead");
const suggestionsList = document.getElementById("suggestions-list");

let timeoutId;

// Debounced input handler
input.addEventListener("input", () => {
  // Clear previous timer
  clearTimeout(timeoutId);

  // Debounce logic - wait 500ms after typing stops
  timeoutId = setTimeout(async () => {
    const query = input.value.trim();

    // If input is empty, clear suggestions and stop
    if (query === "") {
      clearSuggestions();
      return;
    }

    try {
      const response = await fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${encodeURIComponent(query)}`);
      const suggestions = await response.json();

      updateSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }, 500);
});

// Clear suggestions list
function clearSuggestions() {
  suggestionsList.innerHTML = "";
}

// Add suggestions to the list
function updateSuggestions(suggestions) {
  clearSuggestions();

  suggestions.forEach((term) => {
    const li = document.createElement("li");
    li.textContent = term;

    // When user clicks a suggestion
    li.addEventListener("click", () => {
      input.value = term;
      clearSuggestions();
    });

    suggestionsList.appendChild(li);
  });
}
