import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych osobowych przez EDMAT.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <div className="border-b border-line bg-paper py-6">
        <div className="container-edmat">
          <Breadcrumbs items={[{ label: "Polityka prywatności" }]} />
        </div>
      </div>

      <section className="bg-paper py-14 sm:py-20">
        <div className="container-edmat max-w-3xl space-y-8 text-ink-soft">
          <h1 className="text-balance text-4xl text-ink sm:text-5xl">Polityka prywatności</h1>

          <div>
            <h2 className="text-xl font-semibold text-ink">Administrator danych</h2>
            <p className="mt-2 leading-relaxed">
              Administratorem danych osobowych przetwarzanych za pośrednictwem niniejszej strony jest EDMAT,
              {" "}
              {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}. Kontakt:{" "}
              <a href={siteConfig.contact.emailHref} className="text-accent underline">
                {siteConfig.contact.email}
              </a>
              , {siteConfig.contact.phone}.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Formularz kontaktowy</h2>
            <p className="mt-2 leading-relaxed">
              Dane podane w formularzu kontaktowym (imię i nazwisko, dane kontaktowe, treść wiadomości)
              przetwarzane są wyłącznie w celu udzielenia odpowiedzi na przesłane zapytanie oraz przygotowania
              wyceny. Podstawą przetwarzania jest zgoda osoby, której dane dotyczą (art. 6 ust. 1 lit. a RODO) oraz
              prawnie uzasadniony interes administratora polegający na obsłudze zapytań ofertowych (art. 6 ust. 1
              lit. f RODO).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Okres przechowywania danych</h2>
            <p className="mt-2 leading-relaxed">
              Dane z formularza kontaktowego przechowywane są przez czas niezbędny do obsługi zapytania oraz przez
              okres wynikający z ewentualnych roszczeń lub przepisów prawa.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Prawa osoby, której dane dotyczą</h2>
            <p className="mt-2 leading-relaxed">
              Przysługuje Państwu prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
              przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania, a także prawo do cofnięcia zgody w
              dowolnym momencie bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem. W
              sprawach dotyczących danych osobowych prosimy o kontakt na adres{" "}
              <a href={siteConfig.contact.emailHref} className="text-accent underline">
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-ink">Pliki cookies</h2>
            <p className="mt-2 leading-relaxed">
              Strona korzysta wyłącznie z technicznie niezbędnych plików cookies, wymaganych do jej prawidłowego
              działania. Strona nie ładuje usług analitycznych ani marketingowych wymagających uprzedniej zgody.
              Jeżeli w przyszłości zostaną wdrożone narzędzia analityczne (np. Google Analytics), niniejsza polityka
              zostanie zaktualizowana, a przed ich uruchomieniem wyświetlony zostanie odpowiedni baner zgody.
            </p>
          </div>

          <p className="text-sm text-ink-faint">
            Niniejsza polityka prywatności ma charakter ogólny i została przygotowana na potrzeby uruchomienia
            nowej strony internetowej. Zalecana jest jej weryfikacja przez prawnika lub inspektora ochrony danych
            przed publikacją produkcyjną.
          </p>
        </div>
      </section>
    </>
  );
}
