// Book Constructor
function Book(title, author, isAvailable = true) {
    this.title = title; // Title of the book
    this.author = author; // Author of the book
    this.isAvailable = isAvailable; // Availability status
  }
  
  // Member Constructor
  function Member(name) {
    this.name = name; // Member's name
    this.borrowedBooks = []; // List of borrowed books
  }
  
  // Borrow Book Method (for regular members)
  Member.prototype.borrowBook = function (book) {
    if (this.borrowedBooks.length >= 3) {
      console.log(`${this.name} cannot borrow more than 3 books.`);
      return;
    }
    if (!book.isAvailable) {
      console.log(`The book "${book.title}" is already borrowed.`);
      return;
    }
    book.isAvailable = false; // Mark book as borrowed
    this.borrowedBooks.push(book.title); // Add book to borrowed list
    console.log(`${this.name} borrowed "${book.title}".`);
  };
  
  // PremiumMember Constructor
  function PremiumMember(name) {
    Member.call(this, name); // Inherit properties from Member
    this.specialCollectionAccess = true; // Access to special collections
  }
  
  // Inherit Member prototype
  PremiumMember.prototype = Object.create(Member.prototype);
  PremiumMember.prototype.constructor = PremiumMember;
  
  // Override Borrow Book Method
  PremiumMember.prototype.borrowBook = function (book) {
    if (this.borrowedBooks.length >= 5) {
      console.log(`${this.name} cannot borrow more than 5 books.`);
      return;
    }
    // Call the original borrowBook method from Member
    Member.prototype.borrowBook.call(this, book);
  };
  
  // Create Book Instances
  const book1 = new Book("The Catcher in the Rye", "J.D. Salinger");
  const book2 = new Book("To Kill a Mockingbird", "Harper Lee");
  const book3 = new Book("1984", "George Orwell");
  const book4 = new Book("Moby-Dick", "Herman Melville");
  const book5 = new Book("Pride and Prejudice", "Jane Austen");
  const book6 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
  
  // Create Regular and Premium Members
  const regularMember = new Member("John");
  const premiumMember = new PremiumMember("Alice");
  
  // Regular Member Borrowing Books
  console.log("\nRegular Member:");
  regularMember.borrowBook(book1); // John borrows "The Catcher in the Rye"
  regularMember.borrowBook(book2); // John borrows "To Kill a Mockingbird"
  regularMember.borrowBook(book3); // John borrows "1984"
  regularMember.borrowBook(book4); // John cannot borrow more than 3 books
  
  // Premium Member Borrowing Books
  console.log("\nPremium Member:");
  premiumMember.borrowBook(book4); // Alice borrows "Moby-Dick"
  premiumMember.borrowBook(book5); // Alice borrows "Pride and Prejudice"
  premiumMember.borrowBook(book6); // Alice borrows "The Great Gatsby"
  premiumMember.borrowBook(book1); // Alice cannot borrow "The Catcher in the Rye" (already borrowed)
  premiumMember.borrowBook(book2); // Alice borrows "To Kill a Mockingbird"
  premiumMember.borrowBook(book3); // Alice borrows "1984"
  
  // Bound Function Example
  console.log("\nUsing bind:");
  const borrowForJohn = regularMember.borrowBook.bind(regularMember, book6);
  borrowForJohn(); // John cannot borrow more than 3 books
  