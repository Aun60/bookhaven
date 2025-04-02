// Mock initial book data
import cover1 from './Images/i1.jpg'
import cover2 from './Images/i2.jpg'
import cover3 from './Images/i3.jpg'
import cover4 from './Images/i4.jpg'
import cover5 from './Images/i5.jpg'
let BOOKS = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: cover1, // Replace with actual image path or URL
    description: 'A story of wealth, love, and the American Dream in the 1920s.',
    price: 10.99,
    category: 'Classic',
    yearPublished: 1925,
    reviews: [
      { id: 1, userId: 1, userName: 'John Doe', rating: 5, comment: 'A timeless classic!', date: '2025-02-15' }
    ]
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: cover2, // Replace with actual image path or URL
    description: 'A novel about the serious issues of rape and racial inequality told through the eyes of a child.',
    price: 7.99,
    category: 'Fiction',
    yearPublished: 1960,
    reviews: []
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    cover: cover3, // Replace with actual image path or URL
    description: 'A dystopian novel set in a totalitarian society under constant surveillance.',
    price: 8.99,
    category: 'Dystopian',
    yearPublished: 1949,
    reviews: [
      { id: 2, userId: 2, userName: 'Jane Smith', rating: 4, comment: 'A chilling depiction of the future.', date: '2025-01-20' }
    ]
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: cover4, // Replace with actual image path or URL
    description: 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.',
    price: 6.99,
    category: 'Romance',
    yearPublished: 1813,
    reviews: [
      { id: 3, userId: 3, userName: 'Alice Johnson', rating: 5, comment: 'An all-time favorite.', date: '2025-03-10' }
    ]
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    cover: cover5, // Replace with actual image path or URL
    description: 'A story about adolescent alienation and loss of innocence in the protagonist Holden Caulfield.',
    price: 9.50,
    category: 'Literature',
    yearPublished: 1951,
    reviews: []
  }
];

  
  export const getBooks = async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...BOOKS];
  };
  
  export const getBookById = async (id) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const book = BOOKS.find(book => book.id === parseInt(id));
    
    if (!book) {
      throw new Error('Book not found');
    }
    
    return { ...book };
  };
  
  export const addBook = async (bookData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for authorization
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    
    const newBook = {
      ...bookData,
      id: BOOKS.length > 0 ? Math.max(...BOOKS.map(book => book.id)) + 1 : 1,
      reviews: []
    };
    
    BOOKS.push(newBook);
    
    return { ...newBook };
  };
  
  export const addReview = async (bookId, reviewData) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check for authorization
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Unauthorized');
    }
    
    const book = BOOKS.find(book => book.id === parseInt(bookId));
    
    if (!book) {
      throw new Error('Book not found');
    }
    
    const newReview = {
      id: book.reviews.length > 0 ? Math.max(...book.reviews.map(review => review.id)) + 1 : 1,
      userId: 1,
      userName: 'Aun Ali',
      ...reviewData,
      date: new Date().toISOString().split('T')[0]
    };
    
    book.reviews.push(newReview);
    
    return { ...book };
  };
  
  export const searchBooks = async (query) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const searchTerm = query.toLowerCase();
    
    const results = BOOKS.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) ||
      book.description.toLowerCase().includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm)
    );
    
    return [...results];
  };