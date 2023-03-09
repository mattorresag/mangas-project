import { Manga } from "./manga";

export type CurrentUser = {
  email: string;
  name: string;
  role: "admin" | "user";
  uid: string;
  mangas?: Manga[];
};
