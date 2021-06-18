Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Search for <PositionName> in <City>
  Given the career page is opened
  Then the cookie bar should be closed
  And the "logo" should be visible
  And the "search_form" should be visible
  
  When <Country> and <City> selected in the location filter box
  Then the <City> location should be selected

  When <Department> selected in the department filter box
  Then the <Department> department should be selected

  When the search button is clicked
  Then should have a proper job found for <PositionName> position
  And the proper location in the <Hit>th result should be <City>
  And in the <Hit>th result description should be visible
  And apply button should be visible for <PositionName> position
  
  When the apply button for <PositionName> is clicked
  Then should have <PositionName> position name in the job description
  And should have <City> city in the job description
  Examples:
    | Country | City     | Department                | PositionName                | Hit |
    | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer    | 5   |
    | Belarus | Minsk    | Software Architecture     | Digital Solutions Architect | 4   |