import { beforeEach, describe, it } from 'jsr:@std/testing@0.224.0/bdd';
import { createFileFixture, FileFixture } from '../../test/file.fixture.ts';

describe('Feature: Remove expired file', () => {
  let fixture: FileFixture;

  beforeEach(() => {
    fixture = createFileFixture();
  });

  it('shall remove an expired file from repository and file system', async () => {
    // fixture.givenStoredFile()
  });

  it('shall remove a non existing expired file from repository', async () => {
  });

  it('shall not remove a valid file', async () => {
  });
});
