import React, { useState } from 'react';
import { STREAMS } from './constants';
import { Stream } from './types';
import { AudioPlayer } from './components/AudioPlayer';
import { RequestSong } from './components/RequestSong';
import { AdIntegration } from './components/AdIntegration';
import { Radio, Headphones, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [currentStream, setCurrentStream] = useState<Stream>(STREAMS[0]);
  const [activeTab, setActiveTab] = useState<'requests' | 'ads'>('requests');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Header / Hero Section */}
      <header className="bg-white border-b border-slate-200 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-24 -mr-24 text-indigo-50 pointer-events-none">
          <Radio size={400} strokeWidth={1} />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
               <div className="flex items-center">
                 <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mr-4">
                    <Headphones className="text-white h-8 w-8" />
                 </div>
                 <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                      RadioStream <span className="text-indigo-600">Pro</span>
                    </h1>
                    <p className="mt-1 text-lg text-slate-500">
                      A melhor música, onde você estiver.
                    </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Top Ad Placeholder (Visual representation only, since we are playing the role of the template user) */}
        <div className="w-full h-24 bg-slate-200/50 border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center text-slate-400 mb-8 text-sm font-medium uppercase tracking-widest">
          Espaço Publicitário (Topo)
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Player (Larger) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
            <section aria-label="Audio Player">
               <AudioPlayer 
                  currentStream={currentStream}
                  allStreams={STREAMS}
                  onStreamChange={setCurrentStream}
               />
            </section>

            {/* About / Extra Info Area */}
            <section className="bg-white rounded-3xl shadow-sm p-8 border border-slate-100 hidden md:block">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Sobre a Rádio</h3>
              <p className="text-slate-600 leading-relaxed">
                Somos uma rádio web dedicada a trazer o melhor entretenimento 24 horas por dia. 
                Nossa programação é feita pensando em você, com sucessos atuais, clássicos inesquecíveis 
                e muita interatividade. Fique ligado e participe!
              </p>
            </section>
          </div>

          {/* Right Column: Sidebar (Requests & Ads) */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-8">
            
            {/* Tab Navigation for Sidebar (Mobile friendly way to show both tools without immense scrolling) */}
            <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab('requests')}
                className={`flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'requests'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Pedir Música
              </button>
              <button
                onClick={() => setActiveTab('ads')}
                className={`flex-1 flex items-center justify-center py-2.5 text-sm font-bold rounded-xl transition-all ${
                  activeTab === 'ads'
                    ? 'bg-white text-amber-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Cód. Anúncios
              </button>
            </div>

            {/* Tab Content */}
            <div className={activeTab === 'requests' ? 'block' : 'hidden'}>
              <RequestSong />
            </div>
            <div className={activeTab === 'ads' ? 'block' : 'hidden'}>
              <AdIntegration />
            </div>

             {/* Sidebar Ad Placeholder */}
            <div className="w-full aspect-square max-h-[300px] bg-slate-200/50 border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center text-slate-400 text-sm font-medium uppercase tracking-widest mx-auto">
              Publicidade Lateral
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="flex items-center justify-center text-slate-500 text-sm mb-4">
            Feito com <Heart size={16} className="text-red-400 mx-2 fill-current" /> para ouvintes apaixonados.
          </p>
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} RadioStream Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
