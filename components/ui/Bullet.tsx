import MarkBullet from "@/components/ui/MarkBullet";

type BulletProps = {
  children: React.ReactNode;
};

export default function Bullet({ children }: BulletProps) {
  return (
    <li className="flex gap-3 items-start">
      <MarkBullet size={12} className="mt-1.5 opacity-90" />
      <span>{children}</span>
    </li>
  );
}
