import { useEffect, useRef, useState } from 'react'
import { Armchair, ChevronLeft, ChevronRight, Focus, Heart, Layers, ListChecks, Maximize2, ScanLine, Shield, Sparkles, Target } from 'lucide-react'
import type { ClinicConfig, Treatment } from '../../config/schema'
import { Dialog } from '../ui/Dialog'
import { Image } from './Intro'

const treatmentIcons = { sparkles: Sparkles, scan: ScanLine, align: Focus, shield: Shield, heart: Heart, layers: Layers }
const benefitIcons = [Heart, Target, Armchair, ScanLine, Shield, ListChecks]

export function Treatments({ config, onSelect }: { config: ClinicConfig; onSelect: (id: string) => void }) {
  const [active, setActive] = useState<Treatment | null>(null)
  return <section id="tratamentos" className="section treatment-section">
    <div className="wrap">
      <div className="section-heading" data-reveal><div><p className="eyebrow">Tratamentos</p><h2>{config.copy.treatmentTitle}</h2></div><p>{config.copy.treatmentIntro}</p></div>
      <div className="treatment-grid">
        {config.treatments.map((item) => {
          const Icon = treatmentIcons[item.icon]
          return <article key={item.id} className="treatment" data-reveal>
            <div className="treatment-photo"><Image photo={item.image} /><div className="treatment-icon"><Icon size={20} strokeWidth={1.4} /></div></div>
            <div className="treatment-copy"><h3>{item.title}</h3><p>{item.summary}</p><button className="link-button" aria-label={'Mais informações sobre ' + item.title} onClick={() => setActive(item)}>Saiba mais <span aria-hidden="true">+</span></button></div>
          </article>
        })}
      </div>
    </div>
    {active && <Dialog title={active.title} onClose={() => setActive(null)} className="treatment-dialog">
      <Image photo={active.image} /><div className="dialog-text"><p className="eyebrow">Tratamentos</p><h2>{active.title}</h2><p>{active.details}</p>
      <a href="#agendamento" className="button button-primary" onClick={() => { onSelect(active.id); setActive(null) }}>Solicitar atendimento</a></div>
    </Dialog>}
  </section>
}

export function Experience({ config }: { config: ClinicConfig }) {
  return <section className="experience section" aria-labelledby="experience-title" data-light>
    <div className="wrap experience-grid">
      <div data-reveal><p className="eyebrow">Sua experiência</p><h2 id="experience-title">{config.copy.experienceTitle}</h2><p>{config.copy.experienceIntro}</p><a href="#agendamento" className="button button-primary">Agendar avaliação</a></div>
      <ul>{config.copy.benefits.map((item, index) => {
        const Icon = benefitIcons[index % benefitIcons.length]
        return <li key={index} data-reveal><Icon size={26} strokeWidth={1.35} /><div><h3>{item.title}</h3><p>{item.description}</p></div></li>
      })}</ul>
    </div>
  </section>
}

export function Gallery({ config }: { config: ClinicConfig }) {
  const rail = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<number | null>(null)
  const items = config.photos.gallery
  useEffect(() => {
    const element = rail.current
    if (!element) return
    const media = matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let timer: number | undefined
    function move(event: WheelEvent) {
      if (!media.matches || !element || event.ctrlKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      const maximum = element.scrollWidth - element.clientWidth
      const direction = Math.sign(event.deltaY)
      if (!direction || maximum <= 1 || (direction < 0 && element.scrollLeft <= 1) || (direction > 0 && element.scrollLeft >= maximum - 1)) return
      event.preventDefault()
      element.classList.add('wheel-drag')
      element.scrollLeft += event.deltaY * (event.deltaMode === 1 ? 16 : 1)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => element.classList.remove('wheel-drag'), 170)
    }
    element.addEventListener('wheel', move, { passive: false })
    return () => { element.removeEventListener('wheel', move); window.clearTimeout(timer); element.classList.remove('wheel-drag') }
  }, [])
  const change = (delta: number) => setSelected((index) => index === null ? null : (index + items.length + delta) % items.length)
  const scroll = (delta: number) => rail.current?.scrollBy({ left: delta * (rail.current.firstElementChild?.clientWidth ?? 300), behavior: 'auto' })
  return <section id="estrutura" className="section gallery">
    <div className="wrap section-heading" data-reveal><div><p className="eyebrow">Nossa estrutura</p><h2>{config.copy.galleryTitle}</h2></div><div><p>{config.copy.galleryIntro}</p><div className="gallery-controls"><button className="icon-button" onClick={() => scroll(-1)} aria-label="Deslizar galeria para trás"><ChevronLeft /></button><button className="icon-button" onClick={() => scroll(1)} aria-label="Deslizar galeria para frente"><ChevronRight /></button></div></div></div>
    <div className="gallery-rail" ref={rail} aria-label="Galeria da estrutura" role="region" tabIndex={0}>
      {items.map((item, index) => <figure key={index}><button className="gallery-photo" onClick={() => setSelected(index)} aria-label={'Ampliar ' + item.title}><Image photo={item} /><span><Maximize2 size={18} /></span></button><figcaption>{item.title}</figcaption></figure>)}
    </div>
    {config.photos.credit && <p className="wrap photo-credit">{config.photos.credit}</p>}
    {selected !== null && <Dialog title="Visualização da galeria" className="gallery-dialog" onClose={() => setSelected(null)}><Image photo={items[selected]} />
      <div className="gallery-dialog-nav"><button className="icon-button" aria-label="Foto anterior" onClick={() => change(-1)}><ChevronLeft /></button><p aria-live="polite">{items[selected].title}</p><button className="icon-button" aria-label="Próxima foto" onClick={() => change(1)}><ChevronRight /></button></div>
    </Dialog>}
  </section>
}
