
const gallery = document.getElementById("room-gallery");
const buttons = document.querySelectorAll(".filters button");


const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('hotel_id');

let rooms = [];


fetch(`../../MODEL/get_rooms.php?hotel_id=${hotelId}`)
  .then(response => response.json())
  .then(data => {
    rooms = data;
    renderRooms("all");
  })
  .catch(error => {
    gallery.innerHTML = "<p>Error loading rooms.</p>";
  });

function renderRooms(type = "all") {
  gallery.innerHTML = "";

  const filtered = type === "all" ? rooms : rooms.filter(r => r.type === type);

  if (filtered.length === 0) {
    gallery.innerHTML = "<p>No rooms found for this hotel.</p>";
    return;
  }

  filtered.forEach(room => {
    const card = document.createElement("div");
    card.className = "room-card";
    card.innerHTML = `
      <img src="../../${room.image}" alt="${capitalize(room.type)} Room">
      <div class="info">
        <h3>${capitalize(room.type)} Room</h3>
        <p>Price: $${room.price}</p>
        <a href="#" class="tour-btn" onclick="showTour('../../${room.image}');return false;">360° Tour</a>
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}