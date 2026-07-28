import { expect, Locator, Page } from "@playwright/test";

export class Page_URL
{
    private readonly page: Page

    constructor(page:Page)
    {
        this.page = page
    }
    async GetURL()
    {
        await this.page.goto("https://cyberplus-academy.com/")
    }

}