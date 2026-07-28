import { expect, Locator, Page } from "@playwright/test";
import { Dialog } from '@playwright/test';

export class Contact_us
{
    
    private readonly Contact_us_option:Locator
    private readonly Name_field:Locator
    private readonly Email_field:Locator
    private readonly Subject_field:Locator
    private readonly Message_field:Locator
    private readonly Submit_button:Locator
    private readonly Ok_button:Locator

    constructor(page:Page)
    {
        this.Contact_us_option = page.locator("//*[@href='/contact_us']")
        this.Name_field = page.locator("//*[@data-qa='name']")
        this.Email_field = page.locator("//*[@data-qa='email']")
        this.Subject_field = page.locator("//*[@data-qa='subject']")
        this.Message_field = page.locator("//*[@data-qa='message']")
        this.Submit_button = page.locator("//*[@data-qa='submit-button']")
        this.Ok_button = page.getByRole('button', { name: 'Press OK to proceed!' });
        
    }

    async Send_Message(name:string, email:string, subject:string, message:string)
    {

       //const dialogPromise = this.page.waitForEvent('dialog');

        await this.Contact_us_option.click()
        await this.Name_field.fill(name)
        await this.Email_field.fill(email)
        await this.Subject_field.fill(subject)
        await this.Message_field.fill(message)
        await this.Submit_button.click()
        
    }
}