export default {
	getListaPrenotazioni,
    getProvinceCascader,
    aggiungiPresidio
};

async function getListaPrenotazioni (data) {
    //converto i parametri da oggetto a stringa
    var query_data = toQueryString(data);

    if (data.id_presidio === undefined) query_data = '';

    const response = await fetch(process.env.REACT_APP_PERSONALE_LISTA_PRENOTAZIONI + query_data, {
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

function getProvinceCascader (callback) { 
    fetch(process.env.REACT_APP_PRESIDI, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(b=>b.json())
    .then((data) => {
            var options = [];
            // una volta ottenuti i dati li formatto
            data.dati.forEach((regione, i) => {
                options[i] = {
                    value: regione.id,
                    label: regione.nome,
                    children: []
                }
                
                regione.province.forEach((provincia, j) => {
                    options[i].children[j] = {
                        value: provincia.id,
                        label: provincia.nome
                    }
                });
            });
        // chiamo la setState
        callback(options);
    });  
}

async function aggiungiPresidio (id_provincia, nome) {
    const data = {provincia: id_provincia, presidio: nome};

    const response = await fetch(process.env.REACT_APP_AGGIUNGI_PRESIDIO, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json();
}