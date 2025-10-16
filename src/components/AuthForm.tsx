import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AuthFormProps {
  type: 'signup' | 'login';
}

export function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  // Validation en temps réel
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateFullName = (name: string) => {
    return name.trim().length >= 3;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = validatePassword(formData.password);
  const isFullNameValid = validateFullName(formData.fullName);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {type === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#14AE5C]" />
            Nom complet
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              type="text"
              placeholder="Votre nom complet"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              onBlur={() => handleBlur('fullName')}
              className="pr-10"
            />
            {touched.fullName && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isFullNameValid ? (
                  <Check className="w-5 h-5 text-[#14AE5C]" />
                ) : (
                  <X className="w-5 h-5 text-[#CE1126]" />
                )}
              </div>
            )}
          </div>
          {touched.fullName && !isFullNameValid && (
            <p className="text-[#CE1126]" style={{ fontSize: '13px' }}>
              Le nom doit contenir au moins 3 caractères
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#14AE5C]" />
          Adresse e-mail
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => handleBlur('email')}
            className="pr-10"
          />
          {touched.email && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isEmailValid ? (
                <Check className="w-5 h-5 text-[#14AE5C]" />
              ) : (
                <X className="w-5 h-5 text-[#CE1126]" />
              )}
            </div>
          )}
        </div>
        {touched.email && !isEmailValid && (
          <p className="text-[#CE1126]" style={{ fontSize: '13px' }}>
            Veuillez entrer une adresse e-mail valide
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#14AE5C]" />
          Mot de passe
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimum 6 caractères"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onBlur={() => handleBlur('password')}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {touched.password && !isPasswordValid && (
          <p className="text-[#CE1126]" style={{ fontSize: '13px' }}>
            Le mot de passe doit contenir au moins 6 caractères
          </p>
        )}
      </div>

      {type === 'login' && (
        <div className="text-right">
          <button
            type="button"
            className="text-[#14AE5C] hover:underline"
            style={{ fontSize: '14px' }}
          >
            Mot de passe oublié ?
          </button>
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-[#14AE5C] hover:bg-[#0f8a49] text-white"
        size="lg"
      >
        {type === 'signup' ? 'Créer un compte' : 'Se connecter'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center" style={{ fontSize: '13px' }}>
          <span className="bg-background px-4 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>
    </form>
  );
}
