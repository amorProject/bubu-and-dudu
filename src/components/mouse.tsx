"use client"
import { Sparkle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"

interface Position {
  x: number;
  y: number;
}

interface LastStar {
  starTimestamp: number;
  starPosition: Position;
  mousePosition: Position;
  count: number;
}

interface Config {
  starAnimationDuration: number;
  minimumTimeBetweenStars: number;
  minimumDistanceBetweenStars: number;
  glowDuration: number;
  maximumGlowPointSpacing: number;
  colors: string[];
  sizes: string[];
  animations: string[];
}

const originPosition: Position = { x: 0, y: 0 };

const config: Config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"],
};

const rand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const selectRandom = (items: any[]): any =>
  items[rand(0, items.length - 1)];

const withUnit = (value: number, unit: string): string =>
  `${value}${unit}`;

const px = (value: number): string => withUnit(value, "px");

const ms = (value: number): string => withUnit(value, "ms");

const calcDistance = (a: Position, b: Position): number => {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start: number, end: number): number => end - start;

const createStar = (position: Position, count: number): JSX.Element => {
  const color = selectRandom(config.colors);

  return (
    <Sparkle
      fill={color}
      key={uuid()}
      className="star"
      style={{
        left: px(position.x),
        top: px(position.y),
        fontSize: selectRandom(config.sizes),
        color: `rgb(${color})`,
        textShadow: `0px 0px 1.5rem rgb(${color} / 0.5)`,
        animationName: config.animations[count % 3],
        animationDuration: ms(config.starAnimationDuration),
      }}
    ></Sparkle>
  );
};

export default function Mouse() {
  const [lastStar, setLastStar] = useState<LastStar>({
    starTimestamp: new Date().getTime(),
    starPosition: originPosition,
    mousePosition: originPosition,
    count: 0,
  });
  const [glowPoints, setGlowPoints] = useState<JSX.Element[]>([]);

  const updateLastStar = (position: Position): void => {
    setLastStar((prevState) => ({
      ...prevState,
      starTimestamp: new Date().getTime(),
      starPosition: position,
    }));
  };

  const updateLastMousePosition = (position: Position): void => {
    setLastStar((prevState) => ({
      ...prevState,
      mousePosition: position,
    }));
  };

  const adjustLastMousePosition = (position: Position): void => {
    if (
      lastStar.mousePosition.x === 0 &&
      lastStar.mousePosition.y === 0
    ) {
      setLastStar((prevState) => ({
        ...prevState,
        mousePosition: position,
      }));
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      const mousePosition: Position = { x: e.clientX, y: e.clientY };

      adjustLastMousePosition(mousePosition);

      const now = new Date().getTime();
      const hasMovedFarEnough =
        calcDistance(lastStar.starPosition, mousePosition) >=
        config.minimumDistanceBetweenStars;
      const hasBeenLongEnough =
        calcElapsedTime(lastStar.starTimestamp, now) >
        config.minimumTimeBetweenStars;

      if (hasMovedFarEnough || hasBeenLongEnough) {
        const newStar = createStar(mousePosition, lastStar.count);
        setLastStar((prevState) => ({
          ...prevState,
          count: prevState.count + 1,
        }));
        setGlowPoints((prevState) => [...prevState, newStar]);

        updateLastStar(mousePosition);
      }

      updateLastMousePosition(mousePosition);
    };

    const handleMouseLeave = (): void => {
      updateLastMousePosition(originPosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [lastStar]);

  return <div>{glowPoints}</div>;
};