import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene, type CrisisImpact, type GameHandle } from "@/game/scene";

interface GlobeCanvasProps {
  activeCrisisId: string | null;
  impacts: CrisisImpact[];
  onSceneReady?: (handle: GameHandle) => void;
}

export default function GlobeCanvas({ activeCrisisId, impacts, onSceneReady }: GlobeCanvasProps) {
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
      <div className="absolute bottom-4 right-4 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/20 text-[11px] text-slate-400 font-mono">
        Arraste para girar · Scroll para zoom
      </div>
    </div>
  );
}
