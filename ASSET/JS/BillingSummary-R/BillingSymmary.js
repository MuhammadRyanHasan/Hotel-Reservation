document.getElementById('current-date').textContent = new Date().toLocaleDateString();
document.querySelectorAll('input[name="split"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const customSplit = document.querySelector('.custom-split');
        customSplit.style.display = this.parentElement.textContent.includes('Custom') ? 'block' : 'none';
    });
});

document.querySelector('.btn-print').addEventListener('click', function() {
    alert('Still Making this option, wait!');
});

document.querySelector('.btn-email').addEventListener('click', function() {
    alert('Still Making this option, wait!');
});
