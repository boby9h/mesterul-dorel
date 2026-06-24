export const BRAND = {
  name: "Mesterul Dorel",
  slogan: "Găsești rapid meseriașul potrivit.",
  email: "contact@mesteruldorel.ro",
  telefon: "0721 000 000",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://mesteruldorel.ro",
} as const;

export const ORASE = [
  "București",
  "Cluj-Napoca",
  "Timișoara",
  "Iași",
  "Constanța",
  "Brașov",
  "Craiova",
  "Sibiu",
  "Oradea",
  "Ploiești",
  "Pitești",
  "Galați",
] as const;

export type Oras = (typeof ORASE)[number];
