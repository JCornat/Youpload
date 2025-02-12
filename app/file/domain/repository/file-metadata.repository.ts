import { EntityId } from '@shared/domain/model/entity-id.ts';
import { FileMetadata } from '@file/domain/model/file-metadata.ts';

export interface FileMetadataRepository {
  save(file: FileMetadata): Promise<void>;
  get(id: EntityId): Promise<FileMetadata>;
  getAllExpired(now: Date): Promise<FileMetadata[]>;
  remove(id: EntityId): Promise<void>;
}
