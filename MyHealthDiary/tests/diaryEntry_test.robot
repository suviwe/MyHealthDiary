*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    loginKeywords.robot  

*** Test Cases ***
Test DiaryEntry
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/
    Click With Options    css=a.openModal    delay=2s

    Get Title      ==    HyteGym sivusto   
    Type Text      id=username        ${Username}    delay=0.1 s 
    Type Secret    id=password   $Password      delay=0.1 s
    Click With Options    id=btn-login    delay=2 s
    
    Click With Options      css=.add-diary      delay=2s

    # Täytä lomake
    Type Text    id=entry-date      03-25-2025  delay=0.5s
    Type Text    id=mood    hyvä                delay=0.5s
    Click        label[for="mood4"]
    Sleep   1   s
    Type Text    id=weight          54          delay=0.5s
    Type Text    id=sleep-hours     6           delay=0.5s
    Type Text    id=water-intake    2000        delay=0.5s
    Type Text    id=steps           5000        delay=0.5s
    Type Text    id=notes           Robot testien tekemistä     delay=0.3s

     # Lähetä merkintä
    Click    id=save-entry
    Sleep    2 s

    Click   css=.fetch-entries
    Sleep   2 s