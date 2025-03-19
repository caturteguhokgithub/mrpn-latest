import React from "react";
import EmptyState from "@/components/empty";
import Image from "next/image";

export default function EmptyDevelopingState() {
  return (
    <EmptyState
      dense
      icon={
        <Image
          alt="Under Construction"
          src="https://res.cloudinary.com/caturteguh/image/upload/v1742340744/mrpn/wired-outline-742-code-hover-pinch_cp02px.gif"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "auto", height: "120px" }}
        />
      }
      title="Masa Pengembangan"
      description="Mohon maaf halaman ini dalam masa pengembangan"
    />
  );
}
