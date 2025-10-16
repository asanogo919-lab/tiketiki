import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Progress } from './ui/progress';

interface OrganizerEventsPageProps {
  onNavigate: (page: string) => void;
}

export function OrganizerEventsPage({ onNavigate }: OrganizerEventsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const events = {
    active: [
      {
        id: '1',
        title: 'Salif Keïta en Concert Live',
        date: '25 Nov 2025',
        location: 'Bamako',
        ticketsSold: 450,
        capacity: 600,
        revenue: '6 750 000',
        status: 'active' as const,
      },
      {
        id: '2',
        title: 'Festival sur le Niger',
        date: '10 Déc 2025',
        location: 'Ségou',
        ticketsSold: 200,
        capacity: 1000,
        revenue: '5 000 000',
        status: 'active' as const,
      },
    ],
    draft: [
      {
        id: '3',
        title: 'Soirée Jazz & Blues',
        date: '15 Déc 2025',
        location: 'Bamako',
        ticketsSold: 0,
        capacity: 200,
        revenue: '0',
        status: 'draft' as const,
      },
    ],
    past: [
      {
        id: '4',
        title: 'Amadou & Mariam Live',
        date: '5 Oct 2025',
        location: 'Bamako',
        ticketsSold: 800,
        capacity: 800,
        revenue: '12 000 000',
        status: 'completed' as const,
      },
    ],
  };

  const renderEventCard = (event: typeof events.active[0]) => (
    <Card key={event.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4>{event.title}</h4>
              <Badge 
                variant={event.status === 'active' ? 'default' : event.status === 'draft' ? 'secondary' : 'outline'}
                className={event.status === 'active' ? 'bg-[#14AE5C]' : ''}
              >
                {event.status === 'active' ? 'Actif' : event.status === 'draft' ? 'Brouillon' : 'Terminé'}
              </Badge>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
              {event.date} • {event.location}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onNavigate('analytics')}>
                <Eye className="w-4 h-4 mr-2" />
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="w-4 h-4 mr-2" />
                Dupliquer
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {event.status !== 'draft' && (
          <>
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-muted-foreground" style={{ fontSize: '13px' }}>
                <span>Billets vendus</span>
                <span style={{ fontWeight: 600 }}>
                  {event.ticketsSold} / {event.capacity}
                </span>
              </div>
              <Progress value={(event.ticketsSold / event.capacity) * 100} className="h-2" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: '12px' }}>Revenus</p>
                <p className="text-[#14AE5C]" style={{ fontSize: '16px', fontWeight: 700 }}>
                  {event.revenue} FCFA
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={() => onNavigate('analytics')}>
                <Eye className="w-4 h-4 mr-1" />
                Statistiques
              </Button>
            </div>
          </>
        )}

        {event.status === 'draft' && (
          <div className="flex gap-2 pt-3 border-t">
            <Button size="sm" variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Modifier
            </Button>
            <Button size="sm" className="flex-1 bg-[#14AE5C] hover:bg-[#0f8a49]">
              Publier
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ScrollArea className="h-screen pb-20">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1>Mes événements</h1>
              <Button
                size="sm"
                className="bg-[#14AE5C] hover:bg-[#0f8a49]"
                onClick={() => onNavigate('create-event')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Créer
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un événement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="active">
                Actifs ({events.active.length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Brouillons ({events.draft.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Passés ({events.past.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {events.active.map(renderEventCard)}
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              {events.draft.map(renderEventCard)}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {events.past.map(renderEventCard)}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
