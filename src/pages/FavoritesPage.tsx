import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Heart, Trash2, Calendar, MessageCircle } from "lucide-react";

const favoriteVendors = [
  {
    id: 1,
    name: "Elite Wedding Restaurant",
    category: "Restoran",
    rating: 4.8,
    reviewCount: 124,
    price: "₼50-100",
    location: "Yasamal, Bakı",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop",
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Artistic Photo Studio",
    category: "Fotoqraf",
    rating: 4.9,
    reviewCount: 89,
    price: "₼200-500",
    location: "Nəsimi, Bakı",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop",
    addedDate: "2024-01-12"
  },
  {
    id: 3,
    name: "Melody Musicians",
    category: "Musiqiçi",
    rating: 4.7,
    reviewCount: 67,
    price: "₼300-800",
    location: "Səbail, Bakı",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    addedDate: "2024-01-10"
  }
];

const recentlyViewed = [
  {
    id: 4,
    name: "Garden Decorator",
    category: "Dekorator",
    rating: 4.6,
    reviewCount: 45,
    price: "₼150-400",
    location: "Xətai, Bakı",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
    viewedDate: "2024-01-16"
  },
  {
    id: 5,
    name: "Luxury Transport",
    category: "Nəqliyyat",
    rating: 4.5,
    reviewCount: 32,
    price: "₼100-300",
    location: "Nərimanov, Bakı",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    viewedDate: "2024-01-14"
  }
];

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState(favoriteVendors);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(vendor => vendor.id !== id));
  };

  const VendorCard = ({ vendor, onRemove, showDate = false, dateLabel = "" }: any) => (
    <Card className="hover:shadow-lg transition-all">
      <CardContent className="p-0">
        <div className="flex">
          <img 
            src={vendor.image} 
            alt={vendor.name}
            className="w-24 h-24 object-cover rounded-l-lg"
          />
          <div className="flex-1 p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{vendor.name}</h4>
                <p className="text-xs text-muted-foreground">{vendor.category}</p>
                {showDate && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {dateLabel}: {new Date(vendor.addedDate || vendor.viewedDate).toLocaleDateString('az-AZ')}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 ml-2">
                <Badge variant="secondary" className="text-xs">
                  {vendor.price}
                </Badge>
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => onRemove(vendor.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-wedding-gold fill-current" />
                <span className="text-xs font-medium">{vendor.rating}</span>
                <span className="text-xs text-muted-foreground">({vendor.reviewCount})</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{vendor.location}</span>
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MessageCircle className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Calendar className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Favoritlərim</h1>
        <p className="text-muted-foreground">Bəyəndiyiniz xidmətçilər</p>
      </div>

      <Tabs defaultValue="favorites" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Favoritlər ({favorites.length})
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Son baxılanlar ({recentlyViewed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="space-y-4">
          {favorites.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {favorites.length} xidmətçi favorilərinizdə
                </p>
                <Button variant="outline" size="sm">
                  Hamısını təmizlə
                </Button>
              </div>
              
              <div className="space-y-3">
                {favorites.map((vendor) => (
                  <VendorCard 
                    key={vendor.id} 
                    vendor={vendor} 
                    onRemove={removeFavorite}
                    showDate={true}
                    dateLabel="Əlavə edildi"
                  />
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Hələ favoritiniz yoxdur</h3>
                <p className="text-muted-foreground mb-4">
                  Bəyəndiyiniz xidmətçiləri favorilərə əlavə edin
                </p>
                <Button>Xidmətçi axtarın</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Son baxdığınız {recentlyViewed.length} xidmətçi
          </p>
          
          <div className="space-y-3">
            {recentlyViewed.map((vendor) => (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor}
                showDate={true}
                dateLabel="Baxıldı"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};