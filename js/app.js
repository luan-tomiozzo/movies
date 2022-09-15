/*
Variáveis Globais
*/

let quant_filmes = 5;
let contar = 0;
let endpoint_principal = "dados.json";
let endpoint_atual = endpoint_principal;
let data_json;
let content = document.getElementById("content");
let loadArea = document.getElementById("load-area");
let btLoad = document.getElementById("btLoadMore");
/*
AJAX Carregar filmes
*/

function loadGames(){

    let ajax = new XMLHttpRequest();
    ajax.open("GET", endpoint_principal, true);
    ajax.send();

    ajax.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            data_json = JSON.parse(this.responseText);
            setTimeout(() => {
                //console.log(data_json);
                loadArea.style.display = "block";
                printCard();
            }, 500);
        }
    }
}

loadGames();

/*
Imprimir Card
*/
function printCard() {
    let html_content = "";
    content.innerHTML = html_content;
    if (data_json.length > 0) {
        loadMore();
    } else {
        html_content = msg_alert("Nenhum jogo cadastrado!", "warning");
        content.append = html_content;
    }
}

function loadMore(){
    
    let html_content = "";
    let final = (contar+quant_filmes);

    if(final > data_json.length){
        final = data_json.length
        loadArea.style.display = "none";
    }
    console.log(data_json);

    for(let i = contar; i < final; i++ ){
        html_content+=card(data_json[i]);
    }
    contar+=quant_filmes;
    content.innerHTML += html_content;
}


/*
Template Engine
*/
card = function ({ Poster, Title, Genre, Released, Plot, BoxOffice }) {
    return `<div class="col-12">
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-12 col-md-6 col-lg-4">
                                <img src="${Poster}" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${Title}</h5>
                                <h6><span class="badge bg-secondary">${Genre}</span>
                                <p class="card-text"><small class="text-muted">${Released}</small></p>
                                <p class="card-text">${Plot}</p>
                                <p class="card-text">Box office: U${BoxOffice}</p>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-info" href="button">Mais Informações</button>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>`
}


msg_alert = function (msg, tipo) {
    return `<div class="col-12 col-md-6"><div class="alert alert-${tipo}" role="alert">${msg}</div></div>`;
}
