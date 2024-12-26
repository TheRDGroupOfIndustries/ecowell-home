import CountUp from "react-countup";

const ReactCountUp = ({
  amt,
  className,
  prefix,
  decimals = false,
  duration = 0.8,
  children,
}) => {
  return (
    <>
      <span className={className}>
        <CountUp
          end={amt}
          decimal="."
          prefix={prefix}
          decimals={decimals ? 2 : 0}
          duration={duration}
        />
        {children}
      </span>
    </>
  );
};

export default ReactCountUp;
