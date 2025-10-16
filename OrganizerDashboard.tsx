import { TrendingUp, TrendingDown, Users, Ticket, DollarSign, Calendar, Plus, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface OrganizerDashboardProps {
  onNavigate: (page: string) => void;
}

export function OrganizerDashboard({ onNavigate }: OrganizerDashboardProps) {
  const stats = [
    {
      label: 'Revenus totaux',
      value: '12 450 000',
      unit: 'FCFA',
      change: '+15%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'text-[#14AE5C]',
      bgColor: 'bg-[#14AE5C]/10',
    },
    {
      label: 'Billets vendus',
      value: '847',
      unit: '',
      change: '+8%',
      trend: 'up' as const,
      icon: Ticket,
      color: 'text-[#FCD116]',
      bgColor: 'bg-[#FCD116]/10',
    },
    {
      label: 'Événements actifs',
      value: '5',
      unit: '',
      change: '+2',
      trend: 'up' as const,
      icon: Calendar,
      color: 'text-[#CE1126]',
      bgColor: 'bg-[#CE1126]/10',
    },
    {
      label: 'Participants',
      value: '3 245',
      unit: '',
      change: '-3%',
      trend: 'down' as const,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  const upcomingEvents = [
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
    {
      id: '3',
      title: 'Soirée Jazz & Blues',
      date: '15 Déc 2025',
      location: 'Bamako',
      ticketsSold: 120,
      capacity: 200,
      revenue: '1 800 000',
      status: 'draft' as const,
    },
  ];

  const recentActivity = [
    { action: '5 nouveaux billets vendus', event: 'Salif Keïta Concert', time: 'Il y a 5 min' },
    { action: 'Événement publié', event: 'Festival sur le Niger', time: 'Il y a 2h' },
    { action: '10 nouveaux participants', event: 'Soirée Jazz & Blues', time: 'Il y a 4h' },
  ];

  return (
    <ScrollArea className="h-screen pb-20">
      <div className="min-h-screen bg-gradient-to-br from-[#14AE5C]/5 via-background to-[#FCD116]/5">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#14AE5C] to-[#0f8a49] text-white">
          <div className="max-w-md mx-auto px-4 pt-8 pb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-white mb-1">Tableau de bord</h1>
                <p className="text-white/80" style={{ fontSize: '14px' }}>
                  Mali Events Productions
                </p>
              </div>
              <Button
                size="sm"
                className="bg-white text-[#14AE5C] hover:bg-white/90"
                onClick={() => onNavigate('create-event')}
              >
                <Plus className="w-4 h-4 mr-1" />
                Nouvel événement
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 -mt-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
              
              return (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        <TrendIcon className="w-3 h-3" />
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: '20px', fontWeight: 700 }}>
                      {stat.value}
                      {stat.unit && <span style={{ fontSize: '12px', fontWeight: 400 }} className="ml-1 text-muted-foreground">{stat.unit}</span>}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Upcoming Events */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2>Événements à venir</h2>
              <Button variant="ghost" size="sm" className="text-[#14AE5C]" onClick={() => onNavigate('events')}>
                Voir tout
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4>{event.title}</h4>
                          <Badge variant={event.status === 'active' ? 'default' : 'secondary'} className={event.status === 'active' ? 'bg-[#14AE5C]' : ''}>
                            {event.status === 'active' ? 'Actif' : 'Brouillon'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                          {event.date} • {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-muted-foreground" style={{ fontSize: '13px' }}>
                        <span>Billets vendus</span>
                        <span style={{ fontWeight: 600 }}>
                          {event.ticketsSold} / {event.capacity}
                        </span>
                      </div>
                      <Progress value={(event.ticketsSold / event.capacity) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground" style={{ fontSize: '12px' }}>Revenus</p>
                        <p className="text-[#14AE5C]" style={{ fontSize: '16px', fontWeight: 700 }}>
                          {event.revenue} FCFA
                        </p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => onNavigate('analytics')}>
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-6">
            <h3 className="mb-4">Activité récente</h3>
            <Card>
              <CardContent className="p-0">
                {recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className={`p-4 ${idx !== recentActivity.length - 1 ? 'border-b' : ''}`}
                  >
                    <p style={{ fontWeight: 600, fontSize: '14px' }}>{activity.action}</p>
                    <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                      {activity.event}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      {activity.time}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
