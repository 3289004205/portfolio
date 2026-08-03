import SideRays from './SideRays'

export default function RaysBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <SideRays
        speed={1.5}
        rayColor1="#5b8def"
        rayColor2="#a78bfa"
        intensity={1.3}
        spread={1.4}
        origin="top-right"
        tilt={0}
        saturation={1.3}
        blend={0.7}
        falloff={1.8}
        opacity={0.65}
      />
    </div>
  )
}
