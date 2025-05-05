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
  
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          filterHotels(filterValue);
      });
  });
  
  // Modal functionality
  const modal = document.getElementById('amenity-modal');
  const closeBtn = document.querySelector('.close-btn');
  
  closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
      if (e.target === modal) {
          modal.style.display = 'none';
      }
  });
  
  // Sample data for hotels and amenities
  const hotels = [
      {
          id: 1,
          name: 'Grand Horizon Resort',
          location: 'Mirpur, Dhaka ',
          image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
          amenities: [
              {
                  type: 'pool',
                  name: 'Infinity Pool',
                  description: 'Our stunning infinity pool offers breathtaking ocean views with a swim-up bar and comfortable loungers.',
                  images: [
                      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd',
                      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
                  ],
                  features: [
                      'Infinity edge design',
                      'Swim-up bar',
                      'Heated in winter',
                      'Sun loungers',
                      'Poolside service'
                  ],
                  status: 'available'
              },
              {
                  type: 'spa',
                  name: 'Serenity Spa',
                  description: 'Indulge in our luxurious spa treatments with expert therapists and premium products for complete relaxation.',
                  images: [
                      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
                      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
                      'https://images.unsplash.com/photo-1544168212-513c318a1b2d'
                  ],
                  features: [
                      'Massage therapies',
                      'Facials & body treatments',
                      'Couples packages',
                      'Sauna & steam room',
                      'Private treatment rooms'
                  ],
                  status: 'available'
              },
              {
                  type: 'gym',
                  name: 'Fitness Center',
                  description: 'State-of-the-art fitness equipment with personal training available and group classes throughout the week.',
                  images: [
                      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
                      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
                      'https://images.unsplash.com/photo-1571019614243-c4ccbd61cf6c'
                  ],
                  features: [
                      'Cardio machines',
                      'Weight training',
                      'Yoga studio',
                      'Personal trainers',
                      '24/7 access'
                  ],
                  status: 'available'
              }
          ]
      },
      {
          id: 2,
          name: 'Urban Heights Hotel',
          location: 'Basundhara, Dhaka',
          image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          amenities: [
              {
                  type: 'business',
                  name: 'Business Center',
                  description: 'Fully equipped business center with meeting rooms, printing services, and high-speed internet.',
                  images: [
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
                  ],
                  features: [
                      'Private workstations',
                      'Meeting rooms',
                      'Print/scan/copy',
                      'High-speed WiFi',
                      'Video conferencing'
                  ],
                  status: 'available'
              },
              {
                  type: 'dining',
                  name: 'Skyline Restaurant',
                  description: 'Fine dining with panoramic city views featuring international cuisine and an extensive wine list.',
                  images: [
                      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
                      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
                      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
                  ],
                  features: [
                      'Breakfast buffet',
                      'À la carte menu',
                      'Bar lounge',
                      'Outdoor terrace',
                      'Private dining'
                  ],
                  status: 'available'
              },
              {
                  type: 'gym',
                  name: 'Executive Fitness',
                  description: 'Compact but well-equipped fitness center with the latest cardio and strength training equipment.',
                  images: [
                      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
                      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
                      'https://images.unsplash.com/photo-1571019614243-c4ccbd61cf6c'
                  ],
                  features: [
                      'Treadmills & ellipticals',
                      'Free weights',
                      'Stretching area',
                      'Towels provided',
                      '24/7 access'
                  ],
                  status: 'unavailable'
              }
          ]
      },
      {
          id: 3,
          name: 'Beachfront Paradise',
          location: 'Gulshan, Dhaka',
          image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7',
          amenities: [
              {
                  type: 'pool',
                  name: 'Lagoon Pool',
                  description: 'Our tropical lagoon-style pool with waterfalls, caves, and a sandy beach entry for ultimate relaxation.',
                  images: [
                      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd',
                      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
                  ],
                  features: [
                      'Waterfalls',
                      'Sandy beach entry',
                      'Private cabanas',
                      'Poolside bar',
                      'Kids section'
                  ],
                  status: 'available'
              },
              {
                  type: 'spa',
                  name: 'Ocean Spa',
                  description: 'Beachfront spa with treatments using local ingredients and the sound of waves for relaxation.',
                  images: [
                      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
                      'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
                      'https://images.unsplash.com/photo-1544168212-513c318a1b2d'
                  ],
                  features: [
                      'Ocean view treatment rooms',
                      'Couples massage',
                      'Aromatherapy',
                      'Hydrotherapy',
                      'Beachfront relaxation'
                  ],
                  status: 'coming-soon'
              },
              {
                  type: 'dining',
                  name: 'Beach Grill',
                  description: 'Casual beachfront dining with fresh seafood and barbecue favorites, open for lunch and dinner.',
                  images: [
                      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
                      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
                      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
                  ],
                  features: [
                      'Fresh seafood',
                      'BBQ specialties',
                      'Cocktail bar',
                      'Beachfront seating',
                      'Sunset views'
                  ],
                  status: 'available'
              }
          ]
      }
  ];
  
  const services = [
      {
          name: 'Concierge',
          icon: 'fas fa-concierge-bell',
          description: 'Our concierge team can arrange tours, transportation, restaurant reservations and more.'
      },
      {
          name: 'Room Service',
          icon: 'fas fa-utensils',
          description: '24-hour room service with an extensive menu available for in-room dining.'
      },
      {
          name: 'Laundry',
          icon: 'fas fa-tshirt',
          description: 'Same-day laundry and dry cleaning services available with pickup from your room.'
      },
      {
          name: 'Valet Parking',
          icon: 'fas fa-parking',
          description: 'Secure valet parking service available for hotel guests.'
      },
      {
          name: 'Child Care',
          icon: 'fas fa-baby',
          description: 'Certified child care services available with advance notice.'
      },
      {
          name: 'Pet Services',
          icon: 'fas fa-paw',
          description: 'Pet-friendly accommodations with walking and sitting services available.'
      }
  ];
  
  const operatingHours = [
      {
          facility: 'Main Pool',
          weekdays: '7:00 AM - 10:00 PM',
          weekend: '7:00 AM - 11:00 PM',
          status: 'available'
      },
      {
          facility: 'Spa',
          weekdays: '9:00 AM - 8:00 PM',
          weekend: '9:00 AM - 9:00 PM',
          status: 'available'
      },
      {
          facility: 'Fitness Center',
          weekdays: '5:00 AM - 11:00 PM',
          weekend: '6:00 AM - 10:00 PM',
          status: 'available'
      },
      {
          facility: 'Business Center',
          weekdays: '6:00 AM - 9:00 PM',
          weekend: '7:00 AM - 7:00 PM',
          status: 'available'
      },
      {
          facility: 'Main Restaurant',
          weekdays: '6:30 AM - 10:30 PM',
          weekend: '7:00 AM - 11:00 PM',
          status: 'available'
      },
      {
          facility: 'Rooftop Bar',
          weekdays: '4:00 PM - 12:00 AM',
          weekend: '2:00 PM - 1:00 AM',
          status: 'unavailable'
      },
      {
          facility: 'Kids Club',
          weekdays: '8:00 AM - 6:00 PM',
          weekend: '9:00 AM - 5:00 PM',
          status: 'coming-soon'
      }
  ];
  
  // Render hotels
  function renderHotels() {
      const hotelsGrid = document.querySelector('.hotels-grid');
      hotelsGrid.innerHTML = '';
      
      hotels.forEach(hotel => {
          const hotelCard = document.createElement('div');
          hotelCard.className = 'hotel-card';
          hotelCard.innerHTML = `
              <div class="hotel-image">
                  <img src="${hotel.image}" alt="${hotel.name}">
              </div>
              <div class="hotel-info">
                  <h3>${hotel.name}</h3>
                  <p>${hotel.location}</p>
                  <button class="amenities-btn" data-hotel-id="${hotel.id}">View Amenities</button>
              </div>
          `;
          
          hotelsGrid.appendChild(hotelCard);
      });
      
      // Add event listeners to amenities buttons
      document.querySelectorAll('.amenities-btn').forEach(button => {
          button.addEventListener('click', () => {
              const hotelId = parseInt(button.getAttribute('data-hotel-id'));
              const hotel = hotels.find(h => h.id === hotelId);
              showAmenitiesModal(hotel);
          });
      });
  }
  
  // Filter hotels by amenity type
  function filterHotels(filter) {
      if (filter === 'all') {
          renderHotels();
          return;
      }
      
      const filteredHotels = hotels.filter(hotel => 
          hotel.amenities.some(amenity => amenity.type === filter)
      );
      
      const hotelsGrid = document.querySelector('.hotels-grid');
      hotelsGrid.innerHTML = '';
      
      if (filteredHotels.length === 0) {
          hotelsGrid.innerHTML = '<p class="no-results">No hotels found with this amenity type.</p>';
          return;
      }
      
      filteredHotels.forEach(hotel => {
          const hotelCard = document.createElement('div');
          hotelCard.className = 'hotel-card';
          hotelCard.innerHTML = `
              <div class="hotel-image">
                  <img src="${hotel.image}" alt="${hotel.name}">
              </div>
              <div class="hotel-info">
                  <h3>${hotel.name}</h3>
                  <p>${hotel.location}</p>
                  <button class="amenities-btn" data-hotel-id="${hotel.id}">View Amenities</button>
              </div>
          `;
          
          hotelsGrid.appendChild(hotelCard);
      });
      
      // Add event listeners to amenities buttons
      document.querySelectorAll('.amenities-btn').forEach(button => {
          button.addEventListener('click', () => {
              const hotelId = parseInt(button.getAttribute('data-hotel-id'));
              const hotel = hotels.find(h => h.id === hotelId);
              showAmenitiesModal(hotel);
          });
      });
  }
  
  // Show amenities modal
  function showAmenitiesModal(hotel) {
      const modal = document.getElementById('amenity-modal');
      const modalTitle = document.getElementById('modal-title');
      const gallery = document.getElementById('amenity-gallery');
      const description = document.getElementById('amenity-description');
      const featuresList = document.getElementById('amenity-features');
      const availabilityBadge = document.getElementById('availability-badge');
      
      // Clear previous content
      gallery.innerHTML = '';
      featuresList.innerHTML = '';
      
      // Set hotel name
      modalTitle.textContent = `${hotel.name} Amenities`;
      
      // Create a container for amenity cards
      const amenityCardsContainer = document.createElement('div');
      amenityCardsContainer.className = 'amenity-cards';
      
      // Add amenity cards
      hotel.amenities.forEach(amenity => {
          const amenityCard = document.createElement('div');
          amenityCard.className = 'amenity-card';
          amenityCard.innerHTML = `
              <h4>${amenity.name}</h4>
              <p>${amenity.description.substring(0, 100)}...</p>
              <button class="view-details-btn" data-hotel-id="${hotel.id}" data-amenity-name="${amenity.name}">View Details</button>
          `;
          
          amenityCardsContainer.appendChild(amenityCard);
      });
      
      // Add amenity cards to modal body
      const modalBody = document.querySelector('.modal-body');
      modalBody.insertBefore(amenityCardsContainer, modalBody.firstChild);
      
      // Add event listeners to view details buttons
      document.querySelectorAll('.view-details-btn').forEach(button => {
          button.addEventListener('click', () => {
              const amenityName = button.getAttribute('data-amenity-name');
              const amenity = hotel.amenities.find(a => a.name === amenityName);
              
              // Update modal with amenity details
              modalTitle.textContent = amenity.name;
              description.textContent = amenity.description;
              
              // Set availability badge
              availabilityBadge.textContent = amenity.status === 'available' ? 'Available Now' : 
                                            amenity.status === 'unavailable' ? 'Currently Unavailable' : 'Coming Soon';
              availabilityBadge.className = 'availability-badge ' + amenity.status;
              
              // Add images to gallery
              gallery.innerHTML = '';
              amenity.images.forEach(image => {
                  const img = document.createElement('img');
                  img.src = image;
                  img.alt = amenity.name;
                  gallery.appendChild(img);
              });
              
              // Add features to list
              featuresList.innerHTML = '';
              amenity.features.forEach(feature => {
                  const li = document.createElement('li');
                  li.textContent = feature;
                  featuresList.appendChild(li);
              });
              
              // Remove amenity cards container
              amenityCardsContainer.remove();
          });
      });
      
      modal.style.display = 'block';
  }
  
  // Render services
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
  
  // Render operating hours
  function renderOperatingHours() {
      const tableBody = document.querySelector('.hours-table tbody');
      tableBody.innerHTML = '';
      
      operatingHours.forEach(hours => {
          const row = document.createElement('tr');
          
          let statusClass = '';
          let statusText = '';
          
          switch(hours.status) {
              case 'available':
                  statusClass = 'status-available';
                  statusText = 'Available';
                  break;
              case 'unavailable':
                  statusClass = 'status-unavailable';
                  statusText = 'Unavailable';
                  break;
              case 'coming-soon':
                  statusClass = 'status-soon';
                  statusText = 'Opening Soon';
                  break;
          }
          
          row.innerHTML = `
              <td>${hours.facility}</td>
              <td>${hours.weekdays}</td>
              <td>${hours.weekend}</td>
              <td class="${statusClass}">${statusText}</td>
          `;
          
          tableBody.appendChild(row);
      });
  }
  
  // Initialize the page
  renderHotels();
  renderServices();
  renderOperatingHours();
});