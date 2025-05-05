document.addEventListener('DOMContentLoaded', function() {
    let tabButtons = document.querySelectorAll('.tab-btn');
    let tabContents = document.querySelectorAll('.tab-content');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener('click', function() {
            for (let j = 0; j < tabButtons.length; j++) {
                tabButtons[j].classList.remove('active');
            }
            for (let k = 0; k < tabContents.length; k++) {
                tabContents[k].classList.remove('active');
            }
            this.classList.add('active');
            let tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    }
    let requestButtons = document.querySelectorAll('.request-btn');
    let alertBox = document.getElementById('alert');
    let closeAlert = document.getElementById('close-alert');
    for (let i = 0; i < requestButtons.length; i++) {
        requestButtons[i].addEventListener('click', function() {
            let serviceCard = this.closest('.service-card');
            let serviceName = serviceCard.getAttribute('data-service');
            addNewRequest(serviceName);
            alertBox.classList.remove('hidden');
        });
    }
    closeAlert.addEventListener('click', function() {
        alertBox.classList.add('hidden');
    });
    function addNewRequest(serviceName) {
        let requestsList = document.getElementById('requests-list');
        let emptyMessage = requestsList.querySelector('.empty-message');
        if (emptyMessage) {
            emptyMessage.remove();
        }
        let requestId = Date.now();
        let requestItem = document.createElement('div');
        requestItem.className = 'request-item pending';
        requestItem.setAttribute('data-id', requestId);
        let currentTime = new Date().toLocaleTimeString();
        requestItem.innerHTML = '<div>' +
            '<h3>' + serviceName + '</h3>' +
            '<p>Requested at ' + currentTime + '</p>' +
            '</div>' +
            '<span class="request-status status-pending">Pending</span>';
        requestsList.insertBefore(requestItem, requestsList.firstChild);
        setTimeout(function() {
            updateRequestStatus(requestId, 'completed');
        }, 5000);
    }
    function updateRequestStatus(requestId, status) {
        let requestItem = document.querySelector('.request-item[data-id="' + requestId + '"]');
        if (!requestItem) return;
        if (status === 'completed') {
            requestItem.classList.remove('pending');
            requestItem.classList.add('completed');
            let statusSpan = requestItem.querySelector('.request-status');
            statusSpan.textContent = 'Completed';
            statusSpan.classList.remove('status-pending');
            statusSpan.classList.add('status-completed');
        }
    }
});
