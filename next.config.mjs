/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demofree.sirv.com",
      },
      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        protocol: "http",
        hostname: "image.tmdb.org"
      },
      {
        protocol: "https",
        hostname: "www.themoviedb.org"
      },
      {
        protocol: 'https',
        hostname: "i.ytimg.com"
      }
    ]
  }
};

export default nextConfig;
