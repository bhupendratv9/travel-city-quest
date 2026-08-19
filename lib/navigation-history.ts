// Lightweight, sessionStorage-backed navigation history so that "back" can skip
// auth pages (e.g. right after login the previous entry may be /sign-in).

const STORAGE_KEY = "nav-history";
const MAX_ENTRIES = 50;

// Routes the back button must never land on (matched against the pathname only).
const BLOCKED_ROUTES = ["/sign-in", "/guest-signup", "/verify-otp"];

export const FALLBACK_ROUTE = "/dashboard";

function isBrowser() {
  return typeof window !== "undefined";
}

export function isBlockedRoute(path: string) {
  return BLOCKED_ROUTES.includes(path);
}

function readStack(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeStack(stack: string[]) {
  if (!isBrowser()) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stack.slice(-MAX_ENTRIES)));
  } catch {
    // sessionStorage may be unavailable (private mode, etc.) — fail silently.
  }
}

// Record a visited pathname, keeping the stack roughly in sync with browser
// back/forward navigation.
export function recordPath(path: string) {
  const stack = readStack();
  const last = stack[stack.length - 1];

  if (last === path) return; // refresh / re-render, nothing changed
  if (stack[stack.length - 2] === path) {
    stack.pop(); // user navigated back one step
  } else {
    stack.push(path);
  }
  writeStack(stack);
}

// Resolve where the back button should go. Returns `{ mode: "back" }` when the
// immediate previous entry is safe (preserves native browser back), otherwise a
// concrete href to push to (skipping any blocked auth routes).
export function getBackTarget():
  | { mode: "back" }
  | { mode: "push"; href: string } {
  const stack = readStack();
  const predecessor = stack[stack.length - 2];

  if (predecessor && !isBlockedRoute(predecessor)) {
    return { mode: "back" };
  }

  // Walk further back to find the most recent non-blocked entry.
  for (let i = stack.length - 2; i >= 0; i--) {
    if (!isBlockedRoute(stack[i])) {
      return { mode: "push", href: stack[i] };
    }
  }

  return { mode: "push", href: FALLBACK_ROUTE };
}