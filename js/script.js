function atualizarExibicaoGrafo() {
  const exibicao = document.getElementById("grafo-exibicao");
  for (let no in cityGraph) {
    const conexoes = Object.entries(cityGraph[no])
      .map(([para, peso]) => `${no} → ${para} (${peso})`)
      .join(", ");
    exibicao.innerHTML += `<p>${no}: ${conexoes || "sem conexões"}</p>`;
  }
}

function executarDijkstra() {
  // Pega os valores de origem e destino do HTML
  let inicio = document.getElementById("origem").value.trim().toUpperCase();
  let fim = document.getElementById("destino").value.trim().toUpperCase();

  // Verifica se os nós existem no grafo
  if (!cityGraph[inicio] || !cityGraph[fim]) {
    document.getElementById("saida").innerText =
      "Origem ou destino não existe!";
    return;
  }

  // Objetos para guardar distâncias e caminho
  let distancias = {};
  let caminho_anterior = {};
  let fila = [];

  // Inicializa todas as distâncias como infinito
  for (let no in cityGraph) {
    distancias[no] = Infinity;
    caminho_anterior[no] = null;
  }
  distancias[inicio] = 0; // Começa com distância 0 na origem
  fila.push({ no: inicio, distancia: 0 });

  // Processando os nós
  while (fila.length > 0) {
    // Pega o nó com menor distância
    fila.sort((a, b) => a.distancia - b.distancia);
    let no_atual = fila.shift().no;

    // Verifica os vizinhos do nó atual
    for (let vizinho in cityGraph[no_atual]) {
      let nova_distancia = distancias[no_atual] + cityGraph[no_atual][vizinho];

      if (nova_distancia < distancias[vizinho]) {
        distancias[vizinho] = nova_distancia;
        caminho_anterior[vizinho] = no_atual;
        fila.push({ no: vizinho, distancia: nova_distancia });
      }
    }
  }

  // Monta o caminho do destino até a origem
  let caminho = [];
  let no = fim;
  while (no) {
    caminho.unshift(no);
    no = caminho_anterior[no];
  }

  // Mostra o resultado
  if (distancias[fim] == Infinity) {
    document.getElementById("saida").innerText =
      "Não tem caminho entre esses nós!";
  } else {
    document.getElementById("saida").innerText = `Caminho: ${caminho.join(
      " -> "
    )}\nDistância: ${distancias[fim]}`;
  }
}

// Inicializa a exibição do grafo
atualizarExibicaoGrafo();
