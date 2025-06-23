function pegarDecimal() {
    const horasInput = document.getElementById("input_decimal");
    const resultadoDiv = document.getElementById("saida_hms");

    if (!horasInput || !resultadoDiv) {
        console.error("Elementos HTML não encontrados!");
        return;
    }

    const horasStr = horasInput.value.trim();
    console.log("Valor digitado:", horasStr); // 👀

    if (horasStr === "" || Number.isNaN(Number(horasStr))) {
        resultadoDiv.innerText = "Por favor, insira um número válido.";
        return;
    }

    const horas = parseFloat(horasStr);
    console.log("Valor convertido:", horas); // 👀

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


function pegarHMS(){
    const horasInput = parseInt(document.getElementById("horas").value);
    const minutosInput = parseInt(document.getElementById("minutos").value);
    const segundosInput = parseInt(document.getElementById("segundos").value);
    const resultadoDiv = document.getElementById("saida_decimal");
    if (!horasInput || !minutosInput || !segundosInput || !resultadoDiv) {
        console.error("Elementos HTML não encontrados!");
        return;
    }
    if (isNaN(horasInput) || isNaN(minutosInput) || isNaN(segundosInput)) {
        resultadoDiv.innerText = "Por favor, insira números válidos.";
        return;
    }

    converterHMSparaDecimal(horasInput, minutosInput, segundosInput, resultadoDiv);
}

function converterHMSparaDecimal(horas, minutos, segundos, resultadoDiv) {
    const totalSegundos = (horas * 3600) + (minutos * 60) + segundos;
    const totalHoras = totalSegundos / 3600;

    // Formata o resultado com duas casas decimais
    const resultado = totalHoras.toFixed(2);
    resultadoDiv.innerText = `Resultado: ${resultado} horas`;
}

function limparDecimal() {
    document.getElementById("input_decimal").value = "";
    document.getElementById("saida_hms").innerText = "";
}

function limparHMS() {
    document.getElementById("horas").value = "";
    document.getElementById("minutos").value = "";
    document.getElementById("segundos").value = "";
    document.getElementById("saida_decimal").innerText = "";
}