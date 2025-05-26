// const hotels = [
//   { name: "Grand Palace", location: "Mirpur", price: 4000, rating: 4.5, amenities: ["WiFi", "Pool"] },
//   { name: "Ocean View", location: "Gulshan", price: 15000, rating: 4.0, amenities: ["WiFi"] },
//   { name: "Mountain Lodge", location: "Banani", price: 10000, rating: 3.5, amenities: ["Breakfast", "Parking"] },
//   { name: "City Inn", location: "Uttara", price: 3000, rating: 4.1, amenities: ["WiFi", "Breakfast"] },
//   { name: "Sunset Resort", location: "Mohammadpur", price: 5500, rating: 4.8, amenities: ["WiFi", "Pool", "Parking"] },
//   { name: "The Pearl", location: "Uttara", price: 9500, rating: 4.5, amenities: ["WiFi", "Breakfast", "Parking"] },
//   { name: "City Garden", location: "Mohammadpur", price: 8500, rating: 4.2, amenities: ["Breakfast", "Pool", "Parking"] },
//   { name: "Lakeside Residency", location: "Dhanmondi", price: 10500, rating: 4.5, amenities: ["WiFi", "Pool", "Parking"] },
//   { name: "Dhaka Palace hotel", location: "Uttor Badda", price: 15000, rating: 4.8, amenities: ["WiFi", "Breakfast", "Parking"] },
//   { name: "Royal Orchid Inn", location: "Banani", price: 25000, rating: 5.0, amenities: ["WiFi", "Pool", "Parking", "Breakfast"] }
// ];

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
