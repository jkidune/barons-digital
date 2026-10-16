import { chromium } from 'playwright'

const base = process.env.NAV_TEST_BASE_URL || 'http://127.0.0.1:3000'
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function checkHeader(page, context) {
  const header = page.locator('[data-site-header]')
  await header.waitFor({ state: 'visible', timeout: 25000 })
  const rect = await header.boundingBox()
  assert(rect, context + ': navbar has no bounding box')
  assert(rect.y >= -2 && rect.y <= 2, context + ': navbar is displaced offscreen: y=' + rect.y)
  const styles = await header.evaluate(node => {
    const s = getComputedStyle(node)
    return { opacity: s.opacity, visibility: s.visibility, transform: s.transform, position: s.position }
  })
  assert(styles.position === 'fixed', context + ': navbar lost fixed positioning')
  assert(styles.opacity === '1' && styles.visibility === 'visible', context + ': navbar hidden: ' + JSON.stringify(styles))
  assert(styles.transform === 'none', context + ': navbar retained an animation transform: ' + styles.transform)
  const menu = page.getByRole('button', { name: /open menu|close menu/i })
  assert(await menu.isVisible(), context + ': menu control not available')
  console.log('PASS:', context)
}

async function scrollDown(page) {
  await page.evaluate(() => window.scrollTo(0, Math.max(700, document.documentElement.scrollHeight - window.innerHeight)))
  await page.waitForTimeout(1000)
}

async function runDesktop() {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await context.addInitScript(() => sessionStorage.setItem('barons-loaded', '1'))
  const page = await context.newPage()
  await page.goto(base + '/about', { waitUntil: 'domcontentloaded' })
  await checkHeader(page, 'desktop /about load')
  await scrollDown(page)
  await checkHeader(page, 'desktop /about scroll down')
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Projects' }).click()
  await page.waitForURL('**/work', { timeout: 25000 })
  await page.waitForTimeout(800)
  await checkHeader(page, 'desktop navigation to /work')
  await scrollDown(page)
  await checkHeader(page, 'desktop /work scroll down')
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Contact' }).click()
  await page.waitForURL('**/contact', { timeout: 25000 })
  await page.waitForTimeout(800)
  await checkHeader(page, 'desktop navigation to /contact')
  await page.goto(base + '/work/checkpoint', { waitUntil: 'domcontentloaded' })
  await checkHeader(page, 'desktop deep-link /work/checkpoint')
  await context.close()
}

async function runMobile() {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce',
  })
  await context.addInitScript(() => sessionStorage.setItem('barons-loaded', '1'))
  const page = await context.newPage()
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' })
  await checkHeader(page, 'mobile homepage')
  await scrollDown(page)
  await checkHeader(page, 'mobile scroll')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const menu = page.locator('#site-menu')
  await menu.waitFor({ state: 'visible' })
  assert(await page.locator('[data-site-header]').evaluate(h => getComputedStyle(h).color) === 'rgb(255, 255, 255)',
    'mobile open menu header controls must have readable white text')
  await checkHeader(page, 'mobile menu open')
  await menu.getByRole('link', { name: 'Work' }).click()
  await page.waitForURL('**/work', { timeout: 25000 })
  await page.getByRole('button', { name: 'Open menu' }).waitFor({ state: 'visible', timeout: 15000 })
  await checkHeader(page, 'mobile after menu link /work')
  await scrollDown(page)
  await checkHeader(page, 'mobile /work scroll down')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await menu.getByRole('link', { name: 'About' }).click()
  await page.waitForURL('**/about', { timeout: 25000 })
  await page.getByRole('button', { name: 'Open menu' }).waitFor({ state: 'visible' })
  await checkHeader(page, 'mobile second route change /about')
  await page.goBack({ waitUntil: 'domcontentloaded' })
  await checkHeader(page, 'mobile browser back to /work')
  await context.close()
}

try {
  await runDesktop()
  await runMobile()
  console.log('Navigation regression checks passed on desktop and mobile.')
} finally {
  await browser.close()
}
