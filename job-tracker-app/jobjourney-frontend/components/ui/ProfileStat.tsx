type ProfileStatProps = {
  stat: number;
  title: string;
};

const ProfileStat = ({ stat, title }: ProfileStatProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl sm:text-6xl text-center ">{stat}</span>
      <span className="-mt-2 text-center">{title}</span>
    </div>
  );
};

export default ProfileStat;
