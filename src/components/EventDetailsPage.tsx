import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Share2, Heart, Clock, Music, Info, Minus, Plus, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface EventDetailsPageProps {
  onBack: () => void;
  onProceedToPayment: () => void;
}

export function EventDetailsPage({ onBack, onProceedToPayment }: EventDetailsPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState('standard');
  const [quantities, setQuantities] = useState({
    vip: 0,
    standard: 2,
    student: 0,
  });

  const event = {
    id: '1',
    title: 'Salif Keïta en Concert Live',
    category: 'Concert',
    date: '25 Novembre 2025',
    time: '20:00',
    location: 'Palais de la Culture, Bamako',
    address: 'Avenue de la Nation, Bamako, Mali',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzYwNTY5OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    organizer: {
      name: 'Mali Events Productions',
      verified: true,
      avatar: '',
    },
    description: 'Venez assister à un concert exceptionnel de la légende malienne Salif Keïta ! Une soirée inoubliable avec les plus grands classiques de la musique mandingue et des nouveautés exclusives.\n\nSalif Keïta, surnommé "La Voix d\'Or de l\'Afrique", vous invite à un voyage musical unique mêlant tradition et modernité.',
    attendees: 2500,
    capacity: 3000,
  };

  const ticketTypes = [
    {
      id: 'student',
      name: 'Étudiant',
      price: 10000,
      description: 'Carte étudiant requise',
      available: 150,
      benefits: ['Accès général', 'Espace debout'],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 15000,
      description: 'Meilleur rapport qualité-prix',
      available: 800,
      popular: true,
      benefits: ['Accès général', 'Places assises', 'Vestiaire gratuit'],
    },
    {
      id: 'vip',
      name: 'VIP',
      price: 35000,
      description: 'Expérience premium',
      available: 50,
      benefits: ['Accès VIP', 'Places premium', 'Rencontre avec l\'artiste', 'Boissons incluses'],
    },
  ];

  const program = [
    { time: '19:00', artist: 'Ouverture des portes', description: 'Installation et accueil' },
    { time: '20:00', artist: 'DJ Mamady', description: 'Set d\'ouverture' },
    { time: '21:00', artist: 'Salif Keïta', description: 'Concert principal' },
    { time: '23:30', artist: 'Fin du concert', description: '' },
  ];

  const handleQuantityChange = (type: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [type]: Math.max(0, Math.min(10, prev[type] + delta)),
    }));
  };

  const totalTickets = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = ticketTypes.reduce((sum, ticket) => {
    return sum + (quantities[ticket.id as keyof typeof quantities] * ticket.price);
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative h-[300px]">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#CE1126] text-[#CE1126]' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-[#14AE5C] text-white">
            {event.category}
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="max-w-md mx-auto px-4">
          {/* Event Info */}
          <div className="py-6">
            <h1 className="mb-4">{event.title}</h1>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5 text-[#14AE5C]" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-[#14AE5C]" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-[#14AE5C] mt-0.5" />
                <div>
                  <p>{event.location}</p>
                  <p style={{ fontSize: '13px' }}>{event.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="w-5 h-5 text-[#14AE5C]" />
                <span>{event.attendees} / {event.capacity} participants</span>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={event.organizer.avatar} />
                  <AvatarFallback className="bg-[#14AE5C] text-white">
                    ME
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p style={{ fontWeight: 600 }}>{event.organizer.name}</p>
                    {event.organizer.verified && (
                      <Badge variant="secondary" className="h-5 px-1.5" style={{ fontSize: '10px' }}>
                        ✓ Vérifié
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                    Organisateur
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Suivre
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="tickets" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="tickets">Billets</TabsTrigger>
                <TabsTrigger value="about">À propos</TabsTrigger>
                <TabsTrigger value="program">Programme</TabsTrigger>
              </TabsList>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-4">
                <h3 className="mb-4">Choisissez vos billets</h3>
                {ticketTypes.map((ticket) => (
                  <Card key={ticket.id} className={`${selectedTicketType === ticket.id ? 'border-[#14AE5C] border-2' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4>{ticket.name}</h4>
                            {ticket.popular && (
                              <Badge className="bg-[#FCD116] text-black h-5">
                                Populaire
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                            {ticket.description}
                          </p>
                          <p className="text-[#14AE5C] mt-2" style={{ fontSize: '20px', fontWeight: 700 }}>
                            {ticket.price.toLocaleString()} FCFA
                          </p>
                          <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                            {ticket.available} billets disponibles
                          </p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-4">
                        {ticket.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '13px' }}>
                            <div className="w-1 h-1 rounded-full bg-[#14AE5C]" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Quantité</span>
                        <div className="flex items-center gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleQuantityChange(ticket.id, -1)}
                            disabled={quantities[ticket.id as keyof typeof quantities] === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span style={{ fontSize: '16px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                            {quantities[ticket.id as keyof typeof quantities]}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleQuantityChange(ticket.id, 1)}
                            disabled={quantities[ticket.id as keyof typeof quantities] >= 10}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-3">Description</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="mb-3">Informations pratiques</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#14AE5C] mt-0.5" />
                        <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                          Portes ouvertes à 19h00
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#14AE5C] mt-0.5" />
                        <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                          Parking gratuit disponible
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#14AE5C] mt-0.5" />
                        <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                          Bar et restauration sur place
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Program Tab */}
              <TabsContent value="program">
                <h3 className="mb-4">Programme de la soirée</h3>
                <div className="space-y-4">
                  {program.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#14AE5C]/20 flex items-center justify-center">
                          <Music className="w-5 h-5 text-[#14AE5C]" />
                        </div>
                        {idx < program.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <p className="text-[#14AE5C]" style={{ fontSize: '14px', fontWeight: 600 }}>
                          {item.time}
                        </p>
                        <h4 className="mb-1">{item.artist}</h4>
                        {item.description && (
                          <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Bar */}
      {totalTickets > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                  {totalTickets} billet{totalTickets > 1 ? 's' : ''}
                </p>
                <p className="text-[#14AE5C]" style={{ fontSize: '20px', fontWeight: 700 }}>
                  {totalPrice.toLocaleString()} FCFA
                </p>
              </div>
              <Button 
                className="bg-[#14AE5C] hover:bg-[#0f8a49] flex-1"
                size="lg"
                onClick={onProceedToPayment}
              >
                Continuer
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
