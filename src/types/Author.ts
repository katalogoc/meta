export interface Lifetime {
  born: number;
  died: number;
}

export interface Author {
  id?: string;
  fullname: string;
  alias: string;
  influences?: Author[];
  influenced?: Author[];
  contemporaries?: Author[];
  lifetime: Lifetime;
}
