import {test, expect} from '@playwright/test'
import { URL_Page } from '../../PageObjects/PageURL/URL_Page'
import { Signup_Page } from '../../PageObjects/SignUp_Page/Signup_Page'
import {faker} from '@faker-js/faker'

const countries = [
  'India',
  'United States',
  'Canada',
  'Australia',
  'Israel',
  'New Zealand',
  'Singapore',
];

const years = [
  '1995',
  '1996',
  '1997',
  '1998',
  '1999',
  '2000',
  '2001',
  '2002',
  '2003',
  '2004',
  '2005',
  '2006'
];

const waiting_time = 3000
const name = 'juan'
const email = "ssadasd@gmail.com"

const random_year = faker.helpers.arrayElement(years)
const random_country = faker.helpers.arrayElements(countries)

test('Create user Account',async({page})=>
{
    const get_url = new URL_Page(page)
    const signup = new Signup_Page(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await signup.Register_new_user(faker.internet.username(),faker.internet.email(),faker.internet.password(),faker.number.int({min: 1, max: 25}).toString(),
    faker.date.month(),random_year,faker.person.firstName(),
        faker.person.lastName(),faker.company.name(),faker.location.streetAddress(),random_country.toString(),faker.location.city(),faker.location.city(),
        faker.location.zipCode(),faker.phone.number())
    await page.waitForTimeout(waiting_time)
    await signup.Verify_Account_created()

})

test('Signup with an email registered',async({page})=>
{
    const get_url = new URL_Page(page)
    const signup = new Signup_Page(page)

    get_url.GetURL()
    await page.waitForTimeout(waiting_time)
    await signup.Provide_existed_email(name,email)
    await page.waitForTimeout(waiting_time)
    await signup.Verify_existed_email_message()

})