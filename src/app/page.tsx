'use client'

import { WorkshopContent } from "@/components/WorkshopContent";
import { WorkshopRegistration } from "@/components/WorkshopRegistration";
import { TopNavigation } from "@/components/TopNavigation";
import { useState } from "react";
import { Toaster } from "sonner";

type Route = 'registration' | 'content'

export default function Home() {
  const [currentRoute, setCurrentRoute] = useState<Route>('registration')

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation currentRoute={currentRoute} onRouteChange={setCurrentRoute} />
        {currentRoute === 'registration' ? <WorkshopRegistration /> : <WorkshopContent />}
      <Toaster />
    </div>
  );
}
