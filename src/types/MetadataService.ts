import { Text } from './Text';

export interface MetadataService {
  upsertText(text: Text): Promise<Text>;
}
