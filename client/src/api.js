export default {
	getPresidi,
	getPrenotazione
};

function getPresidi (callback) { 
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
                            label: provincia.nome,
                            children: []
                        }
                        
                        provincia.presidi.forEach((presidio, k) => {
                            options[i].children[j].children[k] = {
                                value: presidio.id,
                                label: presidio.nome
                            }
                        })
                    })
                });

                // chiamo la dispatch passata come callback
                callback({type: 'presidi', payload: options})
            }
        );
}

function getPrenotazione (callback, data) {
    // creiamo la stringa da inviare come parametro della query
    // ex. codice_fiscale=ZBFMYT70T57A310Y&codice_prenotazione=609997C438D62&
    data = Object.entries(data);
    var query_data = '?';
    data.forEach(entry => {
        query_data = query_data + entry[0] + '=' + entry[1] + '&'; 
    })

    // faccio la richiesta GET al server
    fetch(process.env.REACT_APP_PRENOTAZIONE + query_data, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(b=>b.json())
        .then((res) => {
            console.log(res);
                // chiamo la funzione passata come callback e le passo i dati come parametri
                callback(res);
            }
        );
}