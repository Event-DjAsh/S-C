import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Disc, Music2, ListMusic, CheckCircle2 } from 'lucide-react';
import { MUSIC_SETS } from '../data/djData';

export const MusicVibePlayer: React.FC = () => {
  const [activeSetId, setActiveSetId] = useState<string>(MUSIC_SETS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const activeSet = MUSIC_SETS.find(s => s.id === activeSetId) || MUSIC_SETS[0];

  // Stop synthetic audio when component unmounts or active set changes
  const stopAudio = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);

      const ctx = audioCtxRef.current;
      const bpm = activeSet.bpm;
      const beatIntervalMs = (60 / bpm) * 1000;
      let step = 0;

      // Play a musical rhythm snippet based on mood
      intervalRef.current = window.setInterval(() => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;

        // Kick drum on beats 0, 1, 2, 3
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.frequency.setValueAtTime(120, now);
        kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.08);
        kickGain.gain.setValueAtTime(0.35, now);
        kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        kickOsc.connect(kickGain);
        kickGain.connect(ctx.destination);
        kickOsc.start(now);
        kickOsc.stop(now + 0.12);

        // Hi-hat / shaker on off-beats
        if (step % 2 === 1) {
          const bufferSize = ctx.sampleRate * 0.04;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.15;
          }
          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = buffer;
          const hatGain = ctx.createGain();
          hatGain.gain.setValueAtTime(0.12, now);
          hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          whiteNoise.connect(hatGain);
          hatGain.connect(ctx.destination);
          whiteNoise.start(now);
        }

        // Bassline melodic tone on steps
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = activeSet.synthMood === 'chill' ? 'sine' : 'triangle';
        const notes = activeSet.synthMood === 'chill' ? [130.81, 146.83, 164.81, 174.61] : [110, 123.47, 98, 130.81];
        const currentFreq = notes[step % notes.length];
        bassOsc.frequency.setValueAtTime(currentFreq, now);
        bassGain.gain.setValueAtTime(0.18, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + 0.2);

        step = (step + 1) % 8;
      }, beatIntervalMs / 2);

    } catch (e) {
      console.error('Audio synthesizer error:', e);
      setIsPlaying(false);
    }
  };

  const handleSelectSet = (id: string) => {
    stopAudio();
    setActiveSetId(id);
  };

  return (
    <section id="music-sets" className="py-20 lg:py-28 bg-stone-950 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-2">
            Soundtrack Curation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display text-balance">
            Interactive Music Vibes & Setlists
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Music is the heartbeat of any memorable night. Explore our signature energy profiles, preview the sonic grooves, and inspect sample track progressions.
          </p>
        </div>

        {/* Set Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {MUSIC_SETS.map(set => {
            const isSelected = set.id === activeSetId;
            return (
              <button
                key={set.id}
                onClick={() => handleSelectSet(set.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-stone-900 shadow-md ring-1 ring-amber-400/40'
                    : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Disc className={`w-4 h-4 ${isSelected ? 'text-amber-400 animate-spin' : 'text-stone-500'}`} />
                  <span className="text-[11px] font-mono tabular-nums text-stone-400">{set.bpm} BPM</span>
                </div>
                <div className="font-bold text-sm text-white line-clamp-1">{set.title}</div>
                <div className="text-xs text-stone-400 mt-0.5 line-clamp-1">{set.vibe}</div>
              </button>
            );
          })}
        </div>

        {/* Main Audio & Tracklist Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-stone-900/50 border border-stone-800/80 rounded-2xl p-6 sm:p-8">
          
          {/* Left Column: Player Controls & Audio Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                <Music2 className="w-3.5 h-3.5" />
                <span>{activeSet.bpm} BPM Rhythm Profile</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">{activeSet.title}</h3>
              <p className="text-stone-300 text-sm mt-2 leading-relaxed">{activeSet.description}</p>
            </div>

            {/* Live Audio Groove Synthesizer Bar */}
            <div className="bg-stone-950 p-5 rounded-xl border border-stone-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Interactive Groove Preview
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {isPlaying ? 'LIVE AUDIO ACTIVE' : 'CLICK TO AUDITION'}
                </span>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className="h-12 flex items-center justify-between gap-1 px-2 bg-stone-900/80 rounded-lg overflow-hidden">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPlaying
                        ? 'bg-amber-400 animate-pulse'
                        : 'bg-stone-700'
                    }`}
                    style={{
                      height: isPlaying
                        ? `${Math.max(15, Math.sin(i * 0.4) * 80 + 30)}%`
                        : `${(i % 5) * 12 + 10}%`,
                      animationDelay: `${(i % 8) * 80}ms`
                    }}
                  />
                ))}
              </div>

              {/* Play / Stop Button */}
              <button
                onClick={handleTogglePlay}
                className="w-full py-3 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-stone-950" />
                    <span>Pause Beat Preview</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-stone-950 ml-0.5" />
                    <span>Play {activeSet.bpm} BPM Groove Preview</span>
                  </>
                )}
              </button>
            </div>

            {/* Music Policy Pillars */}
            <div className="space-y-2 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Strict <strong>&quot;Do Not Play&quot;</strong> blacklist honored with 100% fidelity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Direct Spotify & Apple Music playlist sync before your event</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Seamless guest request filtering—no room-clearing songs allowed</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tracklist & Vibe Highlights */}
          <div className="lg:col-span-7 bg-stone-950/70 border border-stone-800/80 rounded-xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Sample Tracklist Progression
                </span>
              </div>
              <div className="flex items-center gap-2">
                {activeSet.genreTags.map(tag => (
                  <span key={tag} className="text-[11px] text-stone-400 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 divide-y divide-stone-900">
              {activeSet.tracklist.map((track, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-stone-500 tabular-nums w-5">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-stone-200 group-hover:text-amber-400 transition-colors">
                      {track}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-mono">
                    Floor Tested
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Have a specific genre in mind? (Afrobeats, Latin, 80s Synth, Rock)</span>
              <span className="text-amber-400 font-semibold">100% Customized</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
