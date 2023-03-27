import React, { useState } from "react";
import { Manga } from "../../../types/manga";
import { Flex } from "../../Flex";
import { AddManga } from "../AddManga";
import { MangaItem } from "./MangaItem";
import { MangaListHeader } from "./MangaListHeader";
interface Props {
  mangas?: Manga[];
  isHome?: boolean;
}
export const MangaList = ({ mangas, isHome = false }: Props): JSX.Element => {
  const [selectedManga, setSelectedManga] = useState<Manga | null>();

  const handleSelectManga = (manga: Manga | null) => {
    setSelectedManga(manga);
  };
  return (
    <>
      <MangaListHeader isCRUD={!isHome}>
        {mangas?.map((manga) => (
          <Flex
            css={{
              background: "rgb(152, 193, 217, 0.5)",
              "&:first-child": { marginTop: "-16px" },
              "&:nth-child(odd)": { background: "rgb(107, 142, 173,0.8)" },
            }}
          >
            <MangaItem
              isCRUD={!isHome}
              manga={manga}
              handleSelectedManga={handleSelectManga}
            />
          </Flex>
        ))}
      </MangaListHeader>
      <AddManga
        handleSelectedManga={handleSelectManga}
        selectedManga={selectedManga}
        isEditing={isHome}
      />
    </>
  );
};
