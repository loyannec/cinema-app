## Configuring the database

### Step 1: Remove permanently the database if already exists.

```mysql
DROP DATABASE IF EXISTS movieschema
```

### Step 2: Create the database.

```mysql
CREATE DATABASE movieschema
```

### Step 3: Designate an external database as the current database.

```mysql
USE movieschema
```

### Step 4: Create a table called "movieschema.users" with the specified fields by passing one or more "column_definition" and / or "table_restriction". If the IF NOT EXISTS constraint is passed, the table is only created when there is no table with the same name in the database.

```mysql
CREATE TABLE movieschema.users (
    userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    surname VARCHAR(255),
    firstname VARCHAR(255),
    emailaddress VARCHAR(255),
    password VARCHAR(255)
)
```

### Step 5: Create a table called "movieschema.userrating" with the specified fields by passing one or more "column_definition" and / or "table_restriction". If the IF NOT EXISTS constraint is passed, the table is only created when there is no table with the same name in the database.

```mysql
CREATE TABLE movieschema.userrating (
    ratingid INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL,
    user_rating INT,
    movieid INT,
    FOREIGN KEY(userid) REFERENCES users(userid)
)
```