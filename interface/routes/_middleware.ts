import { FreshContext } from '$fresh/server.ts';
import { getCookies } from '@std/http/cookie';
import { SessionFileSystemRepository } from '@user/infrastructure/repository/session.fs.repository.ts';
import { UserFileSystemRepository } from '@user/infrastructure/repository/user.fs.repository.ts';

export interface State {
  isLoggedIn: boolean;
  userName: string;
  userId: string;
}

export async function handler(req: Request, ctx: FreshContext<State>) {
  try {
    const cookies = getCookies(req.headers);
    const auth = cookies.auth;
    if (auth) {
      const sessionRepository = new SessionFileSystemRepository();
      const session = await sessionRepository.get(auth);
      const userId = session.userId;
      const userRepository = new UserFileSystemRepository();
      const user = await userRepository.get(userId);
      ctx.state.isLoggedIn = true;
      ctx.state.userName = user.name.value;
      ctx.state.userId = user.id;
    }
  } catch {
    //
  }

  return await ctx.next();
}
