import { useEffect, useRef, useState } from "react";
import { Activity, AudioLines, CheckCircle2, Loader2, Play, Square, WandSparkles } from "lucide-react";

type QueueItem = { label: string; state: "fila" | "processando" | "concluído"; progress: number };

const chords: Record<string, number[]> = { "Cmaj7": [261.63, 329.63, 392, 493.88], "Am7": [220, 261.63, 329.63, 392], "Fmaj7": [174.61, 220, 261.63, 329.63], "G6": [196, 246.94, 293.66, 392] };

export function AudioLabPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<{ context: AudioContext; analyser: AnalyserNode; stream: MediaStream } | undefined>(undefined);
  const [running, setRunning] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [selectedChord, setSelectedChord] = useState("Cmaj7");
  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => () => { audioRef.current?.stream.getTracks().forEach((track) => track.stop()); audioRef.current?.context.close(); }, []);

  useEffect(() => {
    let frame = 0;
    const draw = () => {
      const canvas = canvasRef.current;
      const analyser = audioRef.current?.analyser;
      if (canvas && analyser) {
        const ctx = canvas.getContext("2d");
        if (ctx) { const data = new Uint8Array(analyser.frequencyBinCount); analyser.getByteFrequencyData(data); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#101a15"; ctx.fillRect(0, 0, canvas.width, canvas.height); const width = canvas.width / 48; data.slice(0, 48).forEach((value, index) => { const height = (value / 255) * canvas.height; const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0); gradient.addColorStop(0, "#28ef83"); gradient.addColorStop(1, "#a17cff"); ctx.fillStyle = gradient; ctx.fillRect(index * width, canvas.height - height, width - 2, height); }); setFrequency(Math.round((data[3] / 255) * 220 + 110)); }
      }
      frame = requestAnimationFrame(draw);
    };
    if (running) frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const toggleMic = async () => {
    if (running) { audioRef.current?.stream.getTracks().forEach((track) => track.stop()); setRunning(false); return; }
    try { const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); const context = new AudioContext(); const analyser = context.createAnalyser(); analyser.fftSize = 1024; context.createMediaStreamSource(stream).connect(analyser); audioRef.current = { context, analyser, stream }; setRunning(true); } catch { setRunning(false); }
  };

  const playChord = () => { const context = new AudioContext(); const now = context.currentTime; chords[selectedChord].forEach((value) => { const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.type = "sine"; oscillator.frequency.value = value; gain.gain.setValueAtTime(0.0001, now); gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04); gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); oscillator.connect(gain).connect(context.destination); oscillator.start(now); oscillator.stop(now + 1.9); }); };

  const addAnalysis = () => { const id = Date.now(); setQueue((items) => [...items, { label: "Análise de loudness · sessão atual", state: "processando", progress: 12 }]); window.setTimeout(() => setQueue((items) => items.map((item) => item.label.includes("sessão") ? { ...item, state: "concluído", progress: 100 } : item)), 900); void id; };

  return <section className="audio-lab panel"><div className="panel-heading"><div><span className="panel-kicker">AUDIO LAB · WEB AUDIO</span><h2>Ferramentas que respondem ao seu som</h2></div><button className="secondary-button" onClick={toggleMic}>{running ? <><Square size={14} /> Parar escuta</> : <><AudioLines size={14} /> Ativar microfone</>}</button></div><div className="audio-lab-grid"><div className="lab-scope"><div className="lab-scope-head"><span><Activity size={15} /> ESPECTRO EM TEMPO REAL</span><b>{running ? `${frequency} Hz` : "Aguardando entrada"}</b></div><canvas ref={canvasRef} width={700} height={180} /><div className="lab-scope-foot"><span>20 Hz</span><span>−14 LUFS alvo</span><span>20 kHz</span></div></div><div className="lab-chords"><span className="panel-kicker">HARMONIA RÁPIDA</span><h3>Toque uma ideia</h3><div className="chord-grid">{Object.keys(chords).map((chord) => <button className={selectedChord === chord ? "selected" : ""} key={chord} onClick={() => setSelectedChord(chord)}>{chord}</button>)}</div><button className="primary-button chord-play" onClick={playChord}><Play size={14} /> Ouvir {selectedChord}</button></div></div><div className="analysis-queue"><div><span className="panel-kicker">PROCESSOS EM SEGUNDO PLANO</span><b>Fila de análise</b></div><button className="text-button" onClick={addAnalysis}><WandSparkles size={14} /> Nova análise</button>{queue.length === 0 ? <span className="queue-empty">Nenhuma tarefa pendente. A interface continua livre enquanto o Duck trabalha.</span> : queue.map((item, index) => <div className="queue-item" key={`${item.label}-${index}`}>{item.state === "concluído" ? <CheckCircle2 size={16} className="queue-ok" /> : <Loader2 size={16} className="queue-spin" />}<span>{item.label}</span><small>{item.state === "concluído" ? "Concluído" : `${item.progress}%`}</small></div>)}</div></section>;
}
