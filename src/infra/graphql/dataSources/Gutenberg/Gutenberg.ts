import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { Formula, IndexedFormula, lit, sym, uri, Node } from 'rdflib';
import initRdfSource from './initRdfSource';
import parseRdfSource, { DC_TERMS, PG_TERMS, getNodeValue } from './parseRdfSource';
import { Author } from '../types';

class Gutenberg extends DataSource {
  private storeReady: boolean = false;

  private context: DataSourceConfig<any>['context'];

  private store: Formula | any;

  constructor(store: IndexedFormula) {
    super();

    this.store = store;

    this.prepare();
  }

  public initialize(config: DataSourceConfig<any>): void {
    this.context = config.context;
  }

  public async getAuthorByName(name: string): Promise<Author | null> {
    const literal: any = lit;

    const [agent] = this.store.each(null, PG_TERMS('name'), literal(name));

    const author = this.store.each(agent, null, null).map((node: Node) => this.store.each(agent, node, null));

    if (author.length) {
      const [_, __, [died], [fullname], [alias], [born]] = author;

      return {
        fullname: getNodeValue(fullname),
        alias: getNodeValue(alias, ''),
        lifetime: {
          born: parseInt(getNodeValue(born, 0), 10),
          died: parseInt(getNodeValue(died, 0), 10),
        },
        id: getNodeValue(agent),
      };
    }

    return null;
  }

  public async getAuthorBooks(agentId: string): Promise<Author> {
    return agentId
      ? this.store.each(null, DC_TERMS('creator'), sym(agentId)).map((book: Node) => this.getBookInfo(book))
      : null;
  }

  public async getBookInfo(bookNode: Node) {
    const fields = ['hasFormat', 'type', 'subject', 'publisher', 'downloads', 'issued', 'title'];

    const meta = fields.reduce(
      (acc: object, field: string) => ({
        ...acc,
        [field]: getNodeValue(this.store.any(bookNode, DC_TERMS(field), null)),
      }),
      {}
    );

    const files = this.store.each(null, DC_TERMS('isFormatOf'), bookNode);

    const urlObj = files.find((file: Node) => file.value.match(/\.html\.noimages$/));

    const url = getNodeValue(urlObj) || getNodeValue(files[0]);

    return {
      ...meta,
      url,
    };
  }

  private async prepare(): Promise<void> {
    if (this.storeReady) {
      return;
    }

    const rdfPath = await initRdfSource();

    await parseRdfSource(rdfPath, this.store);

    this.storeReady = true;
  }
}

export default Gutenberg;
