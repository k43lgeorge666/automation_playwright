import {test, expect} from '@playwright/test'

test('Create Transactions',async({page})=>
{
     await page.goto('http://127.0.0.1:5500/login.html')

    await page.locator('input#username').fill('user')
    await page.locator('input#password').fill('pass')
    await page.locator('//button[@type=\'submit\']').click()

    //await page.pause()

    for(let i =0; i<=30; i++)
    {
        await page.locator("//button[contains(text(),'Añadir transacción')]").click()    
        await page.locator("//*[@id='date']").fill('2026-12-31')
        await page.locator('id=amount').fill('10')
        await page.locator('id=description').fill('5')
        await page.locator('//button[contains(text(),\'Guardar\')]').click()

    }
    await page.pause()

  
/*
test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');
  await page.getByRole('textbox', { name: 'Nombre de usuario:' }).fill('user');
  await page.getByRole('textbox', { name: 'Contraseña:' }).fill('pass');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Añadir transacción' }).click();
  await page.getByRole('textbox', { name: 'Fecha:' }).fill('2026-05-11');
  await page.getByRole('spinbutton', { name: 'Monto:' }).fill('12');
  await page.getByRole('textbox', { name: 'Descripción:' }).fill('45');
  await page.getByRole('button', { name: 'Guardar' }).click();
});
   */
})