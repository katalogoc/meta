export default {
  Query: {
    async author(_: any, { name }: any, { dataSources }: any) {
      const gutenbergData = dataSources.gutenberg.getAuthorByName(name);

      const query = `
        PREFIX dbo: <http://dbpedia.org/ontology/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>

        SELECT *
        WHERE {
            ?text dbo:author ?author .
            ?author foaf:name ?name .
            ?author dbo:birthDate ?birthDate .
            OPTIONAL {
              ?author dbo:almaMater ?almaMater .
              ?author dbo:deathDate ?deathDate
            }
            FILTER(regex(?name, '${name}', 'i')) .
        }
      `;
      const DBPediaData = await dataSources.DBpedia.query(query).asJson();

      console.log(DBPediaData);

      return gutenbergData;
    },
  },
  Author: {
    async texts(author: any, { name }: any, { dataSources }: any) {
      return dataSources.gutenberg.getAuthorBooks(author.id);
    },
  },
};
