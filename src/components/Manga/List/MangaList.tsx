import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDebounce } from "react-use";
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
  const [debounced, setDebounced] = useState("");

  const [userSearch, setUserSearch] = useState("");

  const filteredMangas =
    mangas && debounced.length > 0
      ? mangas.filter((manga) => manga.name.toLowerCase().includes(debounced))
      : mangas;

  const handleSelectManga = (manga: Manga | null) => {
    setSelectedManga(manga);
  };

  useDebounce(
    () => {
      setDebounced(userSearch || "");
    },
    300,
    [userSearch]
  );

  return (
    <Flex direction="column" css={{ gap: "16px" }}>
      <Flex justify={isMobile ? "center" : "end"}>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setUserSearch(value.toLowerCase());
          }}
          placeholder="Buscar Mangá"
        />
      </Flex>
      <MangaListHeader isCRUD={!isHome}>
        {filteredMangas?.map((manga) => (
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
    </Flex>
  );
};
