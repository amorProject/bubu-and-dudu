import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session }) => {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
};

export interface ProfileStats {
  posts: number;
  images: number;
  downloads: number;
  likes: number;
  views: number;
}

export interface Profile {
  id: string;
  username: string;
  avatar: string;
  posts: Post[];
  images: Image[];
  likedImages: Image[];
  stats: ProfileStats;
}

interface Post {
  id: number;
  title: string;
  images: Image[];
  categories: any[];
  likes: number;
  createdAt: Date;
  views: number;
}

export interface Image {
  id: number;
  title: string;
  url: string;
  downloads: number;
}