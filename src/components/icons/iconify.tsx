import { Icon } from "@iconify/react";
import { CSSProperties } from "react";

export default function Iconify({
  name,
  className,
  size,
  color,
  sx,
}: {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  sx?: CSSProperties;
}) {
  return (
    <Icon
      className={className}
      icon={name}
      height={size || 18}
      color={color}
      style={sx}
    />
  );
}
