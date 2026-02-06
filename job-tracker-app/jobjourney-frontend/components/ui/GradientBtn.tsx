type GradientBtnProps = {
  title: string;
  link?: string;
  size?: "sm" | "md" | "lg";
};

const GradientBtn = ({ title, link, size = "md" }: GradientBtnProps) => {
  const sizeClasses = {
    sm: "h-[35px] w-[95px]",
    md: "h-[60px] w-[120px]",
    lg: "h-[60px] w-[270px]",
  }[size];

  return link ? (
    //RETURN LINKED BUTTON
    <a href={link}>
      <button
        className={`${sizeClasses} tracking-widest font-bold bg-gradient-to-l  from-blue-500 to-sky-400 text-white hover:cursor-pointer`}
      >
        {title}
      </button>
    </a>
  ) : (
    //UNLINKED BUTTON FOR SUBMISSION
    <button
      type="submit"
      className={`${sizeClasses} mx-auto tracking-widest font-bold bg-gradient-to-l  from-blue-500 to-sky-400 text-white hover:cursor-pointer`}
    >
      {title}
    </button>
  );
};

export default GradientBtn;
