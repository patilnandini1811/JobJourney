type SpacePropType = {
  height: string;
  width?: string;
};

const Spacer = ({ height, width }: SpacePropType) => {
  return <div className={`${height} ${width}`}></div>;
};

export default Spacer;
