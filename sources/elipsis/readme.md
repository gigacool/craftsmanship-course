# User Story
## Being able to preserve page formatting when text is too large

 ## Description
 As a developer, I need an **Elipsis** react component that will wrap text content so that texts too long be shorten for a proper display and text does not occupy  
 more space than dedicated by default in a UI. 
 
 ## Acceptance criteria
 
- Elipsis is a react component that can be used as a typical react component
- Elipsis component provides a property named **content** that represents the full text to be encapsulated
- Elipsis component provides a property **max-length** that defines the maximum number of characters rendered in the text rendered
- Default max-length value is **20**
- max-length cannot be shorter than **2**
- When text length is > max length, text is cut and an elipsis unicode character (...) is added
- a tooltip containing full text is provided when text is shorten
- when user click on text shorten, the full text is rendered. Clicking again toggle back to shorten text

