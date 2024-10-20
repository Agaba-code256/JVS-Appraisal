const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the login page
    await driver.get('http://localhost:3000'); // Adjust the URL as needed

    // Enter email
    await driver.findElement(By.id('email')).sendKeys('valid@example.com');

    // Enter password
    await driver.findElement(By.id('password')).sendKeys('validpassword');

    // Click login button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for redirection and check the URL
    await driver.wait(until.urlContains('/employee/landing'), 5000);

    // Verify successful login by checking for a specific element on the landing page
    let element = await driver.findElement(By.css('.some-unique-element'));
    console.log(await element.isDisplayed());
  } finally {
    await driver.quit();
  }
}

testLogin();
