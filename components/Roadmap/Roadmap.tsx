import { RoadMapData } from '@/app/about/about.types'
import Experience from './deps/Experience'

const Roadmap = ({ bullets }: RoadMapData) => {
  return <Experience bullets={bullets} />
}
export default Roadmap
