// Плавная прокрутка + мобильное меню (оставляем как было)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Мобильное меню (гамбургер)
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = `<span></span><span></span><span></span>`;
document.querySelector('nav').appendChild(hamburger);

const navUl = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navUl.classList.toggle('active');
});

// === МОДАЛЬНОЕ ОКНО ===
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="modal-title">Просмотр сертификата</h3>
            <span class="close-modal">×</span>
        </div>
        <div class="modal-body">
            <iframe id="pdf-viewer" src=""></iframe>
        </div>
    </div>
`;
document.body.appendChild(modal);

const pdfViewer = document.getElementById('pdf-viewer');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close-modal');

function openCertificate(pdfUrl, title) {
    modalTitle.textContent = title;
    pdfViewer.src = pdfUrl + "#toolbar=0&navpanes=0&scrollbar=1"; // улучшенный вид PDF
    modal.style.display = 'flex';
}

function closeCertificate() {
    modal.style.display = 'none';
    pdfViewer.src = '';
}

closeBtn.addEventListener('click', closeCertificate);
modal.addEventListener('click', e => {
    if (e.target === modal) closeCertificate();
});
document.addEventListener('keydown', e => {
    if (e.key === "Escape") closeCertificate();
});

// Клик по карточкам
document.getElementById('certificates-grid').addEventListener('click', e => {
    const card = e.target.closest('.certificate-card');
    if (card) {
        const pdf = card.dataset.pdf;
        const title = card.dataset.title || 'Сертификат';
        if (pdf) openCertificate(pdf, title);
    }
});