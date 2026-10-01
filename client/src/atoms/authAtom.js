import { atom } from "recoil";

export const authAtom = atom({
  key: "authAtom",
  default: {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || "user", // "user" or "admin"
    isAuthenticated: !!localStorage.getItem("token"),
  },
});