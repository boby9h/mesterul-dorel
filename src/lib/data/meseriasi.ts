import type { Meserias } from "@/types";
import { slugify } from "@/lib/utils";

/** Date de baza pentru cei 20 de meseriasi fictivi (date demo). */
interface Seed {
  nume: string;
  categorii: string[];
  specializari: string[];
  oras: string;
  judet: string;
  experienta: number;
  pret: number;
  unitate: string;
  rating: number;
  recenzii: number;
  lucrari: number;
  disponibilitate: Meserias["disponibilitate"];
  verificat: boolean;
  raspunsRapid: boolean;
  avatarId: number;
  descriere: string;
}

const SEED: Seed[] = [
  { nume: "Dorel Ionescu", categorii: ["instalator", "montaj-chiuveta"], specializari: ["Instalații sanitare", "Centrale termice", "Depanări urgență"], oras: "București", judet: "Ilfov", experienta: 14, pret: 80, unitate: "/oră", rating: 4.9, recenzii: 213, lucrari: 480, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 12, descriere: "Instalator autorizat cu experiență în instalații sanitare și termice. Intervin rapid la urgențe și ofer garanție pentru toate lucrările." },
  { nume: "Marius Popescu", categorii: ["electrician"], specializari: ["Instalații electrice", "Tablouri electrice", "Avarii"], oras: "Cluj-Napoca", judet: "Cluj", experienta: 11, pret: 90, unitate: "/oră", rating: 4.8, recenzii: 168, lucrari: 350, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 13, descriere: "Electrician autorizat ANRE. Mă ocup de instalații noi, modernizări de tablouri și remedierea avariilor cu respectarea normelor de siguranță." },
  { nume: "Vasile Dumitru", categorii: ["zugrav", "amenajari-interioare"], specializari: ["Zugrăveli", "Glet", "Finisaje decorative"], oras: "Timișoara", judet: "Timiș", experienta: 9, pret: 35, unitate: "/mp", rating: 4.7, recenzii: 142, lucrari: 290, disponibilitate: "ocupat", verificat: true, raspunsRapid: false, avatarId: 14, descriere: "Zugrav cu simț pentru detalii. Lucrez curat, protejez mobilierul și livrez finisaje uniforme, fără urme și scurgeri." },
  { nume: "Ion Georgescu", categorii: ["gresie-faianta", "amenajari-interioare"], specializari: ["Montaj gresie", "Faianță", "Plăci mari"], oras: "Iași", judet: "Iași", experienta: 16, pret: 55, unitate: "/mp", rating: 4.9, recenzii: 198, lucrari: 410, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 15, descriere: "Specialist în montaj gresie și faianță, inclusiv plăci de mari dimensiuni. Aliniere perfectă a rosturilor și nivel impecabil." },
  { nume: "Andrei Constantin", categorii: ["montaj-mobila", "tamplar"], specializari: ["Montaj mobilier", "Mobilă la comandă", "Reglaje"], oras: "Constanța", judet: "Constanța", experienta: 7, pret: 70, unitate: "/oră", rating: 4.6, recenzii: 96, lucrari: 210, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 33, descriere: "Asamblez și montez mobilier de orice fel, rapid și fără zgârieturi. Ofer și soluții de prindere sigură în perete pentru corpuri suspendate." },
  { nume: "Cristian Matei", categorii: ["aer-conditionat", "electrician"], specializari: ["Montaj AC", "Igienizare", "Reparații AC"], oras: "Brașov", judet: "Brașov", experienta: 10, pret: 250, unitate: "/proiect", rating: 4.8, recenzii: 154, lucrari: 320, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 51, descriere: "Montaj profesional aparate aer condiționat, cu vidare corectă și verificarea presiunii. Igienizez și reîncarc instalațiile existente." },
  { nume: "Gheorghe Stan", categorii: ["acoperisuri"], specializari: ["Montaj acoperiș", "Hidroizolații", "Reparații"], oras: "Sibiu", judet: "Sibiu", experienta: 19, pret: 60, unitate: "/mp", rating: 4.9, recenzii: 121, lucrari: 240, disponibilitate: "ocupat", verificat: true, raspunsRapid: false, avatarId: 52, descriere: "Echipă serioasă pentru acoperișuri noi și reparații. Lucrăm cu țiglă metalică și ceramică, plus hidroizolații garantate." },
  { nume: "Elena Radu", categorii: ["curatenie"], specializari: ["Curățenie generală", "După constructor", "Periodică"], oras: "București", judet: "București", experienta: 6, pret: 120, unitate: "/proiect", rating: 4.9, recenzii: 287, lucrari: 620, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 45, descriere: "Servicii de curățenie cu produse profesionale. Echipă punctuală și discretă, ideală pentru apartamente, birouri și curățenie după renovare." },
  { nume: "Florin Tudor", categorii: ["gradinarit"], specializari: ["Întreținere gazon", "Toaletări", "Sisteme irigație"], oras: "Craiova", judet: "Dolj", experienta: 8, pret: 100, unitate: "/proiect", rating: 4.7, recenzii: 88, lucrari: 180, disponibilitate: "disponibil", verificat: true, raspunsRapid: false, avatarId: 60, descriere: "Amenajez și întrețin spații verzi: tuns gazon, toaletări pomi, plantări și sisteme de irigație automate." },
  { nume: "Robert Marin", categorii: ["tamplar"], specializari: ["Tâmplărie lemn", "Uși și ferestre", "Mobilier comandă"], oras: "Oradea", judet: "Bihor", experienta: 13, pret: 75, unitate: "/oră", rating: 4.8, recenzii: 110, lucrari: 230, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 11, descriere: "Tâmplar cu atelier propriu. Realizez mobilier la comandă, uși din lemn masiv și restaurări, cu atenție la fiecare detaliu." },
  { nume: "Adrian Voinea", categorii: ["instalator", "reparatii-electrocasnice"], specializari: ["Instalații apă", "Desfundări", "Montaj boilere"], oras: "Ploiești", judet: "Prahova", experienta: 12, pret: 75, unitate: "/oră", rating: 4.6, recenzii: 134, lucrari: 300, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 68, descriere: "Rezolv rapid scurgeri, înfundări și înlocuiri de țevi. Montez boilere, pompe și obiecte sanitare cu garanție." },
  { nume: "Mihai Barbu", categorii: ["electrician", "aer-conditionat"], specializari: ["Prize și întrerupătoare", "Iluminat LED", "Smart home"], oras: "Pitești", judet: "Argeș", experienta: 9, pret: 85, unitate: "/oră", rating: 4.7, recenzii: 102, lucrari: 215, disponibilitate: "ocupat", verificat: true, raspunsRapid: false, avatarId: 50, descriere: "Modernizez instalații electrice și instalez sisteme smart home. Iluminat LED, automatizări și consumatori cu protecție corectă." },
  { nume: "Sorin Lazar", categorii: ["zugrav"], specializari: ["Vopsitorii", "Tencuieli decorative", "Tapet"], oras: "Galați", judet: "Galați", experienta: 15, pret: 32, unitate: "/mp", rating: 4.8, recenzii: 159, lucrari: 340, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 53, descriere: "Zugrav cu experiență în tencuieli decorative și montaj tapet. Pregătesc temeinic suprafețele pentru un rezultat de durată." },
  { nume: "Daniel Crețu", categorii: ["montaj-mobila", "amenajari-interioare"], specializari: ["Bucătării", "Dressing-uri", "Mobilier birou"], oras: "Cluj-Napoca", judet: "Cluj", experienta: 10, pret: 65, unitate: "/oră", rating: 4.9, recenzii: 176, lucrari: 360, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 8, descriere: "Montez bucătării complete, dressing-uri și mobilier de birou. Mă ocup de aliniere, blaturi și electrocasnice încorporate." },
  { nume: "Bogdan Neagu", categorii: ["reparatii-electrocasnice"], specializari: ["Mașini de spălat", "Frigidere", "Cuptoare"], oras: "Timișoara", judet: "Timiș", experienta: 11, pret: 150, unitate: "/proiect", rating: 4.6, recenzii: 119, lucrari: 280, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 7, descriere: "Repar electrocasnice mari la domiciliu. Diagnostic corect, piese originale și garanție pentru intervenție." },
  { nume: "Alexandru Dima", categorii: ["gresie-faianta", "instalator"], specializari: ["Băi la cheie", "Glaf", "Pardoseli"], oras: "Brașov", judet: "Brașov", experienta: 17, pret: 58, unitate: "/mp", rating: 4.9, recenzii: 188, lucrari: 390, disponibilitate: "ocupat", verificat: true, raspunsRapid: false, avatarId: 4, descriere: "Renovez băi la cheie, de la demolare la finisaj. Montez gresie, faianță, instalez obiecte sanitare și asigur etanșări corecte." },
  { nume: "Cătălin Oprea", categorii: ["acoperisuri", "tamplar"], specializari: ["Șarpante", "Mansardări", "Jgheaburi"], oras: "Sibiu", judet: "Sibiu", experienta: 18, pret: 65, unitate: "/mp", rating: 4.8, recenzii: 97, lucrari: 200, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 15, descriere: "Construiesc șarpante și amenajez mansarde. Montez jgheaburi, burlane și sisteme de scurgere pentru orice tip de acoperiș." },
  { nume: "Ioana Sandu", categorii: ["curatenie", "gradinarit"], specializari: ["Curățenie birouri", "Geamuri", "Spații verzi"], oras: "București", judet: "București", experienta: 5, pret: 110, unitate: "/proiect", rating: 4.8, recenzii: 204, lucrari: 450, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 44, descriere: "Curățenie profesională pentru birouri și locuințe, inclusiv spălare geamuri și întreținere spații verzi. Echipă verificată și asigurată." },
  { nume: "Paul Enache", categorii: ["electrician", "instalator"], specializari: ["Avarii electrice", "Montaj prize", "Verificări PRAM"], oras: "Constanța", judet: "Constanța", experienta: 8, pret: 88, unitate: "/oră", rating: 4.5, recenzii: 76, lucrari: 160, disponibilitate: "indisponibil", verificat: false, raspunsRapid: false, avatarId: 59, descriere: "Intervin la avarii electrice și montez circuite noi. Realizez verificări și măsurători conform normelor în vigoare." },
  { nume: "Nicolae Albu", categorii: ["instalator", "aer-conditionat"], specializari: ["Centrale termice", "Calorifere", "Montaj AC"], oras: "Iași", judet: "Iași", experienta: 20, pret: 95, unitate: "/oră", rating: 5.0, recenzii: 231, lucrari: 520, disponibilitate: "disponibil", verificat: true, raspunsRapid: true, avatarId: 3, descriere: "20 de ani experiență în instalații termice. Montez și revizuiesc centrale, calorifere și aparate de aer condiționat, cu garanție extinsă." },
];

const COVERS = [
  "https://picsum.photos/seed/work1/1200/600",
  "https://picsum.photos/seed/work2/1200/600",
  "https://picsum.photos/seed/work3/1200/600",
];

function galerie(slug: string): string[] {
  return Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${slug}-${i}/600/450`);
}

export const MESERIASI: Meserias[] = SEED.map((s, idx) => {
  const slug = slugify(s.nume);
  return {
    id: `m-${idx + 1}`,
    slug,
    nume: s.nume,
    avatar: `https://i.pravatar.cc/200?img=${s.avatarId}`,
    acoperire: COVERS[idx % COVERS.length],
    specializari: s.specializari,
    categorieSlugs: s.categorii,
    oras: s.oras,
    judet: s.judet,
    descriere: s.descriere,
    rating: s.rating,
    numarRecenzii: s.recenzii,
    pretEstimativDeLa: s.pret,
    unitatePret: s.unitate,
    disponibilitate: s.disponibilitate,
    verificat: s.verificat,
    experientaAni: s.experienta,
    lucrariFinalizate: s.lucrari,
    raspunsRapid: s.raspunsRapid,
    telefon: `07${(20 + idx).toString().padStart(2, "0")} ${(100 + idx * 7).toString().slice(0, 3)} ${(200 + idx * 3).toString().slice(0, 3)}`,
    galerie: galerie(slug),
  };
});

export const MESERIASI_BY_SLUG: Record<string, Meserias> = Object.fromEntries(
  MESERIASI.map((m) => [m.slug, m]),
);

export function getMeserias(slug: string): Meserias | undefined {
  return MESERIASI_BY_SLUG[slug];
}
