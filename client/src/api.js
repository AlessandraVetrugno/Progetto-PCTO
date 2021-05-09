export default {
	getPresidi
};

async function getPresidi () { 
    var response = await fetch('http://localhost/tamponi/get/all_rpp.php', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(b=>b.json());

    console.log(response?.dati);
    return response.dati;
}