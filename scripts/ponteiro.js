const relogio = document.getElementById('relogio');
const ponteiro = document.getElementById('ponteiro');

document.addEventListener('mousemove', (e) => {
    const bounds = relogio.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;

    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    ponteiro.style.transform = `rotate(${angle - 90}deg)`;
});
