window.onload = function() {
    document.getElementsByClassName("date")[0].addEventListener("change", handleChange)
    document.getElementsByClassName("date")[1].addEventListener("change", handleChange)
    document.getElementsByClassName("currency")[0].addEventListener("change", handleChange)


    function handleChange() {
        let startDate = document.getElementsByClassName("date")[0].value;
        let endDate = document.getElementsByClassName("date")[1].value;
        let currency = document.getElementsByClassName("currency")[0].value;
        axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
            .then((result) => {
                let labels = Object.keys(result.data.bpi);
                let data = Object.values(result.data.bpi);
                var ctx = document.getElementById('graph');
                let min = Math.min(...data);
                let max = Math.max(...data)
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Bitcoin Price Index',
                            data: data,
                            borderWidth: 1
                        }]
                    }
                });
                document.getElementById("min").innerHTML = min;
                document.getElementById("max").innerHTML = max;

            })
            .catch(err => {
                console.log(err);
            })
    }
}