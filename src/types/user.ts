import { Manga } from "./manga";

export type CurrentUser = {
  email: string;
  name: string;
  role: "admin" | "user";
  uid: string;
  avatar?: string;
  mangas?: Manga[];
};
