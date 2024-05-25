# memories-app-rest-api

REST-API built using Node.js, Express.js, MongoDB and JWT. The API follows CRUD methods. It is the backed server for my <a href="https://github.com/phanison898/memories-book">Memories-Book</a> application

### Steps

1. Create .env file as below

```sql
PORT=5000
DB_CONNECTION=mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/
TOKEN_SECRET=<your_secret> // generate it using the command : node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"

```
