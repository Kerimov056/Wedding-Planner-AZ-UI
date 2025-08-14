import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Send, Phone, Video, MoreVertical, Circle, Clock } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Elite Wedding Restaurant",
    avatar: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=100&h=100&fit=crop",
    lastMessage: "Toy tarixi üçün müsaitliyimizi yoxladıq, 15 may açıqdır",
    timestamp: "10:30",
    unreadCount: 2,
    isOnline: true,
    type: "vendor"
  },
  {
    id: 2,
    name: "Artistic Photo Studio",
    avatar: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=100&h=100&fit=crop",
    lastMessage: "Portfolio linkini göndərdim, baxın",
    timestamp: "09:45",
    unreadCount: 0,
    isOnline: false,
    type: "vendor"
  },
  {
    id: 3,
    name: "Sistem Dəstəyi",
    avatar: "",
    lastMessage: "Sualınız üçün təşəkkür edirik, tezliklə cavab verəcəyik",
    timestamp: "Dünən",
    unreadCount: 0,
    isOnline: true,
    type: "support"
  }
];

const currentMessages = [
  {
    id: 1,
    senderId: "vendor1",
    content: "Salam! Toy üçün restoran rezervasiyası istəyirsiniz?",
    timestamp: "09:00",
    type: "text"
  },
  {
    id: 2,
    senderId: "me",
    content: "Salam! Bəli, 15 may üçün 150 nəfərlik masa rezervasiyası istəyirik",
    timestamp: "09:15",
    type: "text"
  },
  {
    id: 3,
    senderId: "vendor1",
    content: "Mükemməl! 15 may üçün bizim restoranda yer var. Qiymət 150 nəfər üçün 7500₼ olacaq",
    timestamp: "09:20",
    type: "text"
  },
  {
    id: 4,
    senderId: "me",
    content: "Qiyməti daxil olan xidmətlər hansılardır?",
    timestamp: "09:22",
    type: "text"
  },
  {
    id: 5,
    senderId: "vendor1",
    content: "Toy tarixi üçün müsaitliyimizi yoxladıq, 15 may açıqdır. Menu və detalları göndərirəm",
    timestamp: "10:30",
    type: "text"
  }
];

export const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to backend
      setNewMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Mesajlar</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Hamısı ({conversations.length})</TabsTrigger>
            <TabsTrigger value="vendors">Xidmətçilər ({conversations.filter(c => c.type === 'vendor').length})</TabsTrigger>
            <TabsTrigger value="support">Dəstək</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Mesajlarda axtarın..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Conversations List */}
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
                  <Card 
                    key={conversation.id} 
                    className={`cursor-pointer hover:bg-accent transition-colors ${
                      selectedChat.id === conversation.id ? 'ring-2 ring-wedding-rose' : ''
                    }`}
                    onClick={() => setSelectedChat(conversation)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>
                              {conversation.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <Circle className="absolute -bottom-1 -right-1 w-4 h-4 text-green-500 fill-current" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">
                              {conversation.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {conversation.timestamp}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge className="bg-wedding-rose text-white px-2 py-1 text-xs min-w-[20px] h-5 flex items-center justify-center">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      {selectedChat && (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback>
                    {selectedChat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedChat.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Circle className={`w-2 h-2 ${selectedChat.isOnline ? 'text-green-500 fill-current' : 'text-gray-400 fill-current'}`} />
                    {selectedChat.isOnline ? 'Onlayn' : 'Son fəaliyyət 2 saat əvvəl'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] rounded-lg px-3 py-2 ${
                  message.senderId === 'me' 
                    ? 'bg-wedding-rose text-white' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 opacity-70" />
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                placeholder="Mesaj yazın..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} className="bg-wedding-rose hover:bg-wedding-rose/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};