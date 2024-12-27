// books.js

// Constructor Function for Book
function Book(title, author, year) {
    this.title = title; // Title of the book
    this.author = author; // Author of the book
    this.year = year; // Publication year
  }
  
  // Adding getSummary method to the Book prototype
  Book.prototype.getSummary = function () {
    return `${this.title} by ${this.author}, published in ${this.year}`;
  };
  
  // Array of Book instances
  const books = [
    new Book("To Kill a Mockingbird", "Harper Lee", 1960),
    new Book("1984", "George Orwell", 1949),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
    new Book("Pride and Prejudice", "Jane Austen", 1813),
  ];
  
  // Export the books array
  export default books;

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

  