import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene, type CrisisImpact, type GameHandle } from "@/game/scene";
import type { CrisisCard } from "@/game/types";
import { Crosshair, MapPin } from "lucide-react";

interface GlobeCanvasProps {
  activeCrisisId: string | null;
  activeCrisis?: CrisisCard;
  impacts: CrisisImpact[];
  onSceneReady?: (handle: GameHandle) => void;
}

export default function GlobeCanvas({ activeCrisisId, activeCrisis, impacts, onSceneReady }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedRef = useRef(false);
  const handleRef = useRef<GameHandle | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || startedRef.current) return;
    startedRef.current = true;

    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      adaptToDeviceRatio: true,
    });

    createGameScene(engine, canvas).then((handle) => {
      handleRef.current = handle;
      handle.updateImpacts(impacts);
      if (onSceneReady) onSceneReady(handle);
      engine.runRenderLoop(() => handle.scene.render());
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
    <div className="relative w-full h-full min-h-[420px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-sky-900/40">
      <canvas ref={canvasRef} className="w-full h-full block outline-none cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 max-w-[48%] pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/30 text-[11px] text-sky-300 font-mono flex items-center gap-2 truncate">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="truncate">TERRA REAL · BLUE MARBLE / NASA</span>
      </div>
      <div className="absolute top-14 right-4 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-emerald-500/30 text-[11px] text-emerald-300 font-mono">
        Verde = recuperação · Vermelho = risco agravado
      </div>
      {activeCrisis && activeCrisisId === activeCrisis.id && (
        <div
          key={activeCrisis.id}
          className="absolute left-1/2 top-[22%] z-10 w-[min(86%,330px)] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none"
        >
          <div className="relative rounded-xl border border-cyan-400/50 bg-slate-950/90 px-4 py-3 shadow-[0_0_28px_rgba(34,211,238,0.18)] backdrop-blur-md">
            <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b border-r border-cyan-400/50 bg-slate-950/95" />
            <div className="relative flex items-start gap-3">
              <div className="mt-0.5 rounded-lg border border-cyan-400/30 bg-cyan-400/10 p-2 text-cyan-300">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-cyan-300">
                  <Crosshair className="h-3 w-3" /> Foco geográfico
                </div>
                <h3 className="truncate text-sm font-bold text-white">{activeCrisis.location}</h3>
                <p className="mt-0.5 text-[11px] font-medium text-amber-300">{activeCrisis.name}</p>
                <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-300">
                  {activeCrisis.scientificDescription}
                </p>
                <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-slate-500">
                  <span>LAT {activeCrisis.coordinates.lat.toFixed(2)}°</span>
                  <span>·</span>
                  <span>LNG {activeCrisis.coordinates.lng.toFixed(2)}°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-4 right-4 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/20 text-[11px] text-slate-400 font-mono">
        Arraste para girar · Scroll para zoom
      </div>
    </div>
  );
}
