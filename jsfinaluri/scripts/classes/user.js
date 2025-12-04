export default class User {

    username;
    email;
    password;

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    static getUsers() {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    }

    static saveUsers(users) {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    static addUser(user) {
        const users = this.getUsers();
        users.push(user);
        this.saveUsers(users);
    }

    static loginUser(email, password) {
        const user = this.getUsers().find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
            return true;
        }
        return false;
    }

    static getCurrentUser() {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    }

    static isEmailAlreadyRegistered(email) {
        const users = this.getUsers();
        return users.some(user => user.email === email);
    }

    static logout() {
        localStorage.removeItem('currentUser');
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

}