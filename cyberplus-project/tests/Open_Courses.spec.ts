import {test, expect} from '@playwright/test'
import { Page_URL } from '../PageObjects/Page_URL'
import { Our_Courses_Page } from '../PageObjects/Our_Courses_Page'


const wait_time = 5000


test('Open Intro to Kali Linux course PDF',async({page})=>
{
    const url = new Page_URL(page)
    const url_opened = "https://cyberplus-academy.com/wp-content/uploads/2023/09/Introduccion-Kali-Linux.pdf"
    const kali_linux_course = new Our_Courses_Page(page)

    url.GetURL()
    await page.waitForTimeout(wait_time);

    const newTabPromise = page.context().waitForEvent('page')
    await kali_linux_course.Open_Intro_Kali_Course()
    const newTab = await newTabPromise
    await newTab.waitForLoadState('networkidle')
    await expect(newTab).toHaveURL(url_opened)

    await page.waitForTimeout(wait_time); 
})

test('Open OSINT Course PDF',async({page})=>
{
    const url = new Page_URL(page)
    const url_opened = "https://cyberplus-academy.com/wp-content/uploads/2023/09/OSINT-Hacking.pdf"
    const kali_linux_course = new Our_Courses_Page(page)

    url.GetURL()
    await page.waitForTimeout(wait_time);

    const newTabPromise = page.context().waitForEvent('page')
    await kali_linux_course.Open_Osint_Course()
    const newTab = await newTabPromise
    await newTab.waitForLoadState('networkidle')
    await expect(newTab).toHaveURL(url_opened)

    await page.waitForTimeout(wait_time); 
})

test('Open Offensive Hacking course PDF',async({page})=>
{
    const url = new Page_URL(page)
    const url_opened = "https://cyberplus-academy.com/wp-content/uploads/2023/09/Seguridad-Ofensiva.pdf"
    const kali_linux_course = new Our_Courses_Page(page)

    url.GetURL()
    await page.waitForTimeout(wait_time);

    const newTabPromise = page.context().waitForEvent('page')
    await kali_linux_course.Open_Offensive_Hacking_Course()
    const newTab = await newTabPromise
    await newTab.waitForLoadState('networkidle')
    await expect(newTab).toHaveURL(url_opened)

    await page.waitForTimeout(wait_time); 
})

test('Open Web Hacking Course PDF',async({page})=>
{
    const url = new Page_URL(page)
    const url_opened = "https://cyberplus-academy.com/wp-content/uploads/2023/09/Hacking-en-Tecnologias-web.pdf"
    const kali_linux_course = new Our_Courses_Page(page)

    url.GetURL()
    await page.waitForTimeout(wait_time);

    const newTabPromise = page.context().waitForEvent('page')
    await kali_linux_course.Open_Hacking_Web_Course()
    const newTab = await newTabPromise
    await newTab.waitForLoadState('networkidle')
    await expect(newTab).toHaveURL(url_opened)

    await page.waitForTimeout(wait_time); 
})

test('Open Password Attacks course PDF',async({page})=>
{
    const url = new Page_URL(page)
    const url_opened = "https://cyberplus-academy.com/wp-content/uploads/2023/09/Ataques-a-contrasenas-en-windows-linux.pdf"
    const kali_linux_course = new Our_Courses_Page(page)

    url.GetURL()
    await page.waitForTimeout(wait_time);

    const newTabPromise = page.context().waitForEvent('page')
    await kali_linux_course.Open_Password_Attacks_Course()
    const newTab = await newTabPromise
    await newTab.waitForLoadState('networkidle')
    await expect(newTab).toHaveURL(url_opened)

    await page.waitForTimeout(wait_time); 
})

test('Open Python Hacking course PDF',async({page})=>
{
    const url = new Page_URL(page)
    const url_opened = "https://cyberplus-academy.com/wp-content/uploads/2023/09/Hacking-con-Python.pdf"
    const kali_linux_course = new Our_Courses_Page(page)

    url.GetURL()
    await page.waitForTimeout(wait_time);

    const newTabPromise = page.context().waitForEvent('page')
    await kali_linux_course.Open_Python_Hacking_course()
    const newTab = await newTabPromise
    await newTab.waitForLoadState('networkidle')
    await expect(newTab).toHaveURL(url_opened)

    await page.waitForTimeout(wait_time); 
})