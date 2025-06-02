document.addEventListener('DOMContentLoaded', function() {
    // Tab switching only, no validation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.gb-tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Optionally, auto-hide messages after 5 seconds
    document.querySelectorAll('.success-message, .error-message').forEach(message => {
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    });
});