import { expect, Locator, Page } from "@playwright/test";

export class LoginPage
{
    private readonly Signup_Login_option:Locator
    private readonly Email_field:Locator
    private readonly Password_field:Locator
    private readonly Login_Button:Locator
    private readonly Username_label:Locator
    private readonly Logout_user_option:Locator
    private readonly Wrong_Creds:Locator

    constructor(page:Page)
    {
        this.Signup_Login_option = page.locator("//*[@href='/login']")
        this.Email_field = page.locator("//*[@data-qa='login-email']")
        this.Password_field = page.locator("//*[@data-qa='login-password']")
        this.Login_Button = page.locator("//*[@data-qa='login-button']")
        this.Username_label = page.locator("//*[contains(text(),'Logged in as')]")
        this.Logout_user_option = page.locator("//*[@href='/logout']")
        this.Wrong_Creds = page.locator("//*[contains(text(),'Your email or password is incorrect')]")     
    }
    async Login_User(email:string, password:string)
    {
        await this.Signup_Login_option.click()
        await this.Email_field.fill(email)
        await this.Password_field.fill(password)
        await this.Login_Button.click()
    }
    async Verify_User_Login()
    {
        await expect(this.Username_label).toBeVisible()
    }
    async LogOut_User()
    {
        await this.Logout_user_option.click()
    }
    async Verify_User_Logout()
    {
        await expect(this.Signup_Login_option).toBeVisible()
    }
    async Verify_Wrong_Credentials()
    {
        await expect(this.Wrong_Creds).toBeVisible()
    }

}