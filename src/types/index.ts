export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export interface TagWithCount {
  tag: string;
  count: number;
}
