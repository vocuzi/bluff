/* eslint-disable no-unused-vars */
function renderCurrentRoundInfo (centralStackSize, centralStackLast, rank, history, turn) {
  let $roundInfo = document.getElementById('round-info')

  if (!$roundInfo) {
    $roundInfo = document.createElement('div')
    $roundInfo.id = 'round-info'

    document.getElementById('root').appendChild($roundInfo)
  }

  $roundInfo.innerHTML = ''

  $roundInfo.innerHTML = `<div id="information-badges">
    <span id="centralStackInfo">Cards on Table :<b>${centralStackSize} (${centralStackLast})</b></span>
    <span id="rankInfo">Rank :<b>${rank || 'first turn'}</b></span>
    <span id="turnInfo">Turn :<b>${turn}</b></span>
  </div><br>`

  history.forEach((event, index) => {
    const $eventDiv = document.createElement('div')
    $eventDiv.innerHTML = (index + 1) + '. ' + event
    $roundInfo.appendChild($eventDiv)
  })
}
