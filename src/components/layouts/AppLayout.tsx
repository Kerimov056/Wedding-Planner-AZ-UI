import { Outlet } from "react-router-dom";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { TopHeader } from "@/components/navigation/TopHeader";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopHeader />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};