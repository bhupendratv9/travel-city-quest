"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import usePopupStore from "@/store/popup-store";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function PointInfoDialog() {
  const { isPopupOpen, setPopup } = usePopupStore();
  return (
    <Dialog open={isPopupOpen} onOpenChange={setPopup}>
      <DialogTrigger className="hidden"></DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="gradient-background text-white shadow-[0_0_25px_5px] shadow-quest-yellow/40"
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="flex items-center">Point Info</DialogTitle>
          <DialogClose asChild>
            <Button
              aria-label="popup-close"
              variant="ghost"
              size="icon"
              className="text-quest-yellow cursor-pointer"
            >
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
