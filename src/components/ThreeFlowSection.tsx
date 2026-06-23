import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, ContactShadows, Environment, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ClipboardList, DraftingCompass, ServerCrash, BarChart4 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDemandRendering } from '../hooks/useDemandRendering';

// Set up GSAP plug
gsap.registerPlugin(ScrollTrigger);

// Coordinates mapping for our 4 nodes along the pipeline corridor
const nodeCoordinates = [
  new THREE.Vector3(2.5, 0.15, 4),    // Node 1: Assess - Shifted Right
  new THREE.Vector3(0.5, -0.25, 0),    // Node 2: Design
  new THREE.Vector3(2.25, 0.2, -4),    // Node 3: Deliver
  new THREE.Vector3(0.35, -0.15, -8)   // Node 4: Measure
];

// Connection Spline line
const connectionCurve = new THREE.CatmullRomCurve3(nodeCoordinates);

// Camera path geometry (S-curve flying through spline nodes, offset to the right for immersive layout)
const cameraCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(1.0, 0.45, 9),      // Start position
  new THREE.Vector3(1.25, 0.1, 5.5),    // Approaching Node 1
  new THREE.Vector3(0.65, -0.1, 1.5),   // Approaching Node 2
  new THREE.Vector3(1.25, 0.1, -2.5),   // Approaching Node 3
  new THREE.Vector3(0.75, 0, -6.5),     // Approaching Node 4
  new THREE.Vector3(1.0, 0, -9.5)       // Past Node 4
]);

// --- HIGH PERFORMANCE PRE-SAMPLING ENGINE ---
// To avoid expensive spline calculations inside useFrame (60fps loop for 30 particles + camera),
// we pre-sample both spline paths into lookup tables. This reduces spline calculations to O(1) lookups.
const SAMPLE_COUNT = 500;
const curveSamplesPoints: THREE.Vector3[] = [];
const curveSamplesTangents: THREE.Vector3[] = [];

const CAMERA_SAMPLE_COUNT = 500;
const cameraSamplesPoints: THREE.Vector3[] = [];

for (let i = 0; i <= SAMPLE_COUNT; i++) {
  const t = i / SAMPLE_COUNT;
  curveSamplesPoints.push(connectionCurve.getPointAt(t));
  curveSamplesTangents.push(connectionCurve.getTangentAt(t));
}

for (let i = 0; i <= CAMERA_SAMPLE_COUNT; i++) {
  const t = i / CAMERA_SAMPLE_COUNT;
  cameraSamplesPoints.push(cameraCurve.getPointAt(t));
}

// Garbage-Collection free scratch variables to completely bypass runtime memory allocation overhead
const scratchParticlePt = new THREE.Vector3();
const scratchParticleTangent = new THREE.Vector3();
const scratchParticleLookTarget = new THREE.Vector3();

const scratchCamPt = new THREE.Vector3();
const scratchLookTarget = new THREE.Vector3();

interface ThreeFlowSectionProps {
  phases: Array<{
    id: string;
    step: string;
    title: string;
    description: string;
    activities: string[];
    icon: React.ReactNode;
  }>;
}

// Light standard dust constellation field component (Buffer-backed single draw-call)
function SpaceDust({ isVisible }: { isVisible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 80;

  const [positions, opacities] = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const op = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 26;
      op[i] = Math.random() * 0.45 + 0.15;
    }
    return [pos, op];
  }, []);

  useFrame((state, delta) => {
    if (!isVisible) return;
    const cappedDelta = Math.min(delta, 0.1);
    if (pointsRef.current) {
      pointsRef.current.rotation.y += cappedDelta * 0.015;
      pointsRef.current.rotation.x += cappedDelta * 0.006;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C5A059"
        size={0.045}
        sizeAttenuation={true}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

// Beautiful glowing links connecting the pipeline nodes in 3D space
function ConnectionLine() {
  const points = useMemo(() => {
    return connectionCurve.getPoints(100);
  }, []);

  return (
    <group>
      {/* Outer glowing pipeline link vector */}
      <line>
        <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
        <lineBasicMaterial attach="material" color="#C5A059" transparent opacity={0.12} linewidth={1.5} />
      </line>
      {/* Inner sharp flow core link */}
      <line>
        <bufferGeometry attach="geometry" onUpdate={(self) => self.setFromPoints(points)} />
        <lineBasicMaterial attach="material" color="#C5A059" transparent opacity={0.35} linewidth={1} />
      </line>
    </group>
  );
}

// Flowing pipeline neon pulses using high-performance instanced rendering with pre-sampled lookups
function FlowingParticles({ curve, speedFactor = 1.0, isVisible }: { curve: THREE.CatmullRomCurve3; speedFactor: number; isVisible: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 20; // Reduced density for performance
  const offsets = useRef(Array.from({ length: particleCount }, (_, i) => i / particleCount));
  const speeds = useRef(Array.from({ length: particleCount }, () => 0.8 + Math.random() * 0.4));
  const scales = useRef(Array.from({ length: particleCount }, () => 0.4 + Math.random() * 1.8));
  
  const tempObject = useRef(new THREE.Object3D());
  const elapsedRef = useRef(0);

  useFrame((state, delta) => {
    if (!isVisible || !meshRef.current) return;
    
    const cappedDelta = Math.min(delta, 0.1);
    elapsedRef.current += cappedDelta;

    for (let i = 0; i < particleCount; i++) {
      // Increment progress along spline with individual speeds
      offsets.current[i] += cappedDelta * 0.05 * speedFactor * speeds.current[i];
      if (offsets.current[i] > 1) {
        offsets.current[i] -= 1;
      }
      
      const progress = offsets.current[i];
      const rawIdx = progress * SAMPLE_COUNT;
      const idx = Math.floor(rawIdx);
      const nextIdx = Math.min(SAMPLE_COUNT, idx + 1);
      const alpha = rawIdx - idx;
      
      // Interpolate with zero memory allocation
      scratchParticlePt.lerpVectors(curveSamplesPoints[idx], curveSamplesPoints[nextIdx], alpha);
      scratchParticleTangent.lerpVectors(curveSamplesTangents[idx], curveSamplesTangents[nextIdx], alpha);
      
      tempObject.current.position.copy(scratchParticlePt);
      scratchParticleLookTarget.copy(scratchParticlePt).add(scratchParticleTangent);
      tempObject.current.lookAt(scratchParticleLookTarget);
      
      // Dynamic stretching based on speed (uses our local custom clock accumulator to prevent deprecation warning)
      const stretch = 1.8 + Math.sin(elapsedRef.current + i) * 0.5;
      tempObject.current.scale.set(0.55 * scales.current[i], 0.55 * scales.current[i], stretch * scales.current[i]);
      tempObject.current.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.current.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const streakGeo = useMemo(() => new THREE.BoxGeometry(0.012, 0.012, 0.15), []);

  return (
    <instancedMesh ref={meshRef} args={[streakGeo, null as any, particleCount]}>
      <meshStandardMaterial 
        color="#C5A059" 
        emissive="#C5A059" 
        emissiveIntensity={3} 
        transparent 
        opacity={0.8} 
        metalness={1}
        roughness={0}
      />
    </instancedMesh>
  );
}

// Single UI indicator coordinate clipping node overlay with transform layouts accelerated
function NodeHtml({ index, position, icon, activeStep }: { index: number; position: THREE.Vector3; icon: React.ReactNode; activeStep: number }) {
  const isActive = activeStep === index;
  const isBehind = index < activeStep;
  
  // Completely unmount the projected DOM element when it's behind the active step 
  // to avoid heavy CPU-to-DOM projection calculations on every frame.
  if (isBehind) {
    return null;
  }
  
  const opacityVal = isActive ? 1.0 : 0.4;
  const scaleVal = isActive ? 1.3 : 0.85;

  return (
    <Html 
      position={position}
      center
      distanceFactor={6.2}
      className={`pointer-events-none select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'z-30' : 'z-20'}`}
      style={{
        opacity: opacityVal,
        transform: `scale(${scaleVal}) translateZ(0)`,
        pointerEvents: 'none',
        display: 'flex'
      }}
    >
      <div 
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border relative ${
          isActive 
            ? 'bg-[#0A192F] border-[#C5A059] text-white shadow-[0_15px_45px_rgba(197,160,89,0.3)]' 
            : 'bg-[#FAFAFA]/95 border-slate-200/60 text-[#C5A059] shadow-md hover:bg-[#FAFAFA]'
        }`}
      >
        {isActive && (
          <div className="absolute inset-0 rounded-full animate-ping bg-[#C5A059]/20" />
        )}
        <div className="relative z-10">
          {icon}
        </div>
      </div>
    </Html>
  );
}

// Custom hook to trigger rendering on interaction
function PerformanceOptimizationHook({ isVisible }: { isVisible: boolean }) {
  useDemandRendering(isVisible);
  return null;
}

// --- BESPOKE 4-PHASE CONCEPTUAL GEOMETRIC NODES ---
// Precision engineered subtle 3D representations matching the core consulting process:
// 1. Assess: Precision Scan Alignment Targeting Grid
// 2. Strategize: Structural Geometric Pyramid/Octahedron Blueprint Framework
// 3. Align & Execute: Interlocking Double-Helix / Concentric Synergistic Loops
// 4. Optimize: Ascending 3D Growth Analytics Column Pillars

interface NodeSubProps {
  isActive: boolean;
  coreRef: (el: THREE.Mesh | null) => void;
}

function AssessNode({ isActive, coreRef }: NodeSubProps) {
  const goldMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#C5A059"
      emissive="#C5A059"
      emissiveIntensity={0.25}
      roughness={0.15}
      metalness={0.9}
    />
  ), []);

  const muteMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#B3B09B"
      roughness={0.3}
      metalness={0.1}
      transparent
      opacity={0.3}
    />
  ), []);

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Precision Concentric Scan Rings */}
      <mesh>
        <torusGeometry args={[0.42, 0.005, 8, 32]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>
      <mesh>
        <torusGeometry args={[0.26, 0.003, 8, 24]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>
      <mesh>
        <torusGeometry args={[0.12, 0.002, 8, 16]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>

      {/* Audit/Diagnostic Fine crosshair bars */}
      <mesh rotation={[0, 0, 0]}>
        <boxGeometry args={[0.006, 0.65, 0.006]} />
        <meshBasicMaterial color={isActive ? "#C5A059" : "#B3B09B"} transparent opacity={isActive ? 0.5 : 0.15} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.006, 0.65, 0.006]} />
        <meshBasicMaterial color={isActive ? "#C5A059" : "#B3B09B"} transparent opacity={isActive ? 0.5 : 0.15} />
      </mesh>

      {/* Concentrated Auditing Nucleus */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial
          color={isActive ? "#C5A059" : "#808080"}
          emissive={isActive ? "#C5A059" : "#000000"}
          emissiveIntensity={isActive ? 2.5 : 0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function StrategizeNode({ isActive, coreRef }: NodeSubProps) {
  const lineMaterial = useMemo(() => (
    <meshBasicMaterial
      color={isActive ? "#C5A059" : "#B3B09B"}
      transparent
      opacity={isActive ? 0.45 : 0.15}
      wireframe
    />
  ), [isActive]);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Structural octahedron framework modeling "strategic blueprints" */}
      <mesh>
        <octahedronGeometry args={[0.42, 0]} />
        {lineMaterial}
      </mesh>

      {/* Stabilizing Horizontal Horizon Disk Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.004, 8, 32]} />
        <meshStandardMaterial
          color={isActive ? "#C5A059" : "#B3B09B"}
          transparent
          opacity={isActive ? 0.4 : 0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Central Solid Hexagonal core of crystalline strategy */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial
          color={isActive ? "#C5A059" : "#808080"}
          emissive={isActive ? "#C5A059" : "#000000"}
          emissiveIntensity={isActive ? 2.0 : 0}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

function AlignNode({ isActive, coreRef }: NodeSubProps) {
  const goldMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#C5A059"
      roughness={0.15}
      metalness={0.85}
      transparent={true}
      opacity={0.85}
    />
  ), []);

  const muteMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#B3B09B"
      roughness={0.3}
      metalness={0.1}
      transparent={true}
      opacity={0.2}
    />
  ), []);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Dynamic perpendicular interlocking feedback cycles */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.015, 8, 40]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.3, 0.01, 8, 32]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>

      {/* Synchronized Core cell of seamless alignment */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color={isActive ? "#C5A059" : "#808080"}
          emissive={isActive ? "#C5A059" : "#000000"}
          emissiveIntensity={isActive ? 2.0 : 0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function OptimizeNode({ isActive, coreRef }: NodeSubProps) {
  const goldMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#C5A059"
      emissive="#C5A059"
      emissiveIntensity={0.3}
      roughness={0.15}
      metalness={0.9}
    />
  ), []);

  const muteMaterial = useMemo(() => (
    <meshStandardMaterial
      color="#B3B09B"
      roughness={0.4}
      metalness={0.1}
      transparent
      opacity={0.25}
    />
  ), []);

  return (
    <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      {/* Metric Floor Level Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <torusGeometry args={[0.35, 0.003, 8, 40]} />
        <meshBasicMaterial color={isActive ? "#C5A059" : "#B3B09B"} transparent opacity={isActive ? 0.35 : 0.1} />
      </mesh>

      {/* Analytics Escalation Columns (Growth KPI / Scale visual columns) */}
      <mesh position={[-0.14, -0.05, 0]}>
        <boxGeometry args={[0.07, 0.18, 0.07]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>

      {/* Centerpiece active peak metric column */}
      <mesh ref={coreRef} position={[0, 0.05, 0]}>
        <boxGeometry args={[0.07, 0.38, 0.07]} />
        <meshStandardMaterial
          color={isActive ? "#C5A059" : "#808080"}
          emissive={isActive ? "#C5A059" : "#000000"}
          emissiveIntensity={isActive ? 1.0 : 0}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0.14, 0.0, 0]}>
        <boxGeometry args={[0.07, 0.28, 0.07]} />
        {isActive ? goldMaterial : muteMaterial}
      </mesh>
    </group>
  );
}

// Highly optimized nodes container for all 3D nodes of AVYSTRA Network
interface NodesProps {
  activeStep: number;
  icons: React.ReactNode[];
}

function Nodes({ activeStep, icons, isVisible }: NodesProps & { isVisible: boolean }) {
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const coreRefs = useRef<(THREE.Mesh | null)[]>([]);
  const interpolationFactors = useRef([0, 0, 0, 0]);
  const rotationsY = useRef([0, 0, 0, 0]);
  const rotationsX = useRef([0, 0, 0, 0]);

  useFrame((state, delta) => {
    if (!isVisible) return;
    const cappedDelta = Math.min(delta, 0.1);

    for (let i = 0; i < 4; i++) {
        const isActive = activeStep === i;
        const target = isActive ? 1 : 0;
        
        interpolationFactors.current[i] = THREE.MathUtils.lerp(
            interpolationFactors.current[i],
            target,
            1.0 - Math.exp(-7.5 * cappedDelta)
        );
        
        const factor = interpolationFactors.current[i];
        
        const rotSpeed = 0.12 + factor * 0.22;
        rotationsY.current[i] += cappedDelta * rotSpeed;
        rotationsX.current[i] += cappedDelta * (rotSpeed * 0.45);

        if (nodeRefs.current[i]) {
            nodeRefs.current[i]!.position.copy(nodeCoordinates[i]);
            nodeRefs.current[i]!.rotation.set(rotationsX.current[i] * 0.1, rotationsY.current[i] * 0.2, 0);
            
            // Highly elegant scale with beautiful reactive active-step presence pulsing
            const scale = (0.55 + factor * 0.35);
            nodeRefs.current[i]!.scale.setScalar(scale);

            // Animate internal core rotation differently
            if (coreRefs.current[i]) {
              coreRefs.current[i]!.rotation.y += cappedDelta * (0.8 + factor * 1.8);
              coreRefs.current[i]!.rotation.z -= cappedDelta * (0.4 + factor * 1.0);
            }
        }
    }
  });

  return (
    <group>
      {nodeCoordinates.map((pos, i) => (
        <group 
          key={i} 
          ref={(el) => (nodeRefs.current[i] = el)}
        >
          {i === 0 && <AssessNode isActive={activeStep === i} coreRef={(el) => { coreRefs.current[0] = el; }} />}
          {i === 1 && <StrategizeNode isActive={activeStep === i} coreRef={(el) => { coreRefs.current[1] = el; }} />}
          {i === 2 && <AlignNode isActive={activeStep === i} coreRef={(el) => { coreRefs.current[2] = el; }} />}
          {i === 3 && <OptimizeNode isActive={activeStep === i} coreRef={(el) => { coreRefs.current[3] = el; }} />}
        </group>
      ))}
      {nodeCoordinates.map((position, index) => (
        <NodeHtml
          key={index}
          index={index}
          position={position}
          icon={icons[index]}
          activeStep={activeStep}
        />
      ))}
    </group>
  );
}


// Integrated dolly with high-performance desktop fluid cinematic tracking with pre-sampled curve lookups
// Expanded with mouse-parallax for supreme immersion and magnetic narrative snapping
function CameraController({ progressRef, isVisible }: { progressRef: React.MutableRefObject<number>; isVisible: boolean }) {
  const { camera, mouse } = useThree();
  const currentProgress = useRef(0);
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const parallaxRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!isVisible) return;
    const cappedDelta = Math.min(delta, 0.1);

    // High-precision "Plateau" mapping for 4 distinct nodes
    // maps raw scroll progress to "sticky" progress that dwells on nodes
    const raw = progressRef.current;
    
    const getStickyProgress = (val: number) => {
      if (val >= 0.96) return 1.0;
      if (val <= 0.04) return 0.0;
      
      const stations = [0.2, 0.4, 0.6, 0.8];
      const captureRange = 0.12; 
      
      for (const station of stations) {
        if (Math.abs(val - station) < captureRange) {
          // Cubic dwelling allows for a very slow movement at the center
          const t = (val - station) / captureRange;
          const dwell = Math.pow(t, 3);
          return station + dwell * captureRange * 0.9;
        }
      }
      return val;
    };

    const target = getStickyProgress(raw);

    // Damped interpolation for high-end "luxury" physical feel
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current, 
      target, 
      1.0 - Math.exp(-5.2 * cappedDelta)
    );

    const progress = currentProgress.current;

    // Fast pre-sampled camera path lookup
    const rawIdx = progress * CAMERA_SAMPLE_COUNT;
    const idx = Math.floor(rawIdx);
    const nextIdx = Math.min(CAMERA_SAMPLE_COUNT, idx + 1);
    const alpha = rawIdx - idx;

    scratchCamPt.lerpVectors(cameraSamplesPoints[idx], cameraSamplesPoints[nextIdx], alpha);
    
    // Luxury Mouse Parallax completely disabled - camera coordinates track pure scroll-driven path
    parallaxRef.current.x = 0;
    parallaxRef.current.y = 0;

    targetCamPos.copy(scratchCamPt);
    camera.position.copy(targetCamPos);

    // Get looks directions target using pre-sampled offset
    // Reducing look-ahead during dwell zones for a more centered "portrait" view of nodes
    const lookAheadFactor = THREE.MathUtils.lerp(0.08, 0.16, Math.abs(Math.sin(raw * Math.PI)));
    const lookProgress = Math.min(1.0, progress + lookAheadFactor);
    const lookRawIdx = lookProgress * CAMERA_SAMPLE_COUNT;
    const lookIdx = Math.floor(lookRawIdx);
    const lookNextIdx = Math.min(CAMERA_SAMPLE_COUNT, lookIdx + 1);
    const lookAlpha = lookRawIdx - lookIdx;

    scratchLookTarget.lerpVectors(cameraSamplesPoints[lookIdx], cameraSamplesPoints[lookNextIdx], lookAlpha);
    
    targetLookAt.copy(scratchLookTarget);
    camera.lookAt(targetLookAt);
  });

  return null;
}

export default function ThreeFlowSection({ phases }: ThreeFlowSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [dpr, setDpr] = useState(1.25);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const isReallyVisible = isVisible && tabVisible;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px 0px' }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinRef.current,
        scrub: 0.1, // Responsively linked to Lenis smooth scrolling for real-time fidelity
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          
          // Narrative sync: Thresholds aligned with the new dwell zones (approx 0.2 intervals)
          let idx = 0;
          if (self.progress > 0.72) idx = 3;
          else if (self.progress > 0.52) idx = 2; 
          else if (self.progress > 0.32) idx = 1;
          
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveStep(idx);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleTimelineClick = (idx: number) => {
    if (!containerRef.current) return;
    
    const thresholds = [0.15, 0.42, 0.62, 0.86];
    const progressTarget = thresholds[idx];
    
    // Use getBoundingClientRect().top + window.scrollY for parent-agnostic absolute position
    const rect = containerRef.current.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const totalHeight = containerRef.current.offsetHeight;
    const distanceToScroll = progressTarget * (totalHeight - window.innerHeight);
    const targetScroll = start + distanceToScroll;
    
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetScroll, {
        duration: 1.6,
        force: true
      });
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const icons = [
    <ClipboardList key="assess" className="w-5 h-5 text-[#C5A059]" />,
    <DraftingCompass key="design" className="w-5 h-5 text-[#C5A059]" />,
    <ServerCrash key="deliver" className="w-5 h-5 text-[#C5A059]" />,
    <BarChart4 key="measure" className="w-5 h-5 text-[#C5A059]" />
  ];

  return (
    <div ref={containerRef} className="relative h-[320vh] w-full z-10">
      
      {/* Pinned visual frame - Elegant Immersive Light Luxury Concept */}
      <div ref={pinRef} className="h-[100dvh] w-full relative flex items-center overflow-hidden bg-transparent transition-colors duration-700">
        {/* Subtle grid pattern to match global aesthetic depth */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `radial-gradient(#0A192F 1px, transparent 1px)`, 
            backgroundSize: '40px 40px' 
          }} 
        />
        
        {/* Immersive ambient blur bokeh spots - Optimized blur for performance */}
        <div className="absolute top-[-10%] right-[-10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-[#C5A059]/[0.06] blur-[60px] pointer-events-none z-0 transform-gpu" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-[#0A192F]/[0.02] blur-[50px] pointer-events-none z-0 transform-gpu" />
        <div className="absolute top-[25%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#C5A059]/[0.03] blur-[45px] pointer-events-none z-0 transform-gpu" />

        {/* Structural background architectural line grids */}
        {/* Intentionally removed local grid-overlay to prevent duplicate stacking with global overlay */}

        {/* Real-time Dynamic Narrative Card (Left Side - Beautiful frosted executive card style) */}
        <div className="absolute left-[5%] xl:left-[8%] top-1/2 -translate-y-1/2 w-[340px] xl:w-[380px] min-h-[360px] pointer-events-none z-20 hidden lg:block">
          <AnimatePresence mode="wait">
            {phases.map((phase, idx) => (
              idx === activeStep && (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.98 }}
                  transition={{ 
                    duration: 1.1, 
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="absolute inset-0 liquid-glass-distorted rounded-[2rem] p-9 shadow-[0_40px_80px_-25px_rgba(15,23,42,0.12)] pointer-events-auto flex flex-col justify-between"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative z-10"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A059]/10 rounded-full border border-[#C5A059]/20 mb-6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      <span className="text-[9px] text-[#8C6D37] font-mono tracking-[0.2em] font-bold uppercase">
                        PHASE {phase.step} // BLUEPRINT
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-2xl text-[#0A192F] mb-3 tracking-tight leading-tight">
                      {phase.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-light leading-relaxed mb-6 opacity-90">
                      {phase.description}
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative z-10 pt-6 mt-auto"
                  >
                    <div className="h-px w-full bg-gradient-to-r from-[#C5A059]/30 via-slate-200/40 to-transparent mb-5" />
                    <h4 className="text-[9px] font-mono text-[#C5A059] font-bold uppercase tracking-[0.15em] mb-4">
                      KEY DELIVERABLES
                    </h4>
                    <ul className="space-y-3">
                      {phase.activities.map((act, actIdx) => (
                        <motion.li
                          key={actIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.4 + actIdx * 0.08, 
                            duration: 0.4
                          }}
                          className="flex items-center gap-2.5 text-[13px] text-slate-700 font-sans group/act"
                        >
                          <div className="w-1 h-1 rounded-full bg-[#C5A059]/40 group-hover/act:bg-[#C5A059] transition-all" />
                          <span className="group-hover/act:translate-x-1 transition-transform duration-300">{act}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* 3D WebGL Canvas Layer (Full Width Immersive Integration) - cursor interactions fully disabled */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <Canvas
            gl={{ 
              antialias: false,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
              precision: "mediump"
            }}
            dpr={dpr}
            camera={{ fov: 45, near: 0.1, far: 20 }}
            frameloop="demand"
          >
            {/* R3F Performance Monitor dynamically scales DPR based on actual hardware capability */}
            <PerformanceMonitor 
              onDecline={() => setDpr(0.75)} 
              onIncline={() => setDpr(typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.25) : 1.25)} 
            />

            {/* Direct smart rendering loop manager on demand */}
            <PerformanceOptimizationHook isVisible={isReallyVisible} />

            <ambientLight intensity={1.5} />
            <pointLight position={[10, 15, 10]} intensity={1.2} color="#C5A059" />
            <spotLight position={[-15, 20, 10]} angle={0.25} penumbra={1} intensity={1.2} color="#ffffff" />
            
            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={0.1} 
              scale={20} 
              blur={2.5} 
              far={8} 
              resolution={128} // High-efficiency shadow map resolution
            />

            <pointLight position={[-8, -5, 5]} intensity={0.5} color="#C5A059" />

            <SpaceDust isVisible={isReallyVisible} />

            <ConnectionLine />

            <FlowingParticles curve={connectionCurve} speedFactor={1.35} isVisible={isReallyVisible} />

            <Nodes 
              activeStep={activeStep} 
              icons={icons} 
              isVisible={isReallyVisible} 
            />

            <CameraController progressRef={scrollProgress} isVisible={isReallyVisible} />
          </Canvas>
        </div>


        {/* Elite Visual Progress Ledger/Navigator (Right Side - Sleek Light Luxury variant) */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 z-25 hidden lg:flex flex-col items-center gap-6">
          <div className="text-[9px] font-mono tracking-widest text-[#C5A059] uppercase transform rotate-90 origin-center -translate-y-12 font-bold">
            TIMELINE NAVIGATION
          </div>
          <div className="flex flex-col gap-5 relative liquid-glass px-2.5 py-7 shadow-xl border-white/20 rounded-full">
            {/* Elegant vertical progress trace line */}
            <div className="absolute top-7 bottom-7 right-[19px] w-[1px] bg-[#C5A059]/15 pointer-events-none" />
            {phases.map((phase, idx) => {
              const itemActive = idx === activeStep;
              return (
                <button
                  key={phase.id}
                  onClick={() => handleTimelineClick(idx)}
                  className="flex items-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-full p-1 z-10"
                  aria-label={`Jump to Process Step ${phase.step}`}
                >
                  <span className={`text-[9px] font-mono transition-all duration-300 ${itemActive ? 'text-[#C5A059] font-bold' : 'text-slate-400 opacity-50 group-hover:opacity-100'}`}>
                    0{idx + 1}
                  </span>
                  <div className="relative w-2.5 h-2.5 flex items-center justify-center bg-[#FAFAFA]/20 rounded-full z-10">
                    <div className={`absolute rounded-full transition-all duration-500 ${itemActive ? 'w-2 h-2 bg-[#C5A059] ring-2 ring-[#C5A059]/20' : 'w-1 h-1 bg-slate-300 group-hover:bg-[#C5A059]'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fallback interactive horizontal overlay descriptor for tablet/tablet-landscape screens */}
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[90%] max-w-lg h-[130px] z-20 block lg:hidden pointer-events-none">
          <AnimatePresence>
            {phases.map((phase, idx) => (
              idx === activeStep && (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, y: 15, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 liquid-glass-distorted rounded-2xl p-5 shadow-xl pointer-events-auto border-l-3 border-l-[#C5A059] flex flex-col justify-center"
                >
                  <p className="text-[9px] font-mono font-bold text-[#C5A059] mb-1">
                    PHASE {phase.step} — {phase.title.toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {phase.description}
                  </p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
