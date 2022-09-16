const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.wrapper .input-field');
const timeTag = document.querySelector('.time span b');
const mistakeTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const reintentarBtn = document.querySelector('button');

let timer,
	maxTime = 60,
	tiempoRestante = maxTime;

let caracterIndex = (mistake = isTyping = 0);

const parrafoAleatorio = () => {
	//Genero un indice aleatorio siempre menor que el larrgo del array parrafo
	let aleatIndice = Math.floor(Math.random() * parrafos.length);
	typingText.innerHTML = '';
	//Obtengo un elemento aleatorio del array, luego separo todos los caracteres y los agrego dentro de span para agregarlo dentro de la etiqueta p del html
	parrafos[aleatIndice].split('').forEach(span => {
		let spanTag = `<span>${span}</span>`;
		typingText.innerHTML += spanTag;
	});
	typingText.querySelectorAll('span')[0].classList.add('active');
	//Al hacer click o escribir ubico al usuario dentro del input
	document.addEventListener('keydown', () => inputField.focus());
	typingText.addEventListener('click', () => inputField.focus());
};

const inicioTipeo = () => {
	const caracteres = typingText.querySelectorAll('span');
	let caractTipeado = inputField.value.split('')[caracterIndex];
	if (caracterIndex < caracteres.length - 1 && tiempoRestante > 0) {
		//Evito que el temporizador se reinicie cada vez que apreto una tecla
		if (!isTyping) {
			timer = setInterval(iniciarTemporizador, 1000);
			isTyping = true;
		}
		//Si el usuario borra:
		if (caractTipeado == null) {
			caracterIndex--;
			if (caracteres[caracterIndex].classList.contains('incorrect')) {
				mistake--;
			}

			caracteres[caracterIndex].classList.remove('correct', 'incorrect');
		} else {
			// Si el caracter tipeado coincide agrego la clase correct sino incorrect
			if (caracteres[caracterIndex].innerText === caractTipeado) {
				caracteres[caracterIndex].classList.add('correct');
			} else {
				mistake++;
				caracteres[caracterIndex].classList.add('incorrect');
			}
			caracterIndex++;
		}

		caracteres.forEach(span => span.classList.remove('active'));
		caracteres[caracterIndex].classList.add('active');

		let wpm = Math.round(
			((caracterIndex - mistake) / 5 / (maxTime - tiempoRestante)) * 60
		);
		wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
		mistakeTag.innerText = mistake;
		wpmTag.innerText = wpm;
		cpmTag.innerText = caracterIndex - mistake; //cuento los caracteres que tipea el usuario sin errores
	} else {
		inputField.value = '';
		clearInterval(timer);
	}
};

const iniciarTemporizador = () => {
	if (tiempoRestante > 0) {
		tiempoRestante--;
		timeTag.innerText = tiempoRestante;
	} else {
		clearInterval(timer);
	}
};

const reiniciarJuego = () => {
	parrafoAleatorio();
	inputField.value = '';
	clearInterval(timer);
	tiempoRestante = maxTime;
	caracterIndex = mistake = isTyping = 0;
	timeTag.innerText = tiempoRestante;
	mistakeTag.innerText = mistake;
	wpmTag.innerText = 0;
	cpmTag.innerText = 0; //cuento los caracteres que tipea el usuario sin errores
};

parrafoAleatorio();
inputField.addEventListener('input', inicioTipeo);
reintentarBtn.addEventListener('click', reiniciarJuego);
