"use client";

import Link from "next/link";

type GradientBtnProps = {
  title: string;
  link?: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "ghost";
  className?: string;
};

const GradientBtn = ({
  title,
  link,
  size = "md",
  variant = "solid",
  className = "",
}: GradientBtnProps) => {
  const sizeClasses = {
    sm: "h-[40px] w-[110px] text-lg",
    md: "h-[60px] w-[120px] text-xl",
    lg: "h-[60px] w-[270px] text-2xl",
  }[size];

  const base =
    "tracking-widest font-bold rounded transition-all duration-300 hover:cursor-pointer";

  const variants = {
    solid:
      "bg-gradient-to-l font-extrabold from-blue-500 to-sky-400 text-white",
    ghost:
      "bg-transparent font-extrabold text-blue-900 hover:bg-gradient-to-l hover:from-blue-500 hover:to-sky-400 hover:text-white",
  };

  const finalClass = `${sizeClasses} ${base} ${variants[variant]}`;

  if (link) {
    return (
      <Link href={link}>
        <button className={finalClass}>{title}</button>
      </Link>
    );
  }

  return (
    <button type="submit" className={finalClass}>
      {title}
    </button>
  );
};

export default GradientBtn;
