# **Swimmer Blog**

A full-featured web application designed for athletes to track competition results and swimming progress. The system provides a secure environment for data management and a dynamic public interface for performance analysis.
___

## **Features**

### **Admin Panel (Secure Management):** 
+ **Full CRUD operations** for race results, personal bests, and medals.
+ **Secure Authentication:** Implementation of JWT-based access and refresh token logic.
+ **Data Integrity:** Server-side input validation and error handling.

### **Public Section (Data Visualization):**
+ **Dynamic Performance Charts:** Interactive progress tracking using Chart.js.
+ **Advanced UI Animations:** Smooth transitions and interactive elements powered by GSAP.
+ Complete results table and personal bests overview.
+ Medals and results categorized by year.
+ **Robust Form Handling:** Contact form with validation and SMTP delivery via Brevo.


## **Technologies**

### **Frontend:**
+ **React.js** 18 (TypeScript)
+ **MobX:** Global state management using the "Store" pattern.
+ **GSAP:** High-performance animations.
+ **React Hook Form:** Optimized form handling and validation.
+ **Axios:** For API communication with interceptors for token management.
+ **Bootstrap 5:** Responsive UI components.

### **Backend:**
+ **Node.js & Express.js**
+ **JWT & Bcrypt:** Secure password hashing and token-based authorization.
+ **Express-validator:** Middleware for robust backend data validation.
+ **Nodemailer:** Integration with Brevo (SendinBlue) for email services.

### **Database:**
+ **PostgreSQL:** Relational database management.
+ **Sequelize ORM:** Database modeling and migrations.

### **Infrastructure:**
+ **Docker & Docker Compose:** Containerized environment for consistent development and deployment.


## **Project Structure**
+ project/
+ + client/  *React frontend*
+ + + src/
+ + + + components/
+ + + + + pages/
+ + + + + services/
+ + + + + store/
+ + + + + ...
+ + + package.json
+ + server/  *Express backend*
+ + + controllers/
+ + + models/
+ + + routes/
+ + + middleware/
+ + + service/
+ + + ...
+ + + server.js
+ + + package.json
+ + docker-compose.yml
+ + README.md


## **Environment Variables Example**

### **Frontend .env**
+ REACT_APP_API_URL = Your backend URL, e.g. https://www.mydomain.com


### **Backend .env**
+ PORT = Server port, e.g. https://www.mydomain.com/api

#### **Database (PostgreSQL)**
+ DB_NAME = Database name
+ DB_USER = Database user
+ DB_PASSWORD = Database password
+ DB_HOST = Database host
+ DB_PORT = Database port

#### **JWT Secrets**
+ JWT_ACCESS_SECRET = Secret for access token
+ JWT_REFRESH_SECRET = Secret for refresh token
+ JWT_RESET_PASSWORD_SECRET = Secret for password reset

#### **SMTP / Email**
+ SMTP_HOST = SMTP host, e.g. smtp-relay.brevo.com
+ SMTP_PORT = SMTP port
+ SMTP_USERNAME = SMTP username
+ SMTP_PASSWORD = SMTP password

+ BREVO_API_KEY = Brevo API key

#### **URLs**
API_URL = Backend URL for frontend
CLIENT_URL = Frontend URL, e.g. https://mydomain.com



## **Clone the Repository**

git clone https://github.com/YanaT1/Blog-Swimmer.git



## **Run with Docker (Recommended):**

docker-compose up --build



## **Contact**
+ Developer: Yana Tryputen, tryputenyana@gmail.com
+ Created for swimmer Ivan Tryputen, www.ivantryputen.com

## **License**
MIT License