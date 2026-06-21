import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
    name: string;
    phone: string;
    role: string;
}

interface UserStore {
    user: User | null;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),

            setUser: (user) =>
                set({
                    user,
                }),

            logout: () =>
                set({
                    user: null,
                }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: (state) => {
                return () => {
                    state.setHasHydrated(true);
                };
            },
        }
    )
);
