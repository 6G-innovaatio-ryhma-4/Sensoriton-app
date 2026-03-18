import { Canvas, useFrame } from '@react-three/fiber';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from "react-native";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import bundledModel from '../../assets/models/scaniverseRoom.glb';

export default function HomeScreen() {
  const [modelUri, setModelUri] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const asset = Asset.fromModule(bundledModel);
        await asset.downloadAsync();
        const uri = asset.localUri ?? asset.uri;
        console.log('✅ Model loaded:', uri);
        setModelUri(uri);
      } catch (error) {
        console.error('❌ Error loading model:', error);
        setLoadError(String(error));
      }
    })();
  }, []);

  const base64ToArrayBuffer = (base64: string) => {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(base64, 'base64').buffer;
    }

    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes.buffer;
  };

  const onContextCreate = async (gl: any) => {
    if (!modelUri) return;

    try {
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);
      renderer.setClearColor(0x1a1a1a);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);

      scene.add(new THREE.AmbientLight(0xffffff, 2));
      scene.add(new THREE.DirectionalLight(0xffffff, 1.5));

      const base64 = await FileSystem.readAsStringAsync(modelUri, { encoding: 'base64' });
      const arrayBuffer = base64ToArrayBuffer(base64);

      const loader = new GLTFLoader();
      loader.parse(
        arrayBuffer,
        '',
        (gltf: any) => {
          console.log('✅ Native model parsed');

          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          gltf.scene.position.sub(center);

          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.8;

          camera.position.set(0, maxDim * 0.3, cameraZ);
          camera.near = 0.1;
          camera.far = maxDim * 10;
          camera.lookAt(0, 0, 0);
          camera.updateProjectionMatrix();

          scene.add(gltf.scene);

          let animationId: any;
          const render = () => {
            animationId = requestAnimationFrame(render);
            gltf.scene.rotation.y += 0.005;
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          render();
        },
        undefined,
        (err: any) => {
          console.error('❌ Native load error:', err);
          setLoadError('Failed to load native model');
        }
      );
    } catch (error) {
      console.error('❌ Native error:', error);
      setLoadError(String(error));
    }
  };

  const SceneRenderer = ({ scene }: { scene: THREE.Group }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
      if (groupRef.current) groupRef.current.rotation.y += 0.005;
    });

    return (
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    );
  };

  const WebViewer = () => {
    const [scene, setScene] = useState<THREE.Group | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      let mounted = true;

      (async () => {
        try {
          const response = await fetch(bundledModel as string);
          const arrayBuffer = await response.arrayBuffer();

          const loader = new GLTFLoader();
          loader.parse(
            arrayBuffer,
            '',
            (gltf: any) => {
              if (!mounted) return;
              setScene(gltf.scene);
            },
            (err: any) => {
              console.error('❌ Web load error:', err);
              if (mounted) setError('Failed to load web model');
            }
          );
        } catch (err) {
          console.error('❌ Web error:', err);
          if (mounted) setError('Failed to fetch web model');
        }
      })();

      return () => {
        mounted = false;
      };
    }, []);

    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }

    if (!scene) {
      return <Text style={styles.loading}>Loading model…</Text>;
    }

    return (
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, 10, -10]} intensity={0.8} />
        <SceneRenderer scene={scene} />
      </Canvas>
    );
  };

  return (
    <View style={styles.container}>
      {loadError && <Text style={styles.error}>Error: {loadError}</Text>}
      {Platform.OS === 'web' ? (
        <WebViewer />
      ) : modelUri ? (
        <GLView style={styles.glView} onContextCreate={onContextCreate} />
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  glView: {
    flex: 1,
  },
  error: {
    color: '#ff0000',
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  loading: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});