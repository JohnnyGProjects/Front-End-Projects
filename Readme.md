🎬 StreamBox – Streaming UI Prototype

StreamBox is a front-end streaming interface prototype built to demonstrate client-side scripting, UI rendering, keyboard navigation, and data-driven content display commonly used in streaming platforms and connected TV applications.

This project was created to align with streaming application development concepts, including grid-based navigation, remote-style input handling, and dynamic content loading.

📁 Project Structure
streaming-content/
│
├── index.html          # Application layout and UI structure
├── styles.css          # Styling and layout (Grid, Flexbox)
├── script.js           # Client-side application logic
│
├── images/             # Thumbnails and fallback assets
│
├── data/
│   └── shows.json      # Content metadata source

⚙️ Core Functionality

Fetches and renders streaming content from a local JSON data source

Displays content in a responsive, grid-based layout

Filters content by genre

Supports title-based search

Implements keyboard navigation using arrow keys and Enter 🎮

Opens a full-screen detail view for selected content

Handles loading states, missing content, and image errors

📺 Streaming-Oriented Design Considerations

Keyboard-first navigation modeled after connected TV and Roku-style interfaces

Focus management using visual highlighting and programmatic focus

Grid-based content discovery common to streaming platforms

Separation of data, logic, and presentation for maintainability

Client-side rendering using vanilla JavaScript and the Fetch API

🛠️ Technologies Used

HTML5

CSS3 (CSS Grid, Flexbox)

JavaScript (ES6)

Fetch API

Local JSON data

🗂️ Data Format

Content metadata is stored in data/shows.json using the following structure:
{
  "title": "The Matrix",
  "genre": "Sci-Fi",
  "rating": "R",
  "year": 1999,
  "thumbnail": "images/matrix.jpg"
}

▶️ Running the Application

Because the application loads JSON using the Fetch API, it must be served from a local web server.

VS Code (Recommended)

Install Live Server

Open index.html with Live Server

Open the provided local URL in a browser

📝 Notes

Opening index.html directly in a browser may prevent JSON from loading due to browser security restrictions.

The layout adapts automatically to screen size changes 📐

🎯 Purpose

This project was built to demonstrate:

Client-side scripting in a streaming application context

UI behavior for content discovery platforms

Keyboard / remote-style navigation patterns

Data-driven UI rendering without frameworks

👤 Author

Johnny (Yoseph Gebre)
IT Graduate | Software Development
