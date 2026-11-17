const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });
}

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const cards = Array.from(document.querySelectorAll(".restaurant-card"));
const searchInput = document.querySelector("#restaurant-search");
const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
const resultsCount = document.querySelector(".results-count");
const noResults = document.querySelector(".no-results");
let activeFilter = "all";

function updateRestaurants() {
  if (!cards.length) return;

  const query = searchInput ? searchInput.value.trim().toLocaleLowerCase("fr") : "";
  let visibleCount = 0;

  cards.forEach((card) => {
    const categories = card.dataset.categories.split(" ");
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLocaleLowerCase("fr");
    const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = !query || searchableText.includes(query);
    const isVisible = matchesFilter && matchesSearch;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (resultsCount) {
    resultsCount.textContent = `${visibleCount} ${visibleCount === 1 ? "adresse" : "adresses"} à découvrir`;
  }
  if (noResults) noResults.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("selected", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });
    updateRestaurants();
  });
});

if (searchInput) searchInput.addEventListener("input", updateRestaurants);
updateRestaurants();
