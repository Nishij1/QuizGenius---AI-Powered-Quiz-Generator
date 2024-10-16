# QuizGenius - AI-Powered Quiz Generator

QuizGenius is an interactive web application that generates quizzes on various topics using AI technology. It provides an engaging 3D user interface and allows users to create custom quizzes on the fly.

## Features

- AI-powered quiz generation
- Interactive 3D background
- Customizable quiz topics and number of questions
- Real-time quiz taking and scoring
- Responsive design for various devices

## Technologies Used

- Node.js
- Express.js
- Three.js for 3D graphics
- HTML5, CSS3, and JavaScript
- Gemini API for AI-powered content generation (mock implementation for now)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/quizgenius.git
   cd quizgenius
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=3000
   ```

4. Start the server:
   ```
   node server.js
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. On the homepage, click "Start Your 3D Quiz Adventure"
2. Enter a topic and the number of questions you want
3. Click "Generate Quiz" to create your custom quiz
4. Answer the questions and submit your quiz
5. View your results and try again!

## API Endpoints

- `GET /api/health`: Check server health
- `POST /api/generate-quiz`: Generate a new quiz (currently returns mock data)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js for the amazing 3D graphics capabilities
- Express.js for the robust server framework
- Gemini API for AI-powered content generation (to be implemented)

## Contact

Your Name - nishijsontakke123@gmail.com

Project Link: https://github.com/your-username/quizgenius
