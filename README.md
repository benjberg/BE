
med-cabinet
med cabinet matches users with medicinal strains of marijuana. The back end contains a SQLite3 test and development database and a PostgreSQL database for production.

the database has two tables linked with a foreign key. authentication is handled through JASON-web-tokens. The api allows users to make/update and delete both a user profile and saved strain list.

Getting Started
after cloning run npm i bcryptjs cors dotenv express helmet jsonwebtoken knex pg sqlite3 supertest to install the dependencies needed. then run npm i -D jest nodemon to get the dev dependencies. run migrations to create tables.

table Schema
users table:

Field	Data Type	Metadata
user_id	integer	increments, primary key
name	string	not null
password	string	not null
email	strain	not null, unique
Saved Strains table:

Field	Data Type	Metadata
saved_strain_id	integer	increments, primary key
user	integer	unsigned, not null, foreign key, on delete cascade, on update, cascade
strain	JSON	unsigned, not null
API
api link: https://medcab1.herokuapp.com/

Method	Endpoint	Description
POST	/api/auth/register	allows users to register for app
POST	/api/auth/login	allows the user to log in generating JW-token
POST	/api/user/:id/strains	allows user to save strain to favs list
GET	/api/user/:id	gets user info
GET	/api/user/:id/strains	allows user access to faved list
PUT	/api/user/:id	allows user to edit user info
DELETE	/api/user/:id/strains/:sid	removes faved strain
DELETE	/api/user/:id	deletes user
