import { IndexedFormula, graph } from 'rdflib';

let instance: IndexedFormula | null = null;

class GutenbergGraph {
  public static getInstance(): IndexedFormula {
    return instance || (instance = graph());
  }

  private constructor() {}
}

export default GutenbergGraph;
