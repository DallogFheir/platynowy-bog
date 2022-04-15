import React from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-wrapper">
          <div className="error-horizontal">
            <p className="error-p">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAnCAYAAACi5nCnAAAB80lEQVR4nO2ZsU7CUBSG/xJMcDc+gQ4SJ1lQH8CBwQF3F0wcXIzPYVxMHOARxMSBgQdQWXAydeANjLtM4kB/k5709NyWEsmt3wItt6flfL333NsGKIgaMHNpNwWCos4pqSwr8F+QO0uuJiyKNFVOM5aJl14XALBRryf+/hmGAID9zlnqeRYxVS4zmhHLxPbBYWo7y1QeQ+UwI41YJiRh/x4AcHx9k9qOcYk0lcWQ32YWNUJkn/iazcOuB8mJnjw/JR5HXAx5ZabKL1YdYR+ot0+cAkuTmhHrOI3eaBy73k6zEXhl5jddrnMt3ttEu8fZ16yKL+MOK7XY/otmI7Z9OxqrMbwyU7WMaKOQNloRtrcMMdPDTJedjFdmgqzrEt7bnHv1BwMAQLvVSj2Ohsa7e6ntjr6nsW2eh7De+D+aLWomK5ohaSTPTMArM1W5Qxt9Tu+6smkuGFfWFX423l4BAB/vYebYfpthRmSllfd0UTCurPxyHVS+WTP/MUc1ZmQSzY5lxpaF1VeS6ops45cZ7QeO84jqAbezrjglj1eX8fgRNJLSV8x66JUZ8xkAM/mwNTdyvjbfb61TeBzZ3Ek26mDEGb/NEG3Oxowz09oKU0MzQf6fNUfkftZMZN/QsJ5sFvGeplxmJKv4xoyU24xkFd4ykx+RqtVnC6Ee0wAAAABJRU5ErkJggg=="
                alt=""
              />
              <span className="error-code">Błąd</span>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAnCAYAAACi5nCnAAAB80lEQVR4nO2ZsU7CUBSG/xJMcDc+gQ4SJ1lQH8CBwQF3F0wcXIzPYVxMHOARxMSBgQdQWXAydeANjLtM4kB/k5709NyWEsmt3wItt6flfL333NsGKIgaMHNpNwWCos4pqSwr8F+QO0uuJiyKNFVOM5aJl14XALBRryf+/hmGAID9zlnqeRYxVS4zmhHLxPbBYWo7y1QeQ+UwI41YJiRh/x4AcHx9k9qOcYk0lcWQ32YWNUJkn/iazcOuB8mJnjw/JR5HXAx5ZabKL1YdYR+ot0+cAkuTmhHrOI3eaBy73k6zEXhl5jddrnMt3ttEu8fZ16yKL+MOK7XY/otmI7Z9OxqrMbwyU7WMaKOQNloRtrcMMdPDTJedjFdmgqzrEt7bnHv1BwMAQLvVSj2Ohsa7e6ntjr6nsW2eh7De+D+aLWomK5ohaSTPTMArM1W5Qxt9Tu+6smkuGFfWFX423l4BAB/vYebYfpthRmSllfd0UTCurPxyHVS+WTP/MUc1ZmQSzY5lxpaF1VeS6ops45cZ7QeO84jqAbezrjglj1eX8fgRNJLSV8x66JUZ8xkAM/mwNTdyvjbfb61TeBzZ3Ek26mDEGb/NEG3Oxowz09oKU0MzQf6fNUfkftZMZN/QsJ5sFvGeplxmJKv4xoyU24xkFd4ykx+RqtVnC6Ee0wAAAABJRU5ErkJggg=="
                alt=""
              />
            </p>
            <p className="error-p">Coś poszło nie tak!</p>
            <p className="error-p">Wróć do:</p>
            <p className="error-p">
              <a className="error-link" href="/">
                Platynowy Bóg
              </a>
            </p>
            <p className="error-p">
              <a className="error-link" href="/apidocs">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABL0lEQVQ4T2NkoBAwUqifAWzA+/fv/4cWbvywZ/89AZiB7y8UMjxUtQBz5W+fYBA06Ifb5WSv8LFvWye/wZubjIwXRNT/M/Pz/JQ5s4cdpAKmEJcBMHH5Kwd/MrCzszMyyNX9v6544fPPqzd5QTaBDdHvY3h/sQjVBfr9DFflzn75feMOD0JdP9AL8nX/wd6AOln+0oGfDJwcYNcgewHEZhbk+ylzaheKSxlB/scVkMgG4FIDDgNKYoJyAyj2AnIggrzyxMz959/3H9lBIY0RBj9+/nyoaw+Wg0U3OBrfXywEBwNIA6uq/Bftp+Y82KIRWR2bpupnrYdGvJBY+PXr50NtOxST8SUksEtNXX/+/fAZmJCAABQTJT6VRCdlZweFj2smBPILCgoyUiczUZIOAEkLrwEbahiTAAAAAElFTkSuQmCC"
                  alt=""
                />{" "}
                API documentation
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
