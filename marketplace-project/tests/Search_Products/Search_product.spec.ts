import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/PageURL/URL_Page'
import { Search_Product } from '../../PageObjects/Search_Products/Search_Product'


const waiting_time = 3000
const product_name = "polo"
const name = "george"
const email = "george@gmail.com"
const message = "this is a testing"

test('Search a Product',async({page})=>
{
    const get_url = new URL_Page(page)
    const search = new Search_Product(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await search.Search_a_Product(product_name)
    await page.waitForTimeout(waiting_time)
    await search.Verify_product_found()
})

test('Submit a product review',async({page})=>
{
    const get_url = new URL_Page(page)
    const search = new Search_Product(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await search.Search_a_Product(product_name)
    await page.waitForTimeout(waiting_time)
    
    await search.Submit_a_review(name,email,message)
    await search.Verify_Review_Sent()

})