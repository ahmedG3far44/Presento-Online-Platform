/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

// {
//   protocol: "https",
//   hostname: "avatars.githubusercontent.com",
//   pathname: "/u/*",
// },
// {
//   protocol: "https",
//   hostname: "lh3.googleusercontent.com",
//   pathname: "/a/*",
// },
// {
//   protocol: "https",
//   hostname: "media.licdn.com",
// },
// {
//   protocol: "https",
//   hostname: "*",
//   pathname: "/*",
// },
// {
//   protocol: "https",
//   hostname: "www.its.ac.id",
//   pathname: "/*",
// },
