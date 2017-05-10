type Bill = {
  id: string,
  description: string,
  sponsors: Array<Legislator.id>,
  categories: Array<Category>,
  references: Array<Reference>,
  versions: Array<Version.id>,
}

type Category = {
  name: string,
  url: string,
};

type Reference = {
  id: string,
  url: string,
};

type Version = {
  id: string,
  changes: Array<Change>,
};

type Change = {
  from: number,
  count: number,
  text: string,
};
