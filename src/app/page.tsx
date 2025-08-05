'use client'
import { WorkshopContent } from "@/components/WorkshopContent";
import { Toaster } from "sonner";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
       <WorkshopContent />
      <Toaster />
    </div>
  );
}
