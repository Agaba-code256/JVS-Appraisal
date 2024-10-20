const { Builder, By, until } = require('selenium-webdriver');

async function testNavigation() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the employee dashboard
    await driver.get('http://localhost:3000/employee/landing'); // Adjust the URL as needed

    // Click on the "Personal Data" link
    await driver.findElement(By.linkText('Personal Data')).click();

    // Wait for the page to load and check the URL
    await driver.wait(until.urlContains('/employee/personaldata'), 5000);

    // Verify the page by checking for a specific element
    let element = await driver.findElement(By.css('.personal-data-element'));
    console.log(await element.isDisplayed());
  } finally {
    await driver.quit();
  }
}

testNavigation();
