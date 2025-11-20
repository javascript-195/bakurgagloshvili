
let autoIntervalId = null;
let currentModalIndex = 0;
let modalImages = [];

const SLIDE_INTERVAL = 3000;
async function searchImages() {
    let searchTerm = document.getElementById("searchTerm").value.trim();

    if (!searchTerm) return;

    let apiData = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=8`, {
        headers: {
            Authorization: "IqFqsBfWI9PxeUYla610TZvI0M5LBm0OCskDMGRHq2MsjVIR39t9GnoK" 
        }
    });

    apiData = await apiData.json();
    let oldPicCollage = document.querySelector('.picCollage');
    if (oldPicCollage) oldPicCollage.remove();
    if (autoIntervalId) clearInterval(autoIntervalId);

    let picCollage = document.createElement('div');
    picCollage.className = 'picCollage';

    let imagesRow1 = document.createElement('div');
    let imagesRow2 = document.createElement('div');

    imagesRow1.className = 'imagesRow1';
    imagesRow2.className = 'imagesRow2';

    apiData.photos.forEach((photo, index) => {
        
        let container = document.createElement('div');
        container.classList.add('image-container');
        
        let img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.photographer; 
        img.classList.add("resultImg");

        let photographerName = document.createElement('p');
        photographerName.classList.add('photographer-name');
        photographerName.textContent = `Author Name: ${photo.photographer}`; // ავტორის სახელი
        
        container.appendChild(img);
        container.appendChild(photographerName);
        
        if (index < 4) {
            container.setAttribute('onclick', `openModal(${index}, true)`); 
            imagesRow1.appendChild(container);
        } 
        else {
            container.setAttribute('onclick', `openModal(${index}, false)`);
            imagesRow2.appendChild(container); // ვამატებთ კონტეინერს რიგში
        }
    });

    picCollage.appendChild(imagesRow1);
    picCollage.appendChild(imagesRow2);

    document.body.appendChild(picCollage);
    createModalIfMissing();
}

function createModalIfMissing() {
    if (document.getElementById('imageModal')) return;
    const modalHTML = `
        <div id="imageModal" class="modal">
            <span class="close" onclick="closeModal()">&times;</span>
            <div class="modal-content">
                <img id="modalImage" class="modal-image">
                <button id="prevBtn" class="slider-btn prev-btn" onclick="manualSlide(-1)">&#10094;</button>
                <button id="nextBtn" class="slider-btn next-btn" onclick="manualSlide(1)">&#10095;</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openModal(startIndex, isAuto) {
    createModalIfMissing();

    const modal = document.getElementById('imageModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (autoIntervalId) clearInterval(autoIntervalId);

    const imageElements = Array.from(document.querySelectorAll('.image-container img'));

    if (startIndex < 4) {
        modalImages = imageElements.slice(0, 4);
        currentModalIndex = startIndex;
    } else {
        modalImages = imageElements.slice(4, 8);
        currentModalIndex = startIndex - 4;
    }
    
    modal.style.display = "block";
    
    if (isAuto) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        autoIntervalId = setInterval(autoSlide, SLIDE_INTERVAL);
        updateModalImage();
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        updateModalImage();
    }
}
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    if (autoIntervalId) {
        clearInterval(autoIntervalId);
        autoIntervalId = null;
    }
}

function updateModalImage() {
    const modalImageElement = document.getElementById('modalImage');
    if (modalImages.length > 0) {
        modalImageElement.src = modalImages[currentModalIndex].src;
    }
}

function autoSlide() {
    currentModalIndex = (currentModalIndex + 1) % modalImages.length; 
    updateModalImage();
}
function manualSlide(direction) {
    const newIndex = currentModalIndex + direction;
    currentModalIndex = (newIndex + modalImages.length) % modalImages.length;
    
    updateModalImage();
}
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }

});
