export default {
	getPresidi
};

function getPresidi () { 
    return [
        {
            regione: "Lombardia",
            province: [
                {
                    provincia: "Brescia",
                    presidi: ["PoTampone", "Veccino", "Number One"]
                },
                {
                    provincia: "Milano",
                    presidi: ["Tampone e fatturato", "Non siamo giargiana", "Siamo pronti per il meeting"]
                }
            ]
        },
        {
            regione: "Toscana",
            province: [
                {
                    provincia: "Firenze",
                    presidi: ["Santa Giulia", "Vaxxino", "YouVax"]
                },
                {
                    provincia: "Livorno",
                    presidi: ["Bu Pisa", "Una horda per huggire", "Ho fatto il tampone Deh"]
                }
            ]
        }
    ];
}