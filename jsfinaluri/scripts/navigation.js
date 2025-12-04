import User from './classes/user.js';

class NavigationManager {
    constructor() {
        this.isLoggedIn = User.isLoggedIn();
        this.currentUser = User.getCurrentUser();
    }

    init() {
        this.updateNavigation();
        this.setupLogoutButton();
    }

    updateNavigation() {
        const signInLinks = document.querySelectorAll('a[href="signin.html"]');
        const signUpLinks = document.querySelectorAll('a[href="signup.html"]');

        if (this.isLoggedIn) {
            signInLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem) {
                    listItem.style.display = 'none';
                } else {
                    link.style.display = 'none';
                }
            });

            signUpLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem) {
                    listItem.style.display = 'none';
                } else {
                    link.style.display = 'none';
                }
            });
        } else {
            signInLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem) {
                    listItem.style.display = '';
                } else {
                    link.style.display = '';
                }
            });

            signUpLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem) {
                    listItem.style.display = '';
                } else {
                    link.style.display = '';
                }
            });
        }
    }

    createLogoutButton() {
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logoutBtn';
        logoutBtn.className = 'logout-btn';
        logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i>';
        logoutBtn.title = 'გასვლა';
        logoutBtn.setAttribute('aria-label', 'გასვლა');
        return logoutBtn;
    }

    setupLogoutButton() {
        if (!this.isLoggedIn) {
            return;
        }

        const burgerMenuContainer = document.querySelector('.burger-menu-container');
        if (burgerMenuContainer) {
            const logoutBtn = this.createLogoutButton();
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
            const burgerIcon = document.getElementById('burgerIcon');
            if (burgerIcon) {
                burgerMenuContainer.insertBefore(logoutBtn, burgerIcon);
            } else {
                burgerMenuContainer.appendChild(logoutBtn);
            }
        }
    }

    handleLogout() {
        if (confirm('ნამდვილად გსურთ გასვლა?')) {
            User.logout();
            window.location.href = 'index.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navManager = new NavigationManager();
    navManager.init();
});

