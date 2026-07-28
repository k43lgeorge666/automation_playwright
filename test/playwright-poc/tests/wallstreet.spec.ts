import {test, expect} from '@playwright/test'

test('login',async({page})=>
{
    await page.goto('https://wallstreetprep.com/my-courses')


    await page.locator('id=user_login').fill('jvela@waverleysoftware.com')
    await page.locator('id=user_pass').fill('9PaSQqr@QU)!Q&UX&sZy%7cx')
    await page.locator('id=wp-submit').click()

    await page.pause()
});
