import { userRepository } from '../user/user.repository.js';

const userRepo = userRepository();

function toPublicUser(user) {
    return {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt
    };
}

export function registerUser(username, password) {

    const cleanUsername = String(username ?? '').trim();
    const cleanPassword = String(password ?? '').trim();

    if (cleanUsername.length < 3) {
        return { ok: false, status: 400, error: 'Username muss mindestens 3 Zeichen lang sein.' };
    }

    if (cleanPassword.length < 6) {
        return { ok: false, status: 400, error: 'Passwort muss mindestens 6 Zeichen lang sein.' };
    }

    if (userRepo.findUserByUsername(cleanUsername)) {
        return { ok: false, status: 409, error: 'Benutzername ist bereits vergeben.' };
    }

    const passwordHash = hashPassword(cleanPassword); // Platzhalter für echtes Hashing
    const newUser = userRepo.createUser(cleanUsername, passwordHash);

    return { ok: true, status: 201, user: toPublicUser(newUser) };
}

export function loginUser(username, password) {

    const cleanUsername = String(username ?? '').trim();
    const cleanPassword = String(password ?? '').trim();

    const passwordHash = hashPassword(cleanPassword);

    const user = userRepo.findUser(cleanUsername, passwordHash);
    if (!user) {
        return { ok: false, status: 401, error: 'Ungültiger Benutzername oder Passwort.' };
    }

    return { ok: true, status: 200, user: toPublicUser(user) };
}

function hashPassword(password) {
    // Hier sollte ein echtes Hashing-Verfahren wie bcrypt oder argon2 verwendet werden
    return 'plan:' + password;
}