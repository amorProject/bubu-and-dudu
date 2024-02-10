import { Post } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";
import { BentoGridItemProps } from "../ui/bento-grid";
import useUser from "./user";

const UnverifiedPostsContext = createContext<UnverifiedPostsContextType>({
  unverifiedPosts: [],
  setUnverifiedPosts: () => {},
  refreshUnverifiedPosts: () => {},
  fetchMoreUnverifiedPosts: () => {},
  count: 0,
  loading: false,
});

type UnverifiedPostsContextType = {
  unverifiedPosts: BentoGridItemProps[];
  setUnverifiedPosts: React.Dispatch<
    React.SetStateAction<BentoGridItemProps[]>
  >;
  refreshUnverifiedPosts: () => void;
  fetchMoreUnverifiedPosts: () => void;
  count: number;
  loading: boolean;
};

export function UnverifiedPostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const [unverifiedPosts, setUnverifiedPosts] = useState<BentoGridItemProps[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [unverifiedCount, setUnverifiedCount] = useState(0);

  const refreshUnverifiedPosts = async () => {
    if (!user || user.role !== "ADMIN") return;
    setUnverifiedPosts([]);
    setLoading(true);
    const res = await fetch("/api/posts/unverified");
    const data = (await res.json()) as { posts: Post[]; count: number };
    const newItems = data.posts.map((post) => ({
      id: post.id,
      title: post.title,
      categories: post.categories,
      author: post.author,
      images: post.images,
    }));
    setPage(1);
    setUnverifiedCount(data.count);
    setUnverifiedPosts(newItems as any);
    setLoading(false);
  };

  const fetchMoreUnverifiedPosts = async () => {
    if (!user || user.role !== "ADMIN") return;
    setLoading(true);
    const res = await fetch(`/api/posts/unverified?page=${page + 1}`);
    const data = (await res.json()) as { posts: Post[]; count: number };
    const newItems = data.posts.map((post) => ({
      id: post.id,
      title: post.title,
      categories: post.categories,
      author: post.author,
      images: post.images,
    }));
    setPage(page + 1);
    setUnverifiedCount(data.count);
    setUnverifiedPosts([...unverifiedPosts, ...newItems] as any);
    setLoading(false);
  };

  useEffect(() => {
    refreshUnverifiedPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  return (
    <UnverifiedPostsContext.Provider
      value={{
        unverifiedPosts,
        setUnverifiedPosts,
        refreshUnverifiedPosts,
        fetchMoreUnverifiedPosts,
        count: unverifiedCount,
        loading,
      }}
    >
      {children}
    </UnverifiedPostsContext.Provider>
  );
}

export default function useUnverifiedPosts() {
  return useContext(UnverifiedPostsContext);
}
