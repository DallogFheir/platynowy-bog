const mailtoLink = document.querySelector("#mailto");

mailtoLink.addEventListener("click", (e) => {
  e.preventDefault();

  const time = new Date().toLocaleString("pl");
  let subject = "[PLATYNOWY-BÓG] Server is broken!";
  let body = `Server is still not working at ${time}. Please fix it ASAP!`;
  if (document.documentElement.lang === "pl") {
    subject = "[PLATYNOWY-BÓG] Serwer się popsuł!";
    body = `Serwer ciągle nie działa o godzinie ${time}. Napraw go natychmiast!`;
  }

  location.assign(
    `mailto:dallog.fheir@gmail.com?subject=${subject}&body=${body}`
  );
});
