"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Role = "student" | "mentor" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface Session {
  user: AuthUser;
}

const TOKEN_KEY = "skillpath_auth_token";
const USER_KEY = "skillpath_auth_user";
const SESSION_EVENT = "skillpath-session-change";

const isBrowser = () => typeof window !== "undefined";

export const getAuthToken = () =>
  isBrowser() ? window.localStorage.getItem(TOKEN_KEY) : null;

const getStoredSession = (): Session | null => {
  if (!isBrowser()) return null;

  const user = window.localStorage.getItem(USER_KEY);
  if (!user) return null;

  try {
    return { user: JSON.parse(user) as AuthUser };
  } catch {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

const saveSession = ({ token, user }: AuthResponse) => {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(SESSION_EVENT));
};

const clearSession = () => {
  if (!isBrowser()) return;

  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
};

export const signIn = {
  email: async ({ email, password }: { email: string; password: string }) => {
    const { data } = await api.post<AuthResponse>("/api/auth/login", {
      email,
      password,
    });

    if (!data?.token || !data?.user) {
      throw new Error("Login response did not include a token or user.");
    }

    saveSession(data);
    return data;
  },
  social: async () => {
    throw new Error("Social login is not configured on this JWT backend.");
  },
};

export const signUp = {
  email: async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const { data } = await api.post("/api/auth/register", {
      email,
      password,
      name,
    });
    return data;
  },
};

export const signOut = async () => {
  clearSession();
};

export const useSession = () => {
  const [data, setData] = useState<Session | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const syncSession = () => {
      setData(getStoredSession());
      setIsPending(false);
    };

    syncSession();
    window.addEventListener(SESSION_EVENT, syncSession);
    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener(SESSION_EVENT, syncSession);
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  return { data, isPending };
};

export const authClient = { signIn, signUp, signOut, useSession };
