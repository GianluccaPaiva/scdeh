async function pegarDatas() {
    const dataInicial = document.getElementById('data_inicial').value;
    const dataFinal = document.getElementById('data_final').value;

    if (dataInicial && dataFinal) {
        const diasUteis = await calculaDiasUteis(dataInicial, dataFinal);
        console.log(`Dias úteis entre ${dataInicial} e ${dataFinal}:`, diasUteis);
    } else {
        console.error("Por favor, preencha ambas as datas.");
    }
}

async function calculaDiasUteis(dataInicial, dataFinal) {
    const diasUteis = [];

    const dataAtual = new Date(dataInicial);
    const dataLimite = new Date(dataFinal);

    // Normaliza as datas
    dataAtual.setHours(0, 0, 0, 0);
    dataLimite.setHours(0, 0, 0, 0);

    // Avança para o dia seguinte ao inicial
    dataAtual.setDate(dataAtual.getDate() + 1);

    // Coleta os anos envolvidos
    const anos = new Set();
    let tempDate = new Date(dataAtual);
    while (tempDate <= dataLimite) {
        anos.add(tempDate.getFullYear());
        tempDate.setFullYear(tempDate.getFullYear() + 1);
    }

    // Busca feriados
    const feriados = new Set();
    for (const ano of anos) {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        const feriadosAno = await response.json();
        feriadosAno.forEach(f => feriados.add(f.date));
    }

    // Verifica dias úteis a partir do dia seguinte
    while (dataAtual <= dataLimite) {
        const diaDaSemana = dataAtual.getDay();
        const dataFormatada = dataAtual.toISOString().split('T')[0];

        if (diaDaSemana !== 0 && diaDaSemana !== 6 && !feriados.has(dataFormatada)) {
            diasUteis.push(new Date(dataAtual));
        }

        dataAtual.setDate(dataAtual.getDate() + 1);
    }

    return diasUteis;
}
