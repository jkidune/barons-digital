import { chromium } from 'playwright'

const base = process.env.NAV_TEST_BASE_URL || 'http://127.0.0.1:3000'
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] })

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function checkHeader(page, context) {
  const header = page.locator('[data-site-header]')
  await header.waitFor({ state: 'visible', timeout: 25000 })
  // Route transitions may update the URL a frame before scroll restoration
  // settles. Require the header to return to the viewport within five seconds.
  try {
    await page.waitForFunction(() => {
      const h = document.querySelector('[data-site-header]')
      if (!h) return false
      const rect = h.getBoundingClientRect()
      return Math.abs(rect.top) <= 2 && rect.bottom >= 40
    }, null, { timeout: 5000, polling: 100 })
  } catch {
    const diagnostic = await page.evaluate(() => {
      const h = document.querySelector('[data-site-header]')
      if (!h) return { error: 'header missing' }
      const ancestors = []
      for (let node = h; node && ancestors.length < 7; node = node.parentElement) {
        const style = getComputedStyle(node)
        ancestors.push({ tag: node.tagName, className: String(node.className).slice(0,130),
          position: style.position, transform: style.transform,
          overflow: style.overflow, top: style.top,
          rectTop: node.getBoundingClientRect().top })
      }
      return { viewport: { width: innerWidth, height: innerHeight, scrollY, scrollX,
        visualPageTop: visualViewport?.pageTop, visualOffsetTop: visualViewport?.offsetTop,
        visualHeight: visualViewport?.height },
        headerInline: h.getAttribute('style'), ancestors }
    })
    throw new Error(context + ': navbar stayed offscreen after settling: ' + JSON.stringify(diagnostic))
  }
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
  // Check real computed color, not classes or an exact rgb()/rgba() format.
  const readable = await page.waitForFunction(() => {
    const h = document.querySelector('[data-site-header]')
    const b = h?.querySelector('button[aria-controls="site-menu"]')
    if (!b) return false
    const color = getComputedStyle(b).color
    const match = color.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
    if (!match) return false
    const [r, g, blue] = match.slice(1, 4).map(Number)
    return r >= 230 && g >= 230 && blue >= 230
  }, null, { timeout: 5000, polling: 100 }).then(() => true).catch(() => false)
  const menuColors = await page.locator('[data-site-header]').evaluate(h => ({
    headerColor: getComputedStyle(h).color,
    buttonColor: getComputedStyle(h.querySelector('button[aria-controls="site-menu"]')).color,
    backgroundColor: getComputedStyle(h).backgroundColor,
    inlineStyle: h.getAttribute('style'),
  }))
  console.log('Mobile expanded menu contrast:', JSON.stringify(menuColors))
  assert(readable, 'mobile open menu controls must have readable white text: ' + JSON.stringify(menuColors))
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
