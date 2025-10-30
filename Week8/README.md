# Weather API Express Server

This project is a simple Express.js server that provides weather information via a RESTful API. It is structured for clarity and easy extensibility, making it suitable for learning, prototyping, or as a starting point for more complex applications.

## Features
- **Express.js** server setup
- Modular route handling for weather data
- Centralized configuration management
- Ready for testing and further development

## Project Structure
```
Week8/
├── src/
│   ├── app.js              # Main Express server entry point
│   ├── config/
│   │   └── index.js        # Configuration (e.g., port)
│   └── routes/
│       └── weather.js      # Weather API route
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Week8
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
Start the server with:
```bash
npm start
```
By default, the server runs on `http://localhost:3000` (or the port specified in your config).

### API Usage
#### GET /weather
Fetches weather information (example endpoint).

**Request:**
```
GET /weather
```

**Response:**
```
{
  "location": "Sample City",
  "temperature": 25,
  "condition": "Sunny"
}
```

## Configuration
Edit `src/config/index.js` to change the server port or add more configuration options.

## Testing
The server is designed to be testable. You can import the Express app from `src/app.js` in your test files.

## License
MIT (or specify your license)
