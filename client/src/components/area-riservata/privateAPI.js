export default {
	getListaPrenotazioni
};

async function getListaPrenotazioni (data) {
    //converto i parametri da oggetto a stringa
    var query_data = toQueryString(data);

    if (data.id_presidio === undefined) query_data = '';

    const response = await fetch("http://localhost/tamponi/prenotazioni/lista_prenotazioni.php" + query_data, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    
    return response.json();
}

function toQueryString (data) {
    // creiamo la stringa da inviare come parametro della query
    // ex. codice_fiscale=ZBFMYT70T57A310Y&codice_prenotazione=609997C438D62&
    data = Object.entries(data);
    var query_data = '?';
    data.forEach(entry => {
        query_data = query_data + entry[0] + '=' + entry[1] + '&'; 
    })
    return query_data;
}