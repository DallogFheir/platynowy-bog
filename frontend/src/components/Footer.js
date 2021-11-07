import "./Footer.css";

function Footer() {
  return (
    <footer className="text-center text-light">
      <p>
        <a className="link" href="/apidocs" target="_blank">
          🇬🇧 API documentation
        </a>
      </p>
      <p>
        Strona wzorowana na{" "}
        <a className="link" href="https://platinumgod.co.uk/" target="_blank">
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
        >
          The Binding of Isaac: Rebirth Wiki
        </a>
        .
      </p>
      <p>
        Proszę o zgłaszanie wszelkich literówek, błędów i innych uwag, próśb i
        zażaleń.
      </p>
      <div>
        <p>Kontakt:</p>
        <p>
          <i className="bi bi-envelope-fill"></i>{" "}
          <a className="link" href="mailto:dallog.fheir@gmail.com">
            dallog.fheir@gmail.com
          </a>
        </p>
        <p>
          <i className="bi bi-github"></i>{" "}
          <a
            className="link"
            href="https://github.com/DallogFheir"
            target="_blank"
          >
            DallogFheir
          </a>
        </p>
        <p>
          <i className="bi bi-steam"></i>{" "}
          <a
            className="link"
            href="https://steamcommunity.com/id/dallogfheir/"
            target="_blank"
          >
            DallogFheir
          </a>
        </p>
        <p>
          <i className="bi bi-twitter"></i>{" "}
          <a
            className="link"
            href="https://twitter.com/DallogFheir"
            target="_blank"
          >
            @DallogFheir
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
