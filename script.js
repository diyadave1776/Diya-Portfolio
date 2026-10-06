// All table sections and the number of the table we are at now
const cafe = document.getElementById("cafe");
const tables = document.querySelectorAll(".table-section");
let current = 0;

// Moves the café view to table number i
function goTo(i) {
  if (i < 0 || i >= tables.length) return;   // stop at first/last table
  current = i;
  tables[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  document.getElementById("menu").classList.remove("show"); // close mobile menu
}

// Keep "current" correct when the visitor swipes or scrolls by hand
cafe.addEventListener("scroll", function () {
  current = Math.round(cafe.scrollLeft / cafe.clientWidth);
});

// Enter Café button -> first table (About)
document.getElementById("enterBtn").addEventListener("click", function () { goTo(1); });

// Previous / Next buttons
document.getElementById("prevBtn").addEventListener("click", function () { goTo(current - 1); });
document.getElementById("nextBtn").addEventListener("click", function () { goTo(current + 1); });

// Navbar links: each link has data-go="table number"
document.querySelectorAll("[data-go]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    goTo(Number(link.dataset.go));
  });
});

// Project modal: copy the clicked button's data-* values into the modal
document.querySelectorAll(".project-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.getElementById("modalName").textContent = btn.dataset.name;
    document.getElementById("modalDesc").textContent = btn.dataset.desc;
    document.getElementById("modalTech").textContent = btn.dataset.tech;
    document.getElementById("modalLink").href = btn.dataset.link;
  });
});

// Contact form validation.
// This is a frontend-only project (no backend), so the message is only
// checked in the browser and is NOT actually sent as an email.
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();                                   // stop page reload
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg = document.getElementById("formMsg");

  if (name === "" || email === "" || message === "") {
    msg.textContent = "Please fill in all fields.";
    msg.style.color = "red";
  } else if (!email.includes("@") || !email.includes(".")) {
    msg.textContent = "Please enter a valid email.";
    msg.style.color = "red";
  } else {
    msg.textContent = "Thank you, " + name + "! Your message is ready (demo only).";
    msg.style.color = "green";
    this.reset();
  }
});