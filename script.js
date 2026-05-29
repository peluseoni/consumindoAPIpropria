const fetchGETAlunos = async () => {
    try {
        let resposta = await fetch('http://localhost:3000/users', {
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        });
        resposta = await resposta.json();
        return resposta;
    } catch (e) {
        console.error(e);
    }
};

const enviarAluno = async () => {
    const nome = document.querySelector("#novo-nome");
    const idade = document.querySelector("#novo-idade");
    const feedback = document.querySelector('#feedback');

    try {
        const options = {
            method: 'POST',
            body: {
                user: { nome, idade, idiomas: ["pt-BR"] }
            },
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        }
        let resposta = await fetch('http://localhost:3000/users', options);
        resposta = await resposta.json();
        feedback.innerHTML = resposta


    } catch (e) {
        console.error(e);
    }
}

const main = async () => {
    const alunos = await fetchGETAlunos();
    const elemUl = document.querySelector('#lista-alunos');

    for (let aluno of alunos) {
        const elemLi = document.createElement('li');

        const idiomas = aluno.idiomas ? aluno.idiomas : 'Não foram encontrados idiomas';

        elemLi.innerHTML = `Nome: ${aluno.nome} - Idade: ${aluno.idade} - Idiomas: ${idiomas}`;
        elemUl.appendChild(elemLi);
    }
}

const botaoEnviar = document.querySelector('#enviar');
main()

botaoEnviar.addEventListener('click', async () => {
    const nome = document.querySelector("#novo-nome");
    const idade = document.querySelector("#novo-idade");
    const feedback = document.querySelector('#feedback');

    const body = { user: { nome, idade } };

    try {
        const options = {
            method: 'POST',
            body: Object.keys(body)
                .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
                .join('&'),
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000/"
            }
        }
        let resposta = await fetch('http://localhost:3000/users', options);
        resposta = await resposta.json();
        feedback.innerHTML = resposta;
        console.log(resposta);


    } catch (e) {
        console.error(e);
    }
});