/* eslint-disable no-unused-vars */
function renderPlayerList (room, name, players) {
  let $list = document.getElementById('player-list')

  if (!$list) {
    $list = document.createElement('div')
    $list.id = 'player-list'

    document.getElementById('root').appendChild($list)
  }

  $list.innerHTML = ''

  const $room = document.createElement('div')
  $room.innerHTML = `<span id="roomName">Room Name<b>${room}</b></span><span id="playerName">Player Name<b>${name}</b></span><br><h3>Player List</h3>`

  $list.appendChild($room)

  players.forEach((player) => {
    const $playerDiv = document.createElement('span')
    $playerDiv.innerHTML = player
    $list.appendChild($playerDiv)
  })
}
