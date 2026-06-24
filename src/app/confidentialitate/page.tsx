export default function ConfidentialitatePage() {
  return (
    <div className="container-page py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Politica de confidențialitate</h1>

      <div className="space-y-8 text-lg">
        <p>
          Mesterul Dorel respectă confidențialitatea utilizatorilor și se
          angajează să protejeze datele personale colectate prin intermediul
          platformei.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            1. Date colectate
          </h2>
          <p>
            Putem colecta informații precum numele, adresa de email,
            numărul de telefon și alte date furnizate voluntar prin formularele
            disponibile pe platformă. :contentReference[oaicite:0]{index=0}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Utilizarea datelor
          </h2>
          <p>
            Datele colectate sunt utilizate pentru funcționarea platformei,
            comunicarea cu utilizatorii, îmbunătățirea serviciilor și
            facilitarea conexiunii dintre clienți și meseriași. :contentReference[oaicite:1]{index=1}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Cookie-uri
          </h2>
          <p>
            Platforma poate utiliza cookie-uri și tehnologii similare pentru
            analiza traficului și îmbunătățirea experienței utilizatorilor. :contentReference[oaicite:2]{index=2}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Protecția datelor
          </h2>
          <p>
            Luăm măsuri tehnice și organizatorice rezonabile pentru protejarea
            datelor împotriva accesului neautorizat, modificării sau pierderii
            acestora. :contentReference[oaicite:3]{index=3}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Drepturile utilizatorilor
          </h2>
          <p>
            Utilizatorii pot solicita accesul, rectificarea sau ștergerea
            datelor personale, precum și alte drepturi prevăzute de legislația
            aplicabilă privind protecția datelor. :contentReference[oaicite:4]{index=4}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Contact
          </h2>
          <p>
            Pentru întrebări legate de prelucrarea datelor personale ne poți
            contacta la adresa:
          </p>

          <div className="mt-4 rounded-xl border p-4">
            <p><strong>Email:</strong> contact@mesteruldorel.ro</p>
            <p><strong>Telefon:</strong> 0721 000 000</p>
          </div>
        </section>
      </div>
    </div>
  );
}
