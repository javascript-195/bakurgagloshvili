// Global Variables for Slider State
let autoIntervalId = null; // ავტომატური სლაიდის ინტერვალის ID
let currentModalIndex = 0; // მიმდინარე ინდექსი Modal-ში
let modalImages = []; // სურათების მასივი, რომელიც ამჟამად არის Modal-ში

const SLIDE_INTERVAL = 3000; // ავტომატური ცვლილების დრო (3 წამი)

// ------------------------------------
// I. ძირითადი ძებნის ფუნქცია
// ------------------------------------
async function searchImages() {
    let searchTerm = document.getElementById("searchTerm").value.trim();

    if (!searchTerm) return;

    // ვუბრუნდებით Pexels API-ს
    let apiData = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=8`, {
        headers: {
            // მნიშვნელოვანია: გამოიყენეთ თქვენი რეალური Pexels API გასაღები
            Authorization: "IqFqsBfWI9PxeUYla610TZvI0M5LBm0OCskDMGRHq2MsjVIR39t9GnoK" 
        }
    });

    apiData = await apiData.json();

    if (!apiData || apiData.photos.length < 8) {
        alert("API-მ ვერ მოგვაწოდა საკმარისი მონაცემები (8 ფოტო).");
        return;
    }

    // ძველი კოლაჟის გაწმენდა
    let oldPicCollage = document.querySelector('.picCollage');
    if (oldPicCollage) oldPicCollage.remove();
    
    // ძველი ინტერვალის გაწმენდა
    if (autoIntervalId) clearInterval(autoIntervalId);

    let picCollage = document.createElement('div');
    picCollage.className = 'picCollage';

    let imagesRow1 = document.createElement('div');
    let imagesRow2 = document.createElement('div');

    imagesRow1.className = 'imagesRow1';
    imagesRow2.className = 'imagesRow2';

    // 8 ფოტოს დამატება 2 რიგად, როგორც მოითხოვეთ
    apiData.photos.forEach((photo, index) => {
        
        // 1. ვქმნით კონტეინერს ფოტოსა და ტექსტისთვის
        let container = document.createElement('div');
        container.classList.add('image-container'); // ახალი კლასი სტილისთვის
        
        let img = document.createElement('img');
        img.src = photo.src.medium;
        // Pexels-ის შემთხვევაში, 'alt' ატრიბუტში შეიძლება შეინახოს ავტორის სახელიც
        img.alt = photo.photographer; 
        img.classList.add("resultImg");
        
        // 2. ვქმნით ავტორის სახელის ელემენტს
        let photographerName = document.createElement('p');
        photographerName.classList.add('photographer-name');
        photographerName.textContent = `Author Name: ${photo.photographer}`; // ავტორის სახელი
        
        // ვამატებთ ელემენტებს კონტეინერში
        container.appendChild(img);
        container.appendChild(photographerName);
        
        // 3. ვამატებთ ქლიქის ფუნქციას კონტეინერზე
        // Row 1 (index 0-3): ავტომატური სლაიდისთვის
        if (index < 4) {
            container.setAttribute('onclick', `openModal(${index}, true)`); 
            imagesRow1.appendChild(container); // ვამატებთ კონტეინერს რიგში
        } 
        // Row 2 (index 4-7): მექანიკური სლაიდისთვის
        else {
            container.setAttribute('onclick', `openModal(${index}, false)`);
            imagesRow2.appendChild(container); // ვამატებთ კონტეინერს რიგში
        }
    });

    picCollage.appendChild(imagesRow1);
    picCollage.appendChild(imagesRow2);

    document.body.appendChild(picCollage);
    
    // დარწმუნდით, რომ Modal არსებობს, თუ არა, შექმენით
    createModalIfMissing();
}

// ------------------------------------
// II. Modal-ის მართვის ფუნქციები
// ------------------------------------

// Modal-ის სტრუქტურის შექმნა (თუ უკვე არ არსებობს DOM-ში)
function createModalIfMissing() {
    if (document.getElementById('imageModal')) return;
    
    // Modal-ის HTML სტრუქტურა
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

// Modal-ის გახსნა და სლაიდერის ინიციალიზაცია
function openModal(startIndex, isAuto) {
    createModalIfMissing(); // დარწმუნება, რომ Modal არსებობს

    const modal = document.getElementById('imageModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // ვწყვეტთ ძველ ავტომატურ სლაიდს
    if (autoIntervalId) clearInterval(autoIntervalId);

    // ვადგენთ, რომელი რიგის ფოტოები გამოიყენება
    const imageElements = Array.from(document.querySelectorAll('.image-container img'));

    if (startIndex < 4) {
        // Row 1-ის ფოტოები
        modalImages = imageElements.slice(0, 4);
        currentModalIndex = startIndex;
    } else {
        // Row 2-ის ფოტოები
        modalImages = imageElements.slice(4, 8);
        currentModalIndex = startIndex - 4; // ინდექსის გასწორება 0-დან 3-მდე
    }
    
    modal.style.display = "block";
    
    if (isAuto) {
        // ავტომატური სლაიდი: ვმალავთ ღილაკებს და ვუშვებთ ავტომატიკას
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        autoIntervalId = setInterval(autoSlide, SLIDE_INTERVAL);
        updateModalImage();
    } else {
        // მექანიკური სლაიდი: ვაჩენთ ღილაკებს
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        updateModalImage();
    }
}

// Modal-ის დახურვა
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    // ვწყვეტთ ავტომატურ სლაიდს დახურვისას
    if (autoIntervalId) {
        clearInterval(autoIntervalId);
        autoIntervalId = null;
    }
}

// Modal-ში სურათის განახლება
function updateModalImage() {
    const modalImageElement = document.getElementById('modalImage');
    if (modalImages.length > 0) {
        // ვიღებთ წყაროს იმ ფოტოსგან, რომელსაც დავაჭირეთ (Row 1-დან ან Row 2-დან)
        modalImageElement.src = modalImages[currentModalIndex].src;
    }
}

// ------------------------------------
// III. სლაიდერების ლოგიკა Modal-ში
// ------------------------------------

// ავტომატური სლაიდერი (გაიშვება setInterval-ით)
function autoSlide() {
    // გადავდივართ შემდეგ ინდექსზე (ციკლურად)
    currentModalIndex = (currentModalIndex + 1) % modalImages.length; 
    updateModalImage();
}

// მექანიკური სლაიდერი (ღილაკის დაჭერით)
function manualSlide(direction) {
    const newIndex = currentModalIndex + direction;
    
    // ციკლური გადასვლა
    currentModalIndex = (newIndex + modalImages.length) % modalImages.length;
    
    updateModalImage();
}

// დახურვა ESC ღილაკზე
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