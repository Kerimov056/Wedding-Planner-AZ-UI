import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Star, SlidersHorizontal } from "lucide-react";

export const SearchPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <div className="space-y-4 p-4">
      {/* Search Header */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Xidmət axtarın..." 
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-wedding-rose text-white" : ""}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Şəhər</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Şəhər seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baku">Bakı</SelectItem>
                      <SelectItem value="ganja">Gəncə</SelectItem>
                      <SelectItem value="sumgait">Sumqayıt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Kateqoriya</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kateqoriya" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restoran</SelectItem>
                      <SelectItem value="photographer">Fotoqraf</SelectItem>
                      <SelectItem value="musician">Musiqiçi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Qiymət aralığı: ₼{priceRange[0]} - ₼{priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={50}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Tətbiq et
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Təmizlə
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Filters */}
        <div className="flex gap-2 flex-wrap">
          <Badge variant="secondary" className="flex items-center gap-1">
            Bakı ✕
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            Restoran ✕
          </Badge>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">147 nəticə tapıldı</h3>
          <Select defaultValue="rating">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Reytinq</SelectItem>
              <SelectItem value="price">Qiymət</SelectItem>
              <SelectItem value="distance">Məsafə</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vendor List */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <Card key={item} className="hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-0">
                <div className="flex">
                  <img 
                    src={`https://images.unsplash.com/photo-${1519167758481 + item}?w=300&h=200&fit=crop`}
                    alt="Vendor"
                    className="w-24 h-24 object-cover rounded-l-lg"
                  />
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm">Elite Wedding Place {item}</h4>
                        <p className="text-xs text-muted-foreground">Restoran</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        ₼{50 + item * 10}-{100 + item * 20}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-wedding-gold fill-current" />
                        <span className="text-xs font-medium">4.{8 - (item % 3)}</span>
                        <span className="text-xs text-muted-foreground">({120 + item * 10})</span>
                      </div>
                      <Badge variant="outline" className="text-xs">Təsdiqlənib</Badge>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Yasamal, Bakı</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};