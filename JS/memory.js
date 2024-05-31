document.addEventListener("DOMContentLoaded", () => {
  // Définition des cartes
  const cards = [
    { id: 1, name: "monster1", img: "/Memory-game/images/chargeur.webp" },
    { id: 2, name: "monster2", img: "/Memory-game/images/Hunter_II.webp" },
    { id: 3, name: "monster3", img: "/Memory-game/images/scavanger.webp" },
    { id: 4, name: "monster4", img: "/Memory-game/images/Shrieker.webp" },
    { id: 5, name: "monster5", img: "/Memory-game/images/titan-corrosif.webp" },
    { id: 6, name: "monster6", img: "/Memory-game/images/Warrior.webp" },
    { id: 7, name: "monster7", img: "/Memory-game/images/chargeur.webp" },
    { id: 8, name: "monster8", img: "/Memory-game/images/Hunter_II.webp" },
    { id: 9, name: "monster9", img: "/Memory-game/images/scavanger.webp" },
    { id: 10, name: "monster10", img: "/Memory-game/images/Shrieker.webp" },
    {
      id: 11,
      name: "monster11",
      img: "/Memory-game/images/titan-corrosif.webp",
    },
    { id: 12, name: "monster12", img: "/Memory-game/images/Warrior.webp" },
  ];

  // Mélange aléatoire des cartes
  cards.sort(() => 0.5 - Math.random());

  // Sélection du plateau de jeu
  const board = document.querySelector(".boites");
  let flippedCards = [];
  let count = 0;

  // Fonction pour créer le plateau de jeu
  function createBoard() {
    cards.forEach((card, index) => {
      // Création de chaque carte
      const cardElement = document.createElement("div");
      cardElement.classList.add("box");
      cardElement.setAttribute("data-id", index);

      const cardInner = document.createElement("div");
      cardInner.classList.add("box-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("box-front");

      const cardBack = document.createElement("div");
      cardBack.classList.add("box-back");
      cardBack.style.backgroundImage = `url(${card.img})`;

      // Ajout des éléments de la carte
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);

      // Ajout de l'événement de clic pour retourner la carte
      cardElement.addEventListener("click", () => {
        flipCard(cardElement);
      });
      // Ajout de la carte au plateau de jeu
      board.appendChild(cardElement);
    });
  }

  // Fonction pour retourner une carte
  function flipCard(cardElement) {
    // Vérification si la carte est déjà retournée ou si deux cartes sont déjà retournées
    if (flippedCards.length === 2 || flippedCards.includes(cardElement)) return;

    // Ajout de la classe 'flipped' pour retourner la carte
    cardElement.classList.add("flipped");
    flippedCards.push(cardElement);

    // Vérification si deux cartes sont retournées
    if (flippedCards.length === 2) {
      // Incrémentation du compteur de coups
      count++;
      document.getElementById("count").innerText = count;
      // Vérification si les deux cartes retournées correspondent
      setTimeout(checkForMatch, 1000);
    }
  }

  // Fonction pour vérifier si les deux cartes retournées correspondent
  function checkForMatch() {
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];
    const firstCardImg = cards[firstCard.getAttribute("data-id")].img;
    const secondCardImg = cards[secondCard.getAttribute("data-id")].img;

    // Si les cartes correspondent, les désactiver, sinon les retourner
    if (firstCardImg === secondCardImg) {
      disableCards();
    } else {
      unflipCards();
    }
  }

  // Fonction pour désactiver les cartes correspondantes
  function disableCards() {
    flippedCards.forEach((card) => {
      card.classList.add("matched");
    });
    flippedCards = [];

    // Vérifier s'il y a victoire
    checkForVictory();
  }

  // Fonction pour retourner les cartes non correspondantes
  function unflipCards() {
    setTimeout(() => {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
      });
      flippedCards = [];
    }, 1000);
  }

  // Fonction pour vérifier si toutes les cartes ont été appariées
  function checkForVictory() {
    const matchedCards = document.querySelectorAll(".box.matched");
    if (matchedCards.length === cards.length) {
      // Afficher un message de victoire
      alert("Félicitations ! Vous avez gagné !");
    }
  }

  // Appel de la fonction pour créer le plateau de jeu
  createBoard();
});
