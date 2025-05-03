const rooms = [
  {
    name: "Standard Room",
    type: "standard",
    image: "https://via.placeholder.com/400x200?text=Standard+Room",
    description: "A cozy room with essential amenities.",
    tourLink: "#"
  },
  {
    name: "Deluxe Room",
    type: "deluxe",
    image: "https://via.placeholder.com/400x200?text=Deluxe+Room",
    description: "Spacious room with extra comforts.",
    tourLink: "#"
  },
  {
    name: "Suite Room",
    type: "suite",
    image: "https://via.placeholder.com/400x200?text=Suite+Room",
    description: "Luxurious suite with premium features.",
    tourLink: "#"
  },
  {
    name: "Family Suite",
    type: "suite",
    image: "https://via.placeholder.com/400x200?text=Family+Suite",
    description: "Ideal for family stays with full amenities.",
    tourLink: "#"
  }
];

const gallery = document.getElementById("room-gallery");
const buttons = document.querySelectorAll(".filters button");

function renderRooms(type = "all") {
  gallery.innerHTML = "";

  const filtered = type === "all" ? rooms : rooms.filter(r => r.type === type);

  filtered.forEach(room => {
    const card = document.createElement("div");
    card.className = "room-card";
    card.innerHTML = `
      <img src="${room.image}" alt="${room.name}">
      <div class="info">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <a href="${room.tourLink}" class="tour-btn">360° Tour</a>
      </div>
    `;
    gallery.appendChild(card);
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderRooms(btn.getAttribute("data-type"));
  });
});

renderRooms();
