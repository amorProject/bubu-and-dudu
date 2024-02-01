"use client";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { SimpleAvatar } from "../views/avatar";
import { Post } from "@/lib/types";

export const AnimatedTooltip = ({
  item,
}: {
  item: Post;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [prevHalfWidth, setPrevHalfWidth] = useState<number>(0);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    var halfWidth = event.target.offsetWidth / 2;
    if (halfWidth === prevHalfWidth) return;
    if (isNaN(halfWidth)) {
      halfWidth = prevHalfWidth;
      return;
    }
    setPrevHalfWidth(halfWidth);
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {item.images.map((it, idx) => (
        <div
          className="relative group px-2"
          key={idx}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-secondary z-50 shadow-xl px-4 py-2"
              >
                <div className="font-bold text-white relative z-30 text-base">
                  {item.title} - {idx + 1}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <SimpleAvatar handleMouseMove={handleMouseMove} imageUrl={it.url} index={idx} title={item.title} />
        </div>
      ))}
    </>
  );
};