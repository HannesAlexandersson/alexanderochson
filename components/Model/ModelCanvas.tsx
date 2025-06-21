'use client'

// create a 3D model canvas that spins the model around its own axis

import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const CanvasLoader = dynamic(
  () => import('@/components/CanvasLoader/CanvasLoader'),
  { ssr: false },
)

const Model = () => {
  const scene = useGLTF('/planet/scene.gltf') // Load the GLTF model, Add customer specific path if needed
  return (
    <primitive object={scene.scene} scale={1.5} position-y={0} rotation-y={0} />
  )
}

const ModelCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={true}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default dynamic(() => Promise.resolve(ModelCanvas), { ssr: false })
