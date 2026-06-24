/**
 * Tipuri partajate pentru platforma Mesterul Dorel.
 * Centralizate aici pentru a fi reutilizate de servicii, hooks si componente.
 */

export type Rol = "client" | "meserias" | "administrator";

export type Disponibilitate = "disponibil" | "ocupat" | "indisponibil";

export type StatusLucrare = "deschisa" | "in_desfasurare" | "finalizata" | "anulata";

export type StatusOferta = "trimisa" | "acceptata" | "respinsa" | "in_asteptare";

export interface Categorie {
  slug: string;
  nume: string;
  descriere: string;
  /** numele iconului din lucide-react (ex: "Wrench") */
  icon: string;
  numarMeseriasi: number;
  popular?: boolean;
}

export interface Recenzie {
  id: string;
  meseriasId: string;
  autor: string;
  avatar: string;
  rating: number; // 1-5
  text: string;
  data: string; // ISO
  lucrare: string;
}

export interface Meserias {
  id: string;
  slug: string;
  nume: string;
  avatar: string;
  acoperire: string; // imagine cover
  specializari: string[];
  categorieSlugs: string[];
  oras: string;
  judet: string;
  descriere: string;
  rating: number;
  numarRecenzii: number;
  pretEstimativDeLa: number; // RON
  unitatePret: string; // ex: "/ora", "/proiect"
  disponibilitate: Disponibilitate;
  verificat: boolean;
  experientaAni: number;
  lucrariFinalizate: number;
  raspunsRapid: boolean;
  telefon: string;
  galerie: string[];
}

export interface MeseriasCuRecenzii extends Meserias {
  recenzii: Recenzie[];
}

export interface Lucrare {
  id: string;
  titlu: string;
  descriere: string;
  categorieSlug: string;
  oras: string;
  bugetDeLa: number;
  bugetPanaLa: number;
  data: string; // ISO
  status: StatusLucrare;
  numarOferte: number;
  client: string;
}

export interface Oferta {
  id: string;
  lucrareId: string;
  lucrareTitlu: string;
  meseriasId: string;
  meseriasNume: string;
  meseriasAvatar: string;
  rating: number;
  pret: number;
  mesaj: string;
  data: string;
  status: StatusOferta;
}

export interface Mesaj {
  id: string;
  conversatieId: string;
  expeditor: "client" | "meserias";
  text: string;
  ora: string;
}

export interface Conversatie {
  id: string;
  participantNume: string;
  participantAvatar: string;
  participantRol: "client" | "meserias";
  ultimMesaj: string;
  ora: string;
  necitite: number;
  online: boolean;
  mesaje: Mesaj[];
}

export type TipNotificare = "cerere_noua" | "oferta_noua" | "mesaj_nou" | "recenzie_noua";

export interface Notificare {
  id: string;
  tip: TipNotificare;
  titlu: string;
  descriere: string;
  ora: string;
  citita: boolean;
}

export interface FiltreMeseriasi {
  q?: string;
  oras?: string;
  categorie?: string;
  pretMax?: number;
  ratingMin?: number;
  disponibil?: boolean;
}
