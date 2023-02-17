# Readme

## Introduction

- I have decided to build this project with handlebars as a templating engine.
  When you run the project please see my component at the following address: `http://localhost:3000/handlebars`
- Comments have been left throughout the code I worked on to show my thought process.

## Getting started

- Clone the repository and run `npm install` of the project.
- Run `npm start`, this will remove the previous dist file and rebuild.
- You can see the project on `http://localhost:3000/handlebars`.
- Run `npm run test` to see all my tests for `app.js` passing.

## Steps taken

- Set up tooling using eslint, husky, lint-staged and prettier. Custom hooks for lint-staged set up on a husky pre-commit hook and linting all files and running all tests on a pre-push hook.
- I then proceded to write a get request to the stocks api for the relavant query parameters.
- This data was then passed to my handlebars template where I iterated through the items that were returned and formatted information about each stock accordingly.
- From here I rendered this template server side using express-handlebars.
- All javascript to retrieve data from the API and present templates that would be loaded on page load was written server side to minimise the amount of javascript having to be loaded on the client side and this has greatly improved performance.
- Any synamic styling and formatting has been handled client side as firstly this is a more scalable solution as this will prove easier to edit but also as these changes were small there would not be a serious runtime overhead using this approach.
- The approach of doing most of the work server side and minor formatting adjustments client side has been a good overall approach that has allowed me to guarentee a Lighthouse performance score of 100% on this web page.

### Other things to note

- The page was kept responsive by using `width:clamp()` for `font-size`.
- The page has a 100% across the board for Lighthouse showing that accessibility, performance and SEO were taken into account.
- The client-side javascript was written without and frameworks. Instead of using hooks or similar from a library such as React all I needed to use was one event listener that would format everything in needed to once all the DOM nodes were successfully loaded

### Areas for improvement

- More unit testing:
  As I ran out of time to complete unit testing for the client I would like to include this in future. I thought it was a better use of time to focus on testing the validity of the data retrieved from the API and test potential edge cases that could cause bugs down the line.
- Type checking:
  This project was written in javascript but it could be migrated to typescript, potentially using a schema library like Zod to guarentee that the data coming in from the API was exactly how I would want to receive it.
- Excessive data being passed through:
  The response from the API contained a lot of data that I did not need to use. Perhaps using graphQL as an alternative to restful HTTP requests would have allowed me to get back only the data that I needed to use.
- Interactivity: Whilst I completed the assignment, there was data that I didn't use. Maybe I could create a toggle between daily and weekly stock takes to use more data and give users a broader context of the state of the stocks over a longer period of time.
