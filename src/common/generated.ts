import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Author = {
   __typename?: 'Author',
  id?: Maybe<Scalars['ID']>,
  birthdate?: Maybe<Scalars['String']>,
  deathdate?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  alias: Array<Scalars['String']>,
  texts: Array<Text>,
  thumbnail?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  saveText: Text,
  saveAuthor: Author,
};


export type MutationSaveTextArgs = {
  text: SaveTextInput
};


export type MutationSaveAuthorArgs = {
  author: SaveAuthorInput
};

export type Query = {
   __typename?: 'Query',
  author?: Maybe<Author>,
  authors: Array<Author>,
  texts: Array<Text>,
  text?: Maybe<Text>,
};


export type QueryAuthorArgs = {
  id: Scalars['ID']
};


export type QueryAuthorsArgs = {
  options?: Maybe<QueryOptions>
};


export type QueryTextsArgs = {
  options?: Maybe<QueryOptions>
};


export type QueryTextArgs = {
  id: Scalars['ID']
};

export type QueryOptions = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
};

export type SaveAuthorInput = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  alias: Array<Scalars['String']>,
  texts: Array<Scalars['String']>,
  birthdate?: Maybe<Scalars['String']>,
  deathdate?: Maybe<Scalars['String']>,
  thumbnail?: Maybe<Scalars['String']>,
};

export type SaveTextInput = {
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  url: Scalars['String'],
  authors: Array<Scalars['String']>,
  subject: Array<Scalars['String']>,
};

export type Text = {
   __typename?: 'Text',
  id: Scalars['ID'],
  url: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  authors?: Maybe<Array<Author>>,
  subject?: Maybe<Array<Scalars['String']>>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Author: ResolverTypeWrapper<Author>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Text: ResolverTypeWrapper<Text>,
  QueryOptions: QueryOptions,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  SaveTextInput: SaveTextInput,
  SaveAuthorInput: SaveAuthorInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Author: Author,
  String: Scalars['String'],
  Text: Text,
  QueryOptions: QueryOptions,
  Int: Scalars['Int'],
  Mutation: {},
  SaveTextInput: SaveTextInput,
  SaveAuthorInput: SaveAuthorInput,
  Boolean: Scalars['Boolean'],
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  birthdate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  deathdate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  alias?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  texts?: Resolver<Array<ResolversTypes['Text']>, ParentType, ContextType>,
  thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  saveText?: Resolver<ResolversTypes['Text'], ParentType, ContextType, RequireFields<MutationSaveTextArgs, 'text'>>,
  saveAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationSaveAuthorArgs, 'author'>>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  author?: Resolver<Maybe<ResolversTypes['Author']>, ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>,
  authors?: Resolver<Array<ResolversTypes['Author']>, ParentType, ContextType, QueryAuthorsArgs>,
  texts?: Resolver<Array<ResolversTypes['Text']>, ParentType, ContextType, QueryTextsArgs>,
  text?: Resolver<Maybe<ResolversTypes['Text']>, ParentType, ContextType, RequireFields<QueryTextArgs, 'id'>>,
};

export type TextResolvers<ContextType = any, ParentType extends ResolversParentTypes['Text'] = ResolversParentTypes['Text']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  authors?: Resolver<Maybe<Array<ResolversTypes['Author']>>, ParentType, ContextType>,
  subject?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Text?: TextResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

import gql from 'graphql-tag';
