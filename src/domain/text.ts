import t from 'tcomb';

const defaultProps = {
  url: '',
  type: null,
  title: null,
  authors: [],
  subject: null,
  publisher: null,
  issued: null,
  wikiAboutAuthors: [],
};

export default t.struct(
  {
    id: t.String,
    title: t.String,
    url: t.String,
    authors: t.maybe(t.Array),
    subject: t.maybe(t.Array),
  },
  {
    defaultProps,
  }
);
