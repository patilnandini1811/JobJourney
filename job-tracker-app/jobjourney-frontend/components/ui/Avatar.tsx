type AvatarProps = {
  size: string;
  image?: string;
};

const Avatar = ({ size, image }: AvatarProps) => {
  return image ? (
    <div
      className={`${size} border-2 border-white bg-white rounded-full bg-cover bg-center`}
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  ) : (
    <div
      className={`${size} border-2 border-white bg-white rounded-full bg-cover bg-center`}
      style={{ backgroundImage: "url('/avatar.svg')" }}
    ></div>
  );
};

export default Avatar;
