async function pegarData_e_dias() {
    const dataInicial = document.getElementById('data_inicial').value;
    const diasAcrescidos = document.getElementById('dias').value;
    const resultadoDiv = document.getElementById('resultado');
    calculaDataFinal(dataInicial, diasAcrescidos, resultadoDiv);
}

async function calculaDataFinal(dataInicial, diasAcrescidos, resultadoDiv) {
    resultadoDiv.innerHTML = '';

    if (!dataInicial || !diasAcrescidos) {
        resultadoDiv.innerHTML = '<span class="erro">Por favor, preencha ambos os campos.</span>';
        return;
    }

    const [ano, mes, dia] = dataInicial.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia, 12, 0, 0); // local

    if (isNaN(dataInicio.getTime())) {
        resultadoDiv.innerHTML = '<span class="erro">Data inválida.</span>';
        return;
    }

    const dias = parseInt(diasAcrescidos, 10);
    if (isNaN(dias)) {
        resultadoDiv.innerHTML = '<span class="erro">Número de dias inválido.</span>';
        return;
    }

    const dataFinal = new Date(dataInicio);
    dataFinal.setDate(dataFinal.getDate() + dias);

    if (dataFinal < dataInicio) {
        resultadoDiv.innerHTML = '<span class="erro">A data final não pode ser anterior à data inicial.</span>';
        return;
    }

    resultadoDiv.innerHTML = `
        <p>Data inicial: <b>${dataInicio.toLocaleDateString('pt-BR')}</b></p>
        <p>Dias acrescidos: <b>${dias}</b></p>
        <p>Data final: <b>${dataFinal.toLocaleDateString('pt-BR')}</b></p>
    `;
}
