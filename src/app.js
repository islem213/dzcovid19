

axios.get('https://corona.lmao.ninja/countries?sort=cases')
    .then(function (response) {
        // handle success

        let x = 1;
        var tabledata = []

        response.data.forEach(country => {
            tabledata.push({
                id: x++,
                name: country.country,
                cases: country.cases,
                todayCases: country.todayCases,
                deaths: country.deaths,
                todayDeaths: country.todayDeaths,
                recovered: country.recovered,
                active: country.active,
                critical: country.critical,
                casesPerOneMillion: country.casesPerOneMillion,
                deathsPerOneMillion: country.deathsPerOneMillion,
            })
        })

        var table = new Tabulator("#world-table", {
            height: 500,
            columnMinWidth: 80,
            // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
            data: tabledata, //assign data to table
            layout: "fitColumns", //fit columns to width of table (optional)
            columns: [ //Define Table Columns
                { title: "#", field: "id", minWidth: 50 },
                { title: "Name", field: "name", minWidth: 100 },
                { title: "Cases", field: "cases", minWidth: 100 },
                { title: "Today Cases", field: "todayCases", minWidth: 100 },
                { title: "Deaths", field: "deaths", minWidth: 100 },
                { title: "Today Deaths", field: "todayDeaths", minWidth: 100 },
                { title: "Recovered", field: "recovered", minWidth: 100 },
                { title: "Active", field: "active", minWidth: 100 },
                { title: "Critical", field: "critical", minWidth: 100 },
            ],

        });




    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });




axios.get('../coviddz.json')
    .then((result) => { return result })
    .then((result) => {


        var tabledata = []

        result.data.Wilayas.forEach(wilaya => {

            tabledata.push({
                id: wilaya.info.id,
                name: wilaya.name,
                cases: wilaya.info.cases,
                deaths: wilaya.info.deaths,
                recovered: wilaya.info.recovered,

            })
        })

        var table = new Tabulator("#dz-table", {
            height: 500,
            columnMinWidth: 80,
            initialSort: [
                { column: "cases", dir: "desc" } //sort by this first

            ],
            data: tabledata, //assign data to table
            layout: "fitColumns", //fit columns to width of table (optional)
            columns: [ //Define Table Columns
                { title: "Wilaya", field: "id", minWidth: 50 },
                { title: "Name", field: "name", minWidth: 100 },
                { title: "Cases", field: "cases", minWidth: 100, },
                { title: "Deaths", field: "deaths", minWidth: 100 },
                { title: "Recovered", field: "recovered", minWidth: 100 },

            ]


        });

        // header
        let totalCasesh1 = document.querySelector('.totalCase');
        totalCasesh1.innerHTML = "<u>Cases</u>: </br>" + result.data.Total_cases;
        let totalDeathsh1 = document.querySelector('.totalDeaths');
        totalDeathsh1.innerHTML = "<u>Deaths</u>: </br>" + result.data.Total_deaths;
        let totalRecoveredh1 = document.querySelector('.totalRecovered');
        totalRecoveredh1.innerHTML = "<u>Recovered</u>: </br>" + result.data.Total_recoveries;
        let deathRateh1 = document.querySelector('.DeathRate');
        deathRateh1.innerHTML = "<u>Death Rate</u>: </br>" + ((result.data.Total_deaths * 100) / result.data.Total_cases).toFixed(2) + " %";

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Cases', 'Deaths', 'Recovered'],
                datasets: [{

                    data: [result.data.Total_cases, result.data.Total_deaths, result.data.Total_recoveries],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'

                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        //===================================================
        var ctx = document.getElementById('myChart2').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['25/2', '28/2', '01/3', '02/3', '03/3', '04/3', '05/3', '07/3', '08/3', '12/3', '13/3', '15/3', '17/3', '18/3', "20/3", "23/3", '27/3', '30/3', '31/3', '03/04', '04/04', '05/04', '06/04', '07/04', '10/4'],
                datasets: [
                    {
                        data: [1, 1, 3, 5, 12, 17, 19, 20, 25, 27, 49, 54, 61, 72, 102, 230, 409, 584, 716, 1171, 1251, 1320, 1423, 1468, 1761],

                        borderColor: '#1d6bc4',
                        pointBackgroundColor: '#1d6bc4',
                        pointBorderColor: '#fff',
                        label: "cases"
                    },

                    {
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 4, 5, 6, 9, 17, 26, 35, 44, 105, 130, 152, 173, 193, 256],

                        borderColor: '#ff0000',
                        pointBackgroundColor: '#ff0000',
                        pointBorderColor: '#fff',
                        label: "deaths"
                    }



                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    });

