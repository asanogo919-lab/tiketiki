import { ArrowLeft, TrendingUp, Users, DollarSign, Ticket, Download, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EventAnalyticsPageProps {
  onBack: () => void;
}

export function EventAnalyticsPage({ onBack }: EventAnalyticsPageProps) {
  const event = {
    title: 'Salif Keïta en Concert Live',
    date: '25 Nov 2025, 20:00',
    location: 'Palais de la Culture, Bamako',
  };

  const stats = [
    {
      label: 'Revenus totaux',
      value: '6 750 000',
      unit: 'FCFA',
      change: '+12%',
      icon: DollarSign,
      color: 'text-[#14AE5C]',
      bgColor: 'bg-[#14AE5C]/10',
    },
    {
      label: 'Billets vendus',
      value: '450',
      subtitle: 'sur 600',
      change: '+8%',
      icon: Ticket,
      color: 'text-[#FCD116]',
      bgColor: 'bg-[#FCD116]/10',
    },
    {
      label: 'Taux de vente',
      value: '75%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-[#CE1126]',
      bgColor: 'bg-[#CE1126]/10',
    },
    {
      label: 'Participants',
      value: '450',
      change: 'Confirmés',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  const ticketBreakdown = [
    { type: 'VIP', sold: 45, total: 50, price: 35000, revenue: 1575000 },
    { type: 'Standard', sold: 350, total: 450, price: 15000, revenue: 5250000 },
    { type: 'Étudiant', sold: 55, total: 100, price: 10000, revenue: 550000 },
  ];

  const salesByDay = [
    { day: 'Lun', sales: 45 },
    { day: 'Mar', sales: 68 },
    { day: 'Mer', sales: 52 },
    { day: 'Jeu', sales: 78 },
    { day: 'Ven', sales: 95 },
    { day: 'Sam', sales: 67 },
    { day: 'Dim', sales: 45 },
  ];

  const maxSales = Math.max(...salesByDay.map(d => d.sales));

  const demographics = [
    { range: '15-24 ans', percentage: 35 },
    { range: '25-34 ans', percentage: 45 },
    { range: '35-44 ans', percentage: 15 },
    { range: '45+ ans', percentage: 5 },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button size="icon" variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1>Statistiques</h1>
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                Analyses détaillées
              </p>
            </div>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="max-w-md mx-auto px-4 pt-6">
          {/* Event Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="mb-3">{event.title}</h3>
              <div className="space-y-2 text-muted-foreground" style={{ fontSize: '14px' }}>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#14AE5C]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#14AE5C]" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <p style={{ fontSize: '20px', fontWeight: 700 }}>
                      {stat.value}
                      {stat.unit && <span style={{ fontSize: '12px', fontWeight: 400 }} className="ml-1 text-muted-foreground">{stat.unit}</span>}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      {stat.label}
                    </p>
                    {stat.subtitle && (
                      <p className="text-muted-foreground" style={{ fontSize: '11px' }}>
                        {stat.subtitle}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="tickets">Billets</TabsTrigger>
              <TabsTrigger value="sales">Ventes</TabsTrigger>
              <TabsTrigger value="audience">Public</TabsTrigger>
            </TabsList>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '18px' }}>Répartition par type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ticketBreakdown.map((ticket, idx) => (
                    <div key={ticket.type}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p style={{ fontWeight: 600 }}>{ticket.type}</p>
                          <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                            {ticket.price.toLocaleString()} FCFA
                          </p>
                        </div>
                        <div className="text-right">
                          <p style={{ fontWeight: 600 }}>
                            {ticket.sold} / {ticket.total}
                          </p>
                          <p className="text-[#14AE5C]" style={{ fontSize: '13px' }}>
                            {ticket.revenue.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                      <Progress value={(ticket.sold / ticket.total) * 100} className="h-2" />
                      {idx < ticketBreakdown.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sales Tab */}
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '18px' }}>Ventes par jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesByDay.map((day) => (
                      <div key={day.day} className="flex items-center gap-3">
                        <span className="w-12 text-muted-foreground" style={{ fontSize: '13px' }}>
                          {day.day}
                        </span>
                        <div className="flex-1">
                          <div className="h-8 bg-[#14AE5C]/20 rounded-md relative overflow-hidden">
                            <div
                              className="h-full bg-[#14AE5C] rounded-md transition-all"
                              style={{ width: `${(day.sales / maxSales) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '30px', textAlign: 'right' }}>
                          {day.sales}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '18px' }}>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenu moyen par billet</span>
                    <span style={{ fontWeight: 600 }}>15 000 FCFA</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ventes aujourd'hui</span>
                    <span style={{ fontWeight: 600 }}>23 billets</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tendance</span>
                    <span className="text-[#14AE5C]" style={{ fontWeight: 600 }}>+12% cette semaine</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audience Tab */}
            <TabsContent value="audience" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '18px' }}>Démographie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {demographics.map((demo, idx) => (
                    <div key={demo.range}>
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontWeight: 600 }}>{demo.range}</span>
                        <span className="text-[#14AE5C]" style={{ fontWeight: 600 }}>
                          {demo.percentage}%
                        </span>
                      </div>
                      <Progress value={demo.percentage} className="h-2" />
                      {idx < demographics.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '18px' }}>Répartition géographique</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bamako</span>
                    <span style={{ fontWeight: 600 }}>380 (84%)</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ségou</span>
                    <span style={{ fontWeight: 600 }}>40 (9%)</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Autres villes</span>
                    <span style={{ fontWeight: 600 }}>30 (7%)</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
