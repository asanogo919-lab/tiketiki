import { Bell, ChevronRight, Flame, Music, Film, PartyPopper } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { EventCard } from './EventCard';
import { ScrollArea } from './ui/scroll-area';
import { TiketikiLogo } from './TiketikiLogo';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const categories = [
    { id: 'concerts', icon: Music, label: 'Concerts', count: 24, color: 'text-[#14AE5C]' },
    { id: 'festivals', icon: PartyPopper, label: 'Festivals', count: 8, color: 'text-[#FCD116]' },
    { id: 'cinema', icon: Film, label: 'Cinéma', count: 15, color: 'text-[#CE1126]' },
  ];

  const featuredEvents = [
    {
      id: '1',
      title: 'Salif Keïta en Concert Live',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzYwNTY5OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'concert' as const,
      date: '25 Nov 2025',
      location: 'Palais de la Culture, Bamako',
      price: '15 000',
      attendees: 2500,
    },
    {
      id: '2',
      title: 'Festival sur le Niger 2025',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY3Jvd2R8ZW58MXx8fHwxNzYwNTY5OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'festival' as const,
      date: '10-12 Déc 2025',
      location: 'Ségou',
      price: '25 000',
      attendees: 5000,
    },
    {
      id: '3',
      title: 'Black Panther: Wakanda Forever',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyfGVufDF8fHx8MTc2MDU2OTkxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'cinema' as const,
      date: 'Tous les jours',
      location: 'Cinéma Babemba, Bamako',
      price: '3 000',
    },
  ];

  const upcomingEvents = [
    {
      id: '4',
      title: 'Amadou & Mariam - Tournée Africaine',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzaWMlMjBjb25jZXJ0fGVufDF8fHx8MTc2MDU2OTkxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'concert' as const,
      date: '5 Jan 2026',
      location: 'Stade Modibo Keïta, Bamako',
      price: '20 000',
      attendees: 10000,
    },
    {
      id: '5',
      title: 'Dune: Part Two - Avant-Première',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjB0aGVhdGVyfGVufDF8fHx8MTc2MDU2OTkxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'cinema' as const,
      date: '18 Nov 2025',
      location: 'Magic Cinéma, Bamako',
      price: '5 000',
    },
  ];

  return (
    <ScrollArea className="h-screen pb-20">
      <div className="min-h-screen bg-gradient-to-br from-[#FCD116]/10 via-background to-[#14AE5C]/5">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="scale-75 origin-left">
                <TiketikiLogo />
              </div>
              <Button size="icon" variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#CE1126] rounded-full" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 pb-6">
          {/* Welcome Section */}
          <div className="py-6">
            <h1>Bonjour ! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Découvrez les meilleurs événements au Mali
            </p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2>Catégories</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => onNavigate('search')}
                    className="bg-card border rounded-xl p-4 hover:shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{category.label}</p>
                    <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      {category.count} événements
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Events */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#CE1126]" />
                En vedette
              </h2>
              <Button 
                variant="ghost" 
                className="text-[#14AE5C]"
                onClick={() => onNavigate('search')}
              >
                Tout voir
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2>Prochainement</h2>
              <Button 
                variant="ghost" 
                className="text-[#14AE5C]"
                onClick={() => onNavigate('search')}
              >
                Tout voir
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="bg-gradient-to-r from-[#14AE5C] to-[#0f8a49] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            <div className="relative z-10">
              <Badge className="bg-[#FCD116] text-black mb-3">Offre spéciale</Badge>
              <h3 className="text-white mb-2">-20% sur votre premier billet !</h3>
              <p className="text-white/90 mb-4" style={{ fontSize: '14px' }}>
                Utilisez le code BIENVENUE20
              </p>
              <Button className="bg-white text-[#14AE5C] hover:bg-white/90">
                J'en profite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
