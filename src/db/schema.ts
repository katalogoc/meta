export const schema = `
  type Author {
    deathdate: string
    birthdate: string
    name: string
    aliases: [string]
    influences: [Author]
    influenced: [Author]
    contemporaries: [Author]
    texts: [Text]
    thumbnail: string
  }

  type Text {
    url: string
    title: string
    authors: [Author]
    subject: [Subject]
  }

  type Subject {
    name: string
  }

  name: string @index(exact) .

  url: string @index(exact) .

  title: string @index(exact) .
`;
