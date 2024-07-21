
let tsv_vocab_1 = `potato	baabas, baabasi
hole	bokbokish, bokbokshi
meat	boʔush, boʔsha
dog	cheexaʔ, cheexaʔan
foot	dadach', dadaach'i
hawk, chicken hawk	diwdiw, diwdiwa
cat	gaaduʔ, gaaduʔun
family, cousin, relative	heedin, heedina
tail	k'ut', k'ut'a
fish	lopis, lopso
blackberry	maamil', maamila
grey squirrel	maw', maawi
eight	monosh, monoosha
road	pel', peeli
wing, feather	saayiʔ, saayiʔin
ground squirrel	shidgil', shidgila
three	shoopin, shoopina
cottontail rabbit	tew', teewa
mountain lion	weheeshit, weheeshita
belt	woshok', woshook'o
jackrabbit	xomix, xomxi
house	xoʔ, xoʔo
snow	ʔeeniʔ, ʔeeniʔin
tree	ʔutuʔ, ʔutuʔun`;

let tsv_colors = `pink	saliik'in, saliik'ina
purple	mukaaniʔ, mukaaniʔin
green	ch'iwik'ay', ch'iwik'ya
blue	lisanyuʔ, lisanyuʔun
white	shik'win, shik'wina
grey	humk'uk'un, humk'uk'na
brown	kapew'neʔ, kapew'neʔen
yellow	ʔalk'ik'in, ʔalk'ik'ni
orange	sakaakaʔ, sakaakaʔan
red	habilk'ay', habilk'ya
black	limik', limk'a`;

////////////////////////////////////////////////////

function Deck(name, tsv) {
	let deck = {
		name: name,
		cards: []
	};

	let lines = tsv.split('\n');
	for (let line of lines) {
		let cells = line.split('\t');
		let card = {
			eng: cells[0],
			chk: cells[1]
		};
		deck.cards.push(card);
	}

	return deck;
}

let decks = [];
	decks.push(new Deck('Intro Vocabulary', tsv_vocab_1));
	decks.push(new Deck('Colors', tsv_colors));

let testDeck = new Deck('Intro Vocabulary', tsv_vocab_1);

decks.push(new Deck(
`Days of the Week`,
`Monday	Luunas
Tuesday	Boneeyanaw
Wednesday	Shopeeyanaw
Thursday	Hadeebanaw
Friday	Yet'eeshanaw
Saturday	Sawaadanaw
Sunday	Dominkanaw`
));