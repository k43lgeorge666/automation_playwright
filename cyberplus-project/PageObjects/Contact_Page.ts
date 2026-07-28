import { expect, Locator, Page } from "@playwright/test";

export class Contact_Page
{
    private readonly Contact_tab:Locator
    private readonly name_field:Locator
    private readonly email_field:Locator
    private readonly subject_field:Locator
    private readonly message_field:Locator
    private readonly send_button:Locator
    private readonly success_message:Locator

    constructor(page:Page)
    {
        this.Contact_tab = page.locator('//*[@id="menu-item-150"]/a')
        this.name_field = page.locator("//*[@name='your-name']")
        this.email_field = page.locator("//*[@name='your-email']")
        this.subject_field = page.locator("//*[@name='your-subject']")
        this.message_field = page.locator("//*[@name='your-message']")
        this.send_button = page.locator("//*[@value='Enviar']")
        this.success_message = page.locator("//*[@class='wpcf7-response-output']")
    }
    
    async Sent_a_message(name:string, email:string, subject:string, message:string)
    {
        await this.Contact_tab.click()
        await this.name_field.fill(name)
        await this.email_field.fill(email)
        await this.subject_field.fill(subject)
        await this.message_field.fill(message)
        await this.send_button.click()
    }
    
    async Verify_Message_sent()
    {
        await expect(this.success_message).toBeVisible()
    }

}

