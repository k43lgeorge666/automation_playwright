import { expect, Locator, Page } from "@playwright/test";

export class Signup_Page
{
     private readonly Signup_Login_option:Locator
     private readonly Signup_name_field:Locator
     private readonly Signup_email_field:Locator
     private readonly Signup_button:Locator
     private readonly Gender_radio_button:Locator
     private readonly Password_field:Locator
     private readonly Days_dropdown:Locator
     private readonly Month_dropdown:Locator
     private readonly Years_dropdown:Locator
     private readonly NewsLetter_radio_button:Locator
     private readonly Subscribe_radio_button:Locator
     private readonly Firstname_field:Locator
     private readonly Lastname_field:Locator
     private readonly Company_field:Locator
     private readonly Address_field:Locator
     private readonly Country_field:Locator
     private readonly State_field:Locator
     private readonly City_field:Locator
     private readonly ZipCode_field:Locator
     private readonly Mobile_number_field:Locator
     private readonly Create_account_button:Locator
     private readonly Account_created_message:Locator
     private readonly Existed_email_message:Locator

     constructor(page:Page)
     {
        this.Signup_Login_option = page.locator("//*[@href='/login']")
        this.Signup_name_field = page.locator("//*[@data-qa='signup-name']")
        this.Signup_email_field = page.locator("//*[@data-qa='signup-email']")
        this.Signup_button = page.locator("//*[@data-qa='signup-button']")
        this.Gender_radio_button = page.locator("//*[@id='id_gender1']")
        this.Password_field = page.locator("//*[@id='password']")
        this.Days_dropdown = page.locator("//*[@id='days']")
        this.Month_dropdown = page.locator("//*[@id='months']")
        this.Years_dropdown = page.locator("//*[@id='years']")
        this.NewsLetter_radio_button = page.locator("//*[@id='newsletter']")
        this.Subscribe_radio_button = page.locator("//*[@id='optin']")
        this.Firstname_field = page.locator("//*[@id='first_name']")
        this.Lastname_field = page.locator("//*[@id='last_name']")
        this.Company_field = page.locator("//*[@id='company']")
        this.Address_field = page.locator("//*[@id='address1']")
        this.Country_field = page.locator("//*[@id='country']")
        this.State_field = page.locator("//*[@id='state']")
        this.City_field = page.locator("//*[@id='city']")
        this.ZipCode_field = page.locator("//*[@id='zipcode']")
        this.Mobile_number_field = page.locator("//*[@id='mobile_number']")
        this.Create_account_button = page.locator("//*[@data-qa='create-account']")
        this.Account_created_message = page.locator("//*[contains(text(),'Account Created!')]")
        this.Existed_email_message = page.locator("//*[contains(text(),'Email Address already exist!')]")
     }

     async Register_new_user(signup_name:string, email:string, password:string, days:string, month:string, 
      year:string, first_name:string, lastname:string, company:string, address:string, country:string, 
      state:string, city:string, zipcode:string, mobile_number:string)
     {
         await this.Signup_Login_option.click()
         await this.Signup_name_field.fill(signup_name)
         await this.Signup_email_field.fill(email)
         await this.Signup_button.click()
         await this.Gender_radio_button.click()
         await this.Password_field.fill(password)
         await this.Days_dropdown.selectOption(days)
         await this.Month_dropdown.selectOption(month)
         await this.Years_dropdown.selectOption(year)
         await this.NewsLetter_radio_button.click()
         await this.Subscribe_radio_button.click()
         await this.Firstname_field.fill(first_name)
         await this.Lastname_field.fill(lastname)
         await this.Company_field.fill(company)
         await this.Address_field.fill(address)
         await this.Country_field.selectOption(country)
         await this.State_field.fill(state)
         await this.City_field.fill(city)
         await this.ZipCode_field.fill(zipcode)
         await this.Mobile_number_field.fill(mobile_number)
         await this.Create_account_button.click()

         
     }
     async Verify_Account_created()
     {
         await expect(this.Account_created_message).toBeVisible()
     }

     async Provide_existed_email(name:string, email:string)
     {
        await this.Signup_Login_option.click()
        await this.Signup_name_field.fill(name)
        await this.Signup_email_field.fill(email)
        await this.Signup_button.click()
     }
     async Verify_existed_email_message()
     {
        await expect(this.Existed_email_message).toBeVisible()
     }

}