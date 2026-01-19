# **Swimmer Blog**

A full-featured web application for swimmer, designed to keep track of his competition results and swimming progress.
A swimmer can add race results, personal bests, medals, and yearly statistics through an admin panel.
Users can explore results and medals tables, personal bests, and dynamic performance charts.
___

## **Features**

### **Admin Panel:**
+ Add competition results
+ Add personal bests
+ Add medals
+ Edit and delete entries

### **Public Section:**
+ Complete results table
+ Personal bests overview
+ Medals by year and swimming style
+ Automatic dynamic charts showing performance improvements
+ Contact form (with SMTP delivery via Brevo)


## **Technologies**

### **Frontend:**
+ React.js
+ TypeScript
+ MobX (state management)
+ Axios
+ Bootstrap
+ CSS

### **Backend:**
+ Node.js
+ Express.js
+ JavaScript
+ JWT Authentication
+ Nodemailer
+ SMTP email delivery via Brevo (SendinBlue)

### **Database:**
+ PostgreSQL
+ Sequelize ORM

### **Dev Tools:**
+ Docker
+ docker-compose
+ GitHub


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


## **Contact**
This project was created for swimmer Ivan Tryputen.
Developer: (Yana Tryputen, tryputenyana@gmail.com)

## **License**
MIT License