"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import useUnverifiedPosts from "../providers/unverified";
import useUser from "../providers/user";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Button } from "../ui/button";

export function VerifyBento() {
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const { user } = useUser();
  const {
    count,
    fetchMoreUnverifiedPosts,
    refreshUnverifiedPosts,
    unverifiedPosts,
    loading,
  } = useUnverifiedPosts();

  if (!user || user.role !== "ADMIN") {
    return <div>You are not authorized to view this page</div>;
  }

  function getColSpan(count: number): string {
    if (count === 4) return "col-span-3";
    return "col-span-2";
  }

  function toggleSelected(id: string) {
    if (selectedPostIds.includes(id)) {
      setSelectedPostIds(selectedPostIds.filter((i) => i !== id));
    } else {
      setSelectedPostIds([...selectedPostIds, id]);
    }
  }

  async function verifySelected() {
    await fetch("/api/posts/unverified", {
      method: "PUT",
      body: JSON.stringify({ postIds: selectedPostIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message);
        setSelectedPostIds([]);
        refreshUnverifiedPosts();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-col gap-y-2 mb-5">
        <h1 className="text-4xl font-bold">Verify Posts</h1>
        <Button
          variant="accent"
          onClick={refreshUnverifiedPosts}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
        <span className="text-center">
          {selectedPostIds.length} post{selectedPostIds.length !== 1 && "s"}{" "}
          selected
        </span>
        <div className="flex gap-x-2 justify-center">
          <Button
            variant="nav-ghost"
            onClick={() => setSelectedPostIds([])}
            disabled={loading || selectedPostIds.length === 0}
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            onClick={verifySelected}
            disabled={loading || selectedPostIds.length === 0}
          >
            Verify
          </Button>
        </div>
      </div>
      <BentoGrid className="max-w-4xl mx-auto">
        {unverifiedPosts.map((item, i) => (
          <BentoGridItem
            key={i}
            {...item}
            className={cn(
              getColSpan(item.images.length),
              selectedPostIds.includes(item.id) && "border-[#e672cd] border-4",
              "select-none"
            )}
            onClick={() => toggleSelected(item.id)}
          />
        ))}
        {unverifiedPosts.length !== 0 && count > unverifiedPosts.length && (
          <Button
            variant="nav-ghost"
            className="text-lg font-bold w-full col-span-6 text-center justify-center row-span-1 h-fit rounded-xl items-center flex flex-col space-y-4"
            onClick={fetchMoreUnverifiedPosts}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        )}
      </BentoGrid>
    </div>
  );
}
