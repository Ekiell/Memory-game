document.addEventListener("DOMContentLoaded", () => {
  // Liste des cartes avec leurs identifiants et images (doublon supprimé)
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
      name: "monster5",
      img: "/Memory-game/images/titan-corrosif.webp",
    },
    { id: 12, name: "monster12", img: "/Memory-game/images/Warrior.webp" },
  ]; // Mélange les cartes de manière aléatoire

  cards.sort(() => 0.5 - Math.random());

  const board = document.querySelector(".boites"); // Sélectionne l'élément contenant les cartes
  let firstCard = null; // Stocke la première carte retournée
  let secondCard = null; // Stocke la deuxième carte retournée
  let lockBoard = false; // Empêche de retourner plus de deux cartes à la fois

  // Crée le plateau de jeu en ajoutant les cartes à l'élément board
  function createBoard() {
    cards.forEach((card, index) => {
      const cardElement = document.createElement("div"); // Crée un nouvel élément div pour chaque carte
      cardElement.classList.add("box"); // Ajoute la classe CSS box à l'élément
      cardElement.setAttribute("data-id", index); // Définit un attribut data-id pour identifier la carte
      cardElement.addEventListener("click", flipCard); // Ajoute un événement click pour retourner la carte
      board.appendChild(cardElement); // Ajoute la carte à l'élément board
    });
  } // Retourne une carte

  function flipCard() {
    if (lockBoard) return; // Si le plateau est verrouillé, ne fait rien
    if (this === firstCard) return; // Si la carte cliquée est la première carte, ne fait rien

    this.classList.add("flipped"); // Ajoute la classe flipped à la carte
    this.style.backgroundImage = `url(${
        cards[this.getAttribute("data-id")].img
    })`; // Affiche l'image de la carte

    if (!firstCard) {
      firstCard = this; // Si aucune carte n'est retournée, définit la carte actuelle comme la première carte
      return;
    }

    secondCard = this; // Définit la carte actuelle comme la deuxième carte
    lockBoard = true; // Verrouille le plateau

    checkForMatch(); // Vérifie si les deux cartes retournées correspondent
  } // Vérifie si les deux cartes retournées correspondent

  function checkForMatch() {
    const firstCardImg = cards[firstCard.getAttribute("data-id")].img;
    const secondCardImg = cards[secondCard.getAttribute("data-id")].img;

    const isMatch = firstCardImg === secondCardImg; // Compare les images des cartes

    isMatch ? disableCards() : unflipCards();
  } // Désactive les cartes correspondantes

  function disableCards() {
    firstCard.removeEventListener("click", flipCard); // Supprime l'événement click de la première carte
    secondCard.removeEventListener("click", flipCard); // Supprime l'événement click de la deuxième carte

    firstCard.classList.add("matched"); // Ajoute la classe matched à la première carte
    secondCard.classList.add("matched"); // Ajoute la classe matched à la deuxième carte

    resetBoard(); // Réinitialise le plateau
  }

  // Retourne les cartes non correspondantes
  function unflipCards() {
    setTimeout(() => {
      firstCard.classList.remove("flipped"); // Supprime la classe flipped de la première carte
      secondCard.classList.remove("flipped"); // Supprime la classe flipped de la deuxième carte

      firstCard.style.backgroundImage = ""; // Supprime l'image de fond de la première carte
      secondCard.style.backgroundImage = ""; // Supprime l'image de fond de la deuxième carte

      resetBoard(); // Réinitialise le plateau
    }, 1000); // Délai de 1.5 secondes avant de retourner les cartes
  }

  // Réinitialise les variables de plateau
  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false]; // Réinitialise les cartes et déverrouille le plateau
  }

  createBoard(); // Crée le plateau de jeu
});