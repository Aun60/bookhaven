// Mock initial book data
import i1 from './Images/i1.jpg'
import i2 from './Images/i2.jpg'
import i3 from './Images/i3.jpg'
import i4 from './Images/i4.jpg'
import i5 from './Images/i5.jpg'
let BOOKS = [
    {
      id: 1,
      title: 'Between the Water and the Woods',
      author: 'Simone Snaith',
      cover: i1,
      description: 'A story of wealth, love, and the American Dream in the 1920s.',
      price: 9.99,
      category: 'Fantasy',
      yearPublished: 1925,
      reviews: [
        { id: 1, userId: 1, userName: 'Partham Kumar', rating: 5, comment: 'A timeless classic!', date: '2025-02-15' }
      ]
    },
    {
      id: 2,
      title: 'The Child Thief',
      author: 'Brom',
      cover: i2,
      description: 'Peter is quick, daring, and full of mischief—and like all boys, he loves to play, though his games often end in blood.',
      price: 16.49,
      category: 'Fiction',
      yearPublished: 1960,
      reviews: []
    },
    {
      id: 3,
      title: 'The Graveyard Book',
      author: 'Neil Gaiman',
      cover: i3,
      description: 'Nobody Owens, known to his friends as Bod, is a perfectly normal boy. Well, he would be perfectly normal if he did not live in a graveyard, being raised and educated by ghosts, with a solitary guardian who belongs to neither the world of the living nor the world of the dead.',
      price: 14.99,
      category: 'Horror',
      yearPublished: 1937,
      reviews: [
        { id: 2, userId: 1, userName: 'Partham Kumar', rating: 4, comment: 'Great fantasy adventure!', date: '2025-01-20' }
      ]
    },
    {
        id: 4,
        title: 'Snow & Rose',
        author: 'Emily Winfield Martin',
        cover: i4,
        description: 'A New York Times bestselling author-illustrator brings readers into the woods to meet two young sisters and a strange bit of magic in this reimagining of the classic but little-known fairy tale "Snow White and Rose Red.',
        price: 7.99,
        category: 'Fiction',
        yearPublished: 1947,
        reviews: [
          { id: 2, userId: 1, userName: 'Partham Kumar', rating: 4, comment: 'Great fantasy adventure!', date: '2025-01-20' }
        ]
      },
      {
          id: 5,
          title: 'The Nest',
          author: 'Kenneth Oppel',
          cover: i5,
          description: 'For some kids summer is a sun-soaked season of fun. But for Steve, it’s just another season of worries. Worries about his sick newborn baby brother who is fighting to survive, worries about his parents who are struggling to cope, even worries about the wasp’s nest looming ominously from the eaves.',
          price: 15.00,
          category: 'Fiction',
          yearPublished: 1980,
          
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
    
    // In a real app, we would get userId and userName from the token
    // Here we'll use Partham Kumar data from our mock implementation
    const newReview = {
      id: book.reviews.length > 0 ? Math.max(...book.reviews.map(review => review.id)) + 1 : 1,
      userId: 1,
      userName: 'Partham Kumar',
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