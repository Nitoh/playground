import { userRepository } from './user.repository.js';

const userRepo = userRepository();

export function getUsers() {
    return userRepo.getAllUsers().map((user) => ({
        id: user.id,
        username: user.username,
        createdAt: user.createdAt
    }));
}