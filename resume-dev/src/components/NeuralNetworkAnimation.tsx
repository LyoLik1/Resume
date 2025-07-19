"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders'; //
import { GlowLayer } from '@babylonjs/core/Layers/glowLayer';
import { useTheme } from '@/contexts/ThemeContext';



const NUM_NEURONS_INITIAL = 100;
const NUM_SYNAPSES_INITIAL = 150;
const MAX_NEURONS = 600;
const MAX_SYNAPSES = 500;
const NEURON_SPAWN_RADIUS = 30;
const NEURON_BASE_SIZE = 0.06; 
const NEURON_SIZE_VARIATION = 0.03;
const SYNAPSE_THICKNESS = 0.006; 
const SYNAPSE_SEGMENTS = 40; 
const SIGNAL_SIZE = 0.04;
const SIGNAL_SPEED = 0.0004; 
const SIGNAL_EMISSIVE_INTENSITY = 0.3; 


const ADD_NEURON_CHANCE = 0.003;
const REMOVE_NEURON_CHANCE = 0.0015;
const ADD_SYNAPSE_CHANCE = 0.005;
const REMOVE_SYNAPSE_CHANCE = 0.002;
const MAX_SYNAPSES_PER_NEURON = 7;


const ANIMATION_SYNAPSE_FORMATION_DURATION = 3000; 


const NEURON_INDIVIDUAL_PULSE_MIN_EMISSIVE_RANGE = [0.10, 0.20];
const NEURON_INDIVIDUAL_PULSE_MAX_EMISSIVE_RANGE = [0.30, 0.45];
const NEURON_MIN_PULSE_AMPLITUDE_DIFFERENCE = 0.15;

const NEURON_PULSE_SPEED_MIN = 0.15;
const NEURON_PULSE_SPEED_MAX = 1.5;

const SYNAPSE_PULSE_DURATION = 0.8; 
const SYNAPSE_PULSE_INTENSITY_MULTIPLIER = 3.0;
const SYNAPSE_BASE_EMISSIVE_FACTOR = 0.25; 



const SIGNAL_BASE_COLOR = new BABYLON.Color3(1, 1, 1); 
const SIGNAL_GLOW_MIN_DISTANCE = 0.15; 
const SIGNAL_GLOW_MAX_DISTANCE = 2.5;  
const SIGNAL_GLOW_CLOSE_EMISSIVE_BOOST = 5.0; 
const SIGNAL_GLOW_CLOSE_ALPHA = 0.3; 


const MOUSE_WHEEL_ZOOM_SENSITIVITY = 0.005;


type AnimationState = 'synapseFormation' | 'running';

interface NeuronData {
  id: string;
  mesh: BABYLON.Mesh;
  radius: number;
  synapses: Set<string>;
  baseDiffuse: BABYLON.Color3;
  pulseOffset: number;
  pulseSpeed: number;
  minEmissiveFactor: number;
  maxEmissiveFactor: number;
  targetPosition: BABYLON.Vector3;
  layer: number;
}

interface SynapseData {
  id: string;
  mesh: BABYLON.Mesh;
  neuron1Id: string;
  neuron2Id: string;
  pathPoints: BABYLON.Vector3[];
  signal?: SignalData;
  baseEmissive: BABYLON.Color3;
  pulseTimeRemaining: number;
  initialAlpha: number; 
  targetAlpha: number; 
}

interface SignalData {
  id: string;
  mesh: BABYLON.Mesh;
  progress: number;
  synapseId: string;
}

const generateId = (): string => Math.random().toString(36).substr(2, 9);


const themeColors = {
  dark: {
    background: new BABYLON.Color4(0, 0, 0, 1),
    neuronDiffuse: (intensity: number) => new BABYLON.Color3(intensity, intensity, intensity),
    synapseDiffuse: (intensity: number) => new BABYLON.Color3(intensity, intensity, intensity),
    synapseBaseEmissiveFactor: SYNAPSE_BASE_EMISSIVE_FACTOR,
    signalBaseColor: SIGNAL_BASE_COLOR,
    glowLayerIntensity: 1.6,
    glowColor: null, 
  },
  light: {
    background: BABYLON.Color4.FromHexString("#F9FAFBFF"), 
    neuronDiffuse: () => BABYLON.Color3.FromHexString("#3B82F6"),
    synapseDiffuse: () => BABYLON.Color3.FromHexString("#CBD5E1"),
    synapseBaseEmissiveFactor: 0.15, 
    signalBaseColor: BABYLON.Color3.FromHexString("#3B82F6"), 
    glowLayerIntensity: 1.0,
    glowColor: {
        r: 59 / 255,
        g: 130 / 255,
        b: 246 / 255,
    }
  }
};

export const BabylonScene: React.FC = () => {
  const { theme } = useTheme();
  const reactCanvas = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BABYLON.Engine | null>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);
  const cameraRef = useRef<BABYLON.ArcRotateCamera | null>(null);
  const initialCameraRotationRef = useRef<{ alpha: number; beta: number } | null>(null);
  const glowLayerRef = useRef<GlowLayer | null>(null);

  const neuronsRef = useRef<Map<string, NeuronData>>(new Map());
  const synapsesRef = useRef<Map<string, SynapseData>>(new Map());
  const lastFrameTimeRef = useRef<number>(performance.now());

  const animationStateRef = useRef<AnimationState>('synapseFormation');
  const animationStartTimeRef = useRef<number>(0);
  const numInitialSynapsesCreatedRef = useRef<number>(0);


  const createNeuronMesh = (
    scene: BABYLON.Scene
  ): {
    mesh: BABYLON.Mesh,
    baseDiffuse: BABYLON.Color3,
    actualRadius: number,
} => {
    const actualRadius = NEURON_BASE_SIZE + (Math.random() * NEURON_SIZE_VARIATION * 2) - NEURON_SIZE_VARIATION;
    const neuron = BABYLON.MeshBuilder.CreateSphere(`neuron_${generateId()}`, { diameter: actualRadius * 2, segments: 12 }, scene);

    const material = new BABYLON.StandardMaterial(`neuronMat_${generateId()}`, scene);
    const intensity = 0.7 + Math.random() * 0.3;
    const colors = themeColors[theme];
    const baseDiffuseColor = colors.neuronDiffuse(intensity);
    material.diffuseColor = baseDiffuseColor;
    const distanceFromCenter = neuron.position.length();
    const centerFalloffRadius = NEURON_SPAWN_RADIUS * 0.3; 
    let alpha = theme === 'light' ? 0.15 : 0.95; 

    if (theme === 'light' && distanceFromCenter < centerFalloffRadius) {
        
        alpha *= BABYLON.Scalar.Clamp(distanceFromCenter / centerFalloffRadius, 0.2, 1);
    }
    material.alpha = alpha;
    neuron.material = material;

    neuron.scaling = new BABYLON.Vector3(1, 1, 1); 

    glowLayerRef.current?.addIncludedOnlyMesh(neuron);
    return {
        mesh: neuron,
        baseDiffuse: baseDiffuseColor,
        actualRadius,
    };
  };

  const calculateBezierPath = (startPos: BABYLON.Vector3, endPos: BABYLON.Vector3, controlPointOffsetMagnitude: number): BABYLON.Vector3[] => {
    const direction = endPos.subtract(startPos);
    const length = direction.length();

    if (length < 0.01) return [startPos, endPos];

    const normalizedDirection = direction.normalizeToNew();

    let randomOffsetAxis = new BABYLON.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    if (randomOffsetAxis.lengthSquared() < 0.001 || Math.abs(BABYLON.Vector3.Dot(randomOffsetAxis, normalizedDirection)) > 0.98) {
        randomOffsetAxis = BABYLON.Vector3.Cross(normalizedDirection, BABYLON.Vector3.UpReadOnly).normalize();
        if (randomOffsetAxis.lengthSquared() < 0.01) {
            randomOffsetAxis = BABYLON.Vector3.Cross(normalizedDirection, BABYLON.Vector3.RightReadOnly).normalize();
        }
    }

    
    const perpendicularOffsetDirection = BABYLON.Vector3.Cross(normalizedDirection, randomOffsetAxis).normalize().scale(controlPointOffsetMagnitude * length * 0.75);

    const cp1 = startPos.add(normalizedDirection.scale(length * (0.25 + Math.random() * 0.25))).add(perpendicularOffsetDirection);
    const cp2 = endPos.subtract(normalizedDirection.scale(length * (0.25 + Math.random() * 0.25))).add(perpendicularOffsetDirection);

    return BABYLON.Curve3.CreateCubicBezier(startPos, cp1, cp2, endPos, SYNAPSE_SEGMENTS).getPoints();
  };

  const createSynapseMesh = (
    scene: BABYLON.Scene,
    path: BABYLON.Vector3[],
    neuron1ActualRadius: number,
    neuron2ActualRadius: number,
    isInitialSetupAnimation: boolean
  ): {mesh: BABYLON.Mesh, baseEmissive: BABYLON.Color3, initialAlpha: number, targetAlpha: number } | null => {
    if (path.length < 2) return null;

    let totalPathLength = 0;
    for (let k = 0; k < path.length - 1; k++) {
        totalPathLength += BABYLON.Vector3.Distance(path[k], path[k+1]);
    }

    const baseRadius = SYNAPSE_THICKNESS;
    const neuron1TargetRadius = neuron1ActualRadius * (2/3);
    const neuron2TargetRadius = neuron2ActualRadius * (2/3);
    const taperPortion = 0.05;

    const radiusFunction = (i: number, distanceAlongPath: number): number => {
        if (totalPathLength < baseRadius * 8 || totalPathLength === 0) {
            return baseRadius;
        }
        const taperTransitionLength = totalPathLength * taperPortion;
        if (taperTransitionLength < 0.001) {
             return baseRadius;
        }

        if (distanceAlongPath <= taperTransitionLength) {
            const ratio = BABYLON.Scalar.Clamp(distanceAlongPath / taperTransitionLength, 0, 1);
            return BABYLON.Scalar.Lerp(neuron1TargetRadius, baseRadius, ratio);
        } else if (distanceAlongPath >= totalPathLength - taperTransitionLength) {
            const distanceFromEnd = totalPathLength - distanceAlongPath;
            const ratio = BABYLON.Scalar.Clamp(distanceFromEnd / taperTransitionLength, 0, 1);
            return BABYLON.Scalar.Lerp(neuron2TargetRadius, baseRadius, ratio);
        } else {
            return baseRadius;
        }
    };

    const synapse = BABYLON.MeshBuilder.CreateTube(`synapse_${generateId()}`, {
        path,
        radiusFunction,
        tessellation: 8,
        cap: 2, 
        updatable: false
    }, scene);

    const material = new BABYLON.StandardMaterial(`synapseMat_${generateId()}`, scene);
    const colors = themeColors[theme];
    const intensity = 0.4 + Math.random() * 0.2;
    material.diffuseColor = colors.synapseDiffuse(intensity);
    const baseEmissiveColor = material.diffuseColor.scale(colors.synapseBaseEmissiveFactor);
    material.emissiveColor = baseEmissiveColor;

    const initialAlphaValue = isInitialSetupAnimation ? 0 : (0.20 + Math.random() * 0.2);
    const targetAlphaValue = theme === 'light' ? 0.2 : (0.20 + Math.random() * 0.2);
    material.alpha = initialAlphaValue;

    synapse.material = material;
    return { mesh: synapse, baseEmissive: baseEmissiveColor, initialAlpha: initialAlphaValue, targetAlpha: targetAlphaValue };
  };

  const createSignalMesh = (scene: BABYLON.Scene): BABYLON.Mesh => {
    const signal = BABYLON.MeshBuilder.CreateSphere(`signal_${generateId()}`, { diameter: SIGNAL_SIZE * 2, segments: 6 }, scene);
    const material = new BABYLON.StandardMaterial(`signalMat_${generateId()}`, scene);
    const colors = themeColors[theme];
    material.emissiveColor = colors.signalBaseColor.scale(SIGNAL_EMISSIVE_INTENSITY);
    material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1); 
    signal.material = material;
    glowLayerRef.current?.addIncludedOnlyMesh(signal);
    return signal;
  };

  const addRandomNeuron = useCallback(() => {
    if (neuronsRef.current.size >= MAX_NEURONS) return;
    if (!sceneRef.current) return;

    const finalTargetPosition = new BABYLON.Vector3(
      (Math.random() - 0.5) * 2 * NEURON_SPAWN_RADIUS,
      (Math.random() - 0.5) * 2 * NEURON_SPAWN_RADIUS,
      (Math.random() - 0.5) * 2 * NEURON_SPAWN_RADIUS
    );

    const layer = Math.floor(((finalTargetPosition.z + NEURON_SPAWN_RADIUS) / (NEURON_SPAWN_RADIUS * 2)) * 3); 

    const {
        mesh,
        baseDiffuse,
        actualRadius,
    } = createNeuronMesh(sceneRef.current);

    mesh.position = finalTargetPosition.clone(); 

    const id = generateId();

    const baseMin = NEURON_INDIVIDUAL_PULSE_MIN_EMISSIVE_RANGE[0] + Math.random() * (NEURON_INDIVIDUAL_PULSE_MIN_EMISSIVE_RANGE[1] - NEURON_INDIVIDUAL_PULSE_MIN_EMISSIVE_RANGE[0]);
    const baseMax = NEURON_INDIVIDUAL_PULSE_MAX_EMISSIVE_RANGE[0] + Math.random() * (NEURON_INDIVIDUAL_PULSE_MAX_EMISSIVE_RANGE[1] - NEURON_INDIVIDUAL_PULSE_MAX_EMISSIVE_RANGE[0]);

    let minEmissiveFactor = baseMin;
    let maxEmissiveFactor = Math.max(baseMax, minEmissiveFactor + NEURON_MIN_PULSE_AMPLITUDE_DIFFERENCE);
    maxEmissiveFactor = Math.min(maxEmissiveFactor, NEURON_INDIVIDUAL_PULSE_MAX_EMISSIVE_RANGE[1]);
    minEmissiveFactor = Math.min(minEmissiveFactor, Math.max(NEURON_INDIVIDUAL_PULSE_MIN_EMISSIVE_RANGE[0], maxEmissiveFactor - NEURON_MIN_PULSE_AMPLITUDE_DIFFERENCE));


    const pulseSpeedMultiplier = 1 + (layer * 0.25); 

    neuronsRef.current.set(id, {
        id, mesh, radius: actualRadius, synapses: new Set(), baseDiffuse,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: (NEURON_PULSE_SPEED_MIN + Math.random() * (NEURON_PULSE_SPEED_MAX - NEURON_PULSE_SPEED_MIN)) * pulseSpeedMultiplier,
        minEmissiveFactor, maxEmissiveFactor,
        targetPosition: finalTargetPosition,
        layer,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const removeRandomNeuron = useCallback(() => {
    if (neuronsRef.current.size === 0) return;
    const neuronIds = Array.from(neuronsRef.current.keys());
    const neuronToRemoveId = neuronIds[Math.floor(Math.random() * neuronIds.length)];
    const neuronData = neuronsRef.current.get(neuronToRemoveId);

    if (neuronData) {
      neuronData.synapses.forEach(synapseId => {
        const synapseData = synapsesRef.current.get(synapseId);
        if (synapseData) {
          synapseData.signal?.mesh.dispose();
          synapseData.mesh.dispose();
          synapsesRef.current.delete(synapseId);
          const otherNeuronId = synapseData.neuron1Id === neuronToRemoveId ? synapseData.neuron2Id : synapseData.neuron1Id;
          neuronsRef.current.get(otherNeuronId)?.synapses.delete(synapseId);
        }
      });
      neuronData.mesh.dispose();
      neuronsRef.current.delete(neuronToRemoveId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const addRandomSynapse = useCallback((isInitialSetupAnimation: boolean = false) => {
    if (synapsesRef.current.size >= MAX_SYNAPSES && !isInitialSetupAnimation && numInitialSynapsesCreatedRef.current >= NUM_SYNAPSES_INITIAL) return;
    if (neuronsRef.current.size < 2 || !sceneRef.current) return;

    const neuronIds = Array.from(neuronsRef.current.keys());
    let n1Id = neuronIds[Math.floor(Math.random() * neuronIds.length)];
    let n2Id = neuronIds[Math.floor(Math.random() * neuronIds.length)];
    let attempts = 0;

    while (attempts < 20 && (
           n1Id === n2Id ||
           (neuronsRef.current.get(n1Id)?.synapses.size ?? 0) >= MAX_SYNAPSES_PER_NEURON ||
           (neuronsRef.current.get(n2Id)?.synapses.size ?? 0) >= MAX_SYNAPSES_PER_NEURON
           )) {
        n1Id = neuronIds[Math.floor(Math.random() * neuronIds.length)];
        n2Id = neuronIds[Math.floor(Math.random() * neuronIds.length)];
        attempts++;
    }
    if (n1Id === n2Id || attempts >= 20) return;

    const neuron1 = neuronsRef.current.get(n1Id);
    const neuron2 = neuronsRef.current.get(n2Id);

    if (!neuron1 || !neuron2) return;

    const pos1 = neuron1.targetPosition;
    const pos2 = neuron2.targetPosition;

    for (const synapse of synapsesRef.current.values()) {
        if ((synapse.neuron1Id === n1Id && synapse.neuron2Id === n2Id) || (synapse.neuron1Id === n2Id && synapse.neuron2Id === n1Id)) {
            return;
        }
    }
    
    const pathPoints = calculateBezierPath(pos1, pos2, 0.35);
    const synapseCreationResult = createSynapseMesh(sceneRef.current, pathPoints, neuron1.radius, neuron2.radius, isInitialSetupAnimation);
    if (!synapseCreationResult) return;
    const {mesh, baseEmissive, initialAlpha, targetAlpha} = synapseCreationResult;

    const synapseId = generateId();
    const synapseData: SynapseData = {
        id: synapseId, mesh, neuron1Id: n1Id, neuron2Id: n2Id, pathPoints, baseEmissive,
        pulseTimeRemaining: 0, initialAlpha, targetAlpha
    };

    if (animationStateRef.current === 'running' && Math.random() < 0.3) {
        const signalMesh = createSignalMesh(sceneRef.current);
        signalMesh.position = pathPoints[0].clone();
        synapseData.signal = { id: generateId(), mesh: signalMesh, progress: Math.random() * 0.5, synapseId };
    }

    synapsesRef.current.set(synapseId, synapseData);
    neuron1.synapses.add(synapseId);
    neuron2.synapses.add(synapseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const removeRandomSynapse = useCallback(() => {
    if (synapsesRef.current.size === 0) return;
    const synapseIds = Array.from(synapsesRef.current.keys());
    const synapseToRemoveId = synapseIds[Math.floor(Math.random() * synapseIds.length)];
    const synapseData = synapsesRef.current.get(synapseToRemoveId);

    if (synapseData) {
      neuronsRef.current.get(synapseData.neuron1Id)?.synapses.delete(synapseToRemoveId);
      neuronsRef.current.get(synapseData.neuron2Id)?.synapses.delete(synapseToRemoveId);
      synapseData.signal?.mesh.dispose();
      synapseData.mesh.dispose();
      synapsesRef.current.delete(synapseToRemoveId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    if (!cameraRef.current || !initialCameraRotationRef.current || !engineRef.current) return;
    const canvas = engineRef.current.getRenderingCanvas();
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const normalizedX = (mouseX / canvas.width - 0.5);
    const normalizedY = (mouseY / canvas.height - 0.5);

    const MAX_ANGLE_OFFSET_ALPHA = Math.PI / 4; 
    const MAX_ANGLE_OFFSET_BETA = Math.PI / 8;

    const targetAlpha = initialCameraRotationRef.current.alpha + normalizedX * MAX_ANGLE_OFFSET_ALPHA;
    let targetBeta = initialCameraRotationRef.current.beta - normalizedY * MAX_ANGLE_OFFSET_BETA;

    targetBeta = BABYLON.Scalar.Clamp(targetBeta, 0.1, Math.PI - 0.1);

    cameraRef.current.alpha = BABYLON.Scalar.Lerp(cameraRef.current.alpha, targetAlpha, 0.05);
    cameraRef.current.beta = BABYLON.Scalar.Lerp(cameraRef.current.beta, targetBeta, 0.05);
  }, []);

  const handleWheel = useCallback((event: globalThis.WheelEvent) => {
    if (!cameraRef.current || !engineRef.current?.getRenderingCanvas()) return;

    

    const camera = cameraRef.current;
    let newRadius = camera.radius + event.deltaY * MOUSE_WHEEL_ZOOM_SENSITIVITY;

    
    newRadius = BABYLON.Scalar.Clamp(
        newRadius,
        camera.lowerRadiusLimit === null ? undefined : camera.lowerRadiusLimit,
        camera.upperRadiusLimit === null ? undefined : camera.upperRadiusLimit
    );

    camera.radius = newRadius;
  }, []);


  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new BABYLON.Engine(reactCanvas.current, true, { preserveDrawingBuffer: true, stencil: true, antialias: true });
      engineRef.current = engine;
      const scene = new BABYLON.Scene(engine);
      sceneRef.current = scene;
      const colors = themeColors[theme];
      scene.clearColor = colors.background;

      animationStartTimeRef.current = performance.now(); 
      lastFrameTimeRef.current = animationStartTimeRef.current;

      const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, NEURON_SPAWN_RADIUS * 0.8, BABYLON.Vector3.Zero(), scene);
      camera.minZ = 0.01;
      camera.maxZ = NEURON_SPAWN_RADIUS * 3; 
      camera.lowerRadiusLimit = 0.1;
      camera.upperRadiusLimit = NEURON_SPAWN_RADIUS * 1.8;
      camera.fov = 1.3;
      cameraRef.current = camera;
      initialCameraRotationRef.current = { alpha: camera.alpha, beta: camera.beta };

      glowLayerRef.current = new GlowLayer("glow", scene, { mainTextureSamples: 2, blurKernelSize: 64 });
      glowLayerRef.current.intensity = colors.glowLayerIntensity;
      if (colors.glowColor && glowLayerRef.current.customEmissiveColorSelector) {
          glowLayerRef.current.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
              if(mesh.name.startsWith("signal")) {
                  result.set(colors.glowColor.r, colors.glowColor.g, colors.glowColor.b, 1.0);
              } else if (material instanceof BABYLON.StandardMaterial) {
                  
                  result.set(material.emissiveColor.r, material.emissiveColor.g, material.emissiveColor.b, material.alpha);
              }
          }
      }

      for (let i = 0; i < NUM_NEURONS_INITIAL; i++) addRandomNeuron(); 

      scene.onBeforeRenderObservable.add(() => {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000.0;
        lastFrameTimeRef.current = currentTime;
        const animationElapsedTime = currentTime - animationStartTimeRef.current;

        if (animationStateRef.current === 'synapseFormation') {
          const progress = Math.min(animationElapsedTime / ANIMATION_SYNAPSE_FORMATION_DURATION, 1);
          const targetSynapsesToExist = Math.floor(progress * NUM_SYNAPSES_INITIAL);
          const synapsesToCreateNow = targetSynapsesToExist - numInitialSynapsesCreatedRef.current;

          if (synapsesToCreateNow > 0) {
            for (let i = 0; i < synapsesToCreateNow; i++) {
                if (numInitialSynapsesCreatedRef.current < NUM_SYNAPSES_INITIAL) {
                    addRandomSynapse(true); 
                    numInitialSynapsesCreatedRef.current++;
                }
            }
          }
          
          synapsesRef.current.forEach(synapseData => {
            if (synapseData.mesh.material && synapseData.initialAlpha === 0) {
                (synapseData.mesh.material as BABYLON.StandardMaterial).alpha = BABYLON.Scalar.Lerp(0, synapseData.targetAlpha, progress);
            }
          });
          if (progress >= 1 && numInitialSynapsesCreatedRef.current >= NUM_SYNAPSES_INITIAL) {
            animationStateRef.current = 'running';
             
             synapsesRef.current.forEach(synapseData => {
                if (synapseData.mesh.material && synapseData.initialAlpha === 0) { 
                    (synapseData.mesh.material as BABYLON.StandardMaterial).alpha = synapseData.targetAlpha;
                }
            });
          }
        } else if (animationStateRef.current === 'running') {
            
            neuronsRef.current.forEach(neuronData => {
              if (neuronData.mesh && neuronData.mesh.material instanceof BABYLON.StandardMaterial) {
                const twinkleFactor = (Math.sin((currentTime / 1000) * neuronData.pulseSpeed + neuronData.pulseOffset) + 1) / 2;
                const emissiveIntensity = neuronData.minEmissiveFactor + twinkleFactor * (neuronData.maxEmissiveFactor - neuronData.minEmissiveFactor);
                (neuronData.mesh.material as BABYLON.StandardMaterial).emissiveColor = neuronData.baseDiffuse.scale(emissiveIntensity);

                
                if (cameraRef.current) {
                    const parallaxFactor = 0.05 + (neuronData.layer * 0.05);
                    const directionToCenter = neuronData.targetPosition.subtract(cameraRef.current.target).normalize();
                    const moveAmount = cameraRef.current.alpha * parallaxFactor;
                    neuronData.mesh.position = neuronData.targetPosition.add(directionToCenter.scale(moveAmount));
                }
              }
            });
            synapsesRef.current.forEach(synapse => {
              if (synapse.mesh.material instanceof BABYLON.StandardMaterial) {
                if (synapse.pulseTimeRemaining > 0) {
                  synapse.pulseTimeRemaining -= deltaTime;
                  const pulseProgress = Math.max(0, synapse.pulseTimeRemaining / SYNAPSE_PULSE_DURATION);
                  const intensityMultiplier = 1 + (SYNAPSE_PULSE_INTENSITY_MULTIPLIER - 1) * pulseProgress;
                  (synapse.mesh.material as BABYLON.StandardMaterial).emissiveColor = synapse.baseEmissive.scale(intensityMultiplier);
                } else {
                  (synapse.mesh.material as BABYLON.StandardMaterial).emissiveColor = synapse.baseEmissive;
                }
              }
              if (synapse.signal && synapse.signal.mesh.material instanceof BABYLON.StandardMaterial) {
                synapse.signal.progress += SIGNAL_SPEED * deltaTime * 60;
                if (synapse.signal.progress >= 1) {
                    synapse.signal.progress = 0;
                    synapse.pulseTimeRemaining = SYNAPSE_PULSE_DURATION;
                }
                const pointIndex = Math.floor(synapse.signal.progress * (synapse.pathPoints.length -1));
                if(synapse.pathPoints[pointIndex] && synapse.pathPoints[Math.min(pointIndex + 1, synapse.pathPoints.length - 1)]) {
                    synapse.signal.mesh.position = BABYLON.Vector3.Lerp(
                        synapse.pathPoints[pointIndex],
                        synapse.pathPoints[Math.min(pointIndex + 1, synapse.pathPoints.length - 1)],
                        (synapse.signal.progress * (synapse.pathPoints.length -1)) - pointIndex
                    );
                } else if (synapse.pathPoints.length > 0) {
                     synapse.signal.mesh.position = synapse.pathPoints[synapse.pathPoints.length -1].clone();
                }
                if (cameraRef.current) {
                    const distanceToCamera = BABYLON.Vector3.Distance(cameraRef.current.globalPosition, synapse.signal.mesh.position);
                    const distanceRatio = BABYLON.Scalar.Clamp((distanceToCamera - SIGNAL_GLOW_MIN_DISTANCE) / (SIGNAL_GLOW_MAX_DISTANCE - SIGNAL_GLOW_MIN_DISTANCE), 0, 1);
                    const currentEmissiveBoost = BABYLON.Scalar.Lerp(SIGNAL_GLOW_CLOSE_EMISSIVE_BOOST, 1.0, distanceRatio);
                    const currentAlpha = BABYLON.Scalar.Lerp(SIGNAL_GLOW_CLOSE_ALPHA, 1.0, distanceRatio);
                    const signalMaterial = synapse.signal.mesh.material as BABYLON.StandardMaterial;
                    const colors = themeColors[theme];
                    signalMaterial.emissiveColor = colors.signalBaseColor.scale(SIGNAL_EMISSIVE_INTENSITY * currentEmissiveBoost);
                    signalMaterial.alpha = currentAlpha;
                }
              } else if (Math.random() < 0.0002 && sceneRef.current && synapse.pathPoints.length > 0) {
                  const signalMesh = createSignalMesh(sceneRef.current);
                  signalMesh.position = synapse.pathPoints[0].clone();
                  synapse.signal = { id: generateId(), mesh: signalMesh, progress: 0, synapseId: synapse.id };
              }
            });
            if (Math.random() < ADD_NEURON_CHANCE) addRandomNeuron();
            if (Math.random() < REMOVE_NEURON_CHANCE) removeRandomNeuron();
            if (Math.random() < ADD_SYNAPSE_CHANCE) addRandomSynapse(false); 
            if (Math.random() < REMOVE_SYNAPSE_CHANCE) removeRandomSynapse();
        }
      });

      engine.runRenderLoop(() => {
        if (sceneRef.current) sceneRef.current.render();
      });

      const onResize = () => { if(engineRef.current) engineRef.current.resize(); };
      window.addEventListener('resize', onResize);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('wheel', handleWheel, { passive: false }); 

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('wheel', handleWheel);
        if (sceneRef.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            synapsesRef.current.forEach(synapse => {
                synapse.signal?.mesh.material?.dispose();
                synapse.signal?.mesh.dispose();
                synapse.mesh.material?.dispose();
                synapse.mesh.dispose();
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
            neuronsRef.current.forEach(neuron => {
                neuron.mesh.material?.dispose();
                neuron.mesh.dispose();
            });
            glowLayerRef.current?.dispose();
            sceneRef.current.dispose();
        }
        if (engineRef.current) engineRef.current.dispose();

        neuronsRef.current.clear();
        synapsesRef.current.clear();
        glowLayerRef.current = null;
        engineRef.current = null;
        sceneRef.current = null;
        cameraRef.current = null;
        animationStateRef.current = 'synapseFormation'; 
        numInitialSynapsesCreatedRef.current = 0;
      };
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]); 

  const canvasStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
    outline: 'none',
  };

  if (theme === 'light') {
    canvasStyle.opacity = 0.6;
    canvasStyle.filter = 'blur(1px)';
  }

  return <canvas ref={reactCanvas} className="w-full h-full" style={canvasStyle} aria-label="Interactive Neural Network Background" />;
};
