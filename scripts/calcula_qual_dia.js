async function pegarData_e_hora(){
    const data = document.getElementById('data').value;
    const hora = parseFloat(document.getElementById('horas_acrescentar').value);
    const resultadoDiv = document.getElementById('resultado');

    calculaDiaQueVaiSer(data, hora, resultadoDiv);
}

async function calculaDiaQueVaiSer(dataStr, horas, resultadoDiv) {
    const [ano, mes, dia] = dataStr.split('-').map(Number);

    //Cria a data local corretamente (meio-dia pra evitar problemas de fuso)
    const dataInicial = new Date(ano, mes - 1, dia, 0, 0, 0);

    if (isNaN(dataInicial.getTime())) {
        resultadoDiv.innerHTML = '<span class="erro">Data inválida. Por favor, insira uma data válida.</span>';
        return;
    }

    // Adiciona as horas
    dataInicial.setHours(dataInicial.getHours() + horas);

    // Formatação
    const diaDaSemana = dataInicial.toLocaleDateString('pt-BR', { weekday: 'long' });
    const dataFormatada = dataInicial.toLocaleDateString('pt-BR');

    resultadoDiv.innerHTML = `
        <p>Nova data: <b>${dataFormatada}</b> (${diaDaSemana})</b></p>
    `;
}


