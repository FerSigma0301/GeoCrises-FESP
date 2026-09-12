import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3, Color3, Color4 } from "@babylonjs/core/Maths/math";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { CRISES_DATA } from "./crisesData";

export interface CrisisImpact {
  crisisId: string;
  balance: number;
  label: string;
}

export interface GameHandle {
  scene: Scene;
  focusCrisis: (crisisId: string) => void;
  pulseCrisis: (crisisId: string) => void;
  updateImpacts: (impacts: CrisisImpact[]) => void;
  dispose: () => void;
}

const EARTH_TEXTURE = "/manus-storage/earth_blue_marble_nasa_3368a8fe.jpg";

const COLOR_VERTEX_SHADER = `
  precision highp float;
  attribute vec3 position;
  uniform mat4 world;
  uniform mat4 view;
  uniform mat4 projection;
  void main(void) {
    gl_Position = projection * view * world * vec4(position, 1.0);
  }
`;

const COLOR_FRAGMENT_SHADER = `
  precision highp float;
  uniform vec3 color;
  uniform float alpha;
  void main(void) {
    gl_FragColor = vec4(color, alpha);
  }
`;

function createColorMaterial(name: string, scene: Scene, color: Color3, alpha = 1) {
  const material = new ShaderMaterial(name, scene, {
    vertexSource: COLOR_VERTEX_SHADER,
    fragmentSource: COLOR_FRAGMENT_SHADER,
  }, {
    attributes: ["position"],
    uniforms: ["world", "view", "projection", "color", "alpha"],
  });
  material.setColor3("color", color);
  material.setFloat("alpha", alpha);
  material.alpha = alpha;
  return material;
}

function latLngToPosition(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export async function createGameScene(engine: Engine, canvas: HTMLCanvasElement): Promise<GameHandle> {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.008, 0.018, 0.045, 1);

  const camera = new ArcRotateCamera("EarthCamera", -Math.PI / 1.72, Math.PI / 2.35, 10.5, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 6.8;
  camera.upperRadiusLimit = 16;
  camera.wheelPrecision = 38;
  camera.panningSensibility = 0;

  let cameraGoal: { alpha: number; beta: number; radius: number } | null = null;

  const shortestAngleDelta = (from: number, to: number) => {
    let delta = (to - from) % (Math.PI * 2);
    if (delta > Math.PI) delta -= Math.PI * 2;
    if (delta < -Math.PI) delta += Math.PI * 2;
    return delta;
  };

  const hemi = new HemisphericLight("earthAmbient", new Vector3(0, 1, 0), scene);
  hemi.intensity = 0.52;
  hemi.groundColor = new Color3(0.01, 0.03, 0.08);
  const sun = new DirectionalLight("sunLight", new Vector3(-0.6, -0.25, -1), scene);
  sun.intensity = 2.1;
  sun.diffuse = new Color3(1, 0.96, 0.88);

  // Photorealistic equirectangular NASA Blue Marble surface.
  const earth = MeshBuilder.CreateSphere("EarthBlueMarble", { diameter: 6.2, segments: 64 }, scene);
  const earthTexture = new Texture(EARTH_TEXTURE, scene, true, false);
  const earthMat = new ShaderMaterial("EarthSatelliteShader", scene, {
    vertexSource: `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 world;
      uniform mat4 view;
      uniform mat4 projection;
      varying vec2 vUV;
      void main(void) {
        vUV = uv;
        gl_Position = projection * view * world * vec4(position, 1.0);
      }
    `,
    fragmentSource: `
      precision highp float;
      varying vec2 vUV;
      uniform sampler2D earthSampler;
      void main(void) {
        vec4 color = texture2D(earthSampler, vUV);
        gl_FragColor = vec4(color.rgb * 1.08, 1.0);
      }
    `,
  }, {
    attributes: ["position", "uv"],
    uniforms: ["world", "view", "projection"],
    samplers: ["earthSampler"],
  });
  earthMat.setTexture("earthSampler", earthTexture);
  earth.material = earthMat;

  // Thin blue atmosphere shell.
  const atmosphere = MeshBuilder.CreateSphere("EarthAtmosphere", { diameter: 6.42, segments: 48 }, scene);
  const atmosphereMat = createColorMaterial("AtmosphereMaterial", scene, new Color3(0.04, 0.16, 0.42), 0.12);
  atmosphereMat.backFaceCulling = false;
  atmosphere.material = atmosphereMat;

  // Holographic tactical layer: a subtle wireframe and latitude bands make the
  // satellite globe read as an active command-room projection.
  const holoSphere = MeshBuilder.CreateSphere("EarthHologramGrid", { diameter: 6.34, segments: 32 }, scene);
  const holoMaterial = createColorMaterial("EarthHologramMaterial", scene, new Color3(0.08, 0.72, 1), 0.11);
  holoMaterial.backFaceCulling = false;
  holoMaterial.wireframe = true;
  holoSphere.material = holoMaterial;
  const holoLatitudeRings: Mesh[] = [];
  [-0.92, -0.46, 0, 0.46, 0.92].forEach((y, index) => {
    const radius = Math.sqrt(Math.max(0.08, 3.12 * 3.12 - (y * 3.12) * (y * 3.12)));
    const band = MeshBuilder.CreateTorus(`EarthHoloLatitude_${index}`, { diameter: radius * 2, thickness: 0.012, tessellation: 80 }, scene);
    band.parent = earth;
    band.position.y = y * 3.12;
    band.rotation.x = Math.PI / 2;
    const bandMaterial = createColorMaterial(`EarthHoloLatitudeMaterial_${index}`, scene, new Color3(0.12, 0.8, 1), 0.14);
    band.material = bandMaterial;
    holoLatitudeRings.push(band);
  });

  // Back orbital ring makes the Earth read as a tactical simulation without changing the planet texture.
  const ring = MeshBuilder.CreateTorus("OrbitRing", { diameter: 7.5, thickness: 0.018, tessellation: 96 }, scene);
  const ringMat = createColorMaterial("OrbitRingMaterial", scene, new Color3(0.08, 0.55, 1), 0.38);
  ring.material = ringMat;
  ring.rotation.x = Math.PI / 3;
  ring.rotation.z = 0.16;

  const markerMeshes = new Map<string, Mesh>();
  const impactRings = new Map<string, Mesh>();
  const markerMaterials = new Map<string, ShaderMaterial>();
  const crisisMarkers = new Map<string, { lat: number; lng: number }>();
  const markerRadius = 3.16;

  CRISES_DATA.forEach((crisis) => {
    const position = latLngToPosition(crisis.coordinates.lat, crisis.coordinates.lng, markerRadius);
    const marker = MeshBuilder.CreateCylinder(`crisisBeacon_${crisis.id}`, {
      height: 0.52, diameterTop: 0.22, diameterBottom: 0.035, tessellation: 16,
    }, scene);
    marker.parent = earth;
    marker.position = position;
    marker.lookAt(Vector3.Zero());
    marker.rotate(new Vector3(1, 0, 0), -Math.PI / 2);

    const material = createColorMaterial(`crisisBeaconMaterial_${crisis.id}`, scene, new Color3(1, 0.33, 0.08));
    marker.material = material;

    const ringMesh = MeshBuilder.CreateTorus(`impactRing_${crisis.id}`, { diameter: 0.52, thickness: 0.028, tessellation: 32 }, scene);
    ringMesh.parent = earth;
    ringMesh.position = position.scale(1.008);
    ringMesh.lookAt(Vector3.Zero());
    const ringMaterial = createColorMaterial(`impactRingMaterial_${crisis.id}`, scene, new Color3(1, 0.5, 0.08), 0.8);
    ringMesh.material = ringMaterial;

    markerMeshes.set(crisis.id, marker);
    impactRings.set(crisis.id, ringMesh);
    markerMaterials.set(crisis.id, material);
    crisisMarkers.set(crisis.id, { lat: crisis.coordinates.lat, lng: crisis.coordinates.lng });
  });

  let autoRotate = true;
  let pulseIndex = 0;
  scene.onBeforeRenderObservable.add(() => {
    if (cameraGoal) {
      const deltaTime = scene.getEngine().getDeltaTime();
      const smoothing = 1 - Math.exp(-deltaTime / 220);
      camera.alpha += shortestAngleDelta(camera.alpha, cameraGoal.alpha) * smoothing;
      camera.beta += (cameraGoal.beta - camera.beta) * smoothing;
      camera.radius += (cameraGoal.radius - camera.radius) * smoothing;

      if (
        Math.abs(shortestAngleDelta(camera.alpha, cameraGoal.alpha)) < 0.001 &&
        Math.abs(camera.beta - cameraGoal.beta) < 0.001 &&
        Math.abs(camera.radius - cameraGoal.radius) < 0.01
      ) {
        camera.alpha = cameraGoal.alpha;
        camera.beta = cameraGoal.beta;
        camera.radius = cameraGoal.radius;
        cameraGoal = null;
      }
    }
    if (autoRotate) {
      earth.rotation.y += 0.0008;
      atmosphere.rotation.y += 0.001;
      holoSphere.rotation.y -= 0.00045;
      holoSphere.rotation.x = Math.sin(performance.now() / 4200) * 0.025;
      ring.rotation.z += 0.0007;
    }
    const t = performance.now() / 420;
    const holoPulse = 1 + Math.sin(t * 0.7) * 0.018;
    holoSphere.scaling.set(holoPulse, holoPulse, holoPulse);
    holoLatitudeRings.forEach((band, index) => {
      band.scaling.set(1 + Math.sin(t * 0.8 + index) * 0.012, 1 + Math.sin(t * 0.8 + index) * 0.012, 1 + Math.sin(t * 0.8 + index) * 0.012);
    });
    impactRings.forEach((impactRing) => {
      const pulse = 1 + Math.sin(t + pulseIndex) * 0.12;
      impactRing.scaling.set(pulse, pulse, pulse);
      pulseIndex += 1;
    });
    pulseIndex = 0;
  });

  const focusCrisis = (crisisId: string) => {
    const target = crisisMarkers.get(crisisId);
    if (!target) return;
    autoRotate = false;
    const targetPosition = latLngToPosition(target.lat, target.lng, 1).normalize();
    const targetAlpha = Math.atan2(targetPosition.z, targetPosition.x);
    const targetBeta = Math.acos(Math.max(-1, Math.min(1, targetPosition.y)));
    cameraGoal = {
      alpha: targetAlpha,
      beta: Math.max(0.26, Math.min(Math.PI - 0.26, targetBeta)),
      radius: 8.5,
    };
    pulseCrisis(crisisId);
  };

  const pulseCrisis = (crisisId: string) => {
    const marker = markerMeshes.get(crisisId);
    if (!marker) return;
    marker.scaling.set(2.3, 2.3, 2.3);
    setTimeout(() => marker.scaling.set(1, 1, 1), 480);
  };

  const updateImpacts = (impacts: CrisisImpact[]) => {
    impacts.forEach((impact) => {
      const material = markerMaterials.get(impact.crisisId);
      const ringMesh = impactRings.get(impact.crisisId);
      if (!material || !ringMesh) return;
      const positive = impact.balance >= 0;
      material.setColor3("color", positive ? new Color3(0.1, 1, 0.4) : new Color3(1, 0.16, 0.08));
      const ringMaterial = ringMesh.material as ShaderMaterial;
      ringMaterial.setColor3("color", positive ? new Color3(0.1, 1, 0.4) : new Color3(1, 0.16, 0.08));
      ringMesh.scaling.set(positive ? 1.45 : 1.15, positive ? 1.45 : 1.15, positive ? 1.45 : 1.15);
    });
  };

  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type === 1) {
      autoRotate = false;
      cameraGoal = null;
    }
    if (pointerInfo.type === 2) setTimeout(() => { autoRotate = true; }, 2500);
  });

  return {
    scene,
    focusCrisis,
    pulseCrisis,
    updateImpacts,
    dispose: () => scene.dispose(),
  };
}
