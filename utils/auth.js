import jwt from 'jsonwebtoken';

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        jwt.verify(token, 'your-secret-key');
        return true;
    } catch {
        return false;
    }
}

export function logout() {
    localStorage.removeItem('token');
}
