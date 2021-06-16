Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

  Scenario Outline: Search for <PositionName> in <City>
  Given the career page is opened
  Then the cookie bar should be closed
  And the logo should be visible
  And search form should be visible
  

  When <Country> and <City> selected in the location filter box
  Then the <City> should be selected

  When <Department> selected in the department filter box
  Then the <Department> should be selected

  When the search button is clicked
  Then should have a proper job found for <PositionName>
  And should have <PositionName> the proper location <City>, <Country>
  And should have <PositionName> with description
  And should have <PositionName> apply button
  
  When the apply button for <PositionName> is clicked
  Then should have description in the position of <PositionName>
  And should have <City> or <Country> in the description

  Examples:
    | Country | City     | Department                | PositionName                |
    | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer    |
    | Belarus | Minsk    | Software Architecture     | Digital Solutions Architect |