import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3, Color3, Color4 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { CRISES_DATA } from "./crisesData";

export interface GameHandle {
  scene: Scene;
  focusCrisis: (crisisId: string) => void;
  pulseCrisis: (crisisId: string) => void;
  dispose: () => void;
}

export async function createGameScene(engine: Engine, canvas: HTMLCanvasElement): Promise<GameHandle> {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.02, 0.04, 0.09, 1);

  // Tactical camera
  const camera = new ArcRotateCamera("TacticalCam", -Math.PI / 1.7, Math.PI / 2.3, 11, new Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 6.5;
  camera.upperRadiusLimit = 16;
  camera.wheelPrecision = 45;

  // Lighting
  const hemiLight = new HemisphericLight("ambient", new Vector3(0, 1, 0), scene);
  hemiLight.intensity = 0.8;
  hemiLight.groundColor = new Color3(0.05, 0.09, 0.18);

  const sunLight = new DirectionalLight("sun", new Vector3(-1, -0.6, -1), scene);
  sunLight.intensity = 1.4;
  sunLight.diffuse = new Color3(0.85, 0.95, 1);

  // Earth Globe
  const globe = MeshBuilder.CreateSphere("EarthGlobe", { diameter: 6.2, segments: 64 }, scene);
  const globeMaterial = new StandardMaterial("GlobeMat", scene);

  const res = 2048;
  const dynTexture = new DynamicTexture("EarthTexture", { width: res, height: res / 2 }, scene, false);
  const ctx = dynTexture.getContext();

  // Oceans deep tactical navy gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, res / 2);
  oceanGrad.addColorStop(0, "#08162b");
  oceanGrad.addColorStop(1, "#030a16");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, res, res / 2);

  // Subtle lat/long coordinate grid
  ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
  ctx.lineWidth = 1.5;
  for (let lat = 0; lat <= res / 2; lat += (res / 2) / 18) {
    ctx.beginPath();
    ctx.moveTo(0, lat);
    ctx.lineTo(res, lat);
    ctx.stroke();
  }
  for (let lon = 0; lon <= res; lon += res / 36) {
    ctx.beginPath();
    ctx.moveTo(lon, 0);
    ctx.lineTo(lon, res / 2);
    ctx.stroke();
  }

  // Draw enhanced continent shapes
  ctx.fillStyle = "#16385c";
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;

  const toUV = (lon: number, lat: number): [number, number] => {
    return [(lon / 360 + 0.5) * res, (-lat / 180 + 0.5) * (res / 2)];
  };

  const drawContour = (coords: [number, number][]) => {
    ctx.beginPath();
    coords.forEach(([lon, lat], i) => {
      const [u, v] = toUV(lon, lat);
      if (i === 0) ctx.moveTo(u, v);
      else ctx.lineTo(u, v);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  // South America (Brazil prominent)
  drawContour([
    [-81, 8], [-77, 10], [-68, 12], [-61, 10], [-50, -1], [-35, -5],
    [-35, -9], [-39, -15], [-41, -22], [-48, -28], [-53, -33], [-58, -38],
    [-65, -45], [-68, -55], [-74, -52], [-76, -42], [-81, -5], [-81, 8]
  ]);

  // North America
  drawContour([
    [-168, 65], [-140, 70], [-100, 73], [-65, 60], [-55, 48], [-70, 42],
    [-75, 35], [-80, 25], [-82, 23], [-97, 26], [-97, 20], [-105, 23],
    [-115, 32], [-124, 48], [-130, 55], [-160, 58], [-168, 65]
  ]);

  // Africa
  drawContour([
    [-17, 32], [0, 36], [12, 37], [25, 32], [33, 28], [43, 12],
    [51, 11], [42, -5], [35, -20], [30, -34], [18, -34], [12, -18],
    [8, 4], [-15, 11], [-17, 32]
  ]);

  // Eurasia
  drawContour([
    [-9, 38], [15, 42], [30, 41], [40, 60], [60, 68], [100, 72],
    [140, 70], [170, 66], [142, 50], [130, 38], [120, 25], [108, 12],
    [80, 13], [70, 24], [55, 25], [45, 37], [30, 31], [25, 38],
    [0, 44], [-9, 38]
  ]);

  // Australia
  drawContour([
    [114, -22], [130, -13], [142, -11], [153, -28], [150, -37],
    [138, -36], [128, -32], [115, -34], [114, -22]
  ]);

  dynTexture.update();

  globeMaterial.diffuseTexture = dynTexture;
  globeMaterial.specularColor = new Color3(0.2, 0.4, 0.6);
  globeMaterial.emissiveColor = new Color3(0.05, 0.1, 0.18);
  globe.material = globeMaterial;

  // Atmosphere Glow
  const atmosphere = MeshBuilder.CreateSphere("Atmosphere", { diameter: 6.45, segments: 48 }, scene);
  const atmoMaterial = new StandardMaterial("AtmoMat", scene);
  atmoMaterial.alpha = 0.2;
  atmoMaterial.diffuseColor = new Color3(0.3, 0.7, 1);
  atmoMaterial.emissiveColor = new Color3(0.1, 0.4, 0.8);
  atmoMaterial.backFaceCulling = false;
  atmosphere.material = atmoMaterial;

  // Orbital UI rings
  const ring1 = MeshBuilder.CreateTorus("Ring1", { diameter: 7.4, thickness: 0.02, tessellation: 64 }, scene);
  const ringMat1 = new StandardMaterial("RingMat1", scene);
  ringMat1.emissiveColor = new Color3(0.2, 0.8, 1);
  ringMat1.alpha = 0.4;
  ring1.material = ringMat1;
  ring1.rotation.x = Math.PI / 3;

  // Crisis Markers
  const crisisMarkers: Map<string, { mesh: Mesh; lat: number; lng: number }> = new Map();
  const radius = 3.12;

  CRISES_DATA.forEach((crisis) => {
    const phi = (90 - crisis.coordinates.lat) * (Math.PI / 180);
    const theta = (crisis.coordinates.lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    // Beveled beacon cylinder
    const beacon = MeshBuilder.CreateCylinder(`beacon_${crisis.id}`, { height: 0.6, diameterTop: 0.25, diameterBottom: 0.05 }, scene);
    beacon.position = new Vector3(x, y, z);
    beacon.lookAt(new Vector3(0, 0, 0));
    beacon.rotate(new Vector3(1, 0, 0), -Math.PI / 2);

    const mat = new StandardMaterial(`beaconMat_${crisis.id}`, scene);
    if (crisis.category === 'flood' || crisis.category === 'sealevel') {
      mat.emissiveColor = new Color3(0.2, 0.8, 1);
    } else if (crisis.category === 'wildfire' || crisis.category === 'heatwave') {
      mat.emissiveColor = new Color3(1, 0.3, 0.1);
    } else if (crisis.category === 'drought') {
      mat.emissiveColor = new Color3(1, 0.75, 0.1);
    } else {
      mat.emissiveColor = new Color3(0.2, 0.9, 0.4);
    }
    beacon.material = mat;

    // Small pulsating halo disc
    const halo = MeshBuilder.CreateDisc(`halo_${crisis.id}`, { radius: 0.22, tessellation: 24 }, scene);
    halo.position = new Vector3(x * 1.01, y * 1.01, z * 1.01);
    halo.lookAt(new Vector3(0, 0, 0));
    const haloMat = new StandardMaterial(`haloMat_${crisis.id}`, scene);
    haloMat.emissiveColor = mat.emissiveColor;
    haloMat.alpha = 0.7;
    halo.material = haloMat;

    crisisMarkers.set(crisis.id, { mesh: beacon, lat: crisis.coordinates.lat, lng: crisis.coordinates.lng });
  });

  // Slow ambient rotation
  let autoRotate = true;
  scene.onBeforeRenderObservable.add(() => {
    if (autoRotate) {
      globe.rotation.y += 0.0012;
      atmosphere.rotation.y += 0.0015;
      ring1.rotation.z += 0.0008;
    }
  });

  // Camera focus on crisis
  const focusCrisis = (crisisId: string) => {
    const target = crisisMarkers.get(crisisId);
    if (!target) return;
    autoRotate = false;

    // Center camera on coordinate
    const targetAlpha = -((target.lng * Math.PI) / 180) - Math.PI / 2;
    const targetBeta = ((90 - target.lat) * Math.PI) / 180;

    camera.alpha = targetAlpha;
    camera.beta = Math.max(0.3, Math.min(Math.PI - 0.3, targetBeta));
    camera.radius = 8.8;

    pulseCrisis(crisisId);
  };

  const pulseCrisis = (crisisId: string) => {
    const target = crisisMarkers.get(crisisId);
    if (!target) return;
    target.mesh.scaling.set(2.4, 2.4, 2.4);
    setTimeout(() => {
      target.mesh.scaling.set(1, 1, 1);
    }, 500);
  };

  return {
    scene,
    focusCrisis,
    pulseCrisis,
    dispose: () => {
      scene.dispose();
    }
  };
}
