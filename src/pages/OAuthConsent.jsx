import React from "react";
import { Link } from "react-router-dom";

export default function OAuthConsent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-xl font-semibold mb-2">Área em preparação</h1>
        <p className="text-muted-foreground mb-4">A autorização de acesso estará disponível com o novo backend.</p>
        <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
      </div>
    </div>
  );
}
