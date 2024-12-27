// app.js

// Importing the books array from books.js
import books from "./books.js";

// Use Array.map to generate summaries by calling getSummary for each book
const bookSummaries = books.map((book) => book.getSummary());

// Log the book summaries to the console
console.log("Book Summaries:");
bookSummaries.forEach((summary, index) => {
  console.log(`${index + 1}. ${summary}`);
});

  