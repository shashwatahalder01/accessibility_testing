import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright';
import {helpers} from '../utils/helpers'
// test.beforeAll(async ({ page }) => { });
// test.afterAll(async ({ page }) => { });
// test.beforeEach(async ({ page }) => { });
// test.afterEach(async ({ page }) => { });



// locator
let header = '.HeaderModule'
let footer = '.Footer'

test.describe('Accessibility tests', () => {

  test.only('Scan full page for accessibility issues', async ({ page }, testInfo) => {
    await page.goto('https://www.scope.org.uk/')
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    // console.log(accessibilityScanResults)

    //Exporting scan results as a test attachment
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });
    expect(helpers.violationFingerprints(accessibilityScanResults)).toMatchSnapshot();
    expect(accessibilityScanResults.violations).toEqual([])
  });

  test('Scan full page for only WCAG A or AA violations', async ({ page }) => {
    await page.goto('https://www.scope.org.uk/')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    // console.log(accessibilityScanResults)
    expect(accessibilityScanResults.violations).toEqual([])
  });

  test('Scan full page for common accessibility best practices violations', async ({ page }) => {
    await page.goto('https://www.scope.org.uk/')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .analyze()
    // console.log(accessibilityScanResults)
    expect(accessibilityScanResults.violations).toEqual([])
  });

  test('Scan full page for accessibility issue excluding some rules', async ({ page }) => {
    await page.goto('https://www.scope.org.uk/')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['duplicate-id', 'color-contrast', 'aria-hidden-body', 'audio-caption', 'meta-viewport', 'avoid-inline-spacing'])
      .analyze()
    // console.log(accessibilityScanResults)
    expect(accessibilityScanResults.violations).toEqual([])
  });

  test('Scan full page excluding header for accessibility issues', async ({ page }) => {
    await page.goto('https://www.scope.org.uk/')
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude(header)
      .analyze()
    // console.log(accessibilityScanResults)
    expect(accessibilityScanResults.violations).toEqual([])
  });

  test('Scan specific part of a page for accessibility issues: header', async ({ page }) => {
    await page.goto('https://www.scope.org.uk/')
    await page.locator(header).waitFor()
    const accessibilityScanResults = await new AxeBuilder({ page }).include(header).analyze()
    // console.log(accessibilityScanResults)
    expect(accessibilityScanResults.violations).toEqual([])
  });

  test('Scan specific part of a page for accessibility issues: footer', async ({ page }) => {
    await page.goto('https://www.scope.org.uk/')
    await page.locator(footer).waitFor()
    const accessibilityScanResults = await new AxeBuilder({ page }).include(footer).analyze()
    // console.log(accessibilityScanResults)
    expect(accessibilityScanResults.violations).toEqual([])
  });

})

