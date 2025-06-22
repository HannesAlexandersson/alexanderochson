import CircularProgress from '@mui/material/CircularProgress'
import { LoadingProps } from './LoadingIndicator.interface'

const LoadingIndicator = ({ size, loading }: LoadingProps) => {
  return loading ? <CircularProgress size={size} /> : <></>
}
export default LoadingIndicator
