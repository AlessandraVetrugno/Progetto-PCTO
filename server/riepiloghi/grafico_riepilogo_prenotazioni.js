let grafico_riepiloghi;
let riepiloghi = new Array(), labels_riepiloghi, colori_riepiloghi, valori_riepiloghi;

// prendo gli elementi della tabella (un destructuring un po' strano)
let tabella = document.getElementById("tabella").childNodes[1].children;
console.log(tabella)
function getData() {
    let data = [];
    console.log(tabella.length)
    for (let i = 1; i < tabella.length; i++) {
        let giorno = tabella[i].children[0].innerText;
        let n_prenotazioni = tabella[i].children[1].innerText;
        data[giorno] = parseInt(n_prenotazioni);
    }
    return data;
}

riepiloghi = getData();
console.log(riepiloghi);
    labels_riepiloghi = Object.keys(riepiloghi);

    riepiloghi = Object.values(riepiloghi);

    valori_riepiloghi = Array.from(riepiloghi.values());

    colori_riepiloghi = new Array();
    riepiloghi.forEach((fondo) => {
        colori_riepiloghi[colori_riepiloghi.length] =
            "#" +
            Math.floor(Math.random() * parseInt("ffffff", 16)).toString(16);
    });
    createChartriepiloghi();


console.log("colori riepiloghi", colori_riepiloghi);
console.log("labels riepiloghi", labels_riepiloghi);
console.log("valori riepiloghi", valori_riepiloghi);


function createChartriepiloghi() {
    var ctx = document.getElementById("grafico-riepiloghi");
    grafico_riepiloghi = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels_riepiloghi,
            datasets: [
                {
                    label: "numero delle prenotazioni",
                    backgroundColor: colori_riepiloghi,
                    data: valori_riepiloghi,
                },
            ],
        },
        options: {
            legend: { display: false },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}