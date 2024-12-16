const sizes = {
  textxs: "text-[16px] font-light lg:text-[13px]",
  texts: "text-[18px] font-normal lg:text-[15px]",
  textlg: "text-[22px] font-normal lg:text-[18px]",
};

const Text = ({
  children,
  className = "",
  as,
  size = "texts",
  ...restProps
}) => {
  const Component = as || "p";
  return (
    <Component
      className={`text-black-900 font-helveticaneue ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
