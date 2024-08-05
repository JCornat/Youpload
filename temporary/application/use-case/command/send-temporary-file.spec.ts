import { beforeEach, describe, it } from 'jsr:@std/testing@0.224.0/bdd';
import { SendTemporaryFileCommand } from './send-temporary-file.use-case.ts';
import { temporaryFileBuilder } from '../../../test/temporary-file.builder.ts';
import { createTemporaryFileFixture, TemporaryFileFixture } from '../../../test/temporary-file.fixture.ts';
import { NotFoundException } from '../../../../shared/lib/exceptions.ts';

describe('Feature: Send temporary file', () => {
  let fixture: TemporaryFileFixture;

  beforeEach(() => {
    fixture = createTemporaryFileFixture();
  });

  it('should save a valid temporary file', async () => {
    fixture.givenNowIs(new Date('2024-08-05 08:00:00'));

    const sendTemporaryFileCommand: SendTemporaryFileCommand = {
      name: 'test-file',
      filePath: './temporary/test/file/test.txt',
    };

    const fileId = await fixture.whenTemporaryFileIsSent(
      sendTemporaryFileCommand,
    );

    const expectedFile = temporaryFileBuilder()
      .withId(fileId)
      .withName('test-file')
      .withSize(6)
      .createdAt(new Date('2024-08-05 08:00:00'))
      .build();

    fixture.thenFileIsStored(expectedFile);
  });

  it('should not save a non existing file', async () => {
    const sendTemporaryFileCommand: SendTemporaryFileCommand = {
      name: 'test-file',
      filePath: './temporary/test/file/404.txt',
    };

    await fixture.whenTemporaryFileIsSent(sendTemporaryFileCommand);

    fixture.thenExpectedErrorShallBe(NotFoundException);
  });
});
