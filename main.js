// Variáveis Escopo Global
const form = document.getElementById('form-atividade');
let linhas = "";
const imgAprovado = `<img src="./images/aprovado.png" alt="Emoji Celebrando"/>`
const imgReprovado = `<img src="./images/reprovado.png" alt="Emoji decepcionado"/>`
const spanAprovado = `<span class="resultado aprovado">Aprovado</span>`
const spanReprovado = `<span class="resultado reprovado">Reprovado</span>`
const notaMinima = parseFloat(prompt("Digite a nota mínima: "))
const arrayAtividade = [];
const arrayNotas = [];

// Remove comportamento de atualizar a página
form.addEventListener('submit',function(e){
    e.preventDefault();
    
    adicionaLinha();
    atualizaTabelas();
    atualizarMediaFinal();
});

function adicionaLinha(){
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(arrayAtividade.includes(inputNomeAtividade.value)){
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`)
    }else{
        // A função push insere o input da atividade e nota em um array
        arrayAtividade.push(inputNomeAtividade.value);
        arrayNotas.push(parseFloat(inputNotaAtividade.value));

        let linha = `<tr>`;
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        //Utilização de operador ternario
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += `</tr>`
        // Insere uma nova linha sem substituir a linha já inserida
        linhas += linha;

        inputNomeAtividade.value = "";
        inputNotaAtividade.value = "";
    }
}

function atualizaTabelas(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizarMediaFinal(){
    const mediaFinal = calculoMediaFinal();

    document.getElementById('mediaFinalValor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('mediaFinalResultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculoMediaFinal(){
    let somaDasNotas = 0;
    for (let i = 0; i < arrayNotas.length;i++){
        somaDasNotas += arrayNotas[i];
    }
    return somaDasNotas / arrayNotas.length;

}