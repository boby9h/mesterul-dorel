import type { Lucrare, Oferta } from "@/types";

function zileInUrma(z: number) {
  return new Date(Date.now() - z * 24 * 60 * 60 * 1000).toISOString();
}

/** 10 lucrari demo publicate de clienti. */
export const LUCRARI: Lucrare[] = [
  { id: "l-1", titlu: "Montaj baterie și sifon la chiuveta din bucătărie", descriere: "Am nevoie de înlocuirea bateriei și a sifonului. Materialele sunt cumpărate.", categorieSlug: "instalator", oras: "București", bugetDeLa: 150, bugetPanaLa: 300, data: zileInUrma(1), status: "deschisa", numarOferte: 5, client: "Andrei P." },
  { id: "l-2", titlu: "Înlocuire tablou electric apartament 3 camere", descriere: "Tablou vechi, doresc modernizare completă cu siguranțe automate și împământare.", categorieSlug: "electrician", oras: "Cluj-Napoca", bugetDeLa: 800, bugetPanaLa: 1500, data: zileInUrma(2), status: "deschisa", numarOferte: 7, client: "Maria I." },
  { id: "l-3", titlu: "Zugrăvit apartament 2 camere, ~55 mp", descriere: "Glet și două straturi de vopsea lavabilă, culoare albă. Mobila se acoperă.", categorieSlug: "zugrav", oras: "Timișoara", bugetDeLa: 1200, bugetPanaLa: 2000, data: zileInUrma(3), status: "in_desfasurare", numarOferte: 9, client: "George M." },
  { id: "l-4", titlu: "Montaj gresie hol și bucătărie 18 mp", descriere: "Gresie 60x60, șapă deja turnată. Caut montaj cu rosturi minime.", categorieSlug: "gresie-faianta", oras: "Iași", bugetDeLa: 900, bugetPanaLa: 1400, data: zileInUrma(4), status: "deschisa", numarOferte: 4, client: "Cristina D." },
  { id: "l-5", titlu: "Asamblare dressing și pat din PAL", descriere: "Mobilă cumpărată de la magazin, am nevoie de montaj rapid în weekend.", categorieSlug: "montaj-mobila", oras: "Constanța", bugetDeLa: 250, bugetPanaLa: 500, data: zileInUrma(5), status: "deschisa", numarOferte: 6, client: "Radu V." },
  { id: "l-6", titlu: "Montaj aer condiționat 12000 BTU", descriere: "Apartament etaj 4, unitate exterioară pe balcon. Aparatul este cumpărat.", categorieSlug: "aer-conditionat", oras: "Brașov", bugetDeLa: 300, bugetPanaLa: 600, data: zileInUrma(2), status: "deschisa", numarOferte: 8, client: "Laura S." },
  { id: "l-7", titlu: "Reparație mașină de spălat care nu centrifughează", descriere: "Mașină Bosch, face zgomot și nu stoarce. Am nevoie de diagnostic la domiciliu.", categorieSlug: "reparatii-electrocasnice", oras: "Timișoara", bugetDeLa: 150, bugetPanaLa: 400, data: zileInUrma(6), status: "finalizata", numarOferte: 3, client: "Ovidiu T." },
  { id: "l-8", titlu: "Curățenie după renovare apartament 70 mp", descriere: "Praf de la șlefuit, urme de vopsea pe geamuri. Necesită curățenie generală.", categorieSlug: "curatenie", oras: "București", bugetDeLa: 350, bugetPanaLa: 600, data: zileInUrma(1), status: "deschisa", numarOferte: 10, client: "Diana C." },
  { id: "l-9", titlu: "Reparație acoperiș - infiltrații după ploaie", descriere: "Apar pete pe tavanul de la mansardă. Caut verificare și reparație urgentă.", categorieSlug: "acoperisuri", oras: "Sibiu", bugetDeLa: 500, bugetPanaLa: 1200, data: zileInUrma(3), status: "in_desfasurare", numarOferte: 4, client: "Bogdan R." },
  { id: "l-10", titlu: "Tuns gazon și toaletat pomi în curte", descriere: "Curte ~300 mp, gazon înalt și câțiva pomi de toaletat. Lunar, dacă e ok.", categorieSlug: "gradinarit", oras: "Craiova", bugetDeLa: 200, bugetPanaLa: 450, data: zileInUrma(7), status: "deschisa", numarOferte: 2, client: "Simona L." },
];

/** Oferte primite pentru lucrarile clientului (dashboard client). */
export const OFERTE: Oferta[] = [
  { id: "o-1", lucrareId: "l-1", lucrareTitlu: "Montaj baterie și sifon", meseriasId: "m-1", meseriasNume: "Dorel Ionescu", meseriasAvatar: "https://i.pravatar.cc/200?img=12", rating: 4.9, pret: 200, mesaj: "Pot veni mâine dimineață, durează ~1 oră. Garanție 12 luni.", data: zileInUrma(1), status: "in_asteptare" },
  { id: "o-2", lucrareId: "l-1", lucrareTitlu: "Montaj baterie și sifon", meseriasId: "m-11", meseriasNume: "Adrian Voinea", meseriasAvatar: "https://i.pravatar.cc/200?img=68", rating: 4.6, pret: 180, mesaj: "Disponibil azi după ora 16. Aduc și garnituri de schimb.", data: zileInUrma(1), status: "in_asteptare" },
  { id: "o-3", lucrareId: "l-2", lucrareTitlu: "Înlocuire tablou electric", meseriasId: "m-2", meseriasNume: "Marius Popescu", meseriasAvatar: "https://i.pravatar.cc/200?img=13", rating: 4.8, pret: 1100, mesaj: "Tablou complet cu siguranțe Schneider și împământare. 2 zile lucru.", data: zileInUrma(2), status: "acceptata" },
  { id: "o-4", lucrareId: "l-8", lucrareTitlu: "Curățenie după renovare", meseriasId: "m-8", meseriasNume: "Elena Radu", meseriasAvatar: "https://i.pravatar.cc/200?img=45", rating: 4.9, pret: 450, mesaj: "Echipă de 2 persoane, produse profesionale incluse. Durează ~5 ore.", data: zileInUrma(1), status: "in_asteptare" },
];
