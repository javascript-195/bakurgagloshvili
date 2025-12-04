document.querySelectorAll('.see-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const moreText = card.querySelector('.more-text');

        if (moreText.style.display === "block") {
            moreText.style.display = "none";
            button.textContent = "...იხილეთ მეტი";
        } else {
            moreText.style.display = "block";
            button.textContent = "დამალეთ";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".see-more-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const moreText = card.querySelector(".more-text");
            const dots = card.querySelector(".dots");

            moreText.classList.toggle("show");

            if (moreText.classList.contains("show")) {
                dots.style.display = "none";
                button.textContent = "დამალეთ";
            } else {
                dots.style.display = "inline";
                button.textContent = "...იხილეთ მეტი";
            }
        });
    });
});
