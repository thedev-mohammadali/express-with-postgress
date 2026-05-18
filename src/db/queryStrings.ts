const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`;

const createUserProfileTableQuery = `
    CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(10),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`;

const getAllUsersQuery = `
    SELECT * FROM users
`;

const createUserQuery = `
    INSERT INTO users (name, email, password, age)
    VALUES($1, $2, $3, $4)
    RETURNING *
`;

const getUserByIdQuery = `
    SELECT * FROM users
    WHERE id=$1
`;

const getUserByEmailQuery = `
    SELECT * FROM users
    WHERE email=$1
`;

const deleteUserByIdQuery = `
    DELETE FROM users
    WHERE id=$1
    RETURNING *
`;

const updateUserByIdQuery = `
    UPDATE users
    SET 
    name = COALESCE($1, name),
    age = COALESCE($2, age),
    is_active = COALESCE($3, is_active),
    password = COALESCE($4, password)

    WHERE id = $5
    RETURNING *
`;

const createProfileQuery = `
    INSERT INTO profiles (user_id, bio, address, gender, phone)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
`;

const getUserProfileByIdQuery = `
    SELECT * FROM profiles
    WHERE user_id=$1
`;

const queryString = {
  createUserTableQuery,
  createUserProfileTableQuery,
  getAllUsersQuery,
  createUserQuery,
  getUserByIdQuery,
  getUserByEmailQuery,
  deleteUserByIdQuery,
  updateUserByIdQuery,
  createProfileQuery,
  getUserProfileByIdQuery,
};

export default queryString;
