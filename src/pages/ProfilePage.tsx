import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Settings, 
  Bell, 
  Heart, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Calendar,
  Star,
  MessageCircle,
  Shield,
  Globe,
  Moon,
  Edit
} from "lucide-react";

const userBookings = [
  {
    id: 1,
    vendorName: "Elite Wedding Restaurant",
    date: "2024-05-15",
    status: "confirmed",
    service: "Toy yeməyi",
    amount: "7500₼"
  },
  {
    id: 2,
    vendorName: "Artistic Photo Studio",
    date: "2024-05-15",
    status: "pending",
    service: "Toy çəkilişi",
    amount: "1200₼"
  }
];

const userReviews = [
  {
    id: 1,
    vendorName: "Garden Decorator",
    rating: 5,
    comment: "Əla xidmət, çox məmnun qaldıq!",
    date: "2024-01-10"
  },
  {
    id: 2,
    vendorName: "Melody Musicians",
    rating: 4,
    comment: "Yaxşı ifa, tövsiyə edirəm",
    date: "2024-01-05"
  }
];

export const ProfilePage = () => {
  const [user] = useState({
    name: "Ayşə Məmmədova",
    email: "ayse.mammadova@email.com",
    phone: "+994 50 123 45 67",
    avatar: "",
    memberSince: "2024-01-01",
    totalBookings: 12,
    totalReviews: 8
  });

  const [notifications, setNotifications] = useState({
    bookingUpdates: true,
    newMessages: true,
    promotions: false,
    reminders: true
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { icon: Calendar, label: "Rezervasiyalarım", count: userBookings.length, href: "/bookings" },
    { icon: Star, label: "Rəylərimi", count: userReviews.length, href: "/reviews" },
    { icon: Heart, label: "Favoritlərim", count: 5, href: "/favorites" },
    { icon: MessageCircle, label: "Mesajlarım", count: 3, href: "/messages" },
    { icon: CreditCard, label: "Ödəniş metodları", href: "/payment" },
    { icon: Bell, label: "Bildirişlər", href: "/notifications" },
    { icon: Shield, label: "Təhlükəsizlik", href: "/security" },
    { icon: HelpCircle, label: "Kömək və Dəstək", href: "/help" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Təsdiqləndi</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Gözləyir</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Ləğv edildi</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(user.memberSince).toLocaleDateString('az-AZ')} tarixindən üzv
              </p>
            </div>
            
            {/* <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Redaktə et
            </Button> */}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-wedding-rose">{user.totalBookings}</p>
              <p className="text-sm text-muted-foreground">Rezervasiya</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-wedding-gold">{user.totalReviews}</p>
              <p className="text-sm text-muted-foreground">Rəy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">4.8</p>
              <p className="text-sm text-muted-foreground">Orta reytinq</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Ümumi</TabsTrigger>
          <TabsTrigger value="bookings">Rezervasiyalar</TabsTrigger>
          <TabsTrigger value="settings">Tənzimləmələr</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Quick Menu */}
          <div className="grid grid-cols-1 gap-2">
            {menuItems.map((item, index) => (
              <Card key={index} className="hover:bg-accent cursor-pointer transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-wedding-blush rounded-full flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-wedding-rose" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.count && (
                        <Badge variant="secondary">{item.count}</Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Son Rezervasiyalar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{booking.vendorName}</h4>
                    <p className="text-sm text-muted-foreground">{booking.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(booking.date).toLocaleDateString('az-AZ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{booking.amount}</p>
                    {getStatusBadge(booking.status)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Bildiriş Tənzimləmələri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="booking-updates">Rezervasiya yenilikləri</Label>
                  <p className="text-sm text-muted-foreground">Rezervasiya statusu dəyişiklikləri</p>
                </div>
                <Switch
                  id="booking-updates"
                  checked={notifications.bookingUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, bookingUpdates: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="new-messages">Yeni mesajlar</Label>
                  <p className="text-sm text-muted-foreground">Xidmətçilərdən gələn mesajlar</p>
                </div>
                <Switch
                  id="new-messages"
                  checked={notifications.newMessages}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, newMessages: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promotions">Promosyonlar</Label>
                  <p className="text-sm text-muted-foreground">Endirim və təkliflər</p>
                </div>
                <Switch
                  id="promotions"
                  checked={notifications.promotions}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, promotions: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* App Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Tətbiq Tənzimləmələri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5" />
                  <div>
                    <Label htmlFor="dark-mode">Qaranlıq tema</Label>
                    <p className="text-sm text-muted-foreground">Tünd rəng temasını aktivləşdir</p>
                  </div>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5" />
                  <div>
                    <Label>Dil</Label>
                    <p className="text-sm text-muted-foreground">Azərbaycan dili</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Hesabdan çıxış
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};