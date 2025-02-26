import { Icon } from "@iconify/react";
import { CSSProperties } from "react";

export default function Iconify({
  name,
  size,
  color,
  sx,
}: {
  name: string;
  size?: number;
  color?: string;
  sx?: CSSProperties;
}) {
  return <Icon icon={name} height={size || 18} color={color} style={sx} />;
}
