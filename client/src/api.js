export default {
	getPresidi
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