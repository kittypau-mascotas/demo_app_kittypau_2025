import { auth } from "./auth";

export async function getUser(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return null;
  return session.user;
}
