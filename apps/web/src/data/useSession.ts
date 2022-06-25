import create from "zustand";

type User = {
  name: string;
  email: string;
};

type SessionStore = {
  user: User | null;
  signOut: () => Promise<void>;
  signIn: () => Promise<void>;
};

const useSession = create<SessionStore>((set) => ({
  user: null,
  signOut: () =>
    new Promise((resolve, _reject) => {
      set({ user: null });
      resolve();
    }),
  signIn: () =>
    new Promise((resolve, reject) => {
      set({ user: { name: "Benedict", email: "me@bene.dev" } });
      resolve();
      // reject(new Error("Invalid password."));
    }),
}));

export default useSession;
