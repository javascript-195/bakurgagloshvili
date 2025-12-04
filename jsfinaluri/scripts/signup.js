import User from './classes/user.js';
document.addEventListener('DOMContentLoaded', () => {
    
    const usernameRegex = /^[A-Za-z0-9_\s]{3,20}$/;
    const emailRegex = /^[A-Za-z]{4,}@[A-Za-z]{3,}\.[A-Za-z]{3,}$/;
    const passwordRegex = /^[A-Za-z](?=.*[0-9])(?=.*[@#$%^&+=])(?=\S+$).{7,19}$/;
   
    const registerForm = document.querySelector('.register-form');
    
    if (registerForm && document.getElementById('confirm_password')) {
        
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = registerForm.querySelector('input[name="username"]').value;
            const email = registerForm.querySelector('input[name="email"]').value;
            const password = registerForm.querySelector('input[name="password"]').value;
            const confirmPassword = registerForm.querySelector('input[name="confirm_password"]').value;
            const messageElement = document.getElementById('message');
            messageElement.textContent = "";
            messageElement.style.color = 'red';
            
            if (!username || !email || !password || !confirmPassword) {
                messageElement.textContent = " გთხოვთ შეავსოთ ყველა ველი.";
                return;
            }

            if (!usernameRegex.test(username)) {
                messageElement.textContent = " მომხმარებლის სახელი: უნდა იყოს მინ. 3 - მაქს. 20 სიმბოლო, მხოლოდ ასოები, ციფრები, ქვედა ტირე (_) და სპეისები.";
                return;
            }

            if (!emailRegex.test(email)) {
                messageElement.textContent = " ელ-ფოსტა: ფორმატი არასწორია (მინ. 4ასო@მინ. 3ასო.მინ. 3ასო, მხოლოდ ასოები).";
                return;
            }

            if (!passwordRegex.test(password)) {
                messageElement.textContent = " პაროლი: მინ. 8 სიმბოლო, უნდა იწყებოდეს ასოთი, შეიცავდეს მინ. 1 ციფრს და მინ. 1 სპეციალურ სიმბოლოს.";
                return;
            }

            if (password !== confirmPassword) {
                messageElement.textContent = " პაროლები არ ემთხვევა!";
                return;
            }

            if (User.isEmailAlreadyRegistered(email)) {
                messageElement.textContent = " მომხმარებელი ამ ელ-ფოსტით უკვე არსებობს.";
                return;
            }
            
            const newUser = new User(username, email, password);
            User.addUser(newUser);

            messageElement.textContent = ` რეგისტრაცია წარმატებით დასრულდა! შეგიძლიათ შეხვიდეთ.`;
            messageElement.style.color = 'green';
            registerForm.reset(); 
        });
    }
});