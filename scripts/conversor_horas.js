function pegarDecimal() {
    const horasInput = document.getElementById("horas");
    const resultadoDiv = document.getElementById("saida_hms");

    if (!horasInput || !resultadoDiv) {
        console.error("Elementos HTML não encontrados!");
        return;
    }

    const horasStr = horasInput.value.trim();

    if (horasStr === "" || Number.isNaN(Number(horasStr))) {
        resultadoDiv.innerText = "Por favor, insira um número válido.";
        return;
    }

    const horas = parseFloat(horasStr);
    converterHorasDecimaisParaHorasMinutosSegundos(horas);
}

function converterHorasDecimaisParaHorasMinutosSegundos(horas) {
    const horasInteiras = Math.floor(horas);
    const minutosDecimais = (horas - horasInteiras) * 60;
    const minutos = Math.floor(minutosDecimais);
    const segundosDecimais = (minutosDecimais - minutos) * 60;
    const segundos = Math.floor(segundosDecimais);

    // Ajuste caso segundos sejam 60 (ex: 1.9999 horas)
    let seg = segundos;
    let min = minutos;
    let hrs = horasInteiras;

    if (seg === 60) {
        seg = 0;
        min += 1;
    }
    if (min === 60) {
        min = 0;
        hrs += 1;
    }

    const resultado = `${hrs} horas, ${min} minutos e ${seg} segundos.`;
    document.getElementById("saida_hms").innerText = resultado;
}
