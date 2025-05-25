import { create } from 'zustand';

const useAuthStore = create((set) => ({
    isLoggedIn: false,
    currentUser: null,

    login: (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const found = users.find((user) => user.email === email && user.password === password);
        if (found) {
            set({ isLoggedIn: true, currentUser: found });
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(found));
            return true;
        }
        return false;
    },

    logout: () => {
        set({ isLoggedIn: false, currentUser: null });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
    },

    register: (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const exists = users.some((user) => user.email === email);
        if (exists) return false;

        const newUser = {
            email,
            password,
            createdAt: new Date().toISOString().slice(0, 10),
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        set({ isLoggedIn: true, currentUser: newUser });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return true;
    },

    restoreSession: () => {
        const user = localStorage.getItem('currentUser');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (user && isLoggedIn) {
            set({ isLoggedIn: true, currentUser: JSON.parse(user) });
        }
    },

    updateUserName: (name) => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) return;

        const updatedUser = { ...user, name };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map((u) => u.email === user.email ? updatedUser : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        set({ currentUser: updatedUser });
    },


}));

export default useAuthStore;
