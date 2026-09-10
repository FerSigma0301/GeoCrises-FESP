import { useEffect, useRef } from "react";
import { Engine } from "@babylonjs/core/Engines/engine";
import { createGameScene, type GameHandle } from "@/game/scene";

interface GlobeCanvasProps {
  activeCrisisId: string | null;
  onSceneReady?: (handle: GameHandle) => void;
}

export default function GlobeCanvas({ activeCrisisId, onSceneReady }: GlobeCanvasProps) {
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
      if (onSceneReady) onSceneReady(handle);
      engine.runRenderLoop(() => {
        handle.scene.render();
      });
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
    if (activeCrisisId && handleRef.current) {
      handleRef.current.focusCrisis(activeCrisisId);
    }
  }, [activeCrisisId]);

  return (
    <div className="relative w-full h-full min-h-[360px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-sky-900/40">
      <canvas
        ref={canvasRef}
        className="w-full h-full block outline-none cursor-grab active:cursor-grabbing"
      />
      {/* Tactical HUD Overlay for Globe */}
      <div className="absolute top-4 left-4 pointer-events-none bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/30 text-xs text-sky-300 font-mono flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        MONITORAMENTO GLOBAL ORBITAL 3D
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-500/20 text-[11px] text-slate-400 font-mono">
        Arraste para girar | Scroll para zoom
      </div>
    </div>
  );
}
