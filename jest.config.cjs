module.exports = {
    testEnvironment: 'jsdom',
  
    transform: {
        "^.+\\.jsx?$": "babel-jest"
      },
      moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js',
      },
    };
 
  