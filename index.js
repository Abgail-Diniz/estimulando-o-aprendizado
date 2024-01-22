document.addEventListener('DOMContentLoaded', function() {
  let nivelAtual = parseInt(obterValorDaURL('nivel')) || 1;
  let contagemAcertos = 0;
  let contagemErros = 0;

    

  function obterValorDaURL(parametro) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get(parametro);
  }

  function escolherOValor(nivel) {
      const maximo = Math.pow(10, nivel) - 1;
      return Math.floor(Math.random() * (maximo + 1));
  }

  function converterParaSimbolo(operacao) {
      switch (parseInt(operacao)) {
          case 1:
              return "+";
          case 2:
              return "-";
          case 3:
              return "*";
          case 4:
              return "÷";
          default:
              return "";
      }
  }

  function atualizarNivelNoURL(novoNivel) {
      const novoURL = window.location.href.replace(/nivel=\d/, `nivel=${novoNivel}`);
      window.history.replaceState({}, document.title, novoURL);
  }

  function atualizarValores() {
      document.getElementById('opcaoUm').textContent = escolherOValor(nivelAtual);
      document.getElementById('valorDaURL').textContent = converterParaSimbolo(obterValorDaURL('valor'));
      document.getElementById('opcaoDois').textContent = escolherOValor(nivelAtual);
      document.getElementById('nivelAtual').textContent = nivelAtual;
      document.getElementById('contagemAcertos').textContent = contagemAcertos;
      document.getElementById('contagemErros').textContent = contagemErros;
      document.getElementById('tentativasRestantes').textContent = 3 - contagemErros; // Máximo de 3 tentativas
  }



  function verificarResposta() {
      const respostaUsuario = document.getElementById('respostaUsuario').value;
      const operacao = obterValorDaURL('valor');
      const simbolo = converterParaSimbolo(operacao);
      const opcaoUm = parseInt(document.getElementById('opcaoUm').textContent);
      const opcaoDois = parseInt(document.getElementById('opcaoDois').textContent);
      const resultadoEsperado = (operacao === '4') ? opcaoUm / opcaoDois : eval(`${opcaoUm} ${simbolo} ${opcaoDois}`);

      if (parseFloat(respostaUsuario) === resultadoEsperado) {
          document.getElementById('resultado').textContent = 'Correto!';
          contagemAcertos++;

      } else {
          document.getElementById('resultado').textContent = 'Incorreto!';
          contagemErros++;

      }

      if (contagemAcertos === 3) {
          // Se atingir 3 acertos, reiniciar contagem de erros e avançar para o próximo nível
          contagemAcertos = 0;
          nivelAtual++;

          if (nivelAtual > 3) {
              nivelAtual = 1;
          }

          atualizarNivelNoURL(nivelAtual);
      }

      if (contagemErros === 3) {
          // Se atingir 3 erros, reiniciar contagem de acertos
          contagemErros = 0;
      }

      // Atualizar a contagem na tela e gerar novos números
      atualizarValores();
  }
  
  // Função para verificar se a tecla pressionada é o "Enter"
  function verificarRespostaComEnter(event) {
      if (event.key === 'Enter') {
          verificarResposta();
          document.getElementById('respostaUsuario').value = '';
      }
  }

  // Chamar a função de atualização inicialmente
  atualizarValores();

  // Expor a função verificarResposta globalmente
  window.verificarResposta = verificarResposta;
  window.verificarRespostaComEnter = verificarRespostaComEnter;
});