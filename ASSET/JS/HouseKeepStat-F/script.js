document.addEventListener('DOMContentLoaded', function () {
    
    
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.getAttribute('data-tab')).classList.add('active');
        });
    });

    // Data
    const rooms = [
        { number: '101', floor: '1', type: 'Standard', status: 'clean', lastCleaned: '2023-06-15T10:30:00', inspectedBy: 'Maria G.' },
        { number: '102', floor: '1', type: 'Standard', status: 'inspected', lastCleaned: '2023-06-15T09:45:00', inspectedBy: 'John D.' },
        { number: '103', floor: '1', type: 'Standard', status: 'dirty', lastCleaned: '2023-06-14T16:20:00', inspectedBy: '' },
        { number: '201', floor: '2', type: 'Deluxe', status: 'clean', lastCleaned: '2023-06-15T11:15:00', inspectedBy: 'Lisa M.' },
        { number: '202', floor: '2', type: 'Deluxe', status: 'dirty', lastCleaned: '2023-06-14T17:30:00', inspectedBy: '' },
        { number: '301', floor: '3', type: 'Suite', status: 'dirty', lastCleaned: '2023-06-14T18:15:00', inspectedBy: '' }
    ];

    const maintenanceIssues = [
        { id: 1, room: '101', type: 'plumbing', priority: 'high', status: 'open', description: 'Leaky faucet in bathroom', reported: '2023-06-15T08:30:00' },
        { id: 2, room: '203', type: 'electrical', priority: 'medium', status: 'in-progress', description: 'Light switch not working', reported: '2023-06-14T15:20:00' },
        { id: 3, room: '301', type: 'furniture', priority: 'low', status: 'resolved', description: 'Loose chair leg', reported: '2023-06-13T10:15:00' }
    ];

    const turnoverData = [
        { room: '102', checkOut: '2023-06-15T11:00:00', checkIn: '2023-06-15T15:00:00', guest: 'Smith', status: 'urgent', timeRemaining: '2h 30m' },
        { room: '204', checkOut: '2023-06-15T12:00:00', checkIn: '2023-06-15T16:00:00', guest: 'Johnson', status: 'normal', timeRemaining: '3h 45m' },
        { room: '301', checkOut: '2023-06-15T10:00:00', checkIn: '2023-06-15T14:00:00', guest: 'Brown', status: 'critical', timeRemaining: '1h 15m' }
    ];

    
    function formatDateTime(dateString) {
        return dateString ? new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }) : 'N/A';
    }

   
    function renderRooms() {
        const roomGrid = document.getElementById('room-grid');
        if (!roomGrid) return;
        
        const floorValue = document.getElementById('floor-filter')?.value || 'all';
        const statusValue = document.getElementById('status-filter')?.value || 'all';

        const filteredRooms = rooms.filter(room => 
            (floorValue === 'all' || room.floor === floorValue) &&
            (statusValue === 'all' || room.status === statusValue)
        );

        roomGrid.innerHTML = filteredRooms.length === 0 ? '<p class="no-rooms">No rooms match the selected filters</p>' : '';

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
                    ${room.inspectedBy ? `<div><strong>Inspected By:</strong> ${room.inspectedBy}</div>` : ''}
                </div>
                <div class="room-actions">
                    <button class="action-btn" onclick="openRoomModal('${room.number}')">View Details</button>
                </div>
            `;
            roomGrid.appendChild(roomCard);
        });
    }

    
    function renderMaintenanceIssues() {
        const issuesList = document.getElementById('issues-list');
        if (!issuesList) return;

        const priorityValue = document.getElementById('priority-filter')?.value || 'all';
        const statusValue = document.getElementById('maintenance-status-filter')?.value || 'all';

        const filteredIssues = maintenanceIssues.filter(issue => 
            (priorityValue === 'all' || issue.priority === priorityValue) &&
            (statusValue === 'all' || issue.status === statusValue)
        );

        issuesList.innerHTML = filteredIssues.length === 0 ? '<p class="no-issues">No maintenance issues match the selected filters</p>' : '';

        filteredIssues.forEach(issue => {
            const issueCard = document.createElement('div');
            issueCard.className = `issue-card priority-${issue.priority} status-${issue.status}`;
            issueCard.innerHTML = `
                <div class="issue-header">
                    <span class="room-number">Room ${issue.room}</span>
                    <span class="priority ${issue.priority}">${issue.priority.toUpperCase()}</span>
                    <span class="status ${issue.status}">${issue.status.replace('-', ' ').toUpperCase()}</span>
                </div>
                <div class="issue-body">
                    <p><strong>Type:</strong> ${issue.type}</p>
                    <p><strong>Description:</strong> ${issue.description}</p>
                    <p><strong>Reported:</strong> ${formatDateTime(issue.reported)}</p>
                </div>
                <div class="issue-actions">
                    ${issue.status === 'open' ? `<button class="action-btn" onclick="updateIssueStatus(${issue.id}, 'in-progress')">Start Work</button>` : ''}
                    ${issue.status === 'in-progress' ? `<button class="action-btn" onclick="updateIssueStatus(${issue.id}, 'resolved')">Mark Resolved</button>` : ''}
                </div>
            `;
            issuesList.appendChild(issueCard);
        });
    }

   
    function renderTurnovers() {
        const turnoverList = document.getElementById('turnover-list');
        if (!turnoverList) return;

        turnoverList.innerHTML = turnoverData.length === 0 ? '<p class="no-turnovers">No upcoming turnovers</p>' : '';

        turnoverData.forEach(turnover => {
            const turnoverCard = document.createElement('div');
            turnoverCard.className = `turnover-card status-${turnover.status}`;
            turnoverCard.innerHTML = `
                <div class="turnover-header">
                    <span class="room-number">Room ${turnover.room}</span>
                    <span class="status ${turnover.status}">${turnover.status.toUpperCase()}</span>
                    <span class="time-remaining">${turnover.timeRemaining}</span>
                </div>
                <div class="turnover-details">
                    <p><strong>Check-out:</strong> ${formatDateTime(turnover.checkOut)}</p>
                    <p><strong>Check-in:</strong> ${formatDateTime(turnover.checkIn)}</p>
                    <p><strong>Guest:</strong> ${turnover.guest}</p>
                </div>
            `;
            turnoverList.appendChild(turnoverCard);
        });
    }

    
    function openRoomModal(roomNumber) {
        const room = rooms.find(r => r.number === roomNumber);
        const modal = document.getElementById('room-modal');
        const modalContent = modal.querySelector('.modal-body');
        
        modalContent.innerHTML = `
            <h3>Room ${room.number} - ${room.type}</h3>
            <p><strong>Floor:</strong> ${room.floor}</p>
            <p><strong>Status:</strong> ${room.status}</p>
            <p><strong>Last Cleaned:</strong> ${formatDateTime(room.lastCleaned)}</p>
            <p><strong>Inspected By:</strong> ${room.inspectedBy || 'Not inspected'}</p>
            <button class="action-btn" onclick="updateRoomStatus('${room.number}', 'clean')">Mark Clean</button>
            <button class="action-btn" onclick="updateRoomStatus('${room.number}', 'dirty')">Mark Dirty</button>
        `;
        modal.showModal();
    }

    
    function updateIssueStatus(issueId, newStatus) {
        const issue = maintenanceIssues.find(i => i.id === issueId);
        if (issue) {
            issue.status = newStatus;
            renderMaintenanceIssues();
        }
    }

    function updateRoomStatus(roomNumber, newStatus) {
        const room = rooms.find(r => r.number === roomNumber);
        if (room) {
            room.status = newStatus;
            if (newStatus === 'clean') room.lastCleaned = new Date().toISOString();
            renderRooms();
            document.getElementById('room-modal').close();
        }
    }

    
    function refreshData() {
        renderRooms();
        renderMaintenanceIssues();
        renderTurnovers();
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-check"></i> Updated';
            setTimeout(() => refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh', 2000);
        }
    }

   
    document.getElementById('floor-filter')?.addEventListener('change', renderRooms);
    document.getElementById('status-filter')?.addEventListener('change', renderRooms);
    document.getElementById('priority-filter')?.addEventListener('change', renderMaintenanceIssues);
    document.getElementById('maintenance-status-filter')?.addEventListener('change', renderMaintenanceIssues);
    document.getElementById('refresh-btn')?.addEventListener('click', refreshData);
    document.getElementById('new-issue-btn')?.addEventListener('click', () => document.getElementById('issue-modal').showModal());

    
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => e.target.closest('.modal').close());
    });

    
    window.openRoomModal = openRoomModal;
    window.updateIssueStatus = updateIssueStatus;
    window.updateRoomStatus = updateRoomStatus;

   
    renderRooms();
    renderMaintenanceIssues();
    renderTurnovers();
});