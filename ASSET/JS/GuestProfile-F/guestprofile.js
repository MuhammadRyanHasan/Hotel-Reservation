document.addEventListener('DOMContentLoaded', function() {
  
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
  
  
  setActiveTab('preference');
  
  
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
      loadStayHistory(); 
  });
  
  tabs.loyalty.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveTab('loyalty');
  });
  
  function setActiveTab(tabName) {
      
      Object.values(sections).forEach(section => {
          section.classList.remove('active');
      });
      
      
      Object.values(tabs).forEach(tab => {
          tab.classList.remove('active');
      });
      
      
      sections[tabName].classList.add('active');
      tabs[tabName].classList.add('active');
  }
  
  
  function loadStayHistory() {
      const historyList = document.querySelector('.history-list');
      const yearFilter = document.getElementById('history-year');
      const selectedYear = yearFilter ? yearFilter.value : 'all';

      
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

      
      const filteredData = selectedYear === 'all'
          ? historyData
          : historyData.filter(stay => stay.date.startsWith(selectedYear));

      
      historyList.innerHTML = '';

      
      if (filteredData.length === 0) {
          historyList.innerHTML = '<p>No stays found for this year.</p>';
      } else {
          filteredData.forEach(stay => {
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
  }
  
  
  const preferenceForm = document.getElementById('preference-form');
  if (preferenceForm) {
      preferenceForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          
          const roomType = document.getElementById('room-type').value;
          const floorPreference = document.querySelector('input[name="floor"]:checked')?.value;
          const viewPreference = document.querySelector('input[name="view"]:checked')?.value;
          const allergies = document.getElementById('allergies').value;
          
          
          const accessibilitySelect = document.getElementById('accessibility');
          const accessibilityOptions = Array.from(accessibilitySelect.selectedOptions).map(option => option.value);
          
          
          console.log('Saving preferences:', {
              roomType,
              floorPreference,
              viewPreference,
              allergies,
              accessibilityOptions
          });
          
          
          alert('Your preferences have been saved successfully!');
      });
  }
  
  
  const historyYearFilter = document.getElementById('history-year');
  if (historyYearFilter) {
      historyYearFilter.addEventListener('change', function() {
          loadStayHistory();
      });
  }
  
  
  function loadSavedPreferences() {
      
      const savedPreferences = {
          roomType: 'deluxe',
          floorPreference: 'high',
          viewPreference: 'ocean',
          allergies: 'Peanut allergy',
          accessibilityOptions: ['wheelchair', 'visual']
      };
      
      document.getElementById('room-type').value = savedPreferences.roomType;
      
      if (savedPreferences.floorPreference) {
          document.querySelector(`input[name="floor"][value="${savedPreferences.floorPreference}"]`).checked = true;
      }
      
      if (savedPreferences.viewPreference) {
          document.querySelector(`input[name="view"][value="${savedPreferences.viewPreference}"]`).checked = true;
      }
      
      document.getElementById('allergies').value = savedPreferences.allergies || '';
      
      
      const accessibilitySelect = document.getElementById('accessibility');
      savedPreferences.accessibilityOptions.forEach(optionValue => {
          const option = Array.from(accessibilitySelect.options).find(opt => opt.value === optionValue);
          if (option) {
              option.selected = true;
          }
      });
  }
  
  
  loadSavedPreferences();
});



function initPhotoUpload() {
    const uploadBtn = document.getElementById('upload-btn');
    const photoInput = document.getElementById('photo-upload');
    const removeBtn = document.getElementById('remove-photo-btn');
    const uploadProgress = document.getElementById('upload-progress');
    const photoUploadSection = document.querySelector('.photo-upload-section');

    if (!uploadBtn || !photoInput) return;

    
    uploadBtn.addEventListener('click', function() {
        photoInput.click();
    });

    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            validateAndUploadPhoto(file);
        }
    });

    
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove your profile photo?')) {
                removePhoto();
            }
        });
    }

    
    photoUploadSection.addEventListener('dragover', function(e) {
        e.preventDefault();
        photoUploadSection.classList.add('drag-over');
    });

    photoUploadSection.addEventListener('dragleave', function(e) {
        e.preventDefault();
        photoUploadSection.classList.remove('drag-over');
    });

    photoUploadSection.addEventListener('drop', function(e) {
        e.preventDefault();
        photoUploadSection.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                validateAndUploadPhoto(file);
            } else {
                showMessage('Please drop an image file only.', 'error');
            }
        }
    });
}

function validateAndUploadPhoto(file) {
    
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
        showMessage('Invalid file type. Please upload JPEG, PNG, GIF, or WebP images only.', 'error');
        return;
    }

   
    const maxSize = 5 * 1024 * 1024; 
    if (file.size > maxSize) {
        showMessage('File too large. Please upload an image smaller than 5MB.', 'error');
        return;
    }

    
    const reader = new FileReader();
    reader.onload = function(e) {
        previewPhoto(e.target.result);
    };
    reader.readAsDataURL(file);

    
    uploadPhotoToServer(file);
}

function previewPhoto(imageSrc) {
    
    const sidebarAvatar = document.querySelector('.avatar');
    if (sidebarAvatar) {
        sidebarAvatar.innerHTML = `<img src="${imageSrc}" alt="Profile Photo" class="profile-image">`;
    }

    
    const currentPhoto = document.querySelector('.current-photo');
    if (currentPhoto) {
        currentPhoto.innerHTML = `<img src="${imageSrc}" alt="Profile Photo" class="profile-photo-large">`;
    }
}

function uploadPhotoToServer(file) {
    const formData = new FormData();
    formData.append('profile_photo', file);

    const uploadProgress = document.getElementById('upload-progress');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');

    
    uploadProgress.style.display = 'block';
    progressText.textContent = 'Uploading...';

    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        progressFill.style.width = progress + '%';
    }, 200);

    fetch('../../CONTROLLER/upload_photo.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        clearInterval(progressInterval);
        progressFill.style.width = '100%';
        
        setTimeout(() => {
            uploadProgress.style.display = 'none';
            progressFill.style.width = '0%';
            
           if (data.success) {
    showMessage('Photo uploaded successfully!', 'success');
    addRemoveButton();
    
} else {
    showMessage(data.message || 'Upload failed. Please try again.', 'error');
}
        }, 500);
    })
    .catch(error => {
        clearInterval(progressInterval);
        uploadProgress.style.display = 'none';
        progressFill.style.width = '0%';
        console.error('Upload error:', error);
        showMessage('Upload failed. Please check your connection and try again.', 'error');
    });
}

function removePhoto() {
    fetch('../../CONTROLLER/remove_photo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            
            const sidebarAvatar = document.querySelector('.avatar');
            if (sidebarAvatar) {
                sidebarAvatar.innerHTML = '<i class="fas fa-user-circle"></i>';
            }

            const currentPhoto = document.querySelector('.current-photo');
            if (currentPhoto) {
                currentPhoto.innerHTML = `
                    <div class="no-photo">
                        <i class="fas fa-camera"></i>
                        <p>No photo uploaded</p>
                    </div>
                `;
            }

            
            const removeBtn = document.getElementById('remove-photo-btn');
            if (removeBtn) {
                removeBtn.remove();
            }

            showMessage('Photo removed successfully!', 'success');
        } else {
            showMessage(data.message || 'Failed to remove photo.', 'error');
        }
    })
    .catch(error => {
        console.error('Remove photo error:', error);
        showMessage('Failed to remove photo. Please try again.', 'error');
    });
}

function addRemoveButton() {
    const removeBtn = document.getElementById('remove-photo-btn');
    if (!removeBtn) {
        const uploadControls = document.querySelector('.photo-upload-controls');
        const newRemoveBtn = document.createElement('button');
        newRemoveBtn.type = 'button';
        newRemoveBtn.id = 'remove-photo-btn';
        newRemoveBtn.className = 'remove-btn';
        newRemoveBtn.innerHTML = '<i class="fas fa-trash"></i> Remove Photo';
        
        newRemoveBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove your profile photo?')) {
                removePhoto();
            }
        });
        
        uploadControls.appendChild(newRemoveBtn);
    }
}

function showMessage(message, type) {
    
    const existingMessage = document.querySelector('.upload-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    
    const messageDiv = document.createElement('div');
    messageDiv.className = `upload-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    
    const photoUploadSection = document.querySelector('.photo-upload-section');
    photoUploadSection.appendChild(messageDiv);

    
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}


document.addEventListener('DOMContentLoaded', function() {
    
    
    initPhotoUpload();
});