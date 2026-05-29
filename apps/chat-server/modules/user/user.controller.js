import { getUsers } from './user.service.js';

export function getUsersController(req, res) {
    return res.status(200).json({ users: getUsers() });
}