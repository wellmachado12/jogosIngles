let urlJogos = 'http://localhost:3000/jogos';

async function insereDado(event) {
    event.preventDefault();

    const nome = document.querySelector('#nome').value;
    const genero = document.querySelector('#genero').value;
    const estudio = document.querySelector('#estudio').value;
    const data_lancamento = document.querySelector('#data_lancamento').value;

    console.log("Enviando os seguintes dados:", { nome, genero, estudio, data_lancamento });

    try {
        const resposta = await fetch(urlJogos, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                genero,
                estudio,
                data_lancamento
            })
        });

        console.log("Status da resposta:", resposta.status);

        if (resposta.ok) {
            console.log("Jogo cadastrado!");
            alert("Jogo cadastrado com sucesso!");
            document.querySelector('#cadastroJogo').reset();
            carregarJogos();
        } else {
            const erro = await resposta.text();
            console.log("Erro ao cadastrar jogo:", erro);
            alert("Erro ao cadastrar jogo: " + erro);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição. Verifique o console.");
    }
}



async function carregarJogos() {
    try {
        const resposta = await fetch(urlJogos);
        const jogos = await resposta.json();

        const listaDiv = document.getElementById('ListaJogos');
        listaDiv.innerHTML = '';

        if (!jogos.length) {
            listaDiv.innerHTML = '<p>Nenhum jogo encontrado.</p>';
            return;
        }

        jogos.forEach(jogo => {
            const card = document.createElement('div');
            card.innerHTML = `
                <strong>${jogo.nome}</strong><br>
                Gênero: ${jogo.genero}<br>
                Estúdio: ${jogo.estudio}<br>
                Lançamento: ${new Date(jogo.data_lancamento).toLocaleDateString()}<br>
                <hr>
            `;
            listaDiv.appendChild(card);
        });

    } catch (error) {
        console.error("Erro ao carregar jogos:", error);
        alert("Erro ao carregar jogos.");
    }
}

document.getElementById('cadastroJogo').addEventListener('submit', insereDado);
document.getElementById('carregarJogos').addEventListener('click', carregarJogos);
