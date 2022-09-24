/*
Variáveis Globais
*/

let quant_filmes = 10;
let contar = 0;
let endpoint_principal = "dados.json";
let endpoint_atual = endpoint_principal;
let data_json;
let content = document.getElementById("content");
let loadArea = document.getElementById("load-area");
let btLoad = document.getElementById("btLoadMore");
let catTitle = document.getElementById("catTitle");
let btInstall = document.getElementById("btInstall");
let filter_filme = "";

/*
AJAX Carregar Filmes
*/

function loadFilmes() {

    let ajax = new XMLHttpRequest();

    ajax.open("GET", endpoint_principal, true);
    ajax.send();

    ajax.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            data_json = JSON.parse(this.responseText);

            setTimeout(() => {
                //console.log(data_json);
                loadArea.style.display = "block";
                printCard();

            }, 500);

        }
    }

}

loadFilmes();

/*
Imprimir Card
*/
function printCard() {

    let html_content = "";
    content.innerHTML = html_content;

    if (data_json.length > 0) {

        loadMore();

    } else {
        html_content = msg_alert("Nenhum filme cadastrado!", "warning");
        content.append = html_content;
    }

}

function loadMore() {

    let temp_json = filter_filme === "" ? data_json : data_json.filter(d => filter_filme.includes(d.genre));
    let html_content = "";
    let final = (contar + quant_filmes);

    if (final > temp_json.length) {
        final = temp_json.length
        loadArea.style.display = "none";
    }

    //console.log(temp_json);
    for (let i = contar; i < final; i++) {
        html_content += card(temp_json[i]);
    }
    contar += quant_filmes;
    content.innerHTML += html_content;
}


/*
Template Engine
*/
card = function ({ Poster, Title, Genre, Runtime, Released, Actors, Plot, BoxOffice, Awards }) {
    return `<div class="col-12">
                <div class="card">
                    <div class="row no-gutters">
                        <div class="col-12 col-md-6 col-lg-4">
                            <img src="${Poster}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">                            
                                <h5 class="card-title">${Title}</h5> 
                                <span class="badge badge-pill bg-primary">${Genre}</span>
                                <span class="badge badge-pill bg-warning">${Runtime}</span>
                                <span class="badge badge-pill bg-success">${Released}</span>                                                                                     
                                <div>                           
                                <br>                           
                                    <b>🙆‍♂️🙆‍♀️ Actors</b><p class="card-text">${Actors}</p>  
                                    <b>🙄 Plot</b><p class="card-text">${Plot}</p>
                                    <b>🎟 Box office</b><p>U${BoxOffice}</p>
                                    <b>🏆 Awards</b><p class="card-text">${Awards}</p>                                    
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

/*
Botão de Instalação
*/
let windowInstall = null;
window.addEventListener('beforeinstallprompt', callInstallWindow);
function callInstallWindow(evt) {
    windowInstall = evt;
}

let initInstall = function () {
    setTimeout(function () {
        if (windowInstall != null)
            btInstall.removeAttribute("hidden");
    }, 500);
    btInstall.addEventListener("click", function () {
        btInstall.setAttribute("hidden", true)
        windowInstall.prompt();
        windowInstall.userChoice.then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log("Usuário instalou o app");
            } else {
                console.log("Usuário recusou instalação");
                btInstall.removeAttribute("hidden");
            }
        });
    });
}

/*
Status do Navegado
*/
let navegacao = true;

window.addEventListener("load", (event) => {
    navigator.onLine ? navegacao = true : navegacao = false;
});