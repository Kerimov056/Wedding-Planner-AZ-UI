import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Heart, 
  MessageCircle, 
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Award,
  Camera,
  Share2
} from "lucide-react";

// Mock vendor data - normally this would come from API based on params.id
const vendorData = {
  id: 1,
  name: "Elite Wedding Restaurant",
  category: "Restoran",
  description: "Bakının ən prestijli toy məkanlarından biri. 20 illik təcrübə ilə unutulmaz anlar yaradırıq.",
  images: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
    "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
    "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg"
  ],
  rating: 4.8,
  reviewCount: 124,
  priceRange: { min: 50, max: 100 },
  location: {
    city: "Bakı",
    district: "Yasamal",
    address: "Nizami küçəsi 123"
  },
  contact: {
    phone: "+994 50 123 45 67",
    email: "info@elitewedding.az",
    website: "www.elitewedding.az"
  },
  services: [
    "Toy yeməyi təşkili",
    "Dekorasiya",
    "Musiqili müşayiət", 
    "Fotoqraf xidməti",
    "Tortun hazırlanması"
  ],
  features: [
    "Klimat sistemi",
    "Parkinq yeri",
    "VIP otaq",
    "Uşaq sahəsi",
    "Canlı musiqi imkanı"
  ],
  availability: ["2024-05-15", "2024-05-20", "2024-05-25"],
  isVerified: true,
  responseTime: "30 dəqiqə"
};

const reviews = [
  {
    id: 1,
    userName: "Ayşə M.",
    rating: 5,
    comment: "Çox gözəl yer, xidmət də əla idi. Toyumuz məhz burda keçirdi və çox məmnun qaldıq.",
    date: "2024-01-15",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=150&fit=crop"]
  },
  {
    id: 2,
    userName: "Rəşad K.",
    rating: 4,
    comment: "Yeməklər dadlı idi, xidmət yaxşı. Sadəcə musiqinin həcmi bir az yüksək idi.",
    date: "2024-01-10",
    images: []
  },
  {
    id: 3,
    userName: "Gülnar A.",
    rating: 5,
    comment: "Hər şey mükəmməl idi! Personal çox diqqətli və mehriban. Tövsiyə edirəm.",
    date: "2024-01-08",
    images: []
  }
];

export const VendorDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-wedding-gold fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6 p-4">
      {/* Image Gallery */}
      <div className="space-y-3">
        <div className="relative">
          <img
            src={vendorData.images[selectedImage]}
            alt={vendorData.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 backdrop-blur-sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/80 backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-black/50 text-white">
              <Camera className="w-3 h-3 mr-1" />
              {vendorData.images.length} şəkil
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {vendorData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${vendorData.name} ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer flex-shrink-0 ${
                selectedImage === index ? 'ring-2 ring-wedding-rose' : ''
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Vendor Info Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{vendorData.name}</h1>
                {vendorData.isVerified && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <Badge variant="secondary" className="mb-2">
                {vendorData.category}
              </Badge>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(vendorData.rating)}
                <span className="font-semibold">{vendorData.rating}</span>
                <span className="text-muted-foreground">({vendorData.reviewCount} rəy)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{vendorData.location.district}, {vendorData.location.city}</span>
              </div>
            </div>
            
            <div className="text-right">
              <Badge className="bg-wedding-rose text-white text-lg px-3 py-1">
                ₼{vendorData.priceRange.min}-{vendorData.priceRange.max}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">nəfər başına</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Cavab müddəti: {vendorData.responseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>Təsdiqlənmiş xidmətçi</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button className="bg-wedding-rose hover:bg-wedding-rose/90">
          <CalendarIcon className="w-4 h-4 mr-2" />
          Rezervasiya et
        </Button>
        <Button variant="outline">
          <MessageCircle className="w-4 h-4 mr-2" />
          Mesaj göndər
        </Button>
      </div>

      {/* Detailed Info Tabs */}
      <Tabs defaultValue="about" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">Haqqında</TabsTrigger>
          <TabsTrigger value="services">Xidmətlər</TabsTrigger>
          <TabsTrigger value="reviews">Rəylər</TabsTrigger>
          <TabsTrigger value="calendar">Təqvim</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Təsvir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {vendorData.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Özelliklər</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {vendorData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Əlaqə məlumatları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{vendorData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{vendorData.contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span>{vendorData.contact.website}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{vendorData.location.address}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Təklif olunan xidmətlər</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {vendorData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {review.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.userName}</span>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('az-AZ')}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">{review.comment}</p>
                      {review.images.length > 0 && (
                        <div className="flex gap-2">
                          {review.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="Review"
                              className="w-16 h-16 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Müsait tarixlər</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => 
                  date < new Date() || 
                  !vendorData.availability.includes(date.toISOString().split('T')[0])
                }
              />
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Yaşıl tarixlər müsaitdir. Rezervasiya üçün istədiyiniz tarixi seçin.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};