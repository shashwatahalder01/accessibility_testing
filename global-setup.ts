require('dotenv').config();
import { chromium, FullConfig, request } from '@playwright/test'

async function globalSetup(config: FullConfig) {

    const browser = await chromium.launch()
    const page = await browser.newPage()
    // await page.goto(process.env.BASE_URL + '/wp-admin')
    // await page.fill("#user_login", 'admin')
    // await page.fill("#user_pass", '01dokan01')
    // await page.click("#wp-submit")  
    await page.goto(process.env.BASE_URL + '/my-account')
    await page.fill("#username", 'admin')
    await page.fill("#password", '01dokan01')
    await page.click("//button[@value='Log in']")
    await page.context().storageState({ path: 'storageState.json' })
    await browser.close()

    // let login = async (page) => {
    //     await page.goto(process.env.BASE_URL + '/my-account')
    //     await page.fill("#username", 'admin')
    //     await page.fill("#password", '01dokan01')
    //     await page.click("//button[@value='Log in']")
      
    //   }
}
export default globalSetup;
