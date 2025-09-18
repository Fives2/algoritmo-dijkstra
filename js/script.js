// Grafo representando as cidades e as distâncias entre elas
let grafoCidades = {
  riodosul: {
    lontras: 38.0,
    presnereu: 11.0,
    agronomica: 26.0,
    laurentino: 26.0,
    agrolandia: 20.0,
    atalanta: 22.1,
    bracodotrom: 27.2,
    tromcentral: 25.0,
  },
  lontras: {
    riodosul: 38.0,
    bracodotrom: 19.0,
    tromcentral: 28.9,
    joseboiteux: 10.0,
    witmarsun: 42.5,
    presgetulio: 16.25,
  },
  presnereu: {
    riodosul: 11.0,
    agronomica: 40.0,
    tromcentral: 14.0,
    donaemma: 27.5,
  },
  agronomica: {
    riodosul: 26.0,
    presnereu: 40.0,
    laurentino: 27.5,
    riodooeste: 47.6,
  },
  laurentino: {
    riodosul: 26.0,
    agronomica: 27.5,
    agrolandia: 26.25,
    riodooeste: 28.0,
  },
  agrolandia: {
    riodosul: 20.0,
    laurentino: 26.25,
    atalanta: 28.75,
  },
  atalanta: {
    riodosul: 22.1,
    agrolandia: 28.75,
  },
  bracodotrom: {
    riodosul: 27.2,
    lontras: 19.0,
  },
  tromcentral: {
    riodosul: 25.0,
    lontras: 28.9,
    presnereu: 14.0,
    ibirama: 36.25,
    joseboiteux: 25.0,
    donaemma: 12.0,
  },
  ibirama: {
    tromcentral: 36.25,
    joseboiteux: 35.0,
    donaemma: 56.1,
    taio: 28.9,
    salete: 23.75,
  },
  joseboiteux: {
    lontras: 10.0,
    tromcentral: 25.0,
    ibirama: 35.0,
    witmarsun: 31.0,
    vitormeireles: 39.1,
  },
  witmarsun: {
    lontras: 42.5,
    joseboiteux: 31.0,
    chaplageado: 43.0,
  },
  presgetulio: {
    lontras: 16.25,
    chaplageado: 23.8,
  },
  donaemma: {
    presnereu: 27.5,
    tromcentral: 12.0,
    ibirama: 56.1,
    taio: 22.5,
    mirimdoce: 9.0,
  },
  vitormeireles: {
    joseboiteux: 39.1,
    salete: 17.0,
  },
  riodooeste: {
    agronomica: 47.6,
    laurentino: 28.0,
    mirimdoce: 18.0,
    pousoredondo: 37.5,
  },
  taio: {
    ibirama: 28.9,
    donaemma: 22.5,
    vidalramos: 25.0,
  },
  salete: {
    ibirama: 23.75,
    vitormeireles: 17.0,
    petrolandia: 15.0,
  },
  mirimdoce: {
    donaemma: 9.0,
    riodooeste: 18.0,
    santaterezinha: 25.5,
    riodocampo: 25.5,
  },
  santaterezinha: {
    mirimdoce: 25.5,
    ituporanga: 14.0,
    imbuia: 22.5,
  },
  riodocampo: {
    mirimdoce: 25.5,
    pousoredondo: 26.25,
    ituporanga: 45.9,
  },
  pousoredondo: {
    riodooeste: 37.5,
    riodocampo: 26.25,
  },
  ituporanga: {
    santaterezinha: 14.0,
    riodocampo: 45.9,
    aurora: 25.5,
  },
  aurora: {
    ituporanga: 25.5,
    imbuia: 30.0,
    vidalramos: 8.0,
  },
  imbuia: {
    santaterezinha: 22.5,
    aurora: 30.0,
    vidalramos: 18.7,
  },
  vidalramos: {
    taio: 25.0,
    aurora: 8.0,
    imbuia: 18.7,
    petrolandia: 63.75,
  },
  petrolandia: {
    salete: 15.0,
    vidalramos: 63.75,
  },
  chaplageado: {
    witmarsun: 43.0,
    presgetulio: 23.8,
  },
};

// Objeto para mapear as chaves do JSON para nomes formatados
const cityDisplayNames = {
  agrolandia: "Agrôlandia",
  agronomica: "Agrônomica",
  atalanta: "Atalanta",
  aurora: "Aurora",
  bracodotrom: "Braço do Trombudo",
  chaplageado: "Chapadão do Lageado",
  donaemma: "Dona Emma",
  ibirama: "Ibirama",
  imbuia: "Imbuia",
  ituporanga: "Ituporanga",
  joseboiteux: "José Boiteux",
  laurentino: "Laurentino",
  lontras: "Lontras",
  mirimdoce: "Mirim Doce",
  petrolandia: "Petrolândia",
  pousoredondo: "Pouso Redondo",
  presgetulio: "Presidente Getúlio",
  presnereu: "Presidente Nereu",
  riodocampo: "Rio do Campo",
  riodooeste: "Rio do Oeste",
  riodosul: "Rio do Sul",
  salete: "Salete",
  santaterezinha: "Santa Terezinha",
  taio: "Taió",
  tromcentral: "Trombudo Central",
  vidalramos: "Vidal Ramos",
  vitormeireles: "Vitor Meireles",
  witmarsun: "Witmarsum",
};

// Função para ordenar cidades
function cidadesOrdenadas() {
  return Object.keys(grafoCidades).sort((a, b) =>
    cityDisplayNames[a].localeCompare(cityDisplayNames[b])
  );
}

// Exibição das conexões do grafo na página
function atualizarExibicaoGrafo() {
  const exibicao = document.getElementById("grafo-exibicao");
  exibicao.innerHTML = ""; // Limpa antes de exibir

  for (let no of cidadesOrdenadas()) {
    const conexoes = Object.entries(grafoCidades[no])
      .map(
        ([para, peso]) => `<br>${cityDisplayNames[para]} (${peso.toFixed(1)} km)`
      )
      .join(", ");
    exibicao.innerHTML += `<div class="city-block"><p><strong>\n${
      cityDisplayNames[no]
    }:</strong> ${conexoes || "sem conexões"}</p></div>`;
  }
}

// Reconstrução do caminho final a partir do objeto de anteriores
function reconstruirCaminho(anteriores, origem, destino) {
  let caminho = [];
  let atual = destino;
  while (atual) {
    caminho.unshift(cityDisplayNames[atual]);
    atual = anteriores[atual];
  }
  return caminho;
}

// Executando o algoritmo de Dijkstra
function executarDijkstra() {
  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  // Verificalção inicial de seleção válida
  if (!origem || !destino || !grafoCidades[origem] || !grafoCidades[destino]) {
    document.getElementById("saida").innerText =
      "Por favor, selecione uma origem e um destino válidos!";
    return;
  }

  // Inicialização das estruturas
  const distancias = {};
  const anteriores = {};
  const fila = [];

  for (let no in grafoCidades) {
    distancias[no] = Infinity;
    anteriores[no] = null;
  }
  distancias[origem] = 0;
  fila.push({ no: origem, distancia: 0 });

  // Ordena as cidades por nome para uma exibição organizada
  while (fila.length > 0) {
    fila.sort((a, b) => a.distancia - b.distancia);
    const { no: noAtual } = fila.shift();

    // Ao chegar ao destino, interrompe a busca
    if (noAtual === destino) break;

    // Verifica os vizinhos do nó atual
    for (let vizinho in grafoCidades[noAtual]) {
      let alternativa = distancias[noAtual] + grafoCidades[noAtual][vizinho];
      if (alternativa < distancias[vizinho]) {
        distancias[vizinho] = alternativa;
        anteriores[vizinho] = noAtual;
        fila.push({ no: vizinho, distancia: alternativa });
      }
    }
  }

  let caminho = reconstruirCaminho(anteriores, origem, destino);

  if (distancias[destino] === Infinity || caminho[0] !== cityDisplayNames[origem]) {
    document.getElementById("saida").innerText =
      "Não há um caminho conectando a origem ao destino!";
  } else {
    document.getElementById("saida").innerText =
      `Caminho mais curto: \n\n${caminho.join(" → ")}` +
      `\n\nDistância total: ${distancias[destino]} km`;
  }
}

// Inclui as opções de cidades nos inputs de seleção
function popularSeletores() {
  const origemSelect = document.getElementById("origem");
  const destinoSelect = document.getElementById("destino");

  const defaultOption =
    '<option value="" disabled selected>Escolha uma cidade</option>';
  origemSelect.innerHTML = defaultOption;
  destinoSelect.innerHTML = defaultOption;

  cidadesOrdenadas().forEach((cidade) => {
    const option = `<option value="${cidade}">${cityDisplayNames[cidade]}</option>`;
    origemSelect.innerHTML += option;
    destinoSelect.innerHTML += option;
  });
}

// Quando a página terminar de carregar, o código aqui será executado.
document.addEventListener("DOMContentLoaded", () => {
  popularSeletores();
  atualizarExibicaoGrafo();
});
