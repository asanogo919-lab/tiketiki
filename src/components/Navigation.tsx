import { Home, Search, Ticket, User } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'search' | 'tickets' | 'profile';
  onNavigate: (page: 'home' | 'search' | 'tickets' | 'profile') => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const items = [
    { id: 'home' as const, icon: Home, label: 'Accueil' },
    { id: 'search' as const, icon: Search, label: 'Rechercher' },
    { id: 'tickets' as const, icon: Ticket, label: 'Billets' },
    { id: 'profile' as const, icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 safe-area-bottom">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 min-w-[70px] transition-colors ${
                  isActive ? 'text-[#14AE5C]' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
