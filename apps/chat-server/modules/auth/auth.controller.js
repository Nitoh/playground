import { registerUser, loginUser } from './auth.service.js';

export function registerController(req, res) {
    const result = registerUser(req.body?.username, req.body?.password);

    if (!result.ok) {
        return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json({ user: result.user });
}

export function loginController(req, res) {
    const result = loginUser(req.body?.username, req.body?.password);

    if (!result.ok) {
        return res.status(result.status).json({ error: result.error });
    }

    return res.status(result.status).json({ user: result.user });
}