const url = 'https://swapi.dev/api/people/3/';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const name = data.name;
    const height = data.height;
    const mass = data.mass;
    const eye_color = data.eye_color;

    // Mostrar la información en la página
    document.getElementById('nombre').innerHTML = `Nombre: ${name}`;
    document.getElementById('altura').innerHTML = `Altura: ${height}`;
    document.getElementById('peso').innerHTML = `Peso: ${mass}`;
    document.getElementById('color-ojos').innerHTML = `Color de ojos: ${eye_color}`;
  })
  .catch(error => console.error(error));

url2 = 'https://swapi.dev/api/people/2/';

fetch(url2)
  .then(response => response.json())
  .then(data => {
    const name = data.name;
    const height = data.height;
    const mass = data.mass;

    // Mostrar la información en la página
    document.getElementById('nombre2').innerHTML = `Nombre: ${name}`;
    document.getElementById('altura2').innerHTML = `Altura: ${height}`;
    document.getElementById('peso2').innerHTML = `Peso: ${mass}`;
  })
  .catch(error => console.error(error));

  url3 = 'https://swapi.dev/api/people/1/';

fetch(url3)
  .then(response => response.json())
  .then(data => {
    const name = data.name;
    const height = data.height;
    const mass = data.mass;
    const eye_color = data.eye_color;

    // Mostrar la información en la página
    document.getElementById('nombre3').innerHTML = `Nombre: ${name}`;
    document.getElementById('altura3').innerHTML = `Altura: ${height}`;
    document.getElementById('peso3').innerHTML = `Peso: ${mass}`;
    document.getElementById('color-ojos3').innerHTML = `Color de ojos: ${eye_color}`;
  })
  .catch(error => console.error(error));
