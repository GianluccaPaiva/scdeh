function calculaDiasUteis(dataInicial, dataFinal) {
    const diasUteis = [];
    const dataAtual = new Date(dataInicial);
    while (dataAtual <= new Date(dataFinal)) {
        const diaDaSemana = dataAtual.getDay();
        // Verifica se é (segunda a sexta)
        if (diaDaSemana !== 0 && diaDaSemana !== 6) {
            diasUteis.push(new Date(dataAtual));
        }
        // Avança para o próximo dia
        dataAtual.setDate(dataAtual.getDate() + 1);
    }

    console.log(`Dias úteis entre ${dataInicial} e ${dataFinal}:`, diasUteis);
    return diasUteis;
}