// WatchModel.jsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model() {
    const { scene } = useGLTF("/omega_speedmaster_moon_watch.glb");

    return (
        <Center>
            <primitive object={scene} scale={2} />
        </Center>
    );
}

export default function WatchModel() {
    return (
        <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[3, 3, 3]} intensity={1.5} />

            <Model />

            <OrbitControls
                autoRotate
                autoRotateSpeed={1.5}
                enableZoom={false}
                enablePan={false}
            />
        </Canvas>
    );
}