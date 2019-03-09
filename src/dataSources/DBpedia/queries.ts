export const getDbPediaEntityByWikiUrl = (wikiUrl: string, lang: string = 'en') => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dc: <http://purl.org/dc/terms/>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>

  SELECT *
  WHERE {
    OPTIONAL {
      <${wikiUrl}> foaf:primaryTopic ?id .
      OPTIONAL { ?id foaf:gender ?gender . }
      OPTIONAL { ?id foaf:name ?name . }
      OPTIONAL { ?id dbo:era ?era . }
      OPTIONAL { ?id dbo:deathPlace ?deathPlace . }
      OPTIONAL { ?id dbo:deathDate ?deathDate . }
      OPTIONAL { ?id dbo:birthPlace ?birthPlace . }
      OPTIONAL { ?id dbo:birthDate ?birthDate . }
      OPTIONAL { ?id dbo:wikiPageExternalLink ?wikiPageExternalLink . }
      OPTIONAL { ?id dbo:thumbnail ?thumbnail . }
      OPTIONAL { ?id dbo:abstract ?abstract . }
      OPTIONAL { ?id dbo:influenced ?influenced . }
      OPTIONAL { ?id dbo:influencedBy ?influencedBy . }
      OPTIONAL { ?id dbo:mainInterest ?mainInterest . }
      OPTIONAL { ?id dbo:notableIdea ?notableIdea . }
      OPTIONAL { ?id dbo:philosophicalSchool ?philosophicalSchool . }
      OPTIONAL { ?id dbo:almaMater ?almaMater . }
      OPTIONAL { ?id dbo:region ?region . }
      OPTIONAL { ?id dbo:nationality ?nationality . }
      OPTIONAL { ?id foaf:depiction ?depiction . }
      OPTIONAL { ?id foaf:givenName ?givenName . }
      FILTER ( lang(?name) = "${lang}" )
    }
  }
`;
