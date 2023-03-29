import React, { useState } from "react";
import createBreakpoint from "../../../hooks/useWindowSize";
import { Manga } from "../../../types/manga";
import { Flex } from "../../Flex";
import { AddManga } from "../AddManga";
import { MangaItemDesktop } from "./Item/MangaItemDesktop";
import { MangaItemMobile } from "./Item/MangaItemMobile";
import { MangaListHeader } from "./MangaListHeader";
interface Props {
  mangas?: Manga[];
  isHome?: boolean;
}

const useBreakpoint = createBreakpoint();

export const MangaList = ({ mangas, isHome = false }: Props): JSX.Element => {
  const breakpoint = useBreakpoint();
  const isMobile = ["xs", "xxs"].includes(breakpoint);
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
              background: "rgb(152, 193, 217, 0.2)",
              "&:nth-child(odd)": { background: "rgb(107, 142, 173,0.4)" },
            }}
          >
            {isMobile ? (
              <MangaItemMobile
                isCRUD={!isHome}
                manga={manga}
                handleSelectedManga={handleSelectManga}
              />
            ) : (
              <MangaItemDesktop
                isCRUD={!isHome}
                manga={manga}
                handleSelectedManga={handleSelectManga}
              />
            )}
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
