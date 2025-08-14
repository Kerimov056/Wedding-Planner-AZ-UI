import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Camera, Music, Palette, UtensilsCrossed, Car, Flower2 } from "lucide-react";

const categories = [
  { id: "restaurant", name: "Restoran", nameAz: "Restoranlar", icon: UtensilsCrossed, color: "bg-red-500" },
  { id: "photographer", name: "Fotoqraf", nameAz: "Fotoqraflar", icon: Camera, color: "bg-blue-500" },
  { id: "musician", name: "Musiqiçi", nameAz: "Musiqiçilər", icon: Music, color: "bg-purple-500" },
  { id: "decorator", name: "Dekorator", nameAz: "Dekoratorlar", icon: Palette, color: "bg-pink-500" },
  { id: "transport", name: "Nəqliyyat", nameAz: "Nəqliyyat", icon: Car, color: "bg-green-500" },
  { id: "florist", name: "Gülçü", nameAz: "Gülçülər", icon: Flower2, color: "bg-yellow-500" },
];

const featuredVendors = [
  {
    id: 1,
    name: "Elite Wedding Restaurant",
    category: "Restaurant",
    rating: 4.8,
    reviewCount: 124,
    price: "₼50-100",
    location: "Yasamal, Bakı",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Artistic Photo Studio",
    category: "Photographer",
    rating: 4.9,
    reviewCount: 89,
    price: "₼200-500",
    location: "Nəsimi, Bakı",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop"
  },
];

export const HomePage = () => {
  return (
    <div className="space-y-6 p-4">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-wedding-rose to-wedding-gold text-white rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-2">Toy xidmətlərini tap</h2>
        <p className="text-white/90 mb-4">Məhz sizin üçün ən yaxşı xidmətləri keçiridik</p>
        
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Xidmət axtarın..." 
              className="pl-10 bg-white"
            />
          </div>
          <Button variant="secondary" className="bg-wedding-gold hover:bg-wedding-gold/90">
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Kateqoriyalar</h3>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium">{category.nameAz}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Vendors */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Tövsiyə olunan</h3>
          <Button variant="ghost" size="sm" className="text-wedding-rose">
            Hamısına bax
          </Button>
        </div>
        
        <div className="space-y-4">
          {featuredVendors.map((vendor) => (
            <Card key={vendor.id} className="hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-0">
                <div className="flex">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-24 h-24 object-cover rounded-l-lg"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm">{vendor.name}</h4>
                        <p className="text-xs text-muted-foreground">{vendor.category}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {vendor.price}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-wedding-gold fill-current" />
                        <span className="text-xs font-medium">{vendor.rating}</span>
                        <span className="text-xs text-muted-foreground">({vendor.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{vendor.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-center">Rezervasiyalarım</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-center">
            <div className="w-8 h-8 bg-wedding-blush rounded-full flex items-center justify-center mx-auto">
              <span className="text-wedding-rose">📅</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-center">Mesajlarım</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-center">
            <div className="w-8 h-8 bg-wedding-blush rounded-full flex items-center justify-center mx-auto">
              <span className="text-wedding-rose">💬</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};