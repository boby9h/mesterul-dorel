export default function ConfidentialitatePage() {
  return (
    <div className="container-page py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">
        Politica de confidențialitate
      </h1>

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
            numărul de telefon și alte date furnizate voluntar prin
            formularele disponibile pe platformă.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            2. Utilizarea datelor
          </h2>
          <p>
            Datele colectate sunt utilizate pentru funcționarea platformei,
            comunicarea cu utilizatorii și îmbunătățirea serviciilor.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            3. Cookie-uri
          </h2>
          <p>
            Platforma poate utiliza cookie-uri pentru îmbunătățirea
            experienței utilizatorilor și analiza traficului.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            4. Protecția datelor
          </h2>
          <p>
            Luăm măsuri rezonabile pentru protejarea datelor împotriva
            accesului neautorizat, modificării sau pierderii acestora.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            5. Drepturile utilizatorilor
          </h2>
          <p>
            Utilizatorii pot solicita accesul, modificarea sau ștergerea
            datelor personale în conformitate cu legislația aplicabilă.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            6. Contact
          </h2>
          <p>
            Pentru întrebări privind datele personale ne poți contacta la:
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
