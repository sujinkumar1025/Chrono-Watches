import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, useGLTF, Center } from "@react-three/drei";
import { useRef } from "react";

function WatchModel() {
    const ref = useRef();
    const { scene } = useGLTF("/omega_speedmaster_moon_watch.glb"); // 👈 place file in /public

    // rotation animation
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <Center>
            <group ref={ref}>
                <primitive object={scene} scale={0.1} position={[-0.1, 0, 0]} />
            </group>
        </Center>
    );
}

export default function Watch3D() {
    return (
        <Canvas
            style={{ width: "100%", height: "100%", background: "transparent" }}
            camera={{ position: [0, 0, 7] }}
        >
            {/* LIGHTING */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[3, 5, 3]} intensity={2} />
            <pointLight position={[-3, -3, -3]} intensity={1} />

            {/* MODEL */}
            <WatchModel />

            {/* ELECTRIC / PARTICLE EFFECT */}
            <Sparkles
                count={300}
                size={2.5}
                speed={0.15}
                color="#a5f3fc"
                opacity={0.9}
                noise={1}
                scale={[10, 8, 6]}   // 🔥 spreads stars far in space
            />

            {/* CONTROLS */}
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}