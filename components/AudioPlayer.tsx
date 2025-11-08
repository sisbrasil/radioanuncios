import React, { useEffect, useRef, useState } from 'react';
import { Stream } from '../types';
import { Play, Pause, Square, Volume2, VolumeX, Radio, Music } from 'lucide-react';

interface AudioPlayerProps {
  currentStream: Stream;
  allStreams: Stream[];
  onStreamChange: (stream: Stream) => void;
}

// Mock data to demonstrate metadata UI.
// In a real app, you would fetch this from your streaming server's API (e.g., Icecast status-json.xsl).
const MOCK_PLAYLIST = [
  { title: "Blinding Lights", artist: "The Weeknd" },
  { title: "As It Was", artist: "Harry Styles" },
  { title: "Flowers", artist: "Miley Cyrus" },
  { title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentStream,
  allStreams,
  onStreamChange,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Metadata state
  const [metadata, setMetadata] = useState({ title: 'Conectando...', artist: 'Aguarde' });
  const [mockIndex, setMockIndex] = useState(0);

  // Handle stream changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      stopStream();
      
      audioRef.current.src = currentStream.url;
      if (wasPlaying) {
        handlePlay();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStream.id]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // SIMULATED METADATA FETCHING
  // Replace this useEffect with real API polling in production.
  useEffect(() => {
    let interval: number;

    if (isPlaying) {
      // Initial fetch simulation
      setMetadata(MOCK_PLAYLIST[mockIndex]);

      // Set interval to change song every 15 seconds for demo purposes
      interval = window.setInterval(() => {
        setMockIndex((prev) => {
          const nextIndex = (prev + 1) % MOCK_PLAYLIST.length;
          setMetadata(MOCK_PLAYLIST[nextIndex]);
          return nextIndex;
        });
      }, 15000);
    } else {
      setMetadata({ title: 'Rádio Online', artist: 'Clique em play para iniciar' });
    }

    return () => clearInterval(interval);
  }, [isPlaying, mockIndex]);

  const handlePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      setIsLoading(true);
      setError(null);
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback error:", err);
      setError("Não foi possível iniciar a reprodução deste stream.");
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const stopStream = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      {/* Now Playing Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 text-white/10 rotate-12 transform-gpu pointer-events-none">
          <Radio size={180} />
        </div>
        
        <div className="relative z-10">
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 mb-4">
            {isPlaying ? (
              <div className="flex items-center bg-red-500/20 backdrop-blur-md text-red-100 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30">
                <span className="relative flex h-2.5 w-2.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                NO AR
              </div>
            ) : (
              <div className="inline-block bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full text-white/80">
                OFFLINE
              </div>
            )}
          </div>

          {/* Stream Info */}
          <h3 className="text-3xl font-bold truncate mb-1">{currentStream.name}</h3>
          <p className="text-indigo-100 text-sm mb-6 opacity-90 truncate">
            {currentStream.description || 'Web Rádio Ao Vivo'}
          </p>

          {/* Metadata / Now Playing Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center">
            <div className={`p-3 rounded-lg mr-4 transition-colors ${isPlaying ? 'bg-indigo-500/50 text-white' : 'bg-black/20 text-white/40'}`}>
              <Music size={24} className={isPlaying ? 'animate-pulse' : ''} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider mb-1">
                Tocando Agora
              </p>
              <p className="text-white text-lg font-bold truncate leading-tight">
                {metadata.title}
              </p>
              <p className="text-white/80 text-sm truncate">
                {metadata.artist}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="p-6 md:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-center">
            <div className="mr-3 text-red-400">⚠️</div>
            {error}
          </div>
        )}

        {/* Main Transport Controls */}
        <div className="flex items-center justify-center space-x-8 mb-8">
           <button 
            onClick={stopStream}
            className="p-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-95"
            title="Parar"
          >
            <Square size={24} fill="currentColor" />
          </button>

          <button 
            onClick={togglePlay}
            disabled={isLoading}
            className={`p-7 rounded-[2rem] shadow-xl shadow-indigo-200/50 transition-all transform active:scale-95 flex items-center justify-center
              ${isLoading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-300/50'}
            `}
            title={isPlaying ? "Pausar" : "Tocar"}
          >
            {isLoading ? (
              <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={40} fill="currentColor" />
            ) : (
              <Play size={40} fill="currentColor" className="ml-2" />
            )}
          </button>

          {/* Volume Mute Toggle as a symmetrical counterpart to Stop */}
           <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all active:scale-95 ${isMuted ? 'text-red-500 bg-red-50 hover:bg-red-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
            title={isMuted ? "Ativar Som" : "Mudo"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="max-w-xs mx-auto flex items-center space-x-4 bg-slate-50 p-2 pr-4 rounded-2xl border border-slate-100">
          <div className={`p-2 rounded-xl transition-colors ${isMuted || volume === 0 ? 'bg-slate-200 text-slate-400' : 'bg-indigo-100 text-indigo-600'}`}>
             {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            aria-label="Volume"
          />
          <div className="text-xs text-slate-500 w-9 text-right font-medium tabular-nums">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          crossOrigin="anonymous"
          onError={(e) => {
            console.error("Audio error native:", e);
            setError("Erro ao carregar o áudio. Verifique sua conexão.");
            setIsPlaying(false);
            setIsLoading(false);
          }}
          onPlaying={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
        />
      </div>

      {/* Stream Selector (if more than 1) */}
      {allStreams.length > 1 && (
        <div className="border-t border-slate-100 p-6 bg-slate-50/50">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-1">
            Outras Estações
          </h4>
          <div className="grid gap-3">
            {allStreams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => onStreamChange(stream)}
                className={`w-full flex items-center p-4 rounded-xl text-left transition-all border ${
                  currentStream.id === stream.id
                    ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-50'
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm text-slate-600'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 transition-colors ${currentStream.id === stream.id ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Radio size={20} />
                </div>
                <div>
                  <div className={`font-bold ${currentStream.id === stream.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {stream.name}
                  </div>
                  {stream.description && (
                    <div className="text-xs text-slate-500 mt-0.5">{stream.description}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
