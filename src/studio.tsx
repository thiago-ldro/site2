import { createRoot } from 'react-dom/client'
import { Studio, StudioPreview } from './components/studio/Studio'
import './styles/site.css'
import './styles/studio.css'

createRoot(document.getElementById('root')!).render(new URLSearchParams(location.search).has('preview') ? <StudioPreview /> : <Studio />)
