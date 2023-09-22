let cells = document.querySelectorAll('.cell')
let scoreElements = document.querySelectorAll('.point__box span')
console.log(scoreElements)
let game = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
]
let currentPlayer = 'cross'


//  Очистить поле
function clearCells(cells, game) {
	for (let i = 0; i < cells.length; i++) {
		let cell = cells[i]
		cell.classList.remove('cross', 'zero')

		let row = Math.floor(i / 3)
		let column = i % 3
		game[row][column] = ''
	}
}

// Win
function checkWin(isEmpty, isEqual) {
	if (!isEmpty && isEqual) {
		let playerIndex = currentPlayer === 'cross' ? 0 : 1
		let playerScore = parseInt(scoreElements[playerIndex].innerText)
		scoreElements[playerIndex].innerText = playerScore + 1
		clearCells(cells, game)
	}
}

// Draw
function checkDraw(cells, game) {
	let filledCount = 0
	for (let i = 0; i < game.length; i++) {
		let currentRow = game[i]
		let isFull =
			currentRow[0] !== '' && currentRow[1] !== '' && currentRow[2] !== ''
		if (isFull) {
			filledCount++
		}
	}
	if (filledCount === 3) {
		clearCells(cells, game)
	}
}

for (let i = 0; i < cells.length; i++) {
	let cell = cells[i]

	cell.addEventListener('click', function () {
		if (cell.classList.contains('cross') || cell.classList.contains('zero')) {
			return
		}

		let row = Math.floor(i / 3)
		let column = i % 3
		game[row][column] = currentPlayer
		cell.classList.add(currentPlayer)

		// Логика игры
		// Rows win
		for (let j = 0; j < game.length; j++) {
			let currentRow = game[j]

			let isEmpty =
				currentRow[0] === '' || currentRow[1] === '' || currentRow[2] === ''

			let isEqual =
				currentRow[0] === currentRow[1] && currentRow[1] === currentRow[2]

			checkWin(isEmpty, isEqual)
		}

		// Column win
		for (let j = 0; j < game.length; j++) {
			let isEmpty = game[0][j] === '' || game[1][j] === '' || game[2][j] === ''
			let isEqual = game[0][j] === game[1][j] && game[1][j] === game[2][j]
			// put
			checkWin(isEmpty, isEqual)
		}

		//  Первая диагональ
		let isFirstDiagonalEmpty =
			game[0][0] === '' || game[1][1] === '' || game[2][2] === ''
		let isFirstDiagonalEqual =
			game[0][0] === game[1][1] && game[1][1] === game[2][2]
		checkWin(isFirstDiagonalEmpty, isFirstDiagonalEqual)

		//  Вторая диагональ
		let isSecondDiagonalEmpty =
			game[0][2] === '' || game[1][1] === '' || game[2][0] === ''
		let isSecondDiagonalEqual =
			game[0][2] === game[1][1] && game[1][1] === game[2][0]
		checkWin(isSecondDiagonalEmpty, isSecondDiagonalEqual)

		checkDraw(cells,game)

		if (currentPlayer === 'cross') {
			currentPlayer = 'zero'
		} else {
			currentPlayer = 'cross'
		}
	})
}
