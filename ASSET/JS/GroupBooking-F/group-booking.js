document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons and tabs
          tabButtons.forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('.gb-tab-content').forEach(tab => {
              tab.classList.remove('active');
          });
          
          // Add active class to clicked button and corresponding tab
          this.classList.add('active');
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('active');
      });
  });

  // Data storage
  let groups = [];
  let roomBlocks = [];
  let events = [];

  // DOM Elements
  const groupForm = document.getElementById('group-form');
  const groupsTable = document.getElementById('groups-table').getElementsByTagName('tbody')[0];
  const selectGroupDropdowns = document.querySelectorAll('#select-group, #event-group');
  const addRoomBlockBtn = document.getElementById('add-room-block');
  const roomBlocksList = document.getElementById('room-blocks-list');
  const addEventBtn = document.getElementById('add-event');
  const eventsList = document.getElementById('events-list');

  // Group Form Submission
  groupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const group = {
          id: Date.now().toString(),
          name: document.getElementById('group-name').value,
          contact: document.getElementById('group-contact').value,
          email: document.getElementById('group-email').value,
          phone: document.getElementById('group-phone').value,
          arrival: document.getElementById('group-arrival').value,
          departure: document.getElementById('group-departure').value,
          rooms: document.getElementById('group-rooms').value,
          paymentTerms: document.getElementById('payment-terms').value
      };
      
      groups.push(group);
      renderGroupsTable();
      updateGroupDropdowns();
      groupForm.reset();
  });

  // Render Groups Table
  function renderGroupsTable() {
      groupsTable.innerHTML = '';
      
      if (groups.length === 0) {
          const row = groupsTable.insertRow();
          const cell = row.insertCell(0);
          cell.colSpan = 6;
          cell.textContent = 'No groups created yet.';
          return;
      }
      
      groups.forEach(group => {
          const row = groupsTable.insertRow();
          
          row.insertCell(0).textContent = group.name;
          row.insertCell(1).textContent = group.contact;
          row.insertCell(2).textContent = `${group.arrival} to ${group.departure}`;
          row.insertCell(3).textContent = group.rooms;
          row.insertCell(4).textContent = group.paymentTerms;
          
          const actionsCell = row.insertCell(5);
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.className = 'gb-btn danger';
          deleteBtn.addEventListener('click', () => deleteGroup(group.id));
          actionsCell.appendChild(deleteBtn);
      });
  }

  // Delete Group
  function deleteGroup(groupId) {
      groups = groups.filter(group => group.id !== groupId);
      roomBlocks = roomBlocks.filter(block => block.groupId !== groupId);
      events = events.filter(event => event.groupId !== groupId);
      renderGroupsTable();
      updateGroupDropdowns();
      renderRoomBlocks();
      renderEvents();
  }

  // Update Group Dropdowns
  function updateGroupDropdowns() {
      selectGroupDropdowns.forEach(dropdown => {
          // Save current value
          const currentValue = dropdown.value;
          
          // Clear and repopulate
          dropdown.innerHTML = '<option value="">-- Select a group --</option>';
          
          groups.forEach(group => {
              const option = document.createElement('option');
              option.value = group.id;
              option.textContent = `${group.name} (${group.contact})`;
              dropdown.appendChild(option);
          });
          
          // Restore selection if still valid
          if (groups.some(group => group.id === currentValue)) {
              dropdown.value = currentValue;
          }
      });
  }

  // Add Room Block
  addRoomBlockBtn.addEventListener('click', function() {
      const groupId = document.getElementById('select-group').value;
      if (!groupId) {
          alert('Please select a group first');
          return;
      }
      
      const roomType = document.getElementById('room-type').value;
      const quantity = document.getElementById('room-qty').value;
      
      const roomBlock = {
          id: Date.now().toString(),
          groupId: groupId,
          type: roomType,
          quantity: quantity,
          dateAdded: new Date().toLocaleDateString()
      };
      
      roomBlocks.push(roomBlock);
      renderRoomBlocks();
  });

  // Render Room Blocks
  function renderRoomBlocks() {
      const selectedGroupId = document.getElementById('select-group').value;
      const filteredBlocks = selectedGroupId 
          ? roomBlocks.filter(block => block.groupId === selectedGroupId)
          : roomBlocks;
      
      if (filteredBlocks.length === 0) {
          roomBlocksList.innerHTML = '<p>No room blocks created yet. Select a group and add rooms.</p>';
          return;
      }
      
      roomBlocksList.innerHTML = '';
      
      filteredBlocks.forEach(block => {
          const group = groups.find(g => g.id === block.groupId);
          const groupName = group ? group.name : 'Unknown Group';
          
          const blockCard = document.createElement('div');
          blockCard.className = 'room-block-card';
          
          blockCard.innerHTML = `
              <div class="room-block-header">
                  <h4>${groupName} - ${block.type} Rooms</h4>
                  <div class="room-block-actions">
                      <button class="gb-btn secondary edit-room-block" data-id="${block.id}">Edit</button>
                      <button class="gb-btn danger delete-room-block" data-id="${block.id}">Delete</button>
                  </div>
              </div>
              <div class="room-block-details">
                  <div><strong>Quantity:</strong> ${block.quantity}</div>
                  <div><strong>Added:</strong> ${block.dateAdded}</div>
              </div>
          `;
          
          roomBlocksList.appendChild(blockCard);
      });
      
      // Add event listeners to new buttons
      document.querySelectorAll('.delete-room-block').forEach(btn => {
          btn.addEventListener('click', function() {
              const blockId = this.getAttribute('data-id');
              roomBlocks = roomBlocks.filter(block => block.id !== blockId);
              renderRoomBlocks();
          });
      });
  }

  // Add Event
  addEventBtn.addEventListener('click', function() {
      const groupId = document.getElementById('event-group').value;
      if (!groupId) {
          alert('Please select a group first');
          return;
      }
      
      const eventName = document.getElementById('event-name').value;
      if (!eventName) {
          alert('Please enter an event name');
          return;
      }
      
      const event = {
          id: Date.now().toString(),
          groupId: groupId,
          name: eventName,
          date: document.getElementById('event-date').value,
          time: document.getElementById('event-time').value,
          type: document.getElementById('event-type').value,
          attendees: document.getElementById('event-attendees').value
      };
      
      events.push(event);
      renderEvents();
  });

  // Render Events
  function renderEvents() {
      const selectedGroupId = document.getElementById('event-group').value;
      const filteredEvents = selectedGroupId 
          ? events.filter(event => event.groupId === selectedGroupId)
          : events;
      
      if (filteredEvents.length === 0) {
          eventsList.innerHTML = '<p>No events scheduled yet.</p>';
          return;
      }
      
      eventsList.innerHTML = '';
      
      filteredEvents.forEach(event => {
          const group = groups.find(g => g.id === event.groupId);
          const groupName = group ? group.name : 'Unknown Group';
          
          const eventCard = document.createElement('div');
          eventCard.className = 'event-card';
          
          eventCard.innerHTML = `
              <div class="event-header">
                  <h4>${event.name}</h4>
                  <div class="event-actions">
                      <button class="gb-btn secondary edit-event" data-id="${event.id}">Edit</button>
                      <button class="gb-btn danger delete-event" data-id="${event.id}">Delete</button>
                  </div>
              </div>
              <div class="event-details">
                  <div><strong>Group:</strong> ${groupName}</div>
                  <div><strong>Date:</strong> ${event.date} at ${event.time}</div>
                  <div><strong>Type:</strong> ${event.type}</div>
                  <div><strong>Attendees:</strong> ${event.attendees}</div>
              </div>
          `;
          
          eventsList.appendChild(eventCard);
      });
      
      // Add event listeners to new buttons
      document.querySelectorAll('.delete-event').forEach(btn => {
          btn.addEventListener('click', function() {
              const eventId = this.getAttribute('data-id');
              events = events.filter(event => event.id !== eventId);
              renderEvents();
          });
      });
  }

  // Initialize
  renderGroupsTable();
  updateGroupDropdowns();
  renderRoomBlocks();
  renderEvents();

  // Group selection changes
  document.getElementById('select-group').addEventListener('change', renderRoomBlocks);
  document.getElementById('event-group').addEventListener('change', renderEvents);
});