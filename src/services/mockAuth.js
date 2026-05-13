/**
 * mockAuth.js — localStorage-based mock authentication service
 */

const USERS_KEY  = 'mycafe_users';
const SESSION_KEY = 'mycafe_session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Register a new user */
export function register({ name, email, password }) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    throw new Error('An account with this email already exists.');
  }
  const user = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
  saveUsers([...users, user]);
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Login existing user */
export function login({ email, password }) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password. Please try again.');
  const session = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/** Logout current user */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/** Get current session */
export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
}
