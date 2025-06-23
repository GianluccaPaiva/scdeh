async function pegarData_e_dias() {
    const dataInicial = document.getElementById('data_inicial').value;
    const diasAcrescidos = document.getElementById('dias').value;
    const tipoCalculo = document.getElementById('tipo_calculo').value;
    const resultadoDiv = document.getElementById('resultado');

    if (tipoCalculo === 'corridos') {
        calculaDiasCorridos(dataInicial, diasAcrescidos, resultadoDiv);
    } else {
        await calculaDiasUteis(dataInicial, diasAcrescidos, resultadoDiv);
    }
}

function calculaDiasCorridos(dataInicial, diasAcrescidos, resultadoDiv) {
    resultadoDiv.innerHTML = '';

    if (!dataInicial || !diasAcrescidos) {
        resultadoDiv.innerHTML = '<span class="erro">Por favor, preencha ambos os campos.</span>';
        return;
    }

    const [ano, mes, dia] = dataInicial.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia, 12, 0, 0);

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

    resultadoDiv.innerHTML = `
          <div style="color: white;">
        <p>Tipo de cálculo: <b>Dias Corridos</b></p>
        <p>Data inicial: <b>${dataInicio.toLocaleDateString('pt-BR')}</b></p>
        <p>Dias acrescidos: <b>${dias}</b></p>
        <p>Data final: <b>${dataFinal.toLocaleDateString('pt-BR')}</b></p>
    </div>
    `;
}

async function calculaDiasUteis(dataInicial, diasAcrescidos, resultadoDiv) {
    resultadoDiv.innerHTML = '';

    if (!dataInicial || !diasAcrescidos) {
        resultadoDiv.innerHTML = '<span class="erro">Por favor, preencha ambos os campos.</span>';
        return;
    }

    const [ano, mes, dia] = dataInicial.split('-').map(Number);
    const dataInicio = new Date(ano, mes - 1, dia, 12, 0, 0);

    if (isNaN(dataInicio.getTime())) {
        resultadoDiv.innerHTML = '<span class="erro">Data inválida.</span>';
        return;
    }

    const dias = parseInt(diasAcrescidos, 10);
    if (isNaN(dias)) {
        resultadoDiv.innerHTML = '<span class="erro">Número de dias inválido.</span>';
        return;
    }

    let dataFinal = new Date(dataInicio);
    let diasAdicionados = 0;
    const feriados = await buscarFeriados(dataInicio.getFullYear());

    while (diasAdicionados < dias) {
        dataFinal.setDate(dataFinal.getDate() + 1);
        const diaSemana = dataFinal.getDay(); // 0 = domingo, 6 = sábado
        const dataFormatada = dataFinal.toISOString().slice(0, 10);

        if (diaSemana !== 0 && diaSemana !== 6 && !feriados.includes(dataFormatada)) {
            diasAdicionados++;
        }
    }

    resultadoDiv.innerHTML = `
          <div style="color: white;">
        <p>Tipo de cálculo: <b>Dias Corridos</b></p>
        <p>Data inicial: <b>${dataInicio.toLocaleDateString('pt-BR')}</b></p>
        <p>Dias acrescidos: <b>${dias}</b></p>
        <p>Data final: <b>${dataFinal.toLocaleDateString('pt-BR')}</b></p>
    </div>
    `;
}

async function buscarFeriados(ano) {
    const url = `https://brasilapi.com.br/api/feriados/v1/${ano}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.map(feriado => feriado.date);
    } catch (error) {
        console.error("Erro ao buscar feriados:", error);
        return [];
    }
}
