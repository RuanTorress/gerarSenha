// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");

// Após refatoração
const openCloseGeneratorButton = document.querySelector("#open-generate-password");
const generatePasswordContainer = document.querySelector("#generate-options");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");
const copyPasswordButton = document.querySelector("#copy-password");

// Funções

// Função para gerar uma letra minúscula aleatória
const getLetterLowerCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

// Função para gerar uma letra maiúscula aleatória
const getLetterUpperCase = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

// Função para gerar um número aleatório
const getNumber = () => {
  return Math.floor(Math.random() * 11).toString();
};

// Função para gerar um símbolo aleatório
const getSymbol = () => {
  const symbols = "(){}[]=<>/,.!@#$%^&*";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Função para gerar a senha
const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {
  let password = "";

  const passwordLength = lengthInput.value;

  // Após refatoração
  const generators = [];

  // Verificar as opções selecionadas pelo usuário e adicionar as funções correspondentes aos geradores
  if (lettersInput.checked) {
    generators.push(getLetterLowerCase, getLetterUpperCase);
  }

  if (numbersInput.checked) {
    generators.push(getNumber);
  }

  if (symbolsInput.checked) {
    generators.push(getSymbol);
  }

  // Verificar se pelo menos um gerador foi selecionado
  if (generators.length === 0) {
    return;
  }

  // Gerar a senha
  for (i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
      // Selecionar aleatoriamente uma função geradora e obter o valor correspondente
      const randomValue =
        generators[Math.floor(Math.random() * generators.length)]();

      password += randomValue;
    });
  }

  // Reduzir a senha para o comprimento desejado
  password = password.slice(0, passwordLength);

  // Exibir a senha gerada no elemento HTML
  generatedPasswordElement.style.display = "block";
  generatedPasswordElement.querySelector("h4").innerText = password;
};

// Eventos

// Evento de clique no botão "Gerar Senha"
generatePasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Chamar a função generatePassword com as funções geradoras como argumentos
  generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
});

// Evento de clique no botão "Abrir/Fechar Gerador"
openCloseGeneratorButton.addEventListener("click", () => {
  // Alternar a classe CSS "hide" no container de opções de geração de senha
  generatePasswordContainer.classList.toggle("hide");
});

// Evento de clique no botão "Copiar Senha"
copyPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  // Obter a senha gerada
  const password = generatedPasswordElement.querySelector("h4").innerText;

  // Copiar a senha para a área de transferência do usuário
  navigator.clipboard.writeText(password).then(function () {
    copyPasswordButton.innerText = "Senha copiada com sucesso!";

    // Restaurar o texto do botão após um segundo
    setTimeout(() => {
      copyPasswordButton.innerText = "Copiar";
    }, 1000);
  });
});