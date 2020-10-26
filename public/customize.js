function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const response = await fetch(
  "https://www.random.org/integers/?num=1&min=1&max=5&col=1&base=10&format=plain&rnd=new",
  {
    method: "POST",
  }
);

window.addEventListener("DOMContentLoaded", (event) => {
  let temp = getRandomIntInclusive(1, 5);
  let color = "black";

  switch (temp) {
    case 1:
      color = "skyblue";
      break;
    case 2:
      color = "dodgerblue";
      break;
    case 3:
      color = "yellow";
      break;
    case 4:
      color = "lightgreen";
      break;
    case 5:
      color = "red";
      break;

    default:
      break;
  }

  var dynamicManifest = {
    short_name: "React PWA",
    name: "React PWA",
    start_url: ".",
    display: "standalone",
    theme_color: color,
    background_color: color,
    description: "React customizable PWA",
    icons: [
      {
        src: "./img/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "./img/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  const stringManifest = JSON.stringify(dynamicManifest);
  const blob = new Blob([stringManifest], { type: "application/json" });
  const manifestURL = URL.createObjectURL(blob);
  document.querySelector("#manifest").setAttribute("href", manifestURL);
});
