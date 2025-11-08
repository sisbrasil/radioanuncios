import React, { useState, useEffect, useRef } from 'react';
import { AD_CODES } from '../constants';
import { Copy, Check, Code2, Play, Pause } from 'lucide-react';

export const AdIntegration: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle auto-scroll interval
  useEffect(() => {
    let interval: number | undefined;
    if (autoScroll) {
      interval = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % AD_CODES.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoScroll]);

  // Handle scrolling to active item
  useEffect(() => {
    if (autoScroll && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  }, [activeIndex, autoScroll]);

  const handleCopy = async (id: string, text: string) => {
    // Pause auto-scroll if user is trying to copy
    if (autoScroll) setAutoScroll(false);

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
    } catch (e) {
      alert("Seu navegador não suporta cópia automática. Por favor, selecione e copie manualmente.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
            <Code2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Anúncios</h3>
            <p className="text-sm text-slate-500 mt-1">Monetização</p>
          </div>
        </div>
        <button
          onClick={() => setAutoScroll(!autoScroll)}
          className={`p-2 rounded-full transition-colors ${autoScroll ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          aria-label={autoScroll ? "Pausar rotação automática" : "Iniciar rotação automática"}
          title={autoScroll ? "Pausar apresentação" : "Apresentação automática"}
        >
          {autoScroll ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scroll-smooth">
        {AD_CODES.map((ad, index) => (
          <div 
            key={ad.id} 
            ref={el => { itemRefs.current[index] = el; }}
            className={`group rounded-2xl transition-all duration-500 ${autoScroll && activeIndex === index ? 'p-4 bg-amber-50 ring-2 ring-amber-200' : 'p-0'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <label htmlFor={`ad-${ad.id}`} className={`text-sm font-semibold transition-colors ${autoScroll && activeIndex === index ? 'text-amber-800' : 'text-slate-700'}`}>
                {ad.title}
              </label>
              <button 
                onClick={() => handleCopy(ad.id, ad.code)}
                className={`flex items-center text-xs font-medium px-2.5 py-1 rounded-md transition-colors
                  ${copiedId === ad.id 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600'
                  }`}
              >
                {copiedId === ad.id ? (
                  <>
                    <Check size={14} className="mr-1" /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-1" /> Copiar
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <pre className={`text-slate-300 p-4 rounded-xl text-xs overflow-x-auto font-mono border transition-colors duration-500
                ${autoScroll && activeIndex === index ? 'bg-slate-800 border-amber-300/50' : 'bg-slate-900 border-slate-700'}`}>
                <code>{ad.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 text-blue-700 text-sm rounded-xl border border-blue-100 flex items-start">
        <div className="mr-3 text-xl">💡</div>
          <p>
          Copie estes snippets para as áreas correspondentes do seu site. Use o botão de play acima para revisar todos os formatos disponíveis.
        </p>
      </div>
    </div>
  );
};
