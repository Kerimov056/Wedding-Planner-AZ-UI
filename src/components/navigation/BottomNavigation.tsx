import { Home, Search, Heart, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Ana Səhifə", path: "/" },
    { icon: Search, label: "Axtarış", path: "/search" },
    { icon: Heart, label: "Favorilər", path: "/favorites" },
    { icon: MessageCircle, label: "Mesajlar", path: "/messages" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? "text-wedding-rose" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-wedding-rose" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};