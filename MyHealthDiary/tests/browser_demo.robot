*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Type Text      [name="my-text"]        ${Username}    
    Type Secret    [name="my-password"]    $Password      
    Type Text      [name="my-textarea"]    ${Message}     
    Click With Options    button    delay=2 s
    Get Text       id=message    ==    Received!


Test Text input
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form 
    Type Text      [name="my-text"]    ${Username}    delay=0.1 s



Test Text And Password Fields
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    # Tekstikenttä
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s

    # Salasanakenttä
    Type Secret    [name="my-password"]    $Password    delay=0.1 s


Test textarea  
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Type Text      [name="my-textarea"]     ${Message}      delay=0.2s

Test Dropdown Field (select)
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Select Options By    [name="my-select"]    value    2   delay=0.3s

Test Dropdown Field (datalist)
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Type Text    [name="my-datalist"]   Seattle  delay=0.2s

Test Checkbox Field
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Check Checkbox    id=my-check-2   
    Sleep       1   s   

Test Radio Button Field
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Click    id=my-radio-2
    Sleep    1 s 

Test File Upload Field
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Click    [name="my-file"]
    Sleep    1 s

#Värin testaaminen ei ole toistaiseksi onnistunut
#Test Color Picker Field
    #New Browser    chromium    headless=No
    #New Page       https://www.selenium.dev/selenium/web/web-form.html
    #Get Title      ==    Web form

    #Execute JavaScript    document.getElementsByName('my-colors')[0].value = '#F014D3'

    #Type color    [name="my-colors"]    #F014D3

Test Date Field
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Type Text    [name="my-date"]    2025-03-25    delay=0.2 s  

Test Range Field
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Fill Text    [name="my-range"]    10


Test Submit Button
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Get Title      ==    Web form

    Click    text=Submit
    Get Text    id=message    ==    Received!

