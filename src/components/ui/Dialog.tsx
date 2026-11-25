import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

export function Dialog({ title, children, onClose, className = '' }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    dialog?.showModal()
    return () => {
      dialog?.close()
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={ref} className={'dialog ' + className} aria-label={title} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="dialog-content">
      <button className="icon-button dialog-close" aria-label="Fechar" onClick={onClose}><X size={22} /></button>
      {children}
    </div>
  </dialog>
}
