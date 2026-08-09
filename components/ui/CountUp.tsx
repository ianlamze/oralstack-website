type CountUpProps = {
  value: string;
  className?: string;
};

export default function CountUp({ value, className }: CountUpProps) {
  return <span className={className}>{value}</span>;
}
