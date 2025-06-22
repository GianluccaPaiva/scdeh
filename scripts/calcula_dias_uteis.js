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
    dataAtual.setHours(0, 0, 0, 0);
    dataLimite.setHours(0, 0, 0, 0);

    // Pega todos os anos no intervalo
    const anos = new Set();
    let tempDate = new Date(dataAtual);
    while (tempDate <= dataLimite) {
        anos.add(tempDate.getFullYear());
        tempDate.setFullYear(tempDate.getFullYear() + 1);
    }

    // Consulta os feriados nacionais dos anos envolvidos
    const feriados = new Set();
    for (const ano of anos) {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${2025}`);
        const feriadosAno = await response.json();
        feriadosAno.forEach(f => feriados.add(f.date));
    }

    // Itera no intervalo de datas
    while (dataAtual <= dataLimite) {
        const diaDaSemana = dataAtual.getDay(); // 0-dom, 6-sáb
        const dataFormatada = dataAtual.toISOString().split('T')[0];

        if (diaDaSemana !== 0 && diaDaSemana !== 6 && !feriados.has(dataFormatada)) {
            diasUteis.push(new Date(dataAtual));
        }
        dataAtual.setDate(dataAtual.getDate() + 1);
    }

    return diasUteis;
}
