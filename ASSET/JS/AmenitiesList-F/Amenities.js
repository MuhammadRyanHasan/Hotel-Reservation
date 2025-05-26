document.addEventListener('DOMContentLoaded', function() {

  
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          button.classList.add('active');
          const tabId = button.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });

  
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = urlParams.get('hotel_id');

  if (!hotelId) {
        console.error('No hotel ID provided');
        return;
    }

  let amenities = [];

  
  fetch(`../../MODEL/get_hotel_amenities.php?hotel_id=${hotelId}`)
    .then(response => response.json())
    .then(data => {
      amenities = data;
      renderAmenities();
      renderOperatingHours();
    })
    .catch(error => {
      const amenitiesGrid = document.querySelector('.amenities-grid');
      amenitiesGrid.innerHTML = '<p class="no-results">Error loading amenities.</p>';
    });

  
//   const services = [
//       { name: 'Concierge', icon: 'fas fa-concierge-bell', description: 'Our concierge team can arrange tours, transportation, restaurant reservations and more.' },
//       { name: 'Room Service', icon: 'fas fa-utensils', description: '24-hour room service with an extensive menu available for in-room dining.' },
//       { name: 'Laundry', icon: 'fas fa-tshirt', description: 'Same-day laundry and dry cleaning services available with pickup from your room.' },
//       { name: 'Valet Parking', icon: 'fas fa-parking', description: 'Secure valet parking service available for hotel guests.' },
//       { name: 'Child Care', icon: 'fas fa-baby', description: 'Certified child care services available with advance notice.' },
//       { name: 'Pet Services', icon: 'fas fa-paw', description: 'Pet-friendly accommodations with walking and sitting services available.' }
//   ];

  
  function renderAmenities(filter = 'all') {
      const amenitiesGrid = document.querySelector('.amenities-grid');
      amenitiesGrid.innerHTML = '';

      let filteredAmenities = amenities;
      if (filter !== 'all') {
    filteredAmenities = amenities.filter(a => a.amenities_type.toLowerCase() === filter.toLowerCase());
}

      if (filteredAmenities.length === 0) {
          amenitiesGrid.innerHTML = '<p class="no-results">No amenities found for this category.</p>';
          return;
      }

      filteredAmenities.forEach(amenity => {
          const card = document.createElement('div');
          card.className = 'hotel-card';
          card.innerHTML = `
              <div class="hotel-info">
                  <h3>${amenity.name}</h3>
                  <p>${amenity.description ? amenity.description.substring(0, 80) : ''}...</p>
                  <button class="amenities-btn" data-amenity-name="${amenity.name}">View Details</button>
              </div>
          `;
          amenitiesGrid.appendChild(card);
      });

      
      document.querySelectorAll('.amenities-btn').forEach(button => {
          button.addEventListener('click', () => {
              const amenityName = button.getAttribute('data-amenity-name');
              const amenity = amenities.find(a => a.name === amenityName);
              showAmenitiesModal(amenity);
          });
      });
  }

  
  document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          const filterValue = button.getAttribute('data-filter');
          renderAmenities(filterValue);
      });
  });

  
  const modal = document.getElementById('amenity-modal');
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

  function showAmenitiesModal(amenity) {
      const modalTitle = document.getElementById('modal-title');
      const gallery = document.getElementById('amenity-gallery');
      const description = document.getElementById('amenity-description');
      const featuresList = document.getElementById('amenity-features');
      const availabilityBadge = document.getElementById('availability-badge');

      
      modalTitle.textContent = amenity.name;
      description.textContent = amenity.description || '';
      availabilityBadge.textContent = 'Available Now';
      availabilityBadge.className = 'availability-badge available';

      
      gallery.innerHTML = '';
      
      featuresList.innerHTML = '';
      

      modal.style.display = 'block';
  }

  
  function renderServices() {
      const servicesList = document.querySelector('.services-list');
      servicesList.innerHTML = '';
      services.forEach(service => {
          const serviceCard = document.createElement('div');
          serviceCard.className = 'service-card';
          serviceCard.innerHTML = `
              <h3><i class="${service.icon}"></i> ${service.name}</h3>
              <p>${service.description}</p>
          `;
          servicesList.appendChild(serviceCard);
      });
  }

  
  function renderOperatingHours() {
    const tableBody = document.querySelector('.hours-table tbody');
    tableBody.innerHTML = '';

    amenities.forEach(amenity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${amenity.name}</td>
            <td>${amenity.weekday_hours || '-'}</td>
            <td>${amenity.weekend_hours || '-'}</td>
            <td class="status-available">Available</td>
        `;
        tableBody.appendChild(row);
    });
  }

  
  renderServices();
  renderOperatingHours();
});