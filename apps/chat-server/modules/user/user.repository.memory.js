const users = [];

export function findUser(username, password) {
    return users.find((u) => u.username === username && u.passwordHash === password) ?? null;
}

export function findUserByUsername(username) {
    return users.find((u) => u.username === username) ?? null;
}

export function createUser(username, password) {
    const user = {
        id: users.length + 1,
        username,
        passwordHash: password,
        createdAt: new Date().toISOString()
    };

    users.push(user);
    return user;
}

export function getAllUsers() {
    return users;
}
