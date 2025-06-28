// Archivo: netlify/functions/consultar-dni.js

exports.handler = async function (event, context) {
  // Obtenemos el DNI que viene en la URL (?dni=...)
  const dni = event.queryStringParameters.dni;

  // Obtenemos el Token de las variables de entorno de Netlify (más seguro)
  const apiToken = process.env.API_TOKEN_RENIEC;

  if (!dni) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Se requiere el DNI.' }),
    };
  }
  
  const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    if (!response.ok) {
        const errorData = await response.json();
        return { statusCode: response.status, body: JSON.stringify(errorData) };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno al consultar la API externa.' }),
    };
  }
};