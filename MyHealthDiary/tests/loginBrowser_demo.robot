*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    loginKeywords.robot  

*** Test Cases ***
Test LogIn
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/
    Click With Options    css=a.openModal    delay=2s

    Get Title      ==    HyteGym sivusto   
    Type Text      id=username        ${Username}    delay=0.1 s 
    Type Secret    id=password   $Password      delay=0.1 s
    Click With Options    id=btn-login    delay=2 s
    