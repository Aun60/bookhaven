// Mock user data - in a real app, this would be stored on a server
const USERS = [
    { id: 1, email: 'Aun@gmail.com', password: '4029', name: 'Aun Ali' }
  ];
  
  // Mock token generation
  const generateToken = (user) => {
    return `mock-jwt-token-${user.id}-${Date.now()}`;
  };
  
  export const login = async (email, password) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = USERS.find(user => user.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    const token = generateToken(user);
    
    // Store token in localStorage
    localStorage.setItem('token', token);
    
    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    return userData;
  };
  
  export const logout = async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    return true;
  };
  
  export const checkAuthStatus = async () => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    

    const userId = parseInt(token.split('-')[2]);
    const user = USERS.find(user => user.id === userId);
    
    if (!user) {
      localStorage.removeItem('token');
      return null;
    }
    
    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    return userData;
  };