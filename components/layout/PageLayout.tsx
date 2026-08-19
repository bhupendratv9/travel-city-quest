import React from "react";
import { cn } from "@/lib/utils";

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};


export default function PageLayout({ children, className }: PageLayoutProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <main
      style={{
        backgroundImage: `url('${basePath}/assets/common/common-background.webp')`,
      }}
      className={cn(
        "bg-cover bg-no-repeat max-w-screen min-h-screen overflow-hidden",
        className,
      )}
    >
      {children}
    </main>
  );
}
