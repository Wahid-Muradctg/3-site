document.querySelector('.submitBtm')?.addEventListener('click', function(event) {
    event.preventDefault();
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    modal.show();
});

function updateTime() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    timeElement.textContent = now.toLocaleString(undefined, options);
}

setInterval(updateTime, 1000);

updateTime();
