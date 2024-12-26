import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1.25,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer = (staggerChildren, delayChildren) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const reverseSlug = (slug) => {
  const name = slug
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return name;
};

export const formatDateString = (dateString) => {
  const date = new Date(dateString);
  // const options = { day: "numeric", month: "long", year: "numeric" };
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix} ${month}, ${date.getFullYear()}`;
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  // padding single digits with leading zeros
  const pad = (num) => (num < 10 ? `0${num}` : num);

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const getDeliveryDate = (orderDate) => {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 3);
  return formatDateString(date);
};
