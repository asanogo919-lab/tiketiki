import { useState } from 'react';
import { Search, SlidersHorizontal, X, Calendar as CalendarIcon, MapPin, DollarSign } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { EventCard } from './EventCard';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  const categories = [
    { id: 'concert', label: 'Concerts' },
    { id: 'festival', label: 'Festivals' },
    { id: 'cinema', label: 'Cinéma' },
  ];

  const cities = [
    { value: 'all', label: 'Toutes les villes' },
    { value: 'bamako', label: 'Bamako' },
    { value: 'segou', label: 'Ségou' },
    { value: 'sikasso', label: 'Sikasso' },
    { value: 'kayes', label: 'Kayes' },
    { value: 'mopti', label: 'Mopti' },
  ];

  const dateFilters = [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'custom', label: 'Date personnalisée' },
  ];

  const events = [
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
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const activeFiltersCount = 
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedCity !== 'all' ? 1 : 0) +
    (selectedDate !== 'all' ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 50000 ? 1 : 0);

  return (
    <ScrollArea className="h-screen pb-20">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 border-b">
          <div className="max-w-md mx-auto px-4 py-4">
            <h1 className="mb-4">Rechercher</h1>
            
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un événement..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 h-10 relative hover:bg-accent hover:text-accent-foreground transition-colors">
                    <SlidersHorizontal className="w-5 h-5" />
                    {activeFiltersCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-[#CE1126] text-white">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-w-md mx-auto rounded-t-3xl">
                  <SheetHeader>
                    <SheetTitle>Filtres</SheetTitle>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    {/* Categories */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Search className="w-4 h-4 text-[#14AE5C]" />
                        <h4>Type d'événement</h4>
                      </div>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.id}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => toggleCategory(category.id)}
                            />
                            <label
                              htmlFor={category.id}
                              className="flex-1 cursor-pointer"
                              style={{ fontSize: '14px' }}
                            >
                              {category.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-[#14AE5C]" />
                        <h4>Ville</h4>
                      </div>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Date */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CalendarIcon className="w-4 h-4 text-[#14AE5C]" />
                        <h4>Date</h4>
                      </div>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {dateFilters.map((filter) => (
                            <SelectItem key={filter.value} value={filter.value}>
                              {filter.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-4 h-4 text-[#14AE5C]" />
                        <h4>Prix</h4>
                      </div>
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={50000}
                          step={1000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="w-full"
                        />
                        <div className="flex justify-between text-muted-foreground" style={{ fontSize: '14px' }}>
                          <span>{priceRange[0].toLocaleString()} FCFA</span>
                          <span>{priceRange[1].toLocaleString()} FCFA</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedCategories([]);
                          setSelectedCity('all');
                          setSelectedDate('all');
                          setPriceRange([0, 50000]);
                        }}
                      >
                        Réinitialiser
                      </Button>
                      <Button className="flex-1 bg-[#14AE5C] hover:bg-[#0f8a49]">
                        Appliquer
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedCategories.map(catId => {
                  const cat = categories.find(c => c.id === catId);
                  return (
                    <Badge key={catId} variant="secondary" className="gap-1">
                      {cat?.label}
                      <button onClick={() => toggleCategory(catId)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
                {selectedCity !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {cities.find(c => c.value === selectedCity)?.label}
                    <button onClick={() => setSelectedCity('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-md mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
              {events.length} événements trouvés
            </p>
            <Select defaultValue="date">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
                <SelectItem value="popular">Popularité</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
