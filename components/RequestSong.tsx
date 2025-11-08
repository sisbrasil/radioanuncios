import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';
import { MessageCircle, Music2, ExternalLink } from 'lucide-react';

export const RequestSong: React.FC = () => {
  const getWhatsAppLink = (message: string = ""): string => {
    const text = encodeURIComponent(message || "Olá! Gostaria de pedir uma música na rádio.");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  };

  const quickRequests = [
    "Quero pedir um sucesso antigo!",
    "Toca a mais pedida de hoje!",
    "Manda um alô para a galera!"
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-green-100 text-green-600 rounded-full">
          <MessageCircle size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Peça sua Música</h3>
      </div>

      <p className="text-slate-600 mb-6">
        Participe da nossa programação ao vivo! Envie seu pedido diretamente para nosso WhatsApp.
      </p>

      <a 
        href={getWhatsAppLink()} 
        target="_blank" 
        rel="noreferrer" 
        className="group flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-green-200 mb-8"
      >
        <MessageCircle className="mr-2" />
        <span>Falar no WhatsApp</span>
        <ExternalLink size={16} className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
      </a>

      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
          <Music2 size={16} className="mr-2" />
          Pedidos Rápidos
        </h4>
        <div className="grid gap-3">
          {quickRequests.map((req, index) => (
            <a 
              key={index}
              href={getWhatsAppLink(`Olá! ${req}`)} 
              target="_blank" 
              rel="noreferrer" 
              className="text-left px-4 py-3 bg-slate-50 hover:bg-green-50 text-slate-700 hover:text-green-700 rounded-lg transition-colors text-sm font-medium border border-slate-100 hover:border-green-200 flex items-center justify-between group"
            >
              <span>{req}</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
