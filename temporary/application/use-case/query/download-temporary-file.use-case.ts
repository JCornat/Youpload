import { EntityId } from '../../../../shared/domain/model/entity-id.ts';
import { TemporaryFileProvider } from '../../../infra/temporary-file.provider.ts';
import { TemporaryStorageProvider } from '../../../infra/temporary-storage.provider.ts';

export interface DownloadTemporaryFileQuery {
  id: EntityId;
}

export class DownloadTemporaryFileUseCase {
  constructor(
    private readonly temporaryFileProvider: TemporaryFileProvider,
    private readonly temporaryStorageProvider: TemporaryStorageProvider,
  ) {
  }

  async handle(requestTemporaryFileQuery: DownloadTemporaryFileQuery) {
    const file = await this.temporaryFileProvider.get(requestTemporaryFileQuery.id);

    return this.temporaryStorageProvider.getStream(file.id);
  }
}
