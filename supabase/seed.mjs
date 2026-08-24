#!/usr/bin/env node
/**
 * Jednorazowy skrypt migracyjny: wgrywa prawdziwe zdjęcia 13 archiwalnych
 * realizacji (z supabase/seed-assets/realizacje) do Supabase Storage i tworzy
 * odpowiadające im wiersze w `projects` / `project_images`, a także 3 wpisy
 * `posts` (aktualności) i 2 wpisy `promotions` (archiwalne), zmigrowane z
 * www.edmat.pl. Źródła i uzasadnienia treści — patrz docs/legacy-url-inventory.md
 * i docs/content-verification-needed.md.
 *
 * Użycie:
 *   node supabase/seed.mjs
 *
 * Wymaga w środowisku (np. .env.local, załadowanego wcześniej przez `source`
 * lub `dotenv`):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (WYŁĄCZNIE lokalnie / w CI — nigdy w przeglądarce)
 *
 * Skrypt jest idempotentny w granicach rozsądku: przed wstawieniem sprawdza,
 * czy realizacja/wpis o danym slug już istnieje, i pomija go, jeśli tak.
 */

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_ASSETS_DIR = path.join(__dirname, "seed-assets", "realizacje");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Brak NEXT_PUBLIC_SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY w środowisku.\n" +
      "Uzupełnij .env.local i uruchom np.: node --env-file=.env.local supabase/seed.mjs"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

/** @typedef {{ folder: string, slug: string, title: string, category: string, location?: string, description: string, files: string[], cover: string }} ProjectSeed */

/** @type {ProjectSeed[]} */
const projects = [
  {
    folder: "kuchnia-biala-dab-wyspa",
    slug: "kuchnia-biala-dab-wyspa",
    title: "Kuchnia biała z dębowym blatem i wyspą",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar z frontami w kolorze białym i dębowym blatem (dąb K003). Centralnym elementem jest wyspa z blatem roboczym i wbudowaną szafką na wino, z uchwytami listwowymi wpuszczanymi we fronty.",
    files: [
      "kuchnia-biala-dab-wyspa.jpg",
      "kuchnia-biala-dab-wyspa-1.jpg",
      "kuchnia-biala-dab-wyspa-2.jpg",
      "kuchnia-biala-dab-wyspa-3.jpg",
      "kuchnia-biala-dab-wyspa-4.jpg",
      "kuchnia-biala-dab-wyspa-5.jpg",
      "kuchnia-biala-dab-wyspa-6.jpg",
      "kuchnia-biala-dab-wyspa-7.jpg",
      "kuchnia-biala-dab-wyspa-8.jpg",
    ],
    cover: "kuchnia-biala-dab-wyspa.jpg",
  },
  {
    folder: "kuchnia-frezowane-uchwyty-zolto-zielona",
    slug: "kuchnia-frezowane-uchwyty-zolto-zielona",
    title: "Kuchnia z frezowanymi uchwytami w kolorze żółto-zielonym",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar w intensywnym, żółto-zielonym kolorze, z frontami frezowanymi pełniącymi funkcję uchwytów — bez dodatkowego okucia na froncie.",
    files: [
      "kuchnia-kolor-zolto-zielony-1.jpg",
      "kuchnia-kolor-zolto-zielony-2.jpg",
      "kuchnia-kolor-zolto-zielony-3.jpg",
      "kuchnia-kolor-zolto-zielony-4.jpg",
      "kuchnia-kolor-zolto-zielony-5.jpg",
      "kuchnia-kolor-zolto-zielony-6.jpg",
      "kuchnia-kolor-zolto-zielony-7.jpg",
      "kuchnia-kolor-zolto-zielony-8.jpg",
    ],
    cover: "kuchnia-kolor-zolto-zielony-1.jpg",
  },
  {
    folder: "lozko-komoda-i-szafa-do-sypialni",
    slug: "lozko-komoda-i-szafa-do-sypialni",
    title: "Łóżko, komody i szafa do sypialni",
    category: "sypialnie",
    description:
      "Komplet mebli do sypialni na wymiar: łóżko, dwie komody z półkami otwartymi oraz szafa, wykonane w odcieniu drewna z zielonymi wstawkami dopasowanymi do koloru ścian.",
    files: [
      "lozko-kodody-do-sypialni.jpg",
      "lozko-kodody-do-sypialni-1.jpg",
      "lozko-kodody-do-sypialni-2.jpg",
      "lozko-kodody-do-sypialni-3.jpg",
      "lozko-kodody-do-sypialni-4.jpg",
      "szafa-do-sypialni.jpg",
    ],
    cover: "lozko-kodody-do-sypialni.jpg",
  },
  {
    folder: "kuchnia-biala-z-fornirem",
    slug: "kuchnia-biala-z-fornirem",
    title: "Kuchnia biała z fornirem",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar łącząca białe fronty lakierowane z naturalnym fornirem, nadającym wnętrzu cieplejszy, bardziej naturalny charakter.",
    files: [
      "kuchnia-biala-z-fornirem.jpg",
      "kuchnia-biala-z-fornirem-1.jpg",
      "kuchnia-biala-z-fornirem-2.jpg",
      "kuchnia-biala-z-fornirem-3.jpg",
      "kuchnia-biala-z-fornirem-4.jpg",
      "kuchnia-biala-z-fornirem-5.jpg",
    ],
    cover: "kuchnia-biala-z-fornirem.jpg",
  },
  {
    folder: "kuchnia-biala-zabudowa-kaloryfera",
    slug: "kuchnia-biala-zabudowa-kaloryfera",
    title: "Kuchnia biała z zabudową kaloryfera",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar w kolorze białym, w której grzejnik został zabudowany meblem z ażurowym frontem — rozwiązanie maskujące kaloryfer bez ograniczania jego działania.",
    files: [
      "kuchnia-zabudowa-kaloryfera.jpg",
      "kuchnia-zabudowa-kaloryfera-1.jpg",
      "kuchnia-zabudowa-kaloryfera-2.jpg",
      "kuchnia-zabudowa-kaloryfera-3.jpg",
    ],
    cover: "kuchnia-zabudowa-kaloryfera.jpg",
  },
  {
    folder: "kuchnia-ze-szklem-hartowanym-i-grafika",
    slug: "kuchnia-ze-szklem-hartowanym-i-grafika",
    title: "Kuchnia ze szkłem hartowanym i grafiką",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar w kolorze białym z panelem ze szkła hartowanego (lacobel) z nadrukiem florystycznej grafiki między blatem a szafkami górnymi.",
    files: ["kuchnia-biala-grafika.jpg", "kuchnia-biala-grafika-1.jpg"],
    cover: "kuchnia-biala-grafika.jpg",
  },
  {
    folder: "zabudowa-biura",
    slug: "zabudowa-biura",
    title: "Zabudowa biura i stanowiska obsługi klienta",
    category: "biura",
    description:
      "Meble biurowe na wymiar: zabudowa stanowiska obsługi klienta z ladą i przeszkleniem oraz towarzyszące biurka i szafy do przestrzeni biurowej.",
    files: [
      "stanowisko-obsluga-klienta-2.jpg",
      "meble-biurowe-obsluga-klienta.jpg",
      "meble-biurowe-biurko-szafka.jpg",
      "meble-biurowe-szafa.jpg",
      "stanowisko-obsluga-klienta-1.jpg",
      "stanowisko-obsluga-klienta-3.jpg",
      "stanowisko-obsluga-klienta-4.jpg",
      "stanowisko-obsluga-klienta-5.jpg",
      "stanowisko-obsluga-klienta-6.jpg",
      "stanowisko-obsluga-klienta-7.jpg",
      "stanowisko-obsluga-klienta-8.jpg",
    ],
    cover: "stanowisko-obsluga-klienta-2.jpg",
  },
  {
    folder: "szafa-przesuwna-z-grafika",
    slug: "szafa-przesuwna-z-grafika",
    title: "Szafa przesuwna z grafiką",
    category: "szafy",
    description:
      "Szafa przesuwna na wymiar z frontami z nadrukiem przedstawiającym uliczkę starego miasta — indywidualne rozwiązanie dla osób poszukujących niebanalnego mebla.",
    files: [
      "szafa-przesuwna-grafika.jpg",
      "szafa-przesuwna-grafika-1.jpg",
      "szafa-przesuwna-grafika-2.jpg",
      "szafa-przesuwna-grafika-3.jpg",
    ],
    cover: "szafa-przesuwna-grafika.jpg",
  },
  {
    folder: "szafa-przesuwna-ze-skosem",
    slug: "szafa-przesuwna-ze-skosem",
    title: "Szafa przesuwna ze skosem",
    category: "szafy",
    description:
      "Szafa przesuwna na wymiar dopasowana do skosu poddasza, z drzwiami wypełnionymi białą płytą oraz taflą lacobel w kolorze srebrnego metalika. Zastosowany system prowadnic objęty jest 5-letnią gwarancją.",
    files: [
      "szafa-przesuwna-biala-skos.jpg",
      "szafa-przesuwna-biala-skos-1.jpg",
      "szafa-przesuwna-biala-skos-2.jpg",
      "szafa-przesuwna-biala-skos-3.jpg",
    ],
    cover: "szafa-przesuwna-biala-skos.jpg",
  },
  {
    folder: "meble-kuchenne-w-kolorze-bialym-z-limonka",
    slug: "meble-kuchenne-w-kolorze-bialym-z-limonka",
    title: "Meble kuchenne białe z limonką",
    category: "kuchnie",
    description:
      "Przestronna kuchnia na wymiar z białej płyty meblowej, z frontami z MDF lakierowanego na biały połysk oraz akcentami w kolorze limonkowym, na szarym blacie imitującym marmur.",
    files: [
      "meble_kuchenne_biale_limonka1.jpg",
      "meble_kuchenne_biale_limonka2.jpg",
      "meble_kuchenne_biale_limonka3.jpg",
      "meble_kuchenne_biale_limonka4.jpg",
      "meble_kuchenne_biale_limonka5.jpg",
      "meble_kuchenne_biale_limonka6.jpg",
      "meble_kuchenne_biale_limonka7.jpg",
      "meble_kuchenne_biale_limonka_dzien1.jpg",
      "meble_kuchenne_biale_limonka_dzien2.jpg",
      "meble_kuchenne_biale_limonka_dzien3.jpg",
      "meble_kuchenne_biale_limonka_dzien4.jpg",
      "meble_kuchenne_biale_limonka_dzien5.jpg",
      "meble_kuchenne_biale_limonka_dzien6.jpg",
      "meble_kuchenne_biale_limonka_dzien7.jpg",
      "meble_kuchenne_biale_limonka_dzien8.jpg",
    ],
    cover: "meble_kuchenne_biale_limonka1.jpg",
  },
  {
    folder: "kuchnia-w-kolorach-fino-biala",
    slug: "kuchnia-w-kolorach-fino-biala",
    title: "Kuchnia w kolorach Fino-Biała",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar z płyty meblowej w kolorze Fino Bronce, z frontami foliowanymi w kolorze fino oraz białym połysku, z uchwytami listwowymi.",
    files: [
      "meble_kuchenne_fino_biale1.jpg",
      "meble_kuchenne_fino_biale2.jpg",
      "meble_kuchenne_fino_biale3.jpg",
      "meble_kuchenne_fino_biale4.jpg",
      "meble_kuchenne_fino_biale5.jpg",
    ],
    cover: "meble_kuchenne_fino_biale1.jpg",
  },
  {
    folder: "meble-kuchenne-w-krosnie",
    slug: "meble-kuchenne-w-krosnie",
    title: "Meble kuchenne w Krośnie",
    category: "kuchnie",
    location: "Krosno",
    description:
      "Meble kuchenne na wymiar wykonane dla klienta indywidualnego w Krośnie, z frontami w kolorze białego połysku oraz oświetleniem LED wbudowanym w zabudowę.",
    files: [
      "WP_20140626_001.jpg",
      "WP_20140626_002.jpg",
      "WP_20140626_003.jpg",
      "WP_20140626_004.jpg",
    ],
    cover: "WP_20140626_001.jpg",
  },
  {
    folder: "parawan-do-restauracji",
    slug: "parawan-do-restauracji",
    title: "Parawan do restauracji",
    category: "inne",
    description: "Parawan na wymiar w kolorystyce czarno-białej, wykonany dla lokalu gastronomicznego.",
    files: [
      "IMG_20161007_120017.jpg",
      "IMG_20161007_120032.jpg",
      "IMG_20161007_120929.jpg",
    ],
    cover: "IMG_20161007_120017.jpg",
  },
  {
    folder: "kuchnia-w-jasnym-brazie",
    slug: "kuchnia-w-jasnym-brazie",
    title: "Kuchnia w jasnym brązie z nadrukiem trawy",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar w kolorze jasnego brązu, z charakterystycznym panelem przyblatowym z nadrukiem trawy, wykonana w układzie z narożnym blatem roboczym.",
    files: ["kuchnia_jasny_braz1.jpg", "kuchnia_jasny_braz2.jpg", "kuchnia_jasny_braz3.jpg"],
    cover: "kuchnia_jasny_braz1.jpg",
  },
  {
    folder: "kuchnia-w-kolorze-ecru",
    slug: "kuchnia-w-kolorze-ecru",
    title: "Kuchnia w kolorze ecru z oświetleniem LED",
    category: "kuchnie",
    description:
      "Kuchnia na wymiar z frontami w kolorze ecru, w wysokim połysku, z podświetleniem LED pod szafkami górnymi.",
    files: ["meble_kuchenne_ekri1.jpg", "meble_kuchenne_ekri2.jpg", "meble_kuchenne_ekri3.jpg"],
    cover: "meble_kuchenne_ekri1.jpg",
  },
  {
    folder: "szafa-wnekowa-kremowa",
    slug: "szafa-wnekowa-kremowa",
    title: "Szafa wnękowa kremowa z czarnym szkłem",
    category: "szafy",
    description:
      "Szafa przesuwna do zabudowy wnęki, z frontami w kolorze kremowym i poziomymi pasami z czarnego szkła lacobel.",
    files: [
      "szafa_wnekowa_1.jpg",
      "szafa_wnekowa_2.jpg",
      "szafa_wnekowa_3.jpg",
      "szafa_wnekowa_4.jpg",
      "szafa_wnekowa_5.jpg",
      "szafa_wnekowa_6.jpg",
      "szafa_wnekowa_7.jpg",
    ],
    cover: "szafa_wnekowa_1.jpg",
  },
];

const posts = [
  {
    slug: "otwarcie-strony-firmowej",
    title: "Otwarcie strony firmowej",
    excerpt: "Po kilku miesiącach przygotowań uruchomiliśmy stronę internetową firmy EDMAT.",
    content:
      "Z przyjemnością informujemy, że po kilku miesiącach przygotowań uruchomiliśmy stronę internetową firmy EDMAT. Zapraszamy do zapoznania się z naszą ofertą mebli na wymiar oraz osłon okiennych.\n\nJeden z naszych klientów, Józef z Krosna, tak podsumował współpracę przy montażu rolet zewnętrznych i moskitier: „Profesjonalizm i dokładne wykonanie – tak w czterech słowach opisałbym Państwa firmę”.\n\nDziękujemy za zaufanie i zapraszamy do kontaktu.",
    published_at: "2013-05-15",
  },
  {
    slug: "edmat-na-portalach-spolecznosciowych",
    title: "EDMAT na portalach społecznościowych",
    excerpt: "Firma EDMAT dołączyła do najpopularniejszych portali społecznościowych.",
    content:
      "Firma EDMAT jest obecna w sieci już od jakiegoś czasu, a teraz dołączyliśmy również do najpopularniejszych portali społecznościowych. W momencie publikacji tego wpisu założyliśmy profile na Facebooku, Google+, Twitterze, Pinterest i YouTube.\n\nUwaga redakcyjna (2026): to archiwalny wpis. Google+ zostało zamknięte przez Google w 2019 roku, a aktywność na pozostałych platformach poza Facebookiem nie została potwierdzona. Aktualnie zapraszamy do obserwowania naszego profilu na Facebooku — link w stopce strony.",
    published_at: "2013-09-20",
  },
  {
    slug: "kolejne-inwestycje-zakonczone",
    title: "Kolejne inwestycje zakończone",
    excerpt: "We wrześniu i październiku zakończyliśmy realizację dwóch kuchni na wymiar.",
    content:
      "We wrześniu i październiku zrealizowaliśmy dwa kolejne projekty mebli kuchennych na wymiar, zaprojektowane zgodnie z aktualnymi trendami i wykonane z dbałością o detale:\n\n— kuchnia w kolorze białym z akcentem limonkowym,\n— kuchnia w kolorach Fino-Biała.\n\nObie realizacje można zobaczyć w naszej galerii realizacji.\n\nMarek i Joanna z Jedlicza, dla których wykonaliśmy meble kuchenne, podzielili się taką opinią: „Jesteśmy bardzo zadowoleni z usług firmy EDMAT, wszystko przebiegło sprawnie i szybko. Nasza kuchnia wygląda teraz wspaniale. Gorąco polecamy!”",
    published_at: "2014-11-03",
  },
];

const promotions = [
  {
    slug: "10-procentowy-rabat-na-meble-kuchenne-tylko-do-konca-lutego-2015",
    title: "10% rabatu na meble kuchenne — tylko do końca lutego 2015",
    description:
      "Rabat w wysokości 10% na meble kuchenne robione na wymiar, liczony od całej wartości zamówienia (materiały, robocizna i montaż). Promocja obowiązywała do końca lutego 2015 roku i nie jest już dostępna.",
    active: true,
    valid_from: "2015-01-01",
    valid_until: "2015-02-28",
  },
  {
    slug: "aktualne-promocje",
    title: "Aktualne promocje (archiwum)",
    description:
      "To archiwalna strona zbiorcza dawnych promocji EDMAT. Aktualną listę promocji zawsze znajdą Państwo na tej stronie — poniżej prezentujemy historyczną promocję, która była tu wcześniej opisana.",
    active: true,
    valid_from: null,
    valid_until: "2015-03-01",
  },
];

async function uploadImage(localPath, storagePath) {
  const buffer = await readFile(localPath);
  const ext = path.extname(localPath).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";

  const { error } = await supabase.storage
    .from("project-images")
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
}

async function seedProjects() {
  for (const [index, project] of projects.entries()) {
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", project.slug)
      .maybeSingle();

    if (existing) {
      console.log(`↷ pomijam "${project.slug}" — już istnieje`);
      continue;
    }

    const folderPath = path.join(SEED_ASSETS_DIR, project.folder);
    if (!existsSync(folderPath)) {
      console.warn(`⚠ brak katalogu ${folderPath}, pomijam ${project.slug}`);
      continue;
    }

    const { data: inserted, error: insertError } = await supabase
      .from("projects")
      .insert({
        title: project.title,
        slug: project.slug,
        description: project.description,
        category: project.category,
        location: project.location ?? null,
        published: true,
        sort_order: index,
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (insertError) {
      console.error(`✗ nie udało się dodać "${project.slug}":`, insertError.message);
      continue;
    }

    const projectId = inserted.id;
    let coverPath = null;

    for (const [imgIndex, filename] of project.files.entries()) {
      const localPath = path.join(folderPath, filename);
      if (!existsSync(localPath)) {
        console.warn(`  ⚠ brak pliku ${localPath}`);
        continue;
      }
      const storagePath = `projects/${projectId}/${filename}`;
      await uploadImage(localPath, storagePath);

      const { error: imgError } = await supabase.from("project_images").insert({
        project_id: projectId,
        storage_path: storagePath,
        alt_text: `${project.title} — zdjęcie ${imgIndex + 1}`,
        sort_order: imgIndex,
      });
      if (imgError) console.error(`  ✗ project_images insert error:`, imgError.message);

      if (filename === project.cover) coverPath = storagePath;
    }

    if (coverPath) {
      await supabase.from("projects").update({ cover_image_path: coverPath }).eq("id", projectId);
    }

    console.log(`✓ dodano realizację "${project.slug}" (${project.files.length} zdjęć)`);
  }
}

async function seedPosts() {
  for (const post of posts) {
    const { data: existing } = await supabase.from("posts").select("id").eq("slug", post.slug).maybeSingle();
    if (existing) {
      console.log(`↷ pomijam wpis "${post.slug}" — już istnieje`);
      continue;
    }

    const { error } = await supabase.from("posts").insert({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      published: true,
      published_at: post.published_at,
    });

    if (error) console.error(`✗ nie udało się dodać wpisu "${post.slug}":`, error.message);
    else console.log(`✓ dodano wpis "${post.slug}"`);
  }
}

async function seedPromotions() {
  for (const promotion of promotions) {
    const { data: existing } = await supabase
      .from("promotions")
      .select("id")
      .eq("slug", promotion.slug)
      .maybeSingle();
    if (existing) {
      console.log(`↷ pomijam promocję "${promotion.slug}" — już istnieje`);
      continue;
    }

    const { error } = await supabase.from("promotions").insert({
      title: promotion.title,
      slug: promotion.slug,
      description: promotion.description,
      active: promotion.active,
      valid_from: promotion.valid_from,
      valid_until: promotion.valid_until,
    });

    if (error) console.error(`✗ nie udało się dodać promocji "${promotion.slug}":`, error.message);
    else console.log(`✓ dodano promocję "${promotion.slug}"`);
  }
}

async function main() {
  console.log("Seedowanie danych EDMAT do Supabase…\n");
  await seedProjects();
  await seedPosts();
  await seedPromotions();
  console.log("\nGotowe.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
