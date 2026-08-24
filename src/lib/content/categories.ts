import type { ProjectCategory } from "@/lib/supabase/database.types";

export const categoryLabels: Record<ProjectCategory, string> = {
  kuchnie: "Meble kuchenne",
  szafy: "Szafy na wymiar",
  sypialnie: "Meble do sypialni",
  salony: "Meble do salonu",
  lazienki: "Meble łazienkowe",
  przedpokoje: "Meble do przedpokoju",
  biura: "Meble biurowe",
  inne: "Meble na wymiar",
};

export const categoryServiceHref: Partial<Record<ProjectCategory, string>> = {
  kuchnie: "/meble-na-wymiar/kuchenne",
  szafy: "/meble-na-wymiar/szafy-wnekowe-do-zabudowy",
  sypialnie: "/meble-na-wymiar/do-sypialni",
  salony: "/meble-na-wymiar/do-salonu",
  lazienki: "/meble-na-wymiar/lazienkowe",
  przedpokoje: "/meble-na-wymiar/do-przedpokoju",
  biura: "/meble-na-wymiar/biurowe",
};
