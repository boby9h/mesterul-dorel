import { z } from "zod";
import { ORASE } from "@/lib/constants";

/** Schema de validare pentru formularul „Publică o lucrare”. */
export const lucrareSchema = z.object({
  titlu: z
    .string()
    .min(8, "Titlul trebuie să aibă cel puțin 8 caractere.")
    .max(100, "Titlul este prea lung."),
  categorie: z.string().min(1, "Alege o categorie."),
  descriere: z
    .string()
    .min(20, "Descrie lucrarea în cel puțin 20 de caractere.")
    .max(1000, "Descrierea este prea lungă."),
  bugetDeLa: z.coerce.number().min(0, "Buget invalid."),
  bugetPanaLa: z.coerce.number().min(1, "Introdu un buget maxim."),
  oras: z.enum(ORASE, { message: "Alege orașul." }),
  adresa: z.string().min(3, "Introdu o adresă/zonă.").max(160),
  telefon: z
    .string()
    .regex(/^(\+4|0)\d{8,9}$/, "Introdu un număr de telefon valid (ex: 07xx xxx xxx)."),
  fotografii: z.array(z.string()).max(6, "Maxim 6 fotografii.").optional(),
})
  .refine((d) => d.bugetPanaLa >= d.bugetDeLa, {
    message: "Bugetul maxim trebuie să fie mai mare decât cel minim.",
    path: ["bugetPanaLa"],
  });

export type LucrareInput = z.infer<typeof lucrareSchema>;

/** Schema pentru formularul „Solicită ofertă” de pe profilul unui meseriaș. */
export const ofertaSchema = z.object({
  nume: z.string().min(3, "Introdu numele tău."),
  telefon: z.string().regex(/^(\+4|0)\d{8,9}$/, "Număr de telefon invalid."),
  detalii: z.string().min(15, "Descrie pe scurt ce ai nevoie."),
  data: z.string().optional(),
});
export type OfertaInput = z.infer<typeof ofertaSchema>;

/** Schema pentru autentificare / inregistrare (pregatit pentru Supabase). */
export const autentificareSchema = z.object({
  email: z.string().email("Email invalid."),
  parola: z.string().min(6, "Parola trebuie să aibă minim 6 caractere."),
});
export type AutentificareInput = z.infer<typeof autentificareSchema>;

export const inregistrareSchema = autentificareSchema.extend({
  nume: z.string().min(3, "Introdu numele complet."),
  rol: z.enum(["client", "meserias"], { message: "Alege tipul de cont." }),
});
export type InregistrareInput = z.infer<typeof inregistrareSchema>;
