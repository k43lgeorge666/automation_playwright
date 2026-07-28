import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/PageURL/URL_Page'
import { LoginPage } from '../../PageObjects/Login_Page/LoginPage'


const username = "ssadasd@gmail.com"
const password = "admin123"
const waiting_time = 3000

test('Login User',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    login_user.Login_User(username,password)
    await page.waitForTimeout(waiting_time)
    login_user.Verify_User_Login()
})

test('LogOut User',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User(username,password)
    await page.waitForTimeout(waiting_time)
    await login_user.LogOut_User()
    await login_user.Verify_User_Logout()
})
test('Provide Incorrect Email',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User("ufcadmin@gmail.com",password)
    await page.waitForTimeout(waiting_time)
    await login_user.Verify_Wrong_Credentials()
})
test('Provide Incorrect password',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User(username,"admin@12345")
    await page.waitForTimeout(waiting_time)
    await login_user.Verify_Wrong_Credentials
})
