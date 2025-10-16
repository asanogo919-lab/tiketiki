import { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Lock, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface PaymentPageProps {
  onBack: () => void;
}

export function PaymentPage({ onBack }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile'>('mobile');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const orderDetails = {
    event: 'Salif Keïta en Concert Live',
    date: '25 Nov 2025, 20h00',
    location: 'Palais de la Culture, Bamako',
    tickets: 2,
    ticketPrice: 15000,
    serviceFee: 500,
  };

  const total = orderDetails.tickets * orderDetails.ticketPrice + orderDetails.serviceFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simuler le traitement du paiement
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#14AE5C]/10 to-[#FCD116]/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 bg-[#14AE5C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-[#14AE5C]" />
            </div>
            <h2 className="mb-2">Paiement réussi !</h2>
            <p className="text-muted-foreground mb-6">
              Vos billets ont été envoyés par e-mail
            </p>
            
            <Card className="bg-muted/50 mb-6">
              <CardContent className="p-4">
                <div className="space-y-2 text-left">
                  <div className="flex justify-between" style={{ fontSize: '14px' }}>
                    <span className="text-muted-foreground">Transaction</span>
                    <span className="font-mono">#TKT{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: '14px' }}>
                    <span className="text-muted-foreground">Montant</span>
                    <span style={{ fontWeight: 600 }}>{total.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: '14px' }}>
                    <span className="text-muted-foreground">Date</span>
                    <span>15 Oct 2025, 14:32</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full bg-[#14AE5C] hover:bg-[#0f8a49]">
                Voir mes billets
              </Button>
              <Button variant="outline" className="w-full" onClick={onBack}>
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>Paiement</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Security Badge */}
        <Alert className="mb-6 border-[#14AE5C]/20 bg-[#14AE5C]/5">
          <Lock className="w-4 h-4 text-[#14AE5C]" />
          <AlertDescription>
            Paiement 100% sécurisé. Vos données sont protégées.
          </AlertDescription>
        </Alert>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle style={{ fontSize: '18px' }}>Récapitulatif</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-1">{orderDetails.event}</h4>
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                {orderDetails.date}
              </p>
              <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                {orderDetails.location}
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between" style={{ fontSize: '14px' }}>
                <span className="text-muted-foreground">
                  {orderDetails.tickets} × Billet
                </span>
                <span>{(orderDetails.tickets * orderDetails.ticketPrice).toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '14px' }}>
                <span className="text-muted-foreground">Frais de service</span>
                <span>{orderDetails.serviceFee.toLocaleString()} FCFA</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <span style={{ fontWeight: 600 }}>Total</span>
                <span className="text-[#14AE5C]" style={{ fontSize: '20px', fontWeight: 700 }}>
                  {total.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle style={{ fontSize: '18px' }}>Méthode de paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="space-y-3">
                {/* Mobile Money */}
                <label 
                  htmlFor="mobile"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'mobile' ? 'border-[#14AE5C] bg-[#14AE5C]/5' : 'border-border hover:border-[#14AE5C]/50'
                  }`}
                >
                  <RadioGroupItem value="mobile" id="mobile" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-[#FCD116]/20 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-[#FCD116]" />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontWeight: 600 }}>Mobile Money</p>
                      <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                        Orange Money, Moov Money
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-[#14AE5C] text-white">Populaire</Badge>
                </label>

                {/* Credit Card */}
                <label 
                  htmlFor="card"
                  className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-[#14AE5C] bg-[#14AE5C]/5' : 'border-border hover:border-[#14AE5C]/50'
                  }`}
                >
                  <RadioGroupItem value="card" id="card" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-[#CE1126]/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-[#CE1126]" />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontWeight: 600 }}>Carte bancaire</p>
                      <p className="text-muted-foreground" style={{ fontSize: '13px' }}>
                        Visa, Mastercard
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle style={{ fontSize: '18px' }}>
              {paymentMethod === 'mobile' ? 'Informations Mobile Money' : 'Informations de carte'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentMethod === 'mobile' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="operator">Opérateur</Label>
                  <select 
                    id="operator"
                    className="flex h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option>Orange Money</option>
                    <option>Moov Money</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+223 XX XX XX XX" 
                  />
                </div>
                <Alert className="border-[#FCD116]/20 bg-[#FCD116]/5">
                  <AlertCircle className="w-4 h-4 text-[#FCD116]" />
                  <AlertDescription style={{ fontSize: '13px' }}>
                    Vous recevrez un code de confirmation sur votre téléphone
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numéro de carte</Label>
                  <Input 
                    id="cardNumber" 
                    type="text" 
                    placeholder="1234 5678 9012 3456" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Date d'expiration</Label>
                    <Input 
                      id="expiry" 
                      type="text" 
                      placeholder="MM/AA" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      type="text" 
                      placeholder="123" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom sur la carte</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="MAMADOU KONATE" 
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button 
          className="w-full bg-[#14AE5C] hover:bg-[#0f8a49] h-12"
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          <Lock className="w-5 h-5 mr-2" />
          {isProcessing ? 'Traitement en cours...' : `Payer ${total.toLocaleString()} FCFA`}
        </Button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mt-6 text-muted-foreground">
          <div className="flex items-center gap-1" style={{ fontSize: '12px' }}>
            <Lock className="w-3 h-3" />
            Paiement sécurisé
          </div>
          <span>•</span>
          <div style={{ fontSize: '12px' }}>
            Cryptage SSL
          </div>
        </div>
      </div>
    </div>
  );
}
