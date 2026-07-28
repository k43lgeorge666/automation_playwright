import { expect, Locator, Page } from "@playwright/test";
import { URL_Page } from "../PageURL/URL_Page";

export class Buy_Products
{
    private readonly Product_details:Locator
    private readonly Product_quantity:Locator
    private readonly Add_to_cart_button:Locator
    private readonly View_cart_link:Locator
    private readonly Proceed_checkout_button:Locator
    private readonly Place_order_button:Locator
    private readonly Name_card_field:Locator
    private readonly Card_number_field:Locator
    private readonly CVC_field:Locator
    private readonly Expiration_month_field:Locator
    private readonly Expiration_year_field:Locator
    private readonly Pay_Confirm_button:Locator
    private readonly Confirmation_message:Locator
    private readonly Login_before_message:Locator
    private readonly Product_image1:Locator
    private readonly Product_image2:Locator
    private readonly Product_image3:Locator
    private readonly Add_to_cart1:Locator
    private readonly Add_to_cart2:Locator
    private readonly Add_to_cart3:Locator
    private readonly Continue_shopping_button:Locator
    private readonly Remove_item_button:Locator
    private readonly Cart_empty_text:Locator

    constructor(page:Page)
    {
        this.Product_details = page.locator("//*[@href='/product_details/30']")
        this.Product_quantity = page.locator("//*[@id='quantity']")
        this.Add_to_cart_button = page.locator("//*[@class='btn btn-default cart']")
        this.View_cart_link = page.locator("//*[contains(text(),'View Cart')]")
        this.Proceed_checkout_button = page.locator("//*[@class='btn btn-default check_out']")
        this.Place_order_button = page.locator("//*[contains(text(),'Place Order')]")
        this.Name_card_field = page.locator("//*[@name='name_on_card']")
        this.Card_number_field = page.locator("//*[@name='card_number']")
        this.CVC_field = page.locator("//*[@name='cvc']")
        this.Expiration_month_field = page.locator("//*[@name='expiry_month']")
        this.Expiration_year_field = page.locator("//*[@name='expiry_year']")
        this.Pay_Confirm_button = page.locator("//*[@id='submit']")
        this.Confirmation_message = page.locator("//*[contains(text(),'Order Placed!')]")
        this.Login_before_message = page.locator("//*[contains(text(),'Register / Login account to proceed on checkout.')]")
        this.Product_image1 = page.locator("//*[@src='/get_product_picture/1']")
        this.Product_image2 = page.locator("//*[@src='/get_product_picture/8']")
        this.Product_image3 = page.locator("//*[@src='/get_product_picture/6']")
        this.Add_to_cart1 = page.locator("//div[@class='features_items']//div[2]//div[1]//div[1]//div[2]//div[1]//a[1]")
        this.Add_to_cart2 = page.locator("//div[9]//div[1]//div[1]//div[2]//div[1]//a[1]")
        this.Add_to_cart3 = page.locator("//div[7]//div[1]//div[1]//div[2]//div[1]//a[1]")
        this.Continue_shopping_button = page.locator("//*[@class='btn btn-success close-modal btn-block']")
        this.Remove_item_button = page.locator("//*[@class='cart_quantity_delete']")
        this.Cart_empty_text = page.locator("//*[contains(text(),'Cart is empty!')]")
    }
    
    async Buy_a_Product(quantity:string, card_name:string, card_number:string, cvc:string, expiry_month:string, expiry_year:string)
    {
        await this.Product_details.click()
        await this.Product_quantity.fill(quantity)
        await this.Add_to_cart_button.click()
        await this.View_cart_link.click()
        await this.Proceed_checkout_button.click()
        await this.Place_order_button.click()
        await this.Name_card_field.fill(card_name)
        await this.Card_number_field.fill(card_number)
        await this.CVC_field.fill(cvc)
        await this.Expiration_month_field.fill(expiry_month)
        await this.Expiration_year_field.fill(expiry_year)
        await this.Pay_Confirm_button.click()
        
    }
    async Verify_Payment()
    {
        await expect(this.Confirmation_message).toBeVisible()   
    }
    async Login_before_checkout(quantity:string)
    {
        await this.Product_details.click()
        await this.Product_quantity.fill(quantity)
        await this.Add_to_cart_button.click()
        await this.View_cart_link.click()
        await this.Proceed_checkout_button.click()
        await expect(this.Login_before_message).toBeVisible()
    }
  
    async Add_Product1()
    {
        await this.Product_image1.hover()
        await this.Add_to_cart1.hover()
        await this.Add_to_cart1.click()
        await this.Continue_shopping_button.click()

    }

    async Add_Product2()
    {
        await this.Product_image2.hover()
        await this.Add_to_cart2.hover()
        await this.Add_to_cart2.click()
        await this.Continue_shopping_button.click()
    }

    async Add_Product3()
    {
        await this.Product_image3.hover()
        await this.Add_to_cart3.hover
        await this.Add_to_cart3.click()
        await this.View_cart_link.click()
        await this.Proceed_checkout_button.click()
    }
    
    async Remove_item()
    {
        await this.Product_image1.hover()
        await this.Add_to_cart1.hover
        await this.Add_to_cart1.click()
        await this.View_cart_link.click()
        await this.Remove_item_button.click()
    }

    async Verify_item_removed()
    {
        await expect(this.Cart_empty_text).toBeVisible()
    }
    
    async Buy_many_products(card_name:string, card_number:string, cvc:string, expiry_month:string, expiry_year:string)
    {
        await this.Place_order_button.click()
        await this.Name_card_field.fill(card_name)
        await this.Card_number_field.fill(card_number)
        await this.CVC_field.fill(cvc)
        await this.Expiration_month_field.fill(expiry_month)
        await this.Expiration_year_field.fill(expiry_year)
        await this.Pay_Confirm_button.click()
    }

}