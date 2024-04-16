const tiles = document.querySelector(".tile-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6;
const columns = 5;
let currentRow = 0;
let currentColumn = 0;
let voltaaomundo = "PARIS";
let voltaaomundoMap = {};
for (let index = 0; index < voltaaomundo.length; index++) {
  voltaaomundoMap[voltaaomundo[index]] = index;
}
const guesses = [];

for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  guesses[rowIndex] = new Array(columns);
  const tileRow = document.createElement("div");
  tileRow.setAttribute("id", "row" + rowIndex);
  tileRow.setAttribute("class", "tile-row");
  for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
    const tileColumn = document.createElement("div");
    tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
    tileColumn.setAttribute(
      "class",
      rowIndex === 0 ? "tile-column typing" : "tile-column disabled"
    );
    tileRow.append(tileColumn);
    guesses[rowIndex][columnIndex] = "";
  }
  tiles.append(tileRow);
}

const checkGuess = () => {
  const guess = guesses[currentRow].join("");
  if (guess.length !== columns) {
    return;
  }

  var currentColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < columns; index++) {
    const letter = guess[index];
    if (voltaaomundoMap[letter] === undefined) {
        currentColumns[index].classList.add("wrong")
    } else {
        if(voltaaomundoMap[letter] === index) {
            currentColumns[index].classList.add("right")
        } else {
            currentColumns[index].classList.add("displaced")
        }
    }
  }

  if(guess === voltaaomundo) {
      window.alert("Paris, a capital da França, é uma cidade rica em história e cultura. A Torre Eiffel, um dos marcos mais famosos da cidade, foi construída para a Feira Mundial de 1889 para comemorar o centenário da Revolução Francesa. Paris é frequentemente chamada de Cidade Luz, mas o nome não se deve à iluminação da cidade, mas sim às suas contribuições filosóficas a partir do século 17. Outro marco importante é o Arco do Triunfo, que foi construído por ordem de Napoleão para celebrar suas vitórias e demorou 30 anos para ser concluído. Essas são apenas algumas das muitas curiosidades fascinantes sobre Paris.")
      return
  } {
      if(currentRow === rows -1) {
          window.alert("Errrrrrou!")
      } else {
          moveToNextRow()
      }
  }
};

const moveToNextRow = () => {
    var typingColumns = document.querySelectorAll(".typing")
    for (let index = 0; index < typingColumns.length; index++) {
        typingColumns[index].classList.remove("typing")
        typingColumns[index].classList.add("disabled")
    }
    currentRow++
    currentColumn=0

    const currentRowEl = document.querySelector("#row"+currentRow)
    var currentColumns = currentRowEl.querySelectorAll(".tile-column")
    for (let index = 0; index < currentColumns.length; index++) {
        currentColumns[index].classList.remove("disabled")
        currentColumns[index].classList.add("typing")
    }
}

const handleKeyboardOnClick = (key) => {
  if (currentColumn === columns) {
    return;
  }
  const currentTile = document.querySelector(
    "#row" + currentRow + "column" + currentColumn
  );
  currentTile.textContent = key;
  guesses[currentRow][currentColumn] = key;
  currentColumn++;
};

const createKeyboardRow = (keys, keyboardRow) => {
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const handleBackspace = () => {
  if(currentColumn === 0){
      return
  }

  currentColumn--
  guesses[currentRow][currentColumn] = ""
  const tile = document.querySelector("#row"+currentRow+"column"+currentColumn)
  tile.textContent = ""
};

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "<";
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

document.onkeydown = function (evt) {
    evt = evt || window.evt
    if(evt.key === "Enter"){
        checkGuess();
    } else if (evt.key === "Backspace") {
        handleBackspace()
    } else {
        handleKeyboardOnClick(evt.key.toUpperCase())
    }
}
