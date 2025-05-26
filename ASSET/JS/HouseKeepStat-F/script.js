document.addEventListener('DOMContentLoaded', function () {
    
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

    
    const rooms = [
        { number: '101', floor: '1', type: 'Standard', status: 'clean', lastCleaned: '2023-06-15T10:30:00', inspectedBy: 'Maria G.' },
        { number: '102', floor: '1', type: 'Standard', status: 'inspected', lastCleaned: '2023-06-15T09:45:00', inspectedBy: 'John D.' },
        { number: '103', floor: '1', type: 'Standard', status: 'dirty', lastCleaned: '2023-06-14T16:20:00', inspectedBy: '' },
        { number: '104', floor: '1', type: 'Standard', status: 'in-progress', lastCleaned: '2023-06-14T15:10:00', inspectedBy: '' },
        { number: '201', floor: '2', type: 'Deluxe', status: 'clean', lastCleaned: '2023-06-15T11:15:00', inspectedBy: 'Lisa M.' },
        { number: '202', floor: '2', type: 'Deluxe', status: 'dirty', lastCleaned: '2023-06-14T17:30:00', inspectedBy: '' },
        { number: '203', floor: '2', type: 'Deluxe', status: 'inspected', lastCleaned: '2023-06-15T08:20:00', inspectedBy: 'John D.' },
        { number: '204', floor: '2', type: 'Deluxe', status: 'in-progress', lastCleaned: '2023-06-14T14:45:00', inspectedBy: '' },
        { number: '301', floor: '3', type: 'Suite', status: 'dirty', lastCleaned: '2023-06-14T18:15:00', inspectedBy: '' },
        { number: '302', floor: '3', type: 'Suite', status: 'clean', lastCleaned: '2023-06-15T12:00:00', inspectedBy: 'Maria G.' },
        { number: '303', floor: '3', type: 'Suite', status: 'inspected', lastCleaned: '2023-06-15T07:30:00', inspectedBy: 'Lisa M.' },
        { number: '304', floor: '3', type: 'Suite', status: 'dirty', lastCleaned: '2023-06-14T19:00:00', inspectedBy: '' }
    ];

   
    const roomGrid = document.getElementById('room-grid');
    const floorFilter = document.getElementById('floor-filter');
    const statusFilter = document.getElementById('status-filter');

    function formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function renderRooms() {
        roomGrid.innerHTML = '';
        const floorValue = floorFilter?.value || 'all';
        const statusValue = statusFilter?.value || 'all';

        const filteredRooms = rooms.filter(room => {
            return (floorValue === 'all' || room.floor === floorValue) &&
                (statusValue === 'all' || room.status === statusValue);
        });

        if (filteredRooms.length === 0) {
            roomGrid.innerHTML = '<p class="no-rooms">No rooms match the selected filters</p>';
            return;
        }

        filteredRooms.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.className = `room-card ${room.status}`;
            roomCard.innerHTML = `
                <div class="room-card-header">
                    <div class="room-number">${room.number}</div>
                    <div class="room-status ${room.status}">${room.status.replace('-', ' ')}</div>
                </div>
                <div class="room-details">
                    <div><strong>Type:</strong> ${room.type}</div>
                    <div><strong>Floor:</strong> ${room.floor}</div>
                    ${room.lastCleaned ? `<div><strong>Last Cleaned:</strong> ${formatDateTime(room.lastCleaned)}</div>` : ''}
                </div>
            `;
            roomGrid.appendChild(roomCard);
        });
    }

    
    renderRooms();

    
    floorFilter?.addEventListener('change', renderRooms);
    statusFilter?.addEventListener('change', renderRooms);
});
