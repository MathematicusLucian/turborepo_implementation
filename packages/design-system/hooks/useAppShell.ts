import create from "zustand";
import { persist } from "zustand/middleware";

type Store = {
    user: string | null;
    score: number;
    setUser: (user: string | null) => void;
    addToScore: (amount: number) => void;
};

export const useAppShell = create<Store>(
    persist<Store>(
        (set: any) => ({
            user: null,
            score: 0,
            setUser: (user: any) => set(() => ({ user })),
            addToScore: (amount: any) => set((state: any) => ({ score: state.score + amount })),
        }),
        {
            name: "app-shell",
        }
    )
);