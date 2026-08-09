import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-linho px-4 py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center font-display text-xl uppercase tracking-[0.18em] text-sepia">
          Painel do casal
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
