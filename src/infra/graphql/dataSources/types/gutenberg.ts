export interface GAgent {
  'pgterms:alias': string[];
  'pgterms:name': string;
  'pgterms:webpage': string[];
  'pgterms:birthdate': number;
  'pgterms:deathdate': number;
}

export interface GCreator {
  'pgterms:agent': GAgent;
}

export interface GFormatDescription {
  'dcam:memberOf': string;
  'rdf:value': string;
}

export interface GFormat {
  'rdf:Description': GFormatDescription;
}

export interface GFile {
  'dcterms:modified': string;
  'dcterms:extent': number;
  'dcterms:isFormatOf': string;
  'dcterms:format': GFormat[];
}

export interface GFormat {
  'pgterms:file': GFile;
}

export interface GBook {
  'dcterms:title': string;
  'dcterms:rights': string;
  'dcterms:creator': GCreator;
  'dcterms:hasFormat': GFormat[];
  'dcterms:type': GFormat;
  'pgterms:downloads': number;
  'dcterms:publisher': string;
  'dcterms:license': string;
  'dcterms:language': {
    'rdf:Description': {
      'rdf:value': string;
    };
  };
  'dcterms:issued': string;
  'pgterms:bookshelf': {
    'rdf:Description': {
      'dcam:memberOf': string;
      'rdf:value': string;
    };
  };
}

export interface RDFDoc {
  'rdf:RDF': {
    'cc:Work': {
      'rdfs:comment': string;
      'cc:license': string;
    };
    'pgterms:ebook': GBook;
  };
}
