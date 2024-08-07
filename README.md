# 📗 Table of Contents

- [📗 Table of Contents](#-table-of-contents)
- [📖 Dialogue Den ](#-dialogue-den-)
  - [🛠 Built With ](#-built-with-)
    - [Tech Stack ](#tech-stack-)
    - [Key Features ](#key-features-)
    - [🚀 Backend Link ](#-backend-link-)
  - [🚀 Live Demo ](#-live-demo-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
      - [Backend Setup](#backend-setup)
    - [Install](#install)
    - [Install](#install-1)
    - [Usage](#usage)
  - [👥 Authors ](#-authors-)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [⭐️ Show your support ](#️-show-your-support-)
  - [📝 License ](#-license-)

# 📖 Dialogue Den <a name="about-project"></a>
Dialogue Den is a robust chat application built using the PERN stack (PostgreSQL, Express.js, React, and Node.js). The application leverages the WebRTC API to enable real-time voice and video calls. It is designed to facilitate seamless communication with features such as text messaging, voice messaging, image sharing, and more.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <ul>
   <li>
      <a href="https://www.postgresql.org/">PostgresQL</a>
    </li>
     <li>
      <a href="https://expressjs.com/">Express.js</a>
    </li>
    <li>
      <a href="https://react.dev/">ReactJS</a>
    </li>
    <li>
      <a href="https://nodejs.org/en">Node.js</a>
    </li>
  </ul>
</details>

### Key Features <a name="key-features"></a>

- Text Messaging: Send and receive instant text messages.
- Voice Messaging: Record and send voice messages.
- Image Sharing: Share images with your contacts.
- Voice and Video Calls: Make real-time voice and video calls using WebRTC.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Backend Link <a name="live-demo"></a>
- [Backend Link](https://github.com/Akorede3133/dialog-den-be)

## 🚀 Live Demo <a name="live-demo"></a>

- [Visit the live project](https://dialog-den.onrender.com/)





## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:
- [ Node.js](href="https://nodejs.org/en")
- PostgreSQL
- Git (for version control)

### Setup

#### Backend Setup
1. **Clone this repository to your desired folder:**

  ```sh
  git clone https://github.com/Akorede3133/dialog-den-be
  ```
- Navigate to the project directory
  
  ```
  cd dialog-den-be

  ```

### Install

2. **install packages**
  
  ```
    npm install

  ```

3. **PostgreSQL Database Setup**

- Create a new PostgreSQL database
- Create .env.development file and update the database and cloudinary connection settings
  
    ```
      PORT=3000
      JWT_SECRET=jwtsecret
      DB_NAME=dialog_den
      DB_USERNAME=youruserbame
      DB_PASSWORD=yourpassword
      DB_HOST=localhost
  ```
4. **Configure Cloudinary**
  - Sign up for a Cloudinary account if you don't have one.
  - In the .env.development file, add your Cloudinary credentials.

    ```
      PORT=3000
      JWT_SECRET=jwtsecret
      CLOUD_NAME=cloudname
      CLOUD_API_KEY=cloudkey
      CLOUD_API_SECRET=cloudsecret
      DB_NAME=dialog_den
      DB_USERNAME=youruserbame
      DB_PASSWORD=yourpassword
      DB_HOST=localhost
    ```
5. **Start the Backend Server**
    ```
      npm start
    ```

  #### Frontend Setup

  1. **Clone this repository to your desired folder:**

```sh
 git clone https://github.com/Akorede3133/dialog-den-fe
```
- Navigate to te project directory
  
  ```
  cd dialog-den-fe

  ```

### Install

2. **install packages**
  
  ```
    npm install

  ```
3. Setup Environment Variables

    ```
      VITE_BASE_URL='http://localhost:3000/api/v1'
      VITE_SOCKET_URL='http://localhost:3000'
    ```

4. **Start the Frontend Server**
      ```
        npm run dev
      ```
### Usage

- Open your web browser and navigate to http://localhost:3000.


## 👥 Authors <a name="authors"></a>

👤 **Akorede**

- GitHub: [@Akorede](https://github.com/Akorede3133)
- Twitter: [@Akorede](https://twitter.com/SaheedAkorede7)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/akorede)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

1. **Groups:** Create and manage group chats.

2. **Group Voice and Video Calls:** Conduct voice and video calls with multiple participants.

3. **Friend Requests:** Send and accept friend requests to connect with others.

4. **Screen Sharing:** Share your screen during video calls for enhanced collaboration.


I welcome contributions and feedback from the community to help shape the future of the Expense Insight app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome! To contribute:
1. Fork the repository
2. Create a new branch

  ```
    git checkout -b feature/YourFeatureName
  ```
3. Make your changes
4. Commit your changes
  ```
    git commit -m 'Add some feature'

  ```
5. Push to the branch

  ```
    git push origin feature/YourFeatureName

  ```
6. Open a pull request

Feel free to check the [issues page](https://github.com/Akorede3133/dialog-den-fe/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project please give it a star⭐️

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">
(<a href="#readme-top">back to top</a>)</p>
