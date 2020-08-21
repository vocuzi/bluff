/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Will take care of the game attributes like creating players, distributing cards and so on.

class Game {
  constructor () {
    // Array of Card Suits - should not accessed from outside the class
    this._suits = ['spades', 'clubs', 'hearts', 'diams']
    // Array of possible card-ranks ie. values - should not accessed from outside the class
    this._values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

    // the cards in play for this game
    this._deck = []
    // ids of the cards for this game - should not accessed from outside the class
    this._idNumber = 1

    // the players for this game - should not mutated from outside class
    this._players = []
    // index of the player whose turn it currently is
    this._turn = 0

    // Central stack to store cards that are moved by players
    this._centralStack = []
    // Adding a record to store whether the last player bluffed or not
    this._record = ''
    // Data of which rank is currently being played
    this._currentRank = ''
  }

  get players () {
    return this._players
  }

  get deck () {
    return this._deck
  }

  set deck (deck) {
    this._deck = deck
  }

  get turn () {
    return this._turn
  }

  set turn (turn) {
    this._turn = turn
  }

  get centralStack () {
    return this._centralStack
  }

  set centralStack (stack) {
    this._centralStack = stack
  }

  get record () {
    return this._record
  }

  set record (record) {
    this._record = record
  }

  get currentRank () {
    return this._currentRank
  }

  set currentRank (rank) {
    this._currentRank = rank
  }

  start () {
    // input the number of players
    let playerCount = window.prompt('Enter the number of players(Between 2 and 12): ')

    while (true) {
      if (playerCount <= 2 || playerCount > 12) {
        playerCount = window.prompt('Number of players should bew between 2 and 12')
      } else {
        break
      }
    }

    this._turn = Math.floor(Math.random() * playerCount)

    // create a deck for every 4 players
    for (let i = 0; i < (playerCount / 4); i++) {
      this.addDeck()
    }

    // shuffle the cards
    this.shuffle()

    // Creating n players based on user input
    this.createPlayers(playerCount)

    // Distribute the cards to n players created before
    this.distributeCards()

    // render cards for every player
    this.players.forEach((player) => renderDeck(player.name, player.cards, this))

    // deactivate all cards and buttons
    deactivateAllPlayers()

    // activate the player who will start the game
    activatePlayer(this)

    // Alerting which player will start the game
    const message = this.players[this._turn].name + ' will start.'
    window.alert(message)
  }

  // add a 54 card deck to the cards beinf used in this game
  addDeck () {
    // iterate over the suits and the values generating a new card.
    this._suits.forEach((suit) => {
      this._values.forEach((value) => {
        this.deck.push(new Card(suit, value, this._idNumber++))
      })
    })

    // Two Joker Cards pushed to Deck.
    this.deck.push(new Card('Joker', 'Joker', this._idNumber++))
    this.deck.push(new Card('Joker', 'Joker', this._idNumber++))
  }

  shuffle () {
    // Starting from the last element and going to the first element
    for (let i = this.deck.length - 1; i >= 0; i--) {
      // Random number between 0 and i
      const j = Math.floor(Math.random() * i) + 1

      // Exchanging the cards on postion i and j
      const temp = this.deck[i]
      this.deck[i] = this.deck[j]
      this.deck[j] = temp
    }
  }

  // Creating players based on the user input
  createPlayers (playerCount) {
    // create the players one at time and push them to the game object's players attribute
    for (let i = 0; i < playerCount; i++) {
      this._players.push(new Player('Player ' + (i + 1)))
    }

    // Array to store the number of cards each player should get.
    const parts = []

    const cardCount = this.deck.length

    // first, evenly distribute the cards among the players
    for (let i = 0; i < playerCount; i++) {
      parts[i] = Math.floor(cardCount / playerCount)
    }

    // give the reamining cards to the players in sequence
    for (let i = 0; i < cardCount % playerCount; i++) {
      parts[i] += 1
    }

    // Attaching the number of cards each player gets to the player, to keep track of the number of cards the player has
    for (let i = 0; i < playerCount; i++) {
      this._players[i].numberOfCards = parts[i]
    }
  }

  // Distribute cards to each player
  distributeCards () {
    let temp = this.deck
    for (let j = 0; j < this.players.length; j++) {
      // Giving the slice of cards each player will get
      this.players[j].cards = temp.slice(0, this.players[j].numberOfCards)
      // Reamaining cards for the next iteration
      temp = temp.splice(this.players[j].numberOfCards)
    }
  }
}
