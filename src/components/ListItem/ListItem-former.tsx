type ListItemProps = {
  title: string;
  value?: string | JSX.Element;
  className?: string;
  valueClassName?: string;
  titleClassName?: string;
};
const ListItemFormer = ({
  title,
  value,
  className,
  titleClassName,
  valueClassName,
}: ListItemProps) => {
  const renderValue = () => {
    if (value && typeof value != "string") {
      return (
        <div
          className={`mt-2 md:mt-auto flex-[1] md:ml-[4.4rem] ${valueClassName}`}
        >
          {value}
        </div>
      );
    }
    return (
      <span
        className={`mt-2 md:mt-auto md:ml-[4.4rem] text-color3 font-semibold flex-[1] ${valueClassName}`}
      >
        {value}
      </span>
    );
  };

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center mt-6 p-2 overflow-x-hidden ${className}`}
    >
      <span className={`text-color3 flex-[1] ${titleClassName}`}>{title}</span>
      {renderValue()}
    </div>
  );
};

export default ListItemFormer;
