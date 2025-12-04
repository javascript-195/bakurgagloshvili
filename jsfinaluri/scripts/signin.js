import User from './classes/user.js';
document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.querySelector('.register-form');
    
    if (registerForm) {
        
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const email = registerForm.querySelector('input[name="email"]').value;
            const password = registerForm.querySelector('input[name="password"]').value;
            const messageElement = document.getElementById('message');
            
            if (!email || !password) {
                messageElement.textContent = "❌ გთხოვთ შეიყვანოთ ელ-ფოსტა და პაროლი.";
                messageElement.style.color = 'red';
                return;
            }

            if (User.loginUser(email, password)) {
                messageElement.textContent = `✅ წარმატებული შესვლა! მოგესალმებით, ${User.getCurrentUser().username}.`;
                messageElement.style.color = 'green';
                registerForm.reset(); 
                setTimeout(() => { 
                    window.location.href = 'index.html';
                }, 1000); 
            } else {
                messageElement.textContent = "❌ არასწორი ელ-ფოსტა ან პაროლი.";
                messageElement.style.color = 'red';
            }
        });
    }
});