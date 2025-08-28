# Backend Setup
This is a brief step by step guide to setting the backend side of the quiz application up.

## .env File

1. Open new Terminal
2. Navigate towards project-alpha folder
3. Once inside the correct location run `touch .env` within the terminal (this creates a .env file)

Inside this .env file you want to set the values below

```
PORT=3000
DB_URL=[]
BCRYPT_SALT_ROUNDS=10
SECRET_TOKEN=MIAMYEDU2025
```

- PORT is setting the port for the backend to operate on
- DB_URL is the path to the Database of your choice
- BCRYPT_SALT_ROUNDS is the cost factor. This controls the amount of times something is hashed and encrypted
- SECRET_TOKEN is a special token that is added on the end of information to allow for uniqueness within login and authentication

## Database

1. Choose a database of your choice (e.g. Supabase)
2. Create a project and create a memorable password
3. Find connection link (preferably IPv4 link)
4. Where it says `[input password]` you apply your memorable password

Once the above have been completed and saved in the right area, run `npm run setup-db` to setup your database on your account and seed the correct data and tables.

## Run Server

Once the database has been set up, you can now run the server that will be handling all of our requests and information.

Open a new terminal and run `npm run dev`. This will start a new server which will be listening on the port 3000.

Navigate towards [Frontend Setup](https://github.com/avi17ak/project-alpha/tree/main/client)