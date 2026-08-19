"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import useLanguageStore from "@/store/language-store";
import { cn } from "@/lib/utils";
import GlobeLanguageIconSvg from "@/components/svgs/GlobeLanguageIconSVG";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {useGetLanguageQuery} from "@/hooks/queries/get-language-query";
import { Skeleton } from "@/components/ui/skeleton";


export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetLanguageQuery();

  if (isLoading) {
    return <Skeleton className="w-24 h-12.5 rounded-full"/>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-24 px-4 h-12.5 rounded-full bg-white/40 uppercase cursor-pointer flex items-center justify-between">
        <GlobeLanguageIconSvg />{" "}
        <div className="flex items-center">
          {language}{" "}
          <span>
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="bg-white/40 w-max min-w-32 p-1">
        {data?.data?.map((lang) => (
          <Button
            onClick={() => {
              setLanguage(lang.code);
              setOpen(false);
            }}
            variant="ghost"
            key={lang.code}
            className={cn(
              "cursor-pointer",
              lang.code === language
                ? "font-medium text-quest-yellow hover:text-quest-yellow/80" +
                    " hover:bg-transparent"
                : "hover:bg-quest-yellow/80 hover:text-white text-white",
            )}
          >
            {lang.native_name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
