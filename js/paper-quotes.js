// https://api.paperquotes.com/api-docs/

(function motivationalQuote() {
	const quote = async () => {
		const token = 'd3f6f2c0057d94075457e200db470f5b6907b882';

		let requestHeader = new Headers();
		requestHeader.append('Authorization', `Token ${token}`);

		let initObject = {
			method: 'GET',
			headers: requestHeader,
		};

		const response = await fetch(
			'https://api.paperquotes.com/apiv1/quotes/?tags=success&curated=1',
			initObject,
		);

		const data = await response.json();

		console.log(data);

		return data;
	};

	window.addEventListener('load', () => {
		quote()
			.then((data) => {
				updateUI(data), console.log('Success.');
			})
			.catch((error) => {
				console.log(error, 'Caught an error.');
			});

		const updateUI = (data) => {
			const message = document.createElement('div'),
				background = document.querySelector('#background');

			message.setAttribute('id', 'message');
			message.style.animation = 'slideIn 1000ms ease-in';

			background.prepend(message);

			function shuffle(results) {
				let currentIndex = results.length,
					randomIndex;

				// While there remain elements to shuffle...
				while (currentIndex != 0) {
					// Pick a remaining element...
					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--;

					// And swap it with the current element.
					[results[currentIndex], results[randomIndex]] = [
						results[randomIndex],
						results[currentIndex],
					];
				}

				return results;
			}

			const results = data.results,
				shuffledResults = shuffle(results);

			message.innerHTML += `
				<p>Thought of the day:</p>
				<p>${shuffledResults[0].quote}</p>
				<p>${shuffledResults[0].author}</p>
			`;

			setTimeout(() => {
				const card = document.querySelector('#card');
				card.style.opacity = '1';
				card.style.animation = 'slideIn 1000ms ease-in';
				message.style.opacity = '0';
				message.style.animation = 'slideOut 500ms ease-in';
			}, 5000);
		};
	});
})();
