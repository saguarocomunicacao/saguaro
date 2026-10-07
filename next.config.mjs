/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Exporta site 100% estático em /out (ideal para cPanel/WHM: basta subir em public_html).
  output: "export",
  trailingSlash: true,
  images: {
    // Sem servidor de otimização de imagem no export estático.
    unoptimized: true,
  },
};

export default nextConfig;
