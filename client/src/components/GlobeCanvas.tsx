import { useEffect, useRef, useState } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene, type CrisisImpact, type GameHandle } from "@/game/scene";
import { Satellite } from "lucide-react";

interface GlobeCanvasProps {
  activeCrisisId: string | null;
  impacts: CrisisImpact[];
  onSceneReady?: (handle: GameHandle) => void;
}

export default function GlobeCanvas({ activeCrisisId, impacts, onSceneReady }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const handleRef = useRef<GameHandle | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || startedRef.current) return;
    startedRef.current = true;

    let engine: Engine;
    try {
      engine = new Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        adaptToDeviceRatio: true,
      });
    } catch {
      setWebglUnavailable(true);
      startedRef.current = false;
      return;
    }

    createGameScene(engine, canvas).then((handle) => {
      handleRef.current = handle;
      handle.updateImpacts(impacts);
      if (onSceneReady) onSceneReady(handle);
      engine.runRenderLoop(() => handle.scene.render());
    }).catch(() => {
      setWebglUnavailable(true);
      engine.dispose();
      startedRef.current = false;
    });

    const onResize = () => engine.resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      handleRef.current?.dispose();
      engine.dispose();
      startedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (activeCrisisId && handleRef.current) handleRef.current.focusCrisis(activeCrisisId);
  }, [activeCrisisId]);

  useEffect(() => {
    handleRef.current?.updateImpacts(impacts);
  }, [impacts]);

  return (
    <div className="relative w-full h-full min-h-[420px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-sky-900/40 scanline holo-breathe">
      <canvas ref={canvasRef} className="w-full h-full block outline-none cursor-grab active:cursor-grabbing" />
      {webglUnavailable && <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/90 p-8 text-center"><div className="max-w-xs"><div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-2xl">◉</div><p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-300">Holograma em modo seguro</p><p className="mt-2 text-xs leading-relaxed text-slate-400">O ambiente atual não disponibilizou WebGL. As crises continuam jogáveis e os marcadores geográficos permanecem no painel.</p></div></div>}
      <div className="holo-sweep pointer-events-none absolute inset-x-0 top-0 z-10" />
      <div className="pointer-events-none absolute inset-5 z-10 rounded-full border border-cyan-300/10" />
      <div className="absolute top-4 left-4 max-w-[52%] pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-sky-500/30 text-[10px] text-sky-300 font-mono flex items-center gap-2 truncate shadow-lg shadow-sky-950/30">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="truncate">TERRA REAL · BLUE MARBLE / NASA</span>
      </div>
      <div className="absolute top-4 right-4 pointer-events-none rounded-xl border border-slate-700/70 bg-slate-950/75 px-3 py-2 text-[10px] font-mono text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-cyan-300"><Satellite className="h-3 w-3" /> TELEMETRIA AO VIVO</div>
        <div className="mt-1 flex items-center gap-2"><span className="text-emerald-300">● recuperação</span><span className="text-rose-300">● risco</span></div>
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/20 text-[11px] text-slate-400 font-mono">
        Arraste para girar · Scroll para zoom
      </div>
    </div>
  );
}
