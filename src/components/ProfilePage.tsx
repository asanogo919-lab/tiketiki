import { Settings, ChevronRight, Ticket, Heart, Bell, CreditCard, HelpCircle, LogOut, Moon, Sun, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { useState } from 'react';

export function ProfilePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const stats = [
    { label: 'Billets', value: '12', color: 'text-[#14AE5C]' },
    { label: 'Favoris', value: '8', color: 'text-[#FCD116]' },
    { label: 'Points', value: '450', color: 'text-[#CE1126]' },
  ];

  const upcomingTickets = [
    {
      id: '1',
      event: 'Salif Keïta en Concert',
      date: '25 Nov 2025',
      location: 'Bamako',
      qrCode: true,
    },
    {
      id: '2',
      event: 'Festival sur le Niger',
      date: '10 Déc 2025',
      location: 'Ségou',
      qrCode: true,
    },
  ];

  const menuSections = [
    {
      title: 'Compte',
      items: [
        { icon: Ticket, label: 'Mes billets', badge: '3', action: () => {} },
        { icon: Heart, label: 'Favoris', badge: '8', action: () => {} },
        { icon: CreditCard, label: 'Moyens de paiement', action: () => {} },
      ],
    },
    {
      title: 'Préférences',
      items: [
        { 
          icon: Bell, 
          label: 'Notifications', 
          switch: true, 
          value: notificationsEnabled,
          onChange: setNotificationsEnabled,
        },
        { 
          icon: isDarkMode ? Sun : Moon, 
          label: 'Mode sombre', 
          switch: true,
          value: isDarkMode,
          onChange: (value: boolean) => {
            setIsDarkMode(value);
            document.documentElement.classList.toggle('dark', value);
          },
        },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: "Centre d'aide", action: () => {} },
        { icon: Settings, label: 'Paramètres', action: () => {} },
      ],
    },
  ];

  return (
    <ScrollArea className="h-screen pb-20">
      <div className="min-h-screen bg-gradient-to-br from-[#FCD116]/10 via-background to-[#14AE5C]/5">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#14AE5C] to-[#0f8a49] text-white">
          <div className="max-w-md mx-auto px-4 pt-8 pb-16">
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-white">Profil</h1>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="w-5 h-5" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-white text-[#14AE5C]" style={{ fontSize: '24px', fontWeight: 700 }}>
                    MK
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white text-[#14AE5C] hover:bg-white/90"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h2 className="text-white">Mamadou Konaté</h2>
                <p className="text-white/80" style={{ fontSize: '14px' }}>mamadou.konate@email.com</p>
                <Badge className="mt-2 bg-[#FCD116] text-black hover:bg-[#FCD116]/90">
                  Membre VIP
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 -mt-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-4">
                  <p className={stat.color} style={{ fontSize: '24px', fontWeight: 700 }}>
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Tickets */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Billets à venir</h3>
              <Button variant="ghost" size="sm" className="text-[#14AE5C]">
                Voir tout
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingTickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1">{ticket.event}</h4>
                        <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                          {ticket.date} • {ticket.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-[#14AE5C]/10 rounded-lg flex items-center justify-center">
                          <Ticket className="w-6 h-6 text-[#14AE5C]" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          {menuSections.map((section, idx) => (
            <div key={section.title} className="mb-6">
              <h4 className="mb-3 text-muted-foreground" style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {section.title}
              </h4>
              <Card>
                <CardContent className="p-0">
                  {section.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    const isLast = itemIdx === section.items.length - 1;
                    
                    return (
                      <div key={item.label}>
                        {item.switch ? (
                          <div className="flex items-center justify-between p-4 hover:bg-accent transition-colors">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-[#14AE5C]" />
                              <span>{item.label}</span>
                            </div>
                            <Switch
                              checked={item.value}
                              onCheckedChange={item.onChange}
                            />
                          </div>
                        ) : (
                          <button
                            onClick={item.action}
                            className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-[#14AE5C]" />
                              <span>{item.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <Badge variant="secondary">{item.badge}</Badge>
                              )}
                              <ChevronRight className="w-5 h-5 text-muted-foreground" />
                            </div>
                          </button>
                        )}
                        {!isLast && <Separator />}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Logout */}
          <Button 
            variant="outline" 
            className="w-full text-[#CE1126] border-[#CE1126]/20 hover:bg-[#CE1126]/10 mb-6"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Se déconnecter
          </Button>

          {/* Version */}
          <p className="text-center text-muted-foreground mb-4" style={{ fontSize: '12px' }}>
            Version 1.0.0
          </p>
        </div>
      </div>
    </ScrollArea>
  );
}
