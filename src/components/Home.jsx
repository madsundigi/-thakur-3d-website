import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useRef } from 'react'

function RotatingCube() {
  const meshRef = useRef()
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })
  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, Math.PI / 9]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Home() {
  return (
    <div className="relative h-screen w-full bg-black">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div className="absolute top-4 left-4 z-10 text-white text-2xl font-bold">
        Thakur Industries
      </div>
    </div>
  )
}
