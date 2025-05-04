document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  const tabs = {
      profile: document.getElementById('profile-tab'),
      preference: document.getElementById('preference-tab'),
      history: document.getElementById('history-tab'),
      loyalty: document.getElementById('loyalty-tab')
  };
  
  const sections = {
      profile: document.getElementById('user-profile'),
      preference: document.getElementById('preference-center'),
      history: document.getElementById('stay-history'),
      loyalty: document.getElementById('loyalty-dashboard')
  };
  
  // Set initial active tab
  setActiveTab('preference');
  
  // Add event listeners for tabs
  tabs.profile.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveTab('profile');
  });
  
  tabs.preference.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveTab('preference');
  });
  
  tabs.history.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveTab('history');
      loadStayHistory(); // Load history data when tab is clicked
  });
  
  tabs.loyalty.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveTab('loyalty');
  });
  
  function setActiveTab(tabName) {
      // Hide all sections
      Object.values(sections).forEach(section => {
          section.classList.remove('active');
      });
      
      // Remove active class from all tabs
      Object.values(tabs).forEach(tab => {
          tab.classList.remove('active');
      });
      
      // Show selected section and mark tab as active
      sections[tabName].classList.add('active');
      tabs[tabName].classList.add('active');
  }
  
  // Load stay history data
  function loadStayHistory() {
      const historyList = document.querySelector('.history-list');
      
      // Simulated data - in a real app, this would come from an API
      const historyData = [
          {
              id: 1,
              hotel: 'Grand Horizon ',
              date: '2023-05-15 to 2023-05-20',
              room: 'Deluxe King Room',
              nights: 5,
              points: 2500
          },
          {
              id: 2,
              hotel: 'KIngLake',
              date: '2023-03-10 to 2023-03-12',
              room: 'Standard Double Room',
              nights: 2,
              points: 800
          },
          {
              id: 3,
              hotel: 'Red Esion',
              date: '2022-11-22 to 2022-11-25',
              room: 'Deluxe Suite',
              nights: 3,
              points: 1500
          },
          {
              id: 4,
              hotel: 'Grand Palace',
              date: '2022-08-05 to 2022-08-10',
              room: 'Standard King Room',
              nights: 5,
              points: 1750
          }
      ];
      
      // Clear existing content
      historyList.innerHTML = '';
      
      // Add history items
      historyData.forEach(stay => {
          const stayItem = document.createElement('div');
          stayItem.className = 'history-item';
          stayItem.innerHTML = `
              <h3>${stay.hotel}</h3>
              <p class="date">${stay.date} (${stay.nights} nights)</p>
              <p>Room: ${stay.room}</p>
              <p>Points earned: <strong>${stay.points}</strong></p>
          `;
          historyList.appendChild(stayItem);
      });
  }
  
  // Form submission for preferences
  const preferenceForm = document.getElementById('preference-form');
  if (preferenceForm) {
      preferenceForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const roomType = document.getElementById('room-type').value;
          const floorPreference = document.querySelector('input[name="floor"]:checked')?.value;
          const viewPreference = document.querySelector('input[name="view"]:checked')?.value;
          const allergies = document.getElementById('allergies').value;
          
          // Get multiple select values
          const accessibilitySelect = document.getElementById('accessibility');
          const accessibilityOptions = Array.from(accessibilitySelect.selectedOptions).map(option => option.value);
          
          // In a real app, you would send this data to the server
          console.log('Saving preferences:', {
              roomType,
              floorPreference,
              viewPreference,
              allergies,
              accessibilityOptions
          });
          
          // Show success message
          alert('Your preferences have been saved successfully!');
      });
  }
  
  // Filter history by year
  const historyYearFilter = document.getElementById('history-year');
  if (historyYearFilter) {
      historyYearFilter.addEventListener('change', function() {
          // In a real app, this would filter the data from the server
          console.log('Filtering by year:', this.value);
          // For this demo, we'll just reload the same data
          loadStayHistory();
      });
  }
  
  // Load any saved preferences (simulated)
  function loadSavedPreferences() {
      // In a real app, this would come from the server
      const savedPreferences = {
          roomType: 'deluxe',
          floorPreference: 'high',
          viewPreference: 'ocean',
          allergies: 'Peanut allergy',
          accessibilityOptions: ['wheelchair', 'visual']
      };
      
      // Set form values
      document.getElementById('room-type').value = savedPreferences.roomType;
      
      if (savedPreferences.floorPreference) {
          document.querySelector(`input[name="floor"][value="${savedPreferences.floorPreference}"]`).checked = true;
      }
      
      if (savedPreferences.viewPreference) {
          document.querySelector(`input[name="view"][value="${savedPreferences.viewPreference}"]`).checked = true;
      }
      
      document.getElementById('allergies').value = savedPreferences.allergies || '';
      
      // Set multiple select options
      const accessibilitySelect = document.getElementById('accessibility');
      savedPreferences.accessibilityOptions.forEach(optionValue => {
          const option = Array.from(accessibilitySelect.options).find(opt => opt.value === optionValue);
          if (option) {
              option.selected = true;
          }
      });
  }
  
  // Load saved preferences when page loads
  loadSavedPreferences();
});