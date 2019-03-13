import t from 'tcomb';

const defaultProps = {
  lifetime: null,
  influences: [],
  influenced: [],
  contemporaries: [],
  texts: [],
  thumbnail: null,
};

export default t.struct(
  {
    id: t.String,
    lifetime: t.maybe(t.Object),
    name: t.maybe(t.String),
    alias: t.maybe(t.String),
    influences: t.maybe(t.Array),
    influenced: t.maybe(t.Array),
    contemporaries: t.maybe(t.Array),
    texts: t.maybe(t.Array),
    thumbnail: t.maybe(t.String),
  },
  {
    defaultProps,
  }
);
