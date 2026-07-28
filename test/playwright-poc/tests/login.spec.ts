import {test, expect} from '@playwright/test'

test('login',async({page})=>
{
    await page.goto('http://127.0.0.1:5500/login.html')

    await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')
    await page.locator('//button[@type=\'submit\']').click()


    await page.locator("//button[contains(text(),'Añadir transacción')]").click()
    
    await page.locator("//*[@id='date']").fill('2026-12-31')
    await page.locator('id=amount').fill('10')
    await page.locator('id=description').fill('5')
    await page.locator('//button[contains(text(),\'Guardar\')]').click()

    //Expected Results - Asserts

    const actualDate = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[1]").textContent()
    const actualAmount = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[2]").textContent()
    const actualDescription = await page.locator("//tbody[@id='transactions-list']//tr[1]//td[3]").textContent()

    expect(actualDate).toEqual('2026-12-31')
    expect(actualAmount).toEqual('10')
    expect(actualDescription).toEqual('5')
    

    //await page.pause()

    

});