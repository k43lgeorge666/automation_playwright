import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/PageURL/URL_Page'
import { Search_Product } from '../../PageObjects/Search_Products/Search_Product'
import { Buy_Products } from '../../PageObjects/Buy_Products/Buy_Products'
import {faker} from '@faker-js/faker'
import { LoginPage } from '../../PageObjects/Login_Page/LoginPage'


const waiting_time = 3000
const product_name = "polo"
const username = "ssadasd@gmail.com"
const password = "admin123"

test('Buy a Product',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)
    const search = new Search_Product(page)
    const add_product = new Buy_Products(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User(username,password)
    await search.Search_a_Product(product_name)
    await page.waitForTimeout(waiting_time)

    await add_product.Buy_a_Product(faker.number.int({min: 1, max: 10}).toString(), faker.finance.creditCardIssuer(), 
    faker.finance.creditCardNumber(), faker.finance.creditCardCVV(), '02', '2027')
    
    await page.waitForTimeout(waiting_time)
    await add_product.Verify_Payment()
})

test('Login user before to checkout',async({page})=>
{
    const get_url = new URL_Page(page)
    const search = new Search_Product(page)
    const add_product = new Buy_Products(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await search.Search_a_Product(product_name)
    await page.waitForTimeout(waiting_time)
    await add_product.Login_before_checkout(faker.number.int({min: 1, max: 10}).toString())
})

test('Buy many products',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)
    const add_product = new Buy_Products(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User(username,password)
    await page.waitForTimeout(waiting_time)

    add_product.Add_Product1()
    await page.waitForTimeout(waiting_time)
    add_product.Add_Product2()
    await page.waitForTimeout(waiting_time)
    add_product.Add_Product3()
    await page.waitForTimeout(waiting_time)
    add_product.Buy_many_products(faker.finance.creditCardIssuer(), 
    faker.finance.creditCardNumber(), faker.finance.creditCardCVV(), '02', '2027')
    await page.waitForTimeout(waiting_time)
    await add_product.Verify_Payment()
   
})

test('Remove an item from cart',async({page})=>
{
    const get_url = new URL_Page(page)
    const login_user = new LoginPage(page)
    const add_product = new Buy_Products(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await login_user.Login_User(username,password)
    await page.waitForTimeout(waiting_time)

    add_product.Remove_item()
    await page.waitForTimeout(waiting_time)
    add_product.Verify_item_removed()

})
