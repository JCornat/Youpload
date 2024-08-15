import { EntityId } from '../../../shared/domain/model/entity-id.ts';
import { AggregateRoot } from '../../../shared/lib/aggregate-root.ts';
import { UserEmail } from '../value-object/user-email.ts';
import { UserName } from '../value-object/user-name.ts';
import { UserPassword } from '../value-object/user-password.ts';

export interface UserProps {
  id: EntityId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
}

export class User extends AggregateRoot {
  private constructor(
    id: EntityId,
    private readonly _name: UserName,
    private readonly _email: UserEmail,
    private readonly _password: UserPassword,
  ) {
    super(id);
  }

  static create(props: UserProps): User {
    return new User(props.id, props.name, props.email, props.password);
  }

  get name(): UserName {
    return this._name;
  }

  get email(): UserEmail {
    return this._email;
  }

  get password(): UserPassword {
    return this._password;
  }
}
