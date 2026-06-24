import type { Conversatie, Notificare } from "@/types";

export const CONVERSATII: Conversatie[] = [
  {
    id: "c-1",
    participantNume: "Dorel Ionescu",
    participantAvatar: "https://i.pravatar.cc/200?img=12",
    participantRol: "meserias",
    ultimMesaj: "Perfect, ne vedem mâine la ora 10.",
    ora: "10:24",
    necitite: 0,
    online: true,
    mesaje: [
      { id: "m1", conversatieId: "c-1", expeditor: "client", text: "Bună ziua! Aș avea nevoie de montaj baterie la chiuveta din bucătărie.", ora: "09:58" },
      { id: "m2", conversatieId: "c-1", expeditor: "meserias", text: "Bună ziua! Sigur, materialele le aveți deja?", ora: "10:05" },
      { id: "m3", conversatieId: "c-1", expeditor: "client", text: "Da, am cumpărat bateria și sifonul.", ora: "10:11" },
      { id: "m4", conversatieId: "c-1", expeditor: "meserias", text: "Excelent. Pot veni mâine dimineață, durează aproximativ o oră.", ora: "10:18" },
      { id: "m5", conversatieId: "c-1", expeditor: "client", text: "Perfect, ne vedem mâine la ora 10.", ora: "10:24" },
    ],
  },
  {
    id: "c-2",
    participantNume: "Marius Popescu",
    participantAvatar: "https://i.pravatar.cc/200?img=13",
    participantRol: "meserias",
    ultimMesaj: "Vă trimit o ofertă detaliată în câteva minute.",
    ora: "Ieri",
    necitite: 2,
    online: false,
    mesaje: [
      { id: "m1", conversatieId: "c-2", expeditor: "client", text: "Salut! Vreau să modernizez tabloul electric din apartament.", ora: "14:02" },
      { id: "m2", conversatieId: "c-2", expeditor: "meserias", text: "Salut! Câte circuite are în prezent și ce suprafață?", ora: "14:20" },
      { id: "m3", conversatieId: "c-2", expeditor: "meserias", text: "Vă trimit o ofertă detaliată în câteva minute.", ora: "14:21" },
    ],
  },
  {
    id: "c-3",
    participantNume: "Elena Radu",
    participantAvatar: "https://i.pravatar.cc/200?img=45",
    participantRol: "meserias",
    ultimMesaj: "Mulțumesc! O zi bună.",
    ora: "Luni",
    necitite: 0,
    online: true,
    mesaje: [
      { id: "m1", conversatieId: "c-3", expeditor: "meserias", text: "Bună! Confirmați curățenia pentru sâmbătă dimineață?", ora: "11:30" },
      { id: "m2", conversatieId: "c-3", expeditor: "client", text: "Da, confirm. Mulțumesc! O zi bună.", ora: "11:45" },
    ],
  },
];

export const NOTIFICARI: Notificare[] = [
  { id: "n-1", tip: "oferta_noua", titlu: "Ofertă nouă primită", descriere: "Dorel Ionescu a trimis o ofertă de 200 RON pentru „Montaj baterie și sifon”.", ora: "acum 5 min", citita: false },
  { id: "n-2", tip: "mesaj_nou", titlu: "Mesaj nou", descriere: "Marius Popescu: „Vă trimit o ofertă detaliată în câteva minute.”", ora: "acum 1 oră", citita: false },
  { id: "n-3", tip: "cerere_noua", titlu: "Cerere nouă în zona ta", descriere: "O lucrare nouă de „Electrician” a fost publicată în Cluj-Napoca.", ora: "acum 3 ore", citita: false },
  { id: "n-4", tip: "recenzie_noua", titlu: "Recenzie nouă", descriere: "Ai primit o recenzie de 5 stele de la Andreea M.", ora: "ieri", citita: true },
];
