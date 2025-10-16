import { useState } from 'react';
import { ArrowLeft, Upload, Plus, Minus, X, Calendar as CalendarIcon, MapPin, Clock, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface CreateEventPageProps {
  onBack: () => void;
}

export function CreateEventPage({ onBack }: CreateEventPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketTypes, setTicketTypes] = useState([
    { id: 1, name: 'Standard', price: '', quantity: '' },
  ]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleAddTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { id: Date.now(), name: '', price: '', quantity: '' },
    ]);
  };

  const handleRemoveTicketType = (id: number) => {
    setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    console.log('Event published!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Button size="icon" variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1>Créer un événement</h1>
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                Étape {currentStep} sur {totalSteps}
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="max-w-md mx-auto px-4 py-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de base</CardTitle>
                  <CardDescription>
                    Décrivez votre événement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de l'événement *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Concert de Salif Keïta"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concert">Concert</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="cinema">Cinéma</SelectItem>
                        <SelectItem value="theatre">Théâtre</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="conference">Conférence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre événement en détail..."
                      rows={5}
                    />
                    <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                      Minimum 100 caractères
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Date & Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Date et lieu</CardTitle>
                  <CardDescription>
                    Quand et où se déroulera votre événement ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <div className="relative">
                        <Input
                          id="date"
                          type="date"
                          className="pl-10"
                        />
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Heure *</Label>
                      <div className="relative">
                        <Input
                          id="time"
                          type="time"
                          className="pl-10"
                        />
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Lieu de l'événement *</Label>
                    <div className="relative">
                      <Input
                        id="venue"
                        placeholder="Ex: Palais de la Culture"
                        className="pl-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse complète *</Label>
                    <Input
                      id="address"
                      placeholder="Ex: Avenue de la Nation, Bamako"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Select>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Sélectionner une ville" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bamako">Bamako</SelectItem>
                        <SelectItem value="segou">Ségou</SelectItem>
                        <SelectItem value="sikasso">Sikasso</SelectItem>
                        <SelectItem value="kayes">Kayes</SelectItem>
                        <SelectItem value="mopti">Mopti</SelectItem>
                        <SelectItem value="gao">Gao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacité totale *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="Ex: 1000"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Ticketing */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Billetterie</CardTitle>
                  <CardDescription>
                    Configurez vos types de billets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ticketTypes.map((ticket, index) => (
                    <div key={ticket.id}>
                      <div className="flex items-center justify-between mb-3">
                        <h4>Type de billet {index + 1}</h4>
                        {ticketTypes.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveTicketType(ticket.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <Input
                          placeholder="Nom du billet (Ex: VIP, Standard)"
                          value={ticket.name}
                          onChange={(e) => {
                            const updated = ticketTypes.map(t =>
                              t.id === ticket.id ? { ...t, name: e.target.value } : t
                            );
                            setTicketTypes(updated);
                          }}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            type="number"
                            placeholder="Prix (FCFA)"
                            value={ticket.price}
                            onChange={(e) => {
                              const updated = ticketTypes.map(t =>
                                t.id === ticket.id ? { ...t, price: e.target.value } : t
                              );
                              setTicketTypes(updated);
                            }}
                          />
                          <Input
                            type="number"
                            placeholder="Quantité"
                            value={ticket.quantity}
                            onChange={(e) => {
                              const updated = ticketTypes.map(t =>
                                t.id === ticket.id ? { ...t, quantity: e.target.value } : t
                              );
                              setTicketTypes(updated);
                            }}
                          />
                        </div>
                      </div>
                      
                      {index < ticketTypes.length - 1 && <Separator />}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddTicketType}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un type de billet
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Media & Publishing */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Médias et publication</CardTitle>
                  <CardDescription>
                    Ajoutez des images et publiez votre événement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Image de couverture *</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-[#14AE5C] transition-colors cursor-pointer">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p style={{ fontWeight: 600 }}>Cliquez pour télécharger</p>
                      <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                        PNG, JPG jusqu'à 10MB
                      </p>
                      <p className="text-muted-foreground" style={{ fontSize: '12px' }}>
                        Dimensions recommandées: 1920x1080px
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Images supplémentaires (optionnel)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-[#14AE5C] transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                        Ajouter jusqu'à 5 images
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-[#14AE5C]/10 border border-[#14AE5C]/20 rounded-lg p-4">
                    <h4 className="mb-2 text-[#14AE5C]">Prêt à publier ?</h4>
                    <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                      Une fois publié, votre événement sera visible par tous les utilisateurs de Tiketiki.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={handlePrevious}
              >
                Précédent
              </Button>
            )}
            {currentStep < totalSteps ? (
              <Button
                className="flex-1 bg-[#14AE5C] hover:bg-[#0f8a49]"
                onClick={handleNext}
              >
                Suivant
              </Button>
            ) : (
              <Button
                className="flex-1 bg-[#14AE5C] hover:bg-[#0f8a49]"
                onClick={handlePublish}
              >
                Publier l'événement
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
