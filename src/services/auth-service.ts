/**
 * Service de autentificare — STUB pregatit pentru Supabase Auth.
 *
 * Roluri suportate: client, meserias, administrator.
 *
 * Integrare viitoare:
 *  - inlocuieste implementarile de mai jos cu apeluri la `@supabase/supabase-js`
 *    (signInWithPassword, signUp, signOut, getUser);
 *  - pastreaza aceeasi semnatura, astfel incat UI-ul sa ramana neschimbat.
 */
import type { Rol } from "@/types";

export interface Utilizator {
  id: string;
  nume: string;
  email: string;
  rol: Rol;
  avatar: string;
}

/** Utilizator demo curent (mock). Va fi inlocuit de sesiunea Supabase. */
export const UTILIZATOR_DEMO: Utilizator = {
  id: "u-demo",
  nume: "Andrei Popescu",
  email: "andrei@exemplu.ro",
  rol: "client",
  avatar: "https://i.pravatar.cc/100?img=20",
};

export async function getUtilizatorCurent(): Promise<Utilizator | null> {
  // TODO(supabase): const { data } = await supabase.auth.getUser();
  return UTILIZATOR_DEMO;
}

export async function autentificare(email: string, _parola: string): Promise<Utilizator> {
  // TODO(supabase): supabase.auth.signInWithPassword({ email, password })
  return { ...UTILIZATOR_DEMO, email };
}

export async function inregistrare(input: {
  nume: string;
  email: string;
  parola: string;
  rol: Rol;
}): Promise<Utilizator> {
  // TODO(supabase): supabase.auth.signUp(...)
  return {
    id: `u-${Date.now()}`,
    nume: input.nume,
    email: input.email,
    rol: input.rol,
    avatar: "https://i.pravatar.cc/100?img=20",
  };
}

export async function deconectare(): Promise<void> {
  // TODO(supabase): await supabase.auth.signOut();
}
