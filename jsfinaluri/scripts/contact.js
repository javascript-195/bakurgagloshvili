class ContactFormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.messageElement = document.getElementById('formMessage');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    validateForm() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const address = document.getElementById('address').value.trim();

        if (!firstName || !lastName || !email || !address) {
            return { valid: false, message: "❌ გთხოვთ შეავსოთ ყველა სავალდებულო ველი." };
        }

        const emailRegex = /^[A-Za-z]{4,}@[A-Za-z]{3,}\.[A-Za-z]{3,}$/;
        if (!emailRegex.test(email)) {
            return { valid: false, message: "❌ ელ-ფოსტის ფორმატი არასწორია." };
        }

        const nameRegex = /^[A-Za-zა-ჰ\s]{2,30}$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return { valid: false, message: "❌ სახელი და გვარი უნდა შეიცავდეს მხოლოდ ასოებს (მინ. 2 სიმბოლო)." };
        }

        return { valid: true };
    }

    handleSubmit() {
        const validation = this.validateForm();
        
        if (!validation.valid) {
            this.messageElement.textContent = validation.message;
            this.messageElement.style.color = 'red';
            return;
        }

        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('contactEmail').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            address: document.getElementById('address').value.trim(),
            message: document.getElementById('message').value.trim(),
            submittedAt: new Date().toISOString()
        };

        this.saveContactData(formData);
        
        this.messageElement.textContent = "✅ თქვენი შეტყობინება წარმატებით გაიგზავნა! ჩვენ მალე დაგიკავშირდებით.";
        this.messageElement.style.color = 'green';
        
        this.form.reset();
        
        setTimeout(() => {
            this.messageElement.textContent = "";
        }, 5000);
    }

    saveContactData(data) {
        const contacts = this.getContacts();
        contacts.push(data);
        localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
    }

    getContacts() {
        const contacts = localStorage.getItem('contactSubmissions');
        return contacts ? JSON.parse(contacts) : [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ContactFormHandler();
});

