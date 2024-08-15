import { UserRepository } from '../../domain/repository/user.repository.ts';
import { EntityId } from '../../../shared/domain/model/entity-id.ts';
import { NotFoundException } from '../../../shared/lib/exceptions.ts';
import { User } from '../../domain/model/user.ts';
import { UserEmail } from '../../domain/value-object/user-email.ts';

export class UserFakeRepository implements UserRepository {
  store: Map<EntityId, User> = new Map();

  save(user: User): Promise<void> {
    this.store.set(user.id, user);
    return Promise.resolve();
  }

  getAllByEmail(email: string): Promise<User[]> {
    const users = [...this.store.values()];
    const filteredUsers = users.filter((user) => user.email.value === email);
    return Promise.resolve(filteredUsers);
  }

  get(id: EntityId): Promise<User> {
    const fileMetadata = this.store.get(id);
    if (!fileMetadata) {
      throw new NotFoundException();
    }

    return Promise.resolve(fileMetadata);
  }
}
