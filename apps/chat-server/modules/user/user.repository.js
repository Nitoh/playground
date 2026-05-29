import * as memoryRepo from './user.repository.memory.js';

export function userRepository() {
    // Single switch point for DB migration: memory -> ORM-backed repository.
    return memoryRepo;
}