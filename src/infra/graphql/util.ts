type ResolverType = (...args: any[]) => any;

exports.mergeResolvers = (...resolverMaps: ResolverType[]) => Object.assign({}, ...resolverMaps);
