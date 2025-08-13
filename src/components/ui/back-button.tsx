"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  children?: React.ReactNode;
}

export function BackButton({ 
  className = "", 
  variant = "ghost",
  children = (
    <>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Quay lại
    </>
  )
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.back()} 
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
