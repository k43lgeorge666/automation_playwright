import { expect, Locator, Page } from "@playwright/test";

export class Our_Courses_Page
{
    private readonly Our_courses_tab:Locator
    private readonly Intro_Kali_image:Locator
    private readonly Osint_image:Locator
    private readonly Offensive_hacking_image:Locator
    private readonly Hacking_web_image:Locator
    private readonly Password_attacks_image:Locator
    private readonly Python_hacking_image:Locator 

    constructor(page:Page)
    {
        this.Our_courses_tab = page.locator('//*[@id="menu-item-544"]/a')
        this.Intro_Kali_image = page.locator("//*[@src='https://cyberplus-academy.com/wp-content/uploads/2023/07/hacking1-scaled.jpg']")
        this.Osint_image = page.locator("//*[@src='https://cyberplus-academy.com/wp-content/uploads/2023/09/OSINT.jpg']")
        this.Offensive_hacking_image = page.locator("//*[@src='https://cyberplus-academy.com/wp-content/uploads/2023/07/binary-black-cyber-2170630.jpg']")
        this.Hacking_web_image = page.locator("//*[@src='https://cyberplus-academy.com/wp-content/uploads/2023/07/Inspekcja-zdarzen.jpg']")
        this.Password_attacks_image = page.locator("//*[@src='https://cyberplus-academy.com/wp-content/uploads/2023/09/password1.jpg']")
        this.Python_hacking_image = page.locator("//*[@src='https://cyberplus-academy.com/wp-content/uploads/2023/09/python-image3.jpg']")

    }

    async Open_Intro_Kali_Course()
    {
        await this.Our_courses_tab.click()
        await this.Intro_Kali_image.click()
    }
    async Open_Osint_Course()
    {
        await this.Our_courses_tab.click()
        await this.Osint_image.click()
    }
    async Open_Offensive_Hacking_Course()
    {
        await this.Our_courses_tab.click()
        await this.Offensive_hacking_image.click()
    }
    async Open_Hacking_Web_Course()
    {
        await this.Our_courses_tab.click()
        await this.Hacking_web_image.click()   
    }
    async Open_Password_Attacks_Course()
    {
        await this.Our_courses_tab.click()
        await this.Password_attacks_image.click()
    }
    async Open_Python_Hacking_course()
    {
        await this.Our_courses_tab.click()
        await this.Python_hacking_image.click()
    }
}