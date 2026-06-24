"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hammer, Loader2, UserRound } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  autentificareSchema, inregistrareSchema, type AutentificareInput, type InregistrareInput,
} from "@/lib/validations";
import { autentificare, inregistrare } from "@/services/auth-service";
import type { Rol } from "@/types";

function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<AutentificareInput>({ resolver: zodResolver(autentificareSchema) });

  async function onSubmit(data: AutentificareInput) {
    await autentificare(data.email, data.parola); // mock → Supabase
    router.push("/dashboard/client");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email-l">Email</Label>
        <Input id="email-l" type="email" placeholder="email@exemplu.ro" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="parola-l">Parolă</Label>
        <Input id="parola-l" type="password" placeholder="••••••••" {...register("parola")} />
        {errors.parola && <p className="text-xs text-destructive">{errors.parola.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Autentificare
      </Button>
    </form>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [rol, setRol] = useState<Rol>("client");
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<InregistrareInput>({ resolver: zodResolver(inregistrareSchema), defaultValues: { rol: "client" } });

  async function onSubmit(data: InregistrareInput) {
    await inregistrare(data); // mock → Supabase
    router.push(data.rol === "meserias" ? "/dashboard/meserias" : "/dashboard/client");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>Tip de cont</Label>
        <div className="grid grid-cols-2 gap-3">
          {([
            { v: "client", label: "Client", icon: UserRound, desc: "Caut servicii" },
            { v: "meserias", label: "Meseriaș", icon: Hammer, desc: "Ofer servicii" },
          ] as const).map((opt) => (
            <button
              type="button"
              key={opt.v}
              onClick={() => { setRol(opt.v); setValue("rol", opt.v); }}
              className={cn(
                "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors",
                rol === opt.v ? "border-primary bg-accent" : "hover:bg-muted",
              )}
            >
              <opt.icon className={cn("h-5 w-5", rol === opt.v ? "text-primary" : "text-muted-foreground")} />
              <span className="text-sm font-semibold text-secondary">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="nume">Nume complet</Label>
        <Input id="nume" placeholder="ex: Andrei Popescu" {...register("nume")} />
        {errors.nume && <p className="text-xs text-destructive">{errors.nume.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email-r">Email</Label>
        <Input id="email-r" type="email" placeholder="email@exemplu.ro" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="parola-r">Parolă</Label>
        <Input id="parola-r" type="password" placeholder="minim 6 caractere" {...register("parola")} />
        {errors.parola && <p className="text-xs text-destructive">{errors.parola.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Creează cont
      </Button>
    </form>
  );
}

export function AuthForm() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Autentificare</TabsTrigger>
        <TabsTrigger value="register">Cont nou</TabsTrigger>
      </TabsList>
      <TabsContent value="login"><LoginForm /></TabsContent>
      <TabsContent value="register"><RegisterForm /></TabsContent>
    </Tabs>
  );
}
