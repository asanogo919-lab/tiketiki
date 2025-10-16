import { Calendar, MapPin, Users, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  category: 'concert' | 'festival' | 'cinema';
  date: string;
  location: string;
  price: string;
  attendees?: number;
  onSelect?: (id: string) => void;
}

export function EventCard({ 
  id, 
  title, 
  image, 
  category, 
  date, 
  location, 
  price, 
  attendees,
  onSelect 
}: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const categoryColors = {
    concert: 'bg-[#14AE5C] text-white',
    festival: 'bg-[#FCD116] text-black',
    cinema: 'bg-[#CE1126] text-white',
  };

  const categoryLabels = {
    concert: 'Concert',
    festival: 'Festival',
    cinema: 'Cinéma',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <Badge className={`absolute top-3 left-3 ${categoryColors[category]}`}>
          {categoryLabels[category]}
        </Badge>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart 
            className={`w-4 h-4 ${isFavorite ? 'fill-[#CE1126] text-[#CE1126]' : ''}`} 
          />
        </Button>
      </div>
      
      <CardContent className="p-4 space-y-3" onClick={() => onSelect?.(id)}>
        <h3 className="line-clamp-2">{title}</h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '14px' }}>
            <Calendar className="w-4 h-4 text-[#14AE5C]" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '14px' }}>
            <MapPin className="w-4 h-4 text-[#14AE5C]" />
            <span>{location}</span>
          </div>
          
          {attendees && (
            <div className="flex items-center gap-2 text-muted-foreground" style={{ fontSize: '14px' }}>
              <Users className="w-4 h-4 text-[#14AE5C]" />
              <span>{attendees} participants</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-muted-foreground" style={{ fontSize: '12px' }}>À partir de</p>
            <p className="text-[#14AE5C]" style={{ fontSize: '18px', fontWeight: 700 }}>{price} FCFA</p>
          </div>
          <Button className="bg-[#14AE5C] hover:bg-[#0f8a49]">
            Réserver
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
