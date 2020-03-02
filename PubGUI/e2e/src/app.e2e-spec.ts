import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  browser.driver.manage().window().maximize();
  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('PubGUI');
  });

  it('should be redirected to /register route', () => {
    browser.element(by.css('.register-button')).click();
    expect(browser.getCurrentUrl()).toContain('/register');
    browser.driver.sleep(2000);
  });

  it('should be able to register user', () => {
    browser.element(by.id('username')).sendKeys('test123');
    browser.driver.sleep(500);
    browser.element(by.id('email')).sendKeys('test123');
    browser.driver.sleep(500);
    browser.element(by.id('password')).sendKeys('test123');
    browser.driver.sleep(500);
    browser.element(by.css('.register-user')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
    browser.driver.sleep(1000);
  });

  it('should be able to login user', () => {
    browser.element(by.id('username')).sendKeys('test123');
    browser.driver.sleep(500);
    browser.element(by.id('password')).sendKeys('test123');
    browser.driver.sleep(500);
    browser.element(by.css('.login-click')).click();
    expect(browser.getCurrentUrl()).toContain('/tournaments');
    browser.driver.sleep(1000);
  });

  it('should be able to view tournament matches', () => {
    browser.driver.sleep(1000);
    browser.element(by.css('.viewmatches')).click();
    browser.driver.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/matches');
  });

  it('should be able to add Match to FavouriteList', () => {
    browser.driver.sleep(1000);
    browser.element(by.css('.view-match-detail')).click();
    browser.driver.sleep(2000);
    browser.element(by.css('.addButton')).click();
    expect(browser.getCurrentUrl()).toContain('/match');
  });

  it('should be able to View FavouriteList', () => {
    browser.driver.sleep(2000);
    browser.element(by.css('.mat-button-favouritematch')).click();
    expect(browser.getCurrentUrl()).toContain('/favouritelist');
  });

  it('should be able to open dialogbox to update comments from FavouriteList', () => {
    browser.driver.sleep(2000);
    browser.element(by.css('.updatebutton')).click();
    expect(browser.getCurrentUrl()).toContain('/favouritelist');
    browser.driver.sleep(1000);
  });


  it('should be able to save updated comments to FavouriteList', () => {
    browser.element(by.css('.matInput')).sendKeys("New Comments");
    browser.driver.sleep(1000);
    browser.element(by.css('.updateCommentdemo')).click();
    browser.driver.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/favouritelist');
  });

  it('should be able to delete from FavouriteList', () => {
    browser.driver.sleep(2000);
    browser.element(by.css('.deletebutton')).click();
    browser.driver.sleep(2000);
    expect(browser.getCurrentUrl()).toContain('/favouritelist');
  });


  it('should be able to logout from application', () => {
    browser.driver.sleep(1000);
    browser.element(by.css('.mat-button-logout')).click();
    browser.driver.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('/login');
  });

});
