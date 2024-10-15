# Timely Website

Welcome to the **Timely** project! This web application is built using **React** with **Tailwind CSS** for the frontend and **FastAPI** for the backend. It utilizes a **MongoDB** database to store and manage data.

#Live Demo 
https://timely-rmbx.onrender.com/ - (Only the Frontend part is Deployed as of now)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Features

- **Frontend**: 
  - Built with React and styled using Tailwind CSS.
  - Responsive design for various screen sizes.
  
- **Backend**:
  - FastAPI as the backend framework.
  - MongoDB for data storage.

- **Email Subscription**: Users can subscribe to receive updates via email.

- **Live News Feed**: Fetches live news using the Gnews API and provides summarized articles.

- **History Section**: Displays historical events with summaries, powered by the Wikipedia API.

- **Real-time Chat**: Users can engage in live chat through WebSocket functionality.

- **Map Visualization**: Shows the locations of monuments using Folium, allowing users to see historical sites on a map.

## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS

- **Backend**: 
  - FastAPI
  - MongoDB

- **Python Features**:
  - **Article**: For summarizing news articles.
  - **Wikipedia API**: For collecting monument history data.
  - **WebSocket**: For enabling real-time chat functionality.
  - **Folium**: For visualizing map data.
  - **SMTP**: For handling email subscriptions.


## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/amenasyed09/Timely.git
   cd Timely
2. **Set up the Backend**: Navigate to Backend Directory 
    ```bash
    cd Backend
3. **Set up the Frontend**: Navigate to Frontend Directory
    ```bash
    cd Frontend/myapp
    npm install 
 ## Usage 
 1. **Start the Backend**:
    ```bash
    uvicorn main:app --reload
 2. **Start the Frontend**:
    ```bash
    npm start
 ## Contributing 
 Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.
 
  
 
