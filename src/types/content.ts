export interface NewsItem {
  title: string;
  date: string;
  img: string;
  url: string;
  category: string;
  trending?: boolean;
}

export interface Program {
  name: string;
  code: string;
}

export interface MenuItem {
  label: string;
  path: string;
}
