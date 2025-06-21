'use client'

import { PointMaterial, Points, Preload } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { inSphere } from 'maath/random'
import { Suspense, useRef, useState } from 'react'
import { StarsProps } from './BackgroundCanvas.types'

const Stars = (props: StarsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null) // Ref for the Points component

  // Create a sphere with random particles
  const POINT_COUNT = 3000
  const [sphere] = useState<Float32Array>(() => {
    return inSphere(new Float32Array(POINT_COUNT * 3), {
      radius: 1.2,
    }) as Float32Array
  })

  // Update the rotation of the stars in the frame loop
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.009}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  return (
    <div className='relative inset-0 h-full w-full'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas
