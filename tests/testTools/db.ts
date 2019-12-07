import { createClient, deleteNodes as deleteDbNodes } from '../../src/common/db';

export async function deleteNodes(ids: string[]) {
  await deleteDbNodes(createClient(), ids);
}
