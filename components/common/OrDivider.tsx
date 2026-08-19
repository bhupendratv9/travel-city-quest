import React from "react";

type Props = {
  title: string;
}

export default function OrDivider({ title }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="w-2/5 bg-white/5 h-px" />
      <p className="text-white/40">{title}</p>
      <div className="w-2/5 bg-white/5 h-px" />
    </div>
  );
}
