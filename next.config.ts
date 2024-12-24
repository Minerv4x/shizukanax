import { sources } from "next/dist/compiled/webpack/webpack";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'samehadaku.ws',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/home',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/home',
      },
      {
        source: '/api/genres',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/genres',
      },     
      {
        source: '/api/genres/:slug',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/genres/:slug',
      },
      {
        source: '/api/anime/:slug',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/anime/:slug',
      },
      {
        source: '/api/schedule',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/schedule',
      },
      {
        source: '/api/recent',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/recent',
      },
      {
        source: '/api/ongoing',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/ongoing',
      },
      {
        source: '/api/completed',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/completed',
      },
      {
        source: '/api/popular',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/popular',
      },
      {
        source: '/api/movies',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/movies',
      },
      {
        source: '/api/batch',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/batch',
      },
      {
        source: '/api/batch/:slug',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/batch/:slug',
      },
      {
        source: '/api/search',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/search',
      },
      {
        source: '/api/anime',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/anime',
      },
      {
        source: '/api/episode/:slug',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/episode/:slug',
      },
      {
        source: '/api/server/:slug',
        destination: 'https://shizu-kana-api.vercel.app/samehadaku/server/:slug',
      },
    ];
  },
};