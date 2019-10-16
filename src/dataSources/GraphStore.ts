import { DataSource } from 'apollo-datasource';
import { Text, MetadataService } from '../types';

class StoreDataSource extends DataSource {
  private metadataService: MetadataService;

  constructor(metadataService: MetadataService) {
    super();

    this.metadataService = metadataService;
  }

  public async upsertText(text: Text): Promise<Text> {
    return this.metadataService.upsertText(text);
  }
}

export default StoreDataSource;
