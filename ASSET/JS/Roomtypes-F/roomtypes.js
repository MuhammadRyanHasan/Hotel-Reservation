const rooms = [
  {
    name: "Standard Room",
    type: "standard",
    image: "/Hotel-Reservation/ASSET/images/standard.jpg",
    description: "A cozy room with essential amenities.",
    tourLink: "/Hotel-Reservation/ASSET/images/standard.jpg"
  },
  {
    name: "Deluxe Room",
    type: "deluxe",
    image: "/Hotel-Reservation/ASSET/images/delux.jpg",
    description: "Spacious room with extra comforts.",
    tourLink: "/Hotel-Reservation/ASSET/images/delux.jpg"
  },
  {
    name: "Suite Room",
    type: "suite",
    image: "/Hotel-Reservation/ASSET/images/suite.jpg",
    description: "Luxurious suite with premium features.",
    tourLink: "/Hotel-Reservation/ASSET/images/suite.jpg"
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
       <a href="#" class="tour-btn" onclick="showTour('${room.image}')">360° Tour</a>
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

function showTour(image) {
  pannellum.viewer('panorama', {
    "type": "equirectangular",
    "panorama": image,
    "autoLoad": true
  });
}

renderRooms();
