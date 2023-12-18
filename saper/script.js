(function ()  {
	let field = document.querySelector('.field');
	let infoAboutFlags = document.querySelector('.count_flags');
	let gameInfo = document.querySelector('.game_status');
		 
	let width = 12;
	let height = 12;
	let bombs = 20;
	let findBombs = 0;
	let pressFlag = bombs;
	let cells = [];
	let indexBomb = [];
	let firstclick 	= true;
	let gameOver = false;


	field.oncontextmenu = function () {return false};
	startGame(width, height, bombs);

	function startGame (WIDTH, HEIGHT, BOMBS) {
		let gtc = '';
		let gtr = '';

		for (i = 0; i < WIDTH; i++) { gtc += '1fr ';}
		for (i = 0; i < HEIGHT; i++) { gtr += '1fr ';}
		field.style.gridTemplateColumns = gtc;
		field.style.gridTemplateRows = gtr;
		for (let i = 0; i < WIDTH * HEIGHT; i++) {
			let divItem = document.createElement('div');
			divItem.className = 'cell_not_open';
			divItem.style.fontSize = Math.floor(field.offsetWidth/WIDTH) - 13 + 'px';
			field.append(divItem);
		}

		firstclick = true;
		gameOver = false;
		findBombs = 0;
		pressFlag = BOMBS;
		infoAboutFlags.innerHTML = pressFlag;
		cells = [...field.children];
	}

	function Random(num) {
  		return Math.floor(Math.random() * Math.floor(num));
	}

	function getIndex(row, column) {
		return row * width + column;
	}

	function haveBomb(row, column) {
		if (!force(row, column)) return false;
		return indexBomb.includes(getIndex(row, column));
	}

	function force(row, column) {
		return row >= 0 && row < height && column >= 0 && column < width;
	}

	function bombsAroundCell(row, column) {
		let count = 0;
		for (let x = -1; x < 2; x++){
			for (let y = -1; y < 2; y++) {
				if (haveBomb(row + x, column + y)) count++;
			}
		}
		return count;
	}

	function victory() {
		if (field.querySelectorAll('.cell_not_open').length === (bombs - findBombs)) {
			let win = true;
			let cellsFlag = document.querySelectorAll('.cell_flag');
			let index;
			for (var j = 0; j < cellsFlag.length; j++) {
				index = cells.indexOf(cellsFlag[j]);
				if (!indexBomb.includes(index)) {
					win = false;
					break;
				}
			}
			if (win) {
				gameInfo.innerHTML = 'Ура, победа!';
				gameInfo.style.color = '#2ecc71';
				gameInfo.style.display = 'block';
				field.style.pointerEvents = 'none';
				gameOver = true;
				if (field.querySelector('.cell_hover') !== null) field.querySelector('.cell_hover').classList.remove('cell_hover');
				
			}
		}
	}	

	function flagClick(row, column) {
		if (firstclick) { 
			firstClick(row, column);
		} else {
			let index = getIndex(row, column);
			if (haveBomb(row, column) && (cells[index].classList[0] != 'cell_flag')) {
				let i;
				for (let x = 0; x < width; x++) {
					for (let y = 0; y < height; y++){
						i = getIndex(x, y);
						if (haveBomb(x, y) && cells[i].classList[0] === 'cell_not_open') {
							cells[i].className = 'cell_bomb';
						}
						if (!haveBomb(x, y) && cells[i].classList[0] === 'cell_flag') {
							cells[i].className = 'cell_not_flag';
						}
					}
				}
				cells[index].style.backgroundColor = '#e74c3c';
				gameInfo.innerHTML = 'Эх, видно не судьба(';
				gameInfo.style.color = '#e74c3c';
				gameInfo.style.display = 'block';
				field.style.pointerEvents = 'none';
				gameOver = true;
				 if (field.querySelector('.cell_hover') !== null) field.querySelector('.cell_hover').classList.remove('cell_hover');
			} else if (cells[index].getAttribute('class') === 'cell_flag'){
				return;
			} else {
				checking(row, column);
			}
		}
	}

	function firstClick(row, column) {
		firstclick = false;

		let notBombCells = [];
		for (let x = -1; x < 2; x++){
			for (let y = -1; y < 2; y++) {
				if (force(row + x, column + y)) {
					notBombCells.push(getIndex(row + x, column + y))
				}
			}
		}

		indexBomb = [];
		for (let i = 0; i < bombs; i++) {
			let temp = Random(height * width);
			if (notBombCells.includes(temp)) {
				--i;
			} else if (indexBomb.includes(temp)) {
				--i;
			} else {
				indexBomb.push(temp);
			}
		}

		
		emptyCells(row, column);
	}

	function emptyCells(row, column) {
		let count = bombsAroundCell(row, column);
		
		if (count === 0) {
			for (let x = -1; x < 2; x++){
				for (let y = -1; y < 2; y++) {
					if (force(row + x, column + y) && cells[getIndex(row + x, column + y)].classList[0] === 'cell_not_open') {
						checking(row + x, column + y);
					}
				}
			}
		} 
	}

	function checking(row, column) {
		let count = bombsAroundCell(row, column);
		let i = getIndex(row, column)
		cells[i].className = 'cell_open';			
		switch (count) {
			case 0:
				emptyCells(row, column);
				break;
			case 1:
				cells[i].innerHTML = '1';
				cells[i].style.color = '#707070';
				break;
			case 2:
				cells[i].innerHTML = '2';
				cells[i].style.color = '#2ecc71';
				break;
			case 3:
				cells[i].innerHTML = '3';
				cells[i].style.color = '#e74c3c';
				break;
			case 4:
				cells[i].innerHTML = '4';
				cells[i].style.color = '#9b59b6';
				break;
			case 5:
				cells[i].innerHTML = '5';
				cells[i].style.color = '#f1c40f';
				break;
			case 6:
				cells[i].innerHTML = '6';
				cells[i].style.color = '#1abc9c';
				break;
			case 7:
				cells[i].innerHTML = '7';
				cells[i].style.color = '#34495e';
				break;
			case 8:
				cells[i].innerHTML = '8';
				cells[i].style.color = '#7f8c8d';
				break;
		}
		victory();
	}

	function openCells(row, column) {
		let i = getIndex(row, column);
		if (cells[i].classList[0] === 'cell_not_open') {
			cells[i].className = 'cell_flag';
			cells[i].classList.add('cell_hover');
			pressFlag--;
			infoAboutFlags.innerHTML = pressFlag;
			if (haveBomb(row, column)) {
				findBombs++;
			}
			victory();
		} else {
			cells[i].className = 'cell_not_open';
			pressFlag++;
			infoAboutFlags.innerHTML = pressFlag;
			if (haveBomb(row, column)) { 
				findBombs--;
			}
			victory();
		}	
	}

	function hover(index) {
		cells[index].classList.add('cell_hover');
	}

	function removeHover(index) {
		cells[index].classList.remove('cell_hover');
	}

	function updateField() {
		let childs = field.childNodes;
		while (childs.length) {
			childs[0].remove();
		}
	}

	field.addEventListener('click', function(event) {
		let target = event.target;
		let index = cells.indexOf(target);
		if (target.classList[0] === 'cell_not_open') {
			let indexColumn = index % width;
			let indexRow = (index - indexColumn) / height;
			flagClick(indexRow, indexColumn);
		}
	});

	field.addEventListener('contextmenu', function(event) {
		let target = event.target;
		let index = cells.indexOf(target);
		console.log(index);
		if (target.classList[0] === 'cell_not_open' || target.classList[0] === 'cell_flag') {
			let indexColumn = index % width;
			let indexRow = (index - indexColumn) / height;
			openCells(indexRow, indexColumn);
		}
	});

	field.addEventListener('mouseover', function(event) {
	 	let target = event.target;
		let index = cells.indexOf(target);
		if (field.querySelector('.cell_hover') !== null) {
			removeHover(cells.indexOf(field.querySelector('.cell_hover')));
		}
		if (target.classList[0] === 'cell_not_open' || target.classList[0] === 'cell_flag') {
	  		hover(index);
	  	}
	});

	document.querySelector('.newGame').addEventListener('click', function() {
		updateField();
		cells = [];
		width = 12;
		height = 12;
	 	bombs = 20;
		startGame(width, height, bombs);
		field.style.pointerEvents = 'auto';
		gameInfo.style.display = 'none';
	});
})();