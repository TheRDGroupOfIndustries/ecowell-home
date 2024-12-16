const sizes = {
  textad: "text-[20px] font-medium lg:text-[17px]",
  textxl: "text-[24px] font-medium lg:text-[20px] md:text-[22px]",
  text2xl:
    "text-[26px] font-medium lg:text-[22px] md:text-[24px] sm:text-[22px]",
  text3xl:
    "text-[27px] font-medium lg:text-[22px] md:text-[25px] sm:text-[23px]",
  text4xl:
    "text-[32px] font-medium lg:text-[27px] md:text-[30px] sm:text-[28px]",
  text5xl:
    "text-[48px] font-medium lg:text-[40px] md:text-[44px] sm:text-[38px]",
  text6xl: "text-[64px] font-medium lg:text-[64px] md:text-[48px]",
  text7xl: "text-[96px] font-medium lg:text-[96px] md:text-[48px]",
  headingxs:
    "text-[27px] font-semibold lg:text-[22px] md:text-[25px] sm:text-[23px]",
  headings:
    "text-[32px] font-bold lg:text-[27px] md:text-[30px] sm:text-[28px]",
  headingmd:
    "text-[36px] font-semibold lg:text-[30px] md:text-[34px] sm:text-[32px]",
  headinglg:
    "text-[48px] font-semibold lg:text-[40px] md:text-[44px] sm:text-[38px]",
  headingxl: "text-[64px] font-semibold lg:text-[64px] md:text-[48px]",
  heading2xl: "text-[96px] font-semibold lg:text-[96px] md:text-[48px]",
};

const Heading = ({
  children,
  className = "",
  size = "textxl",
  as,
  ...restProps
}) => {
  const Component = as || "h1";
  return (
    <Component
      className={`text-black-900 font-helveticaneue ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
