// Loads on-render and executes it each time the refresh button is pressed
function renderHandler() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  let onRender: Function | null;
  const onRenderPath = "./build/on-render.js";

  const client = new XMLHttpRequest();
  client.open("GET", onRenderPath);
  client.onreadystatechange = function () {
    if (client.readyState == 4 && client.status == 200) {
      /*
        If the generated code is being evaluated as a string with the eval() function or via new Function(),
        then the source origin will be the page’s origin.

        https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit
      */
      const SOURCE_MAP_PATH = onRenderPath + ".map";
      onRender = new Function(
        `${client.responseText}\n//# sourceMappingURL=${SOURCE_MAP_PATH}`
      );
    }
  };
  client.send();

  const refreshButton = document.getElementById(
    "refresh-button"
  ) as HTMLDivElement;

  refreshButton.onclick = function () {
    if (!refreshButton.classList.contains("warned")) {
      console.warn(
        "Executing onRender through a Function object. Line numbers might be inaccurate."
      );
      refreshButton.classList.add("warned");
    }
    onRender();
  };
}

renderHandler();
