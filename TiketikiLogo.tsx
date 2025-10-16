import { Ticket } from 'lucide-react';

export function TiketikiLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative">
        <Ticket className="w-8 h-8 text-[#14AE5C]" strokeWidth={2.5} />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FCD116] rounded-full" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[#14AE5C]" style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Tiketiki
        </span>
        <span className="text-[10px] text-muted-foreground" style={{ fontWeight: 500, letterSpacing: '1px' }}>
          VOTRE BILLET EN UN CLIC
        </span>
      </div>
    </div>
  );
}
