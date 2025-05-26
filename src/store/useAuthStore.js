import { create } from 'zustand';

const useAuthStore = create((set) => ({
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,

    register: (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const exists = storedUsers.find((u) => u.email === email);
        if (exists) return false;

        const now = new Date().toISOString();
        const newUser = {
            email,
            password,
            createdAt: now
        };

        const updatedUsers = [...storedUsers, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        set({ currentUser: newUser });
        return true;
    },


    login: (email, password) => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const found = storedUsers.find((u) => u.email === email && u.password === password);
        if (found) {
            localStorage.setItem('currentUser', JSON.stringify(found));
            set({ currentUser: found });
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem('currentUser');
        set({ currentUser: null });
    },

    updateUserName: (newName) => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        const updated = { ...current, name: newName };
        localStorage.setItem('currentUser', JSON.stringify(updated));

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map((u) =>
            u.email === updated.email ? updated : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        set({ currentUser: updated });
    }

}));

export default useAuthStore;
