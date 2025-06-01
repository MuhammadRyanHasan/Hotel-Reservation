

let hotels = [];

fetch('../../MODEL/get_hotels.php')
  .then(response => response.json())
  .then(data => {
    hotels = data;
    filterHotels();
  })
  .catch(error => {
    results.innerHTML = "<p>Error loading hotels.</p>";
  });

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const priceFilter = document.getElementById("priceFilter");
const priceDisplay = document.getElementById("priceDisplay");
const amenityFilters = document.querySelectorAll(".filter-amenity");

function filterHotels() {
  const searchTerm = searchInput.value.toLowerCase();
  
   

  const filtered = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm) ||
                          hotel.location.toLowerCase().includes(searchTerm);
  
    return matchesSearch ; 
  });

  showResults(filtered);
}

function showResults(hotelsList) {
  results.innerHTML = "";
  if (hotelsList.length === 0) {
    results.innerHTML = "<p>No hotels found.</p>";
    return;
  }

  hotelsList.forEach(hotel => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${hotel.name}</h3>
      <p><strong>Location:</strong> ${hotel.location}</p>
      <!--<p><strong>Price:</strong> $${hotel.price}</p>-->
      <p><strong>Rating:</strong> ${hotel.rating} ⭐</p>
      <!--<p><strong>Amenities:</strong> ${hotel.amenities ? hotel.amenities.join(", ") : ""}</p>-->
      <button class="view-rooms-btn">View Rooms</button>
      <button class="view-amenities-btn">View Amenities</button>
    `;
    card.querySelector('.view-rooms-btn').addEventListener('click', function() {
      window.location.href = `../../VIEW/Roomtypes-F/roomtype.php?hotel_id=${hotel.id}`;
    });
    card.querySelector('.view-amenities-btn').addEventListener('click', function() {
      window.location.href = `../../VIEW/AmenitiesList-F/Amenities.php?hotel_id=${encodeURIComponent(hotel.id)}`;
    });
    results.appendChild(card);
  });
}


searchInput.addEventListener("input", filterHotels);
if (priceFilter && priceDisplay) {
  priceFilter.addEventListener("input", () => {
    priceDisplay.textContent = `$${priceFilter.value}`;
    filterHotels();
  });
}
if (amenityFilters) {
  amenityFilters.forEach(cb => cb.addEventListener("change", filterHotels));
}


filterHotels();
