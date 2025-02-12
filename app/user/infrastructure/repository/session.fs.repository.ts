import { Session } from '@user/domain/model/session.ts';
import { SessionRepository } from '@user/domain/repository/session.repository.ts';
import { NotFoundException, ParseErrorException } from '@shared/lib/exceptions.ts';

export class SessionFileSystemRepository implements SessionRepository {
  constructor(
    public filePath = './config/session.json',
  ) {}

  async get(id: string): Promise<Session> {
    const sessionList = await this.getContent();
    const session = sessionList.find((item) => item.id === id);
    if (!session) {
      throw new NotFoundException();
    }

    return session;
  }

  async create(session: Session): Promise<void> {
    const sessionList = await this.getContent();
    sessionList.push(session);

    const serializedFiles = sessionList.map((temp) => temp.toObject());
    await Deno.writeTextFile(this.filePath, JSON.stringify(serializedFiles), { create: true });
  }

  private async getContent(): Promise<Session[]> {
    let content: string;

    try {
      content = await Deno.readTextFile(this.filePath);
    } catch (error) {
      if (!(error instanceof Deno.errors.NotFound)) {
        throw error;
      }

      content = '[]';
    }

    let array: any[];

    try {
      array = JSON.parse(content);
    } catch (error) {
      console.log(error);
      throw new ParseErrorException();
    }

    return array.map((item) => Session.reconstitute(item));
  }
}

export const defaultSessionRepository = new SessionFileSystemRepository();
