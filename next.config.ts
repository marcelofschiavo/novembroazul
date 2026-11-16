import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Endereço curto para mandar ao RH: trilhanovembroazul.vercel.app/rh
  redirects() {
    return [
      { source: "/rh", destination: "/campanha", permanent: false },
      // As luzes de alerta viraram parte do passo "O meu painel".
      { source: "/trilha/luzes", destination: "/trilha/numeros", permanent: false },
    ];
  },
};

export default nextConfig;
