import "./Footer.css";

function Footer() {
  return (
    <footer className="text-center text-light">
      <p>
        <a className="link" href="/platynowy-bog/apidocs" target="_blank">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABL0lEQVQ4T2NkoBAwUqifAWzA+/fv/4cWbvywZ/89AZiB7y8UMjxUtQBz5W+fYBA06Ifb5WSv8LFvWye/wZubjIwXRNT/M/Pz/JQ5s4cdpAKmEJcBMHH5Kwd/MrCzszMyyNX9v6544fPPqzd5QTaBDdHvY3h/sQjVBfr9DFflzn75feMOD0JdP9AL8nX/wd6AOln+0oGfDJwcYNcgewHEZhbk+ylzaheKSxlB/scVkMgG4FIDDgNKYoJyAyj2AnIggrzyxMz959/3H9lBIY0RBj9+/nyoaw+Wg0U3OBrfXywEBwNIA6uq/Bftp+Y82KIRWR2bpupnrYdGvJBY+PXr50NtOxST8SUksEtNXX/+/fAZmJCAABQTJT6VRCdlZweFj2smBPILCgoyUiczUZIOAEkLrwEbahiTAAAAAElFTkSuQmCC"
            alt=""
          />{" "}
          API documentation
        </a>
      </p>
      <p>
        Strona wzorowana na{" "}
        <a
          className="link"
          href="https://platinumgod.co.uk/"
          target="_blank"
          rel="noreferrer"
        >
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
          rel="noreferrer"
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
            rel="noreferrer"
          >
            DallogFheir
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
