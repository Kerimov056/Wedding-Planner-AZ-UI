import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopHeader = () => {
  return (
    <header className="bg-wedding-rose text-white p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-wedding-gold rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">💍</span>
          </div>
          <h1 className="text-xl font-bold">Wedding-Planner-AZ</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};