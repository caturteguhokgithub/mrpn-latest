import { Icon } from "@iconify/react";
import { on } from "events";
import { CSSProperties } from "react";

export default function Iconify({
  name,
  className,
  size,
  color,
  sx,
  onClick,
}: {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  sx?: CSSProperties;
  onClick?: (() => void) | undefined;
}) {
  return (
    <Icon
      className={className}
      icon={name}
      height={size || 18}
      color={color}
      style={sx}
      onClick={onClick}
    />
  );
}
