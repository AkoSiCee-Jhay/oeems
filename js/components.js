document.addEventListener("DOMContentLoaded", function () {
  loadNavbarComponent();
});

function loadNavbarComponent() {
  fetch("components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("navbarPlaceholder");
      if (placeholder) {
        placeholder.innerHTML = data;
        initNavbarInteraction();
      }
    })
    .catch((error) => {
      console.error("Error loading navbar component:", error);
    });
}

function initNavbarInteraction() {
  const burger = document.getElementById("navbarBurger");
  const menu = document.getElementById("navbarMenu");
  const dropdownButtons = document.querySelectorAll(".dropdownToggle");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen.toString());
    });
  }

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const parent = button.closest(".hasDropdown");
      const shouldOpen = !parent.classList.contains("expanded");

      document.querySelectorAll(".hasDropdown").forEach((other) => {
        other.classList.remove("expanded");
      });

      if (shouldOpen) {
        parent.classList.add("expanded");
      }
    });
  });
}
// Dynamic navbar component fetching has been disabled to prevent 404 CORS errors.
console.log("Components script initialized.");