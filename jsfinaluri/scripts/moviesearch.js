const searchInput = document.getElementById('movieSearchInput');

// ვიღებთ ყველა ფილმის ბარათს (ტრეილერებს) content-div-დან
const allMovieCards = document.querySelectorAll('.content-div .flex-div');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();

        allMovieCards.forEach(card => {
            // ვიღებთ სათაურის ტექსტს (ტრეილერის ბლოკში)
            // თქვენს HTML-ში სათაური არის პირველი <p> ელემენტი
            const titleElement = card.querySelector('p:first-of-type'); 
            
            if (titleElement) {
                // ვიღებთ მხოლოდ სათაურის სახელს, მაგალითად: "Forrest Gump"
                // სათაური: Forrest Gump -> Forrest Gump
                const fullTitleText = titleElement.textContent.toLowerCase();
                
                // ვამოწმებთ, შეიცავს თუ არა ფილმის სათაური საძიებო სიტყვას
                if (fullTitleText.includes(searchTerm)) {
                    card.style.display = 'block'; // ვაჩენთ ბლოკს
                } else {
                    card.style.display = 'none'; // ვმალავთ ბლოკს
                }
            }
        });
    });
}