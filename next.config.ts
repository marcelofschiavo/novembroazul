import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Endereço curto para mandar ao RH: trilhanovembroazul.vercel.app/rh
  redirects() {
    return [{ source: "/rh", destination: "/campanha", permanent: false }];
  },
};

export default nextConfig;
