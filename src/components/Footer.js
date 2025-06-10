import "./Footer.css";

function Footer() {
  return (
    <footer className="text-center text-light">
      <p>
        Strona wzorowana na{" "}
        <a
          className="link"
          href="https://platinumgod.co.uk/"
          target="_blank"
          rel="noreferrer">
          Platinum God
        </a>
        .
      </p>
      <p>
        Wszystkie informacje pochodzą z{" "}
        <a
          className="link"
          href="https://bindingofisaacrebirth.fandom.com/wiki/Binding_of_Isaac:_Rebirth_Wiki"
          target="_blank"
          rel="noreferrer">
          The Binding of Isaac: Rebirth Wiki
        </a>{" "}
        , plików gry lub changelogów i dotyczą wersji Repentance+ z dnia
        1.05.2025.
      </p>
    </footer>
  );
}

export default Footer;
