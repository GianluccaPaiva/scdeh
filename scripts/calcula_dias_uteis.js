        // Formata data local YYYY-MM-DD para comparação

function ajustarMeioDia(data) {
  const d = new Date(data);
  d.setHours(12, 0, 0, 0);
  return d;
}
function criarDataLocal(ano, mes, dia) {
    return new Date(ano, mes - 1, dia, 12, 0, 0, 0);
}


function formatarDataLocal(date) {
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

async function calculaDiasUteis(dataInicial, dataFinal) {
    console.log('Recebido dataInicial:', dataInicial);
    console.log('Recebido dataFinal:', dataFinal);

    // Criando datas locais corretamente para evitar deslocamento
    const [anoI, mesI, diaI] = dataInicial.split('-').map(Number);
    const [anoF, mesF, diaF] = dataFinal.split('-').map(Number);

    const dataInicio = criarDataLocal(anoI, mesI, diaI);
    const dataFim = criarDataLocal(anoF, mesF, diaF);

    console.log('DataInicio ajustada:', dataInicio.toString());
    console.log('DataFim ajustada:', dataFim.toString());

    if (dataInicio > dataFim) {
        throw new Error('Data inicial é maior que data final!');
    }

    const anos = new Set([dataInicio.getFullYear(), dataFim.getFullYear()]);
    console.log('Anos para buscar feriados:', [...anos]);

    const feriados = new Set();
    for (const ano of anos) {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        if (!response.ok) throw new Error('Erro ao buscar feriados para o ano ' + ano);
        const feriadosAno = await response.json();
        feriadosAno.forEach(f => feriados.add(f.date));
    }
    console.log('Feriados carregados:', feriados);

    let iterDate = new Date(dataInicio);
    const diasUteis = [];

    console.log('Iniciando loop...');
    while (iterDate <= dataFim) {
        const dataFormatada = formatarDataLocal(iterDate);
        const diaDaSemana = iterDate.getDay();
        const ehFeriado = feriados.has(dataFormatada);

        console.log(`-> ${dataFormatada} | Dia da semana: ${diaDaSemana} | Feriado? ${ehFeriado}`);

        if (diaDaSemana !== 0 && diaDaSemana !== 6 && !ehFeriado) {
            diasUteis.push(new Date(iterDate));
        }

        iterDate.setDate(iterDate.getDate() + 1);
    }
    console.log('Loop finalizado.');

    return diasUteis;
}


async function calculaDiasCorridos(dataInicial, dataFinal) {
            const diasCorridos = [];

            const dataInicio = ajustarMeioDia(dataInicial);
            const dataFim = ajustarMeioDia(dataFinal);

            let iterDate = new Date(dataInicio);
            while (iterDate <= dataFim) {
                diasCorridos.push(new Date(iterDate));
                iterDate.setDate(iterDate.getDate() + 1);
            }

            return diasCorridos;
}

function formatarDataBr(dataStr) {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
}

async function pegarDatas() {
    const dataInicial = document.getElementById('data_inicial').value;
    const dataFinal = document.getElementById('data_final').value;
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = '';

    if (!dataInicial || !dataFinal) {
        resultadoDiv.innerHTML = '<span class="erro">Por favor, preencha ambas as datas.</span>';
        return;
    }

    if (new Date(dataInicial) > new Date(dataFinal)) {
        resultadoDiv.innerHTML = '<span class="erro">Data Inicial deve ser anterior ou igual à Data Final.</span>';
        return;
    }

    try {
        const diasUteis = await calculaDiasUteis(dataInicial, dataFinal);
        const diasCorridos = await calculaDiasCorridos(dataInicial, dataFinal);

        resultadoDiv.innerHTML = `
            <p>Dias úteis entre <b>${formatarDataBr(dataInicial)}</b> e <b>${formatarDataBr(dataFinal)}</b>: <b>${diasUteis.length}</b></p>
            <p>Dias corridos entre <b>${formatarDataBr(dataInicial)}</b> e <b>${formatarDataBr(dataFinal)}</b>: <b>${diasCorridos.length}</b></p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = `<span class="erro">Erro ao calcular: ${error.message}</span>`;
        console.error(error);
    }
}
