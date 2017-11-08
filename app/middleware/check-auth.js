const cookieName = 'feathers-jwt';

function getTokenFromRequest(req) {
  let result;

  if (!req || !req.headers || !req.headers.cookie) result = null;
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieName}=`));
  result = (!jwtCookie) ? null : jwtCookie.split('=')[1];

  return result;
}

export default function ({ isServer, store, req }) {
  const accessToken = (isServer) ?
    getTokenFromRequest(req) : window.localStorage.getItem(cookieName);

  if (accessToken) {
    return store.dispatch('auth/jwt', { accessToken })
      .catch(() => {
        // Ignore invalid JWT
      });
  }

  return null;
}
