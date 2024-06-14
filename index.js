let funds = 100; // Variável para armazenar os fundos do jogador

function startRace() {
    const betAmountInput = document.getElementById('betAmount');
    const betAmount = parseFloat(betAmountInput.value);
    const selectedStarship = document.getElementById('selectStarships').value;
    
    if (isNaN(betAmount) || betAmount < 5) {
        alert("Please enter a valid bet amount of at least $5.");
        return;
    }
    
    if (funds < betAmount) {
        alert("You don't have enough funds to place this bet.");
        return;
    }

    const starships = getStarships();
    const road = document.querySelector('.road');
    const roadWidth = road.offsetWidth - 120; // Definir tamanho da pista considerando a largura da nave

    const interval = setInterval(() => {
        // Iterar sobre cada nave
        starships.forEach(starship => {
            // Obter a posição atual da nave
            let currentPosition = parseFloat(starship.style.left) || 0;
            
            // Definir a velocidade aleatória da nave entre 1 e 5 pixels por atualização
            let speed = Math.floor(Math.random() * 10) + 1;

            // Atualizar a posição da nave com base na velocidade
            currentPosition += speed;
            
            // Verificar se a posição ultrapassou o comprimento total da pista
            currentPosition = Math.min(currentPosition, roadWidth);

            // Definir a nova posição visual da nave
            starship.style.left = `${currentPosition}px`;

            // Verificar se a nave atingiu a posição final da pista
            if (currentPosition >= roadWidth) {
                // Parar a corrida
                clearInterval(interval);
                // Anunciar o vencedor
                if (starship.id === selectedStarship) {
                    funds += betAmount * 2;
                    alert(`${starship.alt} wins the race! You won $${betAmount * 2}!`);
                } else {
                    funds -= betAmount;
                    alert(`${starship.alt} wins the race! You lost $${betAmount}.`);
                }
                updateFunds();
                resetRace();
            }
        });
    }, 50);
}

function resetRace() {
    const starships = getStarships();
    starships.forEach(starship => {
        starship.style.transition = 'none';
        starship.style.left = '0';
    });
}

function updateFunds() {
    const fundsElement = document.querySelector('.funds p');
    fundsElement.textContent = `Funds: $ ${funds.toFixed(2)}`;
}

function getStarships() {
    const road = document.querySelector('.road');
    const starships = road.querySelectorAll('img');
    return starships;
}

updateFunds(); // Atualizar os fundos iniciais na página HTML
