import { expect, test } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { clinicConfig } from '../src/config/clinic.config'

test('página pública, metadados, recursos locais, links e console', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Seu sorriso merece uma experiência extraordinária.')
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow')
  await expect(page.locator('.site')).toHaveAttribute('data-preset', 'Blue Medical')
  await expect(page.locator('meta[name=theme-color]')).toHaveAttribute('content', '#0A192F')
  for (const path of ['/', '/robots.txt', '/sitemap.xml', clinicConfig.favicon, clinicConfig.photos.heroMobile, ...await page.locator('img').evaluateAll((images) => [...new Set(images.map((image) => new URL(image.getAttribute('src')!, location.origin).pathname))])]) {
    expect((await request.get(path)).ok(), path).toBeTruthy()
  }
  for (const id of await page.locator('a[href^="#"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')!.slice(1)))])) {
    await expect(page.locator('[id="' + id + '"]')).toHaveCount(1)
  }
  expect(existsSync('dist/studio.html')).toBe(false)
  expect((await (await request.get('/studio.html')).text()).includes('AXYRON Studio')).toBe(false)
  await expect(page.getByRole('heading', { name: 'Relatos de pacientes.' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Quem cuida de você.' })).toHaveCount(0)
  expect(errors).toEqual([])
})

test('tratamentos, seleção automática, privacidade, validação e prévia sem envio', async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('button', { name: 'Mais informações sobre Ortodontia' }).click()
  const panel = page.getByRole('dialog', { name: 'Ortodontia' })
  await expect(panel).toBeVisible()
  await panel.getByRole('link', { name: 'Solicitar atendimento' }).click()
  await expect(panel).toHaveCount(0)
  await expect(page.getByLabel('Tratamento de interesse')).toHaveValue('ortodontia')
  await page.getByRole('button', { name: 'Gerar prévia da mensagem' }).click()
  await expect(page.getByLabel('Seu nome')).toBeFocused()
  await expect(page.getByText('Informe seu nome com pelo menos dois caracteres.')).toBeVisible()
  await page.getByLabel('Seu nome').fill('Ana Teste')
  await page.getByLabel('Período preferencial').selectOption('Manhã')
  await page.getByRole('button', { name: 'Ler aviso' }).click()
  await expect(page.getByRole('dialog', { name: 'Aviso de privacidade' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Ler aviso' })).toBeFocused()
  await page.getByRole('checkbox').check()
  await page.getByRole('button', { name: 'Ver prévia da mensagem' }).click()
  await expect(page.getByText('Nome: Ana Teste', { exact: false })).toBeVisible()
  await page.getByRole('button', { name: 'Ocultar prévia' }).click()
  await page.getByRole('button', { name: 'Gerar prévia da mensagem' }).click()
  await expect(page.getByRole('status')).toHaveText(/Prévia pronta/)
  await expect(page.locator('#message-preview')).toContainText('Tratamento de interesse: Ortodontia')
  expect(context.pages()).toHaveLength(1)
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0])
})

test('faixa pausável, galeria, navegação por teclado e FAQ', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  const cta = page.getByRole('link', { name: 'Agendar minha avaliação' })
  await cta.hover()
  await expect.poll(() => cta.evaluate((el) => getComputedStyle(el, '::after').animationName)).toBe('blue-edge-sweep')
  await page.getByRole('button', { name: 'Pausar faixa' }).click()
  await expect(page.getByRole('button', { name: 'Reproduzir faixa' })).toBeVisible()
  await page.getByRole('button', { name: 'Reproduzir faixa' }).click()
  await expect(page.getByRole('button', { name: 'Pausar faixa' })).toBeVisible()
  await page.getByRole('button', { name: 'Deslizar galeria para frente' }).click()
  await expect.poll(() => page.locator('.gallery-rail').evaluate((el) => el.scrollLeft)).toBeGreaterThan(0)
  await page.getByRole('button', { name: 'Deslizar galeria para trás' }).click()
  await page.getByRole('button', { name: 'Ampliar Recepção' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Próxima foto' }).click()
  await expect(page.getByRole('dialog')).toContainText('Consultórios')
  await page.getByRole('button', { name: 'Foto anterior' }).click()
  await expect(page.getByRole('dialog')).toContainText('Recepção')
  await page.getByRole('button', { name: 'Fechar' }).click()
  const question = page.getByText('Como solicitar uma avaliação?', { exact: true })
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(question.locator('..')).toHaveAttribute('open', '')
})

test('navegação móvel, CTAs e ausência de overflow em quatro larguras', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('.hero-word').first()).toHaveCSS('animation-name', 'none')
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await expect(page.getByRole('dialog', { name: 'Menu principal' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Navegação móvel' }).getByRole('link', { name: 'Tratamentos' }).click()
  await expect(page).toHaveURL(/#tratamentos$/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.locator('.mobile-book').getByRole('link').click()
  await expect(page).toHaveURL(/#agendamento$/)
  await page.getByRole('link', { name: 'Preparar mensagem para WhatsApp' }).click()
  for (const width of [320, 768, 1440, 2560]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth), String(width)).toBeLessThanOrEqual(width)
  }
})

test('todos os tratamentos abrem o painel e os CTAs principais chegam ao destino', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.getByRole('link', { name: 'Conheça nossa clínica' }).click()
  await expect(page).toHaveURL(/#sobre$/)
  await page.getByRole('link', { name: 'Conheça nossa estrutura', exact: true }).click()
  await expect(page).toHaveURL(/#estrutura$/)
  const names = ['Implantodontia', 'Ortodontia', 'Clareamento dental', 'Lentes de contato dental', 'Prótese dentária', 'Limpeza e prevenção', 'Endodontia', 'Avaliação odontológica']
  for (const name of names) {
    const trigger = page.getByRole('button', { name: 'Mais informações sobre ' + name })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name })
    await expect(dialog.getByRole('heading', { name, exact: true })).toBeVisible()
    await dialog.getByRole('button', { name: 'Fechar' }).click()
    await expect(trigger).toBeFocused()
  }
  await page.locator('header').getByRole('link', { name: 'Agendar avaliação' }).click()
  await expect(page).toHaveURL(/#agendamento$/)
  await page.locator('footer').getByRole('button', { name: 'Aviso de privacidade' }).click()
  await page.getByRole('dialog').getByRole('button', { name: 'Fechar' }).click()
})

test('captura desktop e mobile da build pública', async ({ page }, info) => {
  await mkdir('artifacts', { recursive: true })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]] as const) {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    await page.evaluate(async () => {
      document.querySelectorAll<HTMLImageElement>('img[loading=lazy]').forEach((image) => { image.loading = 'eager' })
      await Promise.all(Array.from(document.images, (image) => image.decode().catch(() => {})))
      await document.fonts.ready
    })
    const heroSource = await page.locator('.hero-photo img').evaluate((img: HTMLImageElement) => new URL(img.currentSrc).pathname)
    expect(heroSource).toBe(device === 'mobile' ? clinicConfig.photos.heroMobile : clinicConfig.photos.hero.src)
    await page.screenshot({ path: 'artifacts/' + device + '.png', fullPage: true, animations: 'disabled' })
    await page.screenshot({ path: 'artifacts/' + device + '-entrada.png', animations: 'disabled' })
    await info.attach(device, { path: 'artifacts/' + device + '.png' })
  }
})
