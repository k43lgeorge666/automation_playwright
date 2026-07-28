import { expect, Locator, Page } from "@playwright/test";

export class Search_Product
{
    private readonly Products_option:Locator
    private readonly Search_product_field:Locator
    private readonly Submit_search:Locator
    private readonly Get_products_picture:Locator
    private readonly Product_details:Locator
    private readonly Name_field:Locator
    private readonly Email_field:Locator
    private readonly Review_field:Locator
    private readonly Submit_button:Locator
    private readonly Review_message:Locator

    constructor(page:Page)
    {
        this.Products_option = page.locator("//*[@href='/products']")
        this.Search_product_field = page.locator("//*[@id='search_product']")
        this.Submit_search = page.locator("//*[@id='submit_search']")
        this.Get_products_picture = page.locator("//*[@src='/get_product_picture/30']")
        this.Product_details = page.locator("//*[@href='/product_details/30']")
        this.Name_field = page.locator("//*[@id='name']")
        this.Email_field = page.locator("//*[@id='email']")
        this.Review_field = page.locator("//*[@id='review']")
        this.Submit_button = page.locator("//*[@id='button-review']")
        this.Review_message = page.locator("//*[contains(text(),'Thank you for your review.')]")
    }
    async Search_a_Product(product_name:string)
    {
        await this.Products_option.click()
        await this.Search_product_field.fill(product_name)
        await this.Submit_search.click()
    }
    async Verify_product_found()
    {
        await expect(this.Get_products_picture).toBeVisible()
    }
    async Submit_a_review(name:string, email:string, review_text:string)
    {
        await this.Product_details.click()
        await this.Name_field.fill(name)
        await this.Email_field.fill(email)
        await this.Review_field.fill(review_text)
        await this.Submit_button.click()
    }
     async Verify_Review_Sent()
    {
        await expect(this.Review_message).toBeVisible()
    }
}