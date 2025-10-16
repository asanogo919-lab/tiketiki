import { useState } from 'react';
import { HomePage } from './components/HomePage';
import { SearchPage } from './components/SearchPage';
import { ProfilePage } from './components/ProfilePage';
import { PaymentPage } from './components/PaymentPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { Navigation } from './components/Navigation';
import { OrganizerNavigation } from './components/OrganizerNavigation';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { CreateEventPage } from './components/CreateEventPage';
import { OrganizerEventsPage } from './components/OrganizerEventsPage';
import { EventAnalyticsPage } from './components/EventAnalyticsPage';
import { AuthForm } from './components/AuthForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { TiketikiLogo } from './components/TiketikiLogo';
import { BogolanPattern } from './components/BogolanPattern';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Moon, Sun, LayoutDashboard, User } from 'lucide-react';

type Page = 'auth' | 'home' | 'search' | 'tickets' | 'profile' | 'payment' | 'event-details' |
  'organizer-dashboard' | 'organizer-events' | 'create-event' | 'analytics' | 'organizer-settings';
type UserMode = 'user' | 'organizer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [isDark, setIsDark] = useState(false);
  const [userMode, setUserMode] = useState<UserMode>('user');

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const switchMode = (mode: UserMode) => {
    setUserMode(mode);
    if (mode === 'organizer') {
      setCurrentPage('organizer-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  // Auth Page
  if (currentPage === 'auth') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
        <div className="fixed inset-0 bg-gradient-to-br from-[#FCD116]/20 via-background to-[#14AE5C]/10 dark:from-[#1a1a1a] dark:via-background dark:to-[#14AE5C]/5">
          <BogolanPattern />
        </div>

        <div className="fixed top-0 left-0 right-0 h-[40vh] overflow-hidden opacity-30 dark:opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1683582544815-66d1ea55d3c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBzaWxob3VldHRlfGVufDF8fHx8MTc2MDU2OTgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Foule de concert"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm border-2"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-[#FCD116]" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
              <TiketikiLogo />
              <p className="mt-3 text-muted-foreground" style={{ fontSize: '14px' }}>
                Concerts • Festivals • Cinéma au Mali
              </p>
            </div>

            <Card className="shadow-2xl backdrop-blur-sm bg-background/95 border-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-center">Bienvenue</CardTitle>
                <CardDescription className="text-center">
                  Rejoignez la communauté Tiketiki
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signup" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="signup">Inscription</TabsTrigger>
                    <TabsTrigger value="login">Connexion</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signup">
                    <AuthForm type="signup" />
                  </TabsContent>
                  
                  <TabsContent value="login">
                    <AuthForm type="login" />
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex h-1.5 rounded-full overflow-hidden">
                  <div className="flex-1 bg-[#14AE5C]" />
                  <div className="flex-1 bg-[#FCD116]" />
                  <div className="flex-1 bg-[#CE1126]" />
                </div>
                
                <p className="text-center mt-4 text-muted-foreground" style={{ fontSize: '12px' }}>
                  En vous inscrivant, vous acceptez nos conditions d'utilisation
                </p>

                {/* Demo Buttons */}
                <div className="space-y-2 mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-[#14AE5C] text-[#14AE5C] hover:bg-[#14AE5C]/10"
                    onClick={() => {
                      setUserMode('user');
                      setCurrentPage('home');
                    }}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Mode Utilisateur
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#FCD116] text-[#FCD116] hover:bg-[#FCD116]/10"
                    onClick={() => {
                      setUserMode('organizer');
                      setCurrentPage('organizer-dashboard');
                    }}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Mode Organisateur
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                🎵 Vivez la culture malienne comme jamais auparavant
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Page (no navigation)
  if (currentPage === 'payment') {
    return <PaymentPage onBack={() => setCurrentPage('event-details')} />;
  }

  // Event Details Page (no navigation)
  if (currentPage === 'event-details') {
    return (
      <EventDetailsPage
        onBack={() => setCurrentPage('home')}
        onProceedToPayment={() => setCurrentPage('payment')}
      />
    );
  }

  // Create Event Page (no navigation)
  if (currentPage === 'create-event') {
    return <CreateEventPage onBack={() => setCurrentPage('organizer-events')} />;
  }

  // Analytics Page (no navigation)
  if (currentPage === 'analytics') {
    return <EventAnalyticsPage onBack={() => setCurrentPage('organizer-dashboard')} />;
  }

  // Main App with Navigation
  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Mode Switcher - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          size="sm"
          variant={userMode === 'user' ? 'default' : 'outline'}
          className={userMode === 'user' ? 'bg-[#14AE5C] hover:bg-[#0f8a49]' : ''}
          onClick={() => switchMode('user')}
        >
          <User className="w-4 h-4 mr-1" />
          Utilisateur
        </Button>
        <Button
          size="sm"
          variant={userMode === 'organizer' ? 'default' : 'outline'}
          className={userMode === 'organizer' ? 'bg-[#FCD116] text-black hover:bg-[#FCD116]/90' : ''}
          onClick={() => switchMode('organizer')}
        >
          <LayoutDashboard className="w-4 h-4 mr-1" />
          Organisateur
        </Button>
      </div>

      {/* USER MODE */}
      {userMode === 'user' && (
        <>
          {currentPage === 'home' && <HomePage onNavigate={(page) => setCurrentPage(page as Page)} />}
          {currentPage === 'search' && <SearchPage />}
          {currentPage === 'tickets' && (
            <div className="min-h-screen flex items-center justify-center p-4 pb-24">
              <div className="text-center">
                <h2 className="mb-4">Mes Billets</h2>
                <p className="text-muted-foreground mb-6">Vos billets achetés apparaîtront ici</p>
                <Button 
                  className="bg-[#14AE5C] hover:bg-[#0f8a49]"
                  onClick={() => setCurrentPage('event-details')}
                >
                  Acheter des billets
                </Button>
              </div>
            </div>
          )}
          {currentPage === 'profile' && <ProfilePage />}
          
          <Navigation 
            currentPage={currentPage as any}
            onNavigate={(page) => setCurrentPage(page as Page)}
          />
        </>
      )}

      {/* ORGANIZER MODE */}
      {userMode === 'organizer' && (
        <>
          {currentPage === 'organizer-dashboard' && (
            <OrganizerDashboard onNavigate={(page) => setCurrentPage(page as Page)} />
          )}
          {currentPage === 'organizer-events' && (
            <OrganizerEventsPage onNavigate={(page) => setCurrentPage(page as Page)} />
          )}
          {currentPage === 'organizer-settings' && (
            <div className="min-h-screen flex items-center justify-center p-4 pb-24">
              <div className="text-center">
                <h2 className="mb-4">Paramètres</h2>
                <p className="text-muted-foreground mb-6">Configuration de votre compte organisateur</p>
              </div>
            </div>
          )}
          
          <OrganizerNavigation 
            currentPage={
              currentPage === 'organizer-dashboard' ? 'dashboard' :
              currentPage === 'organizer-events' ? 'events' :
              currentPage === 'analytics' ? 'analytics' :
              'settings'
            }
            onNavigate={(page) => {
              if (page === 'dashboard') setCurrentPage('organizer-dashboard');
              else if (page === 'events') setCurrentPage('organizer-events');
              else if (page === 'analytics') setCurrentPage('analytics');
              else if (page === 'settings') setCurrentPage('organizer-settings');
            }}
          />
        </>
      )}
    </div>
  );
}
