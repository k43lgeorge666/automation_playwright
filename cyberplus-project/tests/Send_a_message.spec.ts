import {test, expect} from '@playwright/test'
import { Contact_Page } from '../PageObjects/Contact_Page'
import { Page_URL } from '../PageObjects/Page_URL'
import {faker} from '@faker-js/faker'


const wait_time = 5000

test('Send a message',async({page})=>
{
    const contact_page = new Contact_Page(page)
    const url = new Page_URL(page)

    url.GetURL()
    await page.waitForTimeout(wait_time); 
    contact_page.Sent_a_message(faker.person.fullName(), faker.internet.email(), faker.color.human(), faker.animal.bear())
    contact_page.Verify_Message_sent()
    await page.waitForTimeout(wait_time); 

})