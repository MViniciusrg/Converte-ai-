
var goBtn = document.querySelector("#convertBtn");
var moeda1 = document.querySelector("#selection01")
var moeda2 = document.querySelector("#selection02")

var telaConversao = document.querySelector("#selectionDiv")

var convFinal = document.querySelector("#resultadoConvert")

var ultimaConv;

if(localStorage.length != 0){
    let dadosconvFinal = localStorage.getItem('moedasDados')
    
    dadosconvFinal = JSON.parse(dadosconvFinal)
    
    document.querySelector("#ultimoValor").innerHTML = `ultima conversão realizada: <br> ${dadosconvFinal[0]} > ${dadosconvFinal[1]} = ${dadosconvFinal[2]}`
}


goBtn.addEventListener('click', function (){
	
    if(moeda1.value.length >= 3 && moeda2.value.length >= 3){

        var valor1 = (moeda1.value).toUpperCase();
        var valor2 = (moeda2.value).toUpperCase();

        let moeda1bid;
        let moeda2bid
        let bid1, bid2;
        let divisao;
        

        //fetch moeda1

        fetch(`https://economia.awesomeapi.com.br/all/${valor1}-BRL`)
        .then((response =>{
            return response.json()
        }))
        .then((data =>{
            moeda1bid = data[valor1].bid
        }))
        .then(() =>{
            fetch(`https://economia.awesomeapi.com.br/all/${valor2}-BRL`)
            .then((response => {
                return response.json()
            }))
            .then((data =>{
                moeda2bid = data[valor2].bid
            }))
            .then(() =>{
                divisao = (moeda1bid/moeda2bid).toFixed(5)
                convFinal.innerHTML = `1 ${valor1} equivale a ${divisao} ${valor2}`

                function resultadoExibido() {
                    telaConversao.style.display = "none"
                    convFinal.style.display = "flex"


                    if( ultimaConv == undefined){
                        localStorage.setItem('moedasDados', JSON.stringify([valor1, valor2, divisao]))

                        ultimaConv = JSON.parse(localStorage.getItem('moedaDados'))
                    }
                }

                resultadoExibido();
                

            })
        })
        .catch(erro =>{
            alert("Insira moedas válidas")
        })
        


    }
    else{
        alert("Insira moedas válidas.")
    }

})
