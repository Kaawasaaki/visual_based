from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True
driver = webdriver.Chrome(options=options)

driver.get("https://www.instagram.com/accounts/login")

html = driver.page_source

with open("instagram.html", "w", encoding="utf-8") as f:
    f.write(html)

driver.quit()
