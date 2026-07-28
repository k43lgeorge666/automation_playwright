import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/PageURL/URL_Page'
import { Contact_us } from '../../PageObjects/Contact_Us/Contact_us'
import {faker} from '@faker-js/faker'

const waiting_time = 3000

test('Send a Message',async({page})=>
{
    const get_url = new URL_Page(page)
    const submit_message = new Contact_us(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    submit_message.Send_Message(faker.person.firstName(), faker.internet.email(), 
    faker.person.jobTitle(), faker.commerce.productDescription())
    await page.waitForTimeout(10000)
})