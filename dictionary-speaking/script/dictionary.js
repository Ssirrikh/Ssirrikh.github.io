
// 2.0 hrs: design language data representation format; start v3 parser
// 0.5 hrs: finish v3 parser
// 0.5 hrs: lay out skeleton of dictionary framework update
// 2.0 hrs: fix v3 parser bugs, update custom sort, finish data loading
// 1.5 hrs: update search
// 0.5 hrs: finish v4 parser
// 1.5 hrs: start updating speaking dictionary
// 2.0 hrs: start refactor of v4 parser and dictionary framework to be more efficient and include new built-in operations
// 1.0 hrs: finish refactor of v4 parser and dictionary framework
// 1.0 hrs: finish updating speaking dictionary
// ??? hrs: add new batch of sounds/images to speaking dictionary

let primary_eng = {
	name: 'English',
	abbr: 'en',
	abbr3: 'eng',
	alphabet: `a b c d e f g h i j k l m n o p q r s t u v w x y z`.split(' '),
	alphabetize: (a,b) => {
		if (a[0] > b[0]) return 1;
		if (a[0] < b[0]) return -1;
		return 0;
	},
	forms: {
		default: (i) => 'form '+i
	},
	formStr: (catg,i) => {
		return (primary_eng.forms.hasOwnProperty(catg) && i < primary_eng.forms[catg].length)
			? primary_eng.forms[catg][i]
			: primary_eng.forms.default(i)
	}
};

let secondary_chk = {
	name: 'Chukchansi',
	abbr: 'ch',
	abbr3: 'chk',
	// alphabet: `b c d f g h j k l m n p q r s t v w x y z ʔa ʔe ʔi ʔo ʔu`.split(' '),
	// alphabet: `a aa b ch ch' d e ee f g h i ii j k k' l l' m m' n n' o oo p p' r s sh t t' u uu w w' x y y' ʔ`.split(' '),
	alphabet: `a b c d e f g h i j k l m n o p r s t u w x y ' ʔ`.split(' '),
	alphabetize: (a,b) => { // piggy-back off unicode char order for now
		if (a[0] > b[0]) return 1;
		if (a[0] < b[0]) return -1;
		return 0;
	},
	forms: {
		n:   ['subject', 'object', 'owner',          'owned',   'tool',    'place'],
		v:   ['subject', 'object', 'yesterday past', 'ongoing', 'command', 'hypothetical', 'future'],
		adj: ['subject', 'object', 'owner',          'owned',   'tool',    'place'],
		default: (i) => 'form '+i
		// 'n': ['subject', 'object', 'possessive',     'possessed', 'instrumental', 'locative'],
		// 'v': ['subject', 'object', 'yesterday past', 'ongoing',   'command',      'hypothetical', 'future']
	},
	formStr: (catg,i) => {
		return (secondary_chk.forms.hasOwnProperty(catg) && i < secondary_chk.forms[catg].length)
			? secondary_chk.forms[catg][i]
			: secondary_chk.forms.default(i)
	}
};

function BlankEntry() {
	const EN = primary_eng.abbr;
	const CH = secondary_chk.abbr;
	let e = {
		catg: undefined,
		sents: {},
		forms: {}
	};
	e.sents[EN] = [];
	e.sents[CH] = [];
	e.forms[EN] = [];
	e.forms[CH] = [];
	return e;
}

/////////////////////////////////////

function parse_en_ch_v1(tsv) {
	console.log('v1 parse stub');
}

function parse_en_ch_v3(tsv) {
	// input: "eng1   catg   sent1_ch sent1_en sent_ch sent2_en   chk1 chk2 ...\n"
	// output: {catg, sents{en[s1,...],ch[s1,...]}, forms{en[[f_num,[synonyms]],...],ch[[]]}}
	const EN = primary_eng.abbr;
	const CH = secondary_chk.abbr;

	let parse = [];

	const entries = tsv.split('\n');
	for (let i = 0; i < entries.length; i++) {
		const line = entries[i].split('	'); // 13 in v3: 1 eng word, 1 catg, 4 sentences, 7 chk words
		let e = BlankEntry();
		// part of speech
		e.catg = line[1];
		// sentences
		e.sents[CH].push( [0, line[2]] );
		e.sents[EN].push( [0, line[3]] );
		e.sents[CH].push( [1, line[4]] );
		e.sents[EN].push( [1, line[5]] );
		// eng forms
		e.forms[EN].push( [0, line[0].split('; ')] );
		// chk forms
		for (let formNum = 0; formNum < line.length-6; formNum++) {
			if (line[6+formNum] == '') continue;
			e.forms[CH].push( [formNum, line[6+formNum].split('; ')] );
		}
		// log data
		parse.push(e);
	}

	return parse;
}

function parse_en_ch_v4(tsv) {
	// input: "eng1   catg   sent1_ch sent1_en sent_ch sent2_en   chk1 chk2 ...\n"
	// output: {catg, sents[], pForms[[synonyms],...], sForms[[synonyms],...]}

	let parse = [];

	const entries = tsv.split('\n');
	for (let i = 0; i < entries.length; i++) {
		const line = entries[i].split('	'); // 23 in v4: 1 eng word, 1 catg, 14 sentences, 7 chk words
		let e = new Entry();
		// part of speech
		e.catg = line[1];
		// sentences
		for (let sentenceNum = 0; sentenceNum < 7; sentenceNum++) {
			let sentTransIndex = 2 + 2*sentenceNum;
			let sentIndex = sentTransIndex + 1;
			if (line[sentIndex] == '' && line[sentTransIndex] == '') continue;
			let sent = (line[sentIndex] != '') ? line[sentIndex] : ('[[no '+primary_eng.abbr3+' version of sentence]]');
			let sentTrans = (line[sentTransIndex]   != '') ? line[sentTransIndex]   : ('[[no '+secondary_chk.abbr3+' version of sentence]]');
			e.addSentence(sent, sentTrans, sentenceNum);
		}
		// eng forms
		e.addPrimaryForm(line[0]);
		// chk forms
		for (let formNum = 0; formNum < line.length-16; formNum++) {
			if (line[16+formNum] == '') continue;
			e.addSecondaryForm(line[16+formNum], formNum);
		}
		// log data
		parse.push(e);
	}

	return parse;
}



////////////////////////////

const SYNONYM_SPLITTER = '; ';

class Entry {
	constructor() {
		this._catg = undefined;
		this._pForms = [];
		this._sForms = [];
		this._sents = [];
	}

	addPrimaryForm(synonyms, formNum = -1) {
		if (formNum == -1) formNum = this._pForms.length; // if no forms, then order doesn't matter; use next open slot
		this._pForms[formNum] = synonyms.split(SYNONYM_SPLITTER);
	}
	addSecondaryForm(synonyms, formNum = -1) {
		if (formNum == -1) formNum = this._sForms.length; // if no forms, then order doesn't matter; use next open slot
		this._sForms[formNum] = synonyms.split(SYNONYM_SPLITTER);
	}
	addSentence(sent, trans, formNum = -1) {
		if (formNum == -1) formNum = this._sents.length; // if no forms, then order doesn't matter; use next open slot
		if (!this._sents[formNum]) this._sents[formNum] = [];
		this._sents[formNum].push( {sent: sent, trans: trans} );
	}

	get catg() { return this._catg; }
	set catg(c) { this._catg = c; }

	primarySynonymID(word) {
		for (const form of this._pForms)
			for (let i = 0; i < form.length; i++)
				if (word == form[i]) return i;
	}

	getPrimaryForm(formNum) { return this._pForms[formNum]; }
	getSecondaryForm(formNum) { return this._sForms[formNum]; }
	getSentence(formNum) { return this._sents[formNum]; }

	forEachPrimaryForm(callback = (synonyms,formNum)=>{}) {
		for (let i = 0; i < this._pForms.length; i++)
			if (this._pForms[i])
				callback(this._pForms[i], i);
	}
	forEachSecondaryForm(callback = (synonyms,formNum)=>{}) {
		for (let i = 0; i < this._sForms.length; i++)
			if (this._sForms[i])
				callback(this._sForms[i], i);
	}
	forEachSentence(callback = (sents,formNum)=>{}) {
		for (let i = 0; i < this._sents.length; i++)
			if (this._sents[i])
				callback(this._sents[i], i);
	}
}

const PRIMARY_LANG = false;
const SECONDARY_LANG = true;

class Dictionary {
	constructor(primaryLang, secondaryLang) {
		// raw data (loaded post-init)
		this._data = [];
		// language specific data
		this._pLang = primaryLang;
		this._pOrderedWords = [];
		// this._pOrderedEntries = [];
		this._sLang = secondaryLang;
		this._sOrderedWords = [];
		// this._sOrderedEntries = [];
		// settings
		this._togglePrimary = false;
		this._trimSearch = false;
		this._maxSearchResults = 10;
	}

	loadData(parse) {
		// parse format: {catg, sents[], pForms[[synonyms],...], sForms[[synonyms],...]}
		const P = this._pLang.abbr;
		const S = this._sLang.abbr;
		this._data = parse;
		// sort data
		this._pOrderedWords = [];
		this._sOrderedWords = [];
		for (let i = 0; i < this._data.length; i++) {
			this._data[i].forEachPrimaryForm((synonyms, formNum) => {
				for (const synonym of synonyms) this._pOrderedWords.push([synonym,i]);
			});
			this._data[i].forEachSecondaryForm((synonyms, formNum) => {
				for (const synonym of synonyms) this._sOrderedWords.push([synonym,i]);
			});
		}
		this._pOrderedWords.sort(this._pLang.alphabetize);
		this._sOrderedWords.sort(this._sLang.alphabetize);
		// [add orderedEntries later, if needed]
	}

	get primary() { return (!this._togglePrimary) ? this._pLang.name : this._sLang.name; }
	get secondary() { return (!this._togglePrimary) ? this._sLang.name : this._pLang.name; }
	get abbr() { return (!this._togglePrimary) ? (this._pLang.abbr+'-'+this._sLang.abbr) : (this._sLang.abbr+'-'+this._pLang.abbr); }
	togglePrimary() { return (this._togglePrimary = !this._togglePrimary); }

	get maxSearchResults() { return this._trimSearch ? this._maxSearchResults : -1; }
	set maxSearchResults(n) { return this._maxSearchResults = parseInt(n); }
	get trimSearch() { return this._trimSearch; }
	toggleTrimSearch() { return this._trimSearch = !this._trimSearch; }

	searchWord(searchWord, lang = PRIMARY_LANG) {
		// sterilize input
		searchWord = searchWord.toLowerCase();
		if (lang != PRIMARY_LANG && lang != SECONDARY_LANG) return undefined;
		if (this._togglePrimary) lang = (lang==PRIMARY_LANG) ? SECONDARY_LANG : PRIMARY_LANG;
		// check if word exists, and return its entry if it does
		const orderedWords = (lang==PRIMARY_LANG) ? this._pOrderedWords : this._sOrderedWords;
		for (let wordRef of orderedWords) {
			const [word,index] = wordRef;
			if (word.toLowerCase() == searchWord) return this._data[index];
		}
		return false;
	}
	searchFragment(frag, lang = PRIMARY_LANG) {
		// sterilize input
		frag = frag.toLowerCase();
		if (lang != PRIMARY_LANG && lang != SECONDARY_LANG) return undefined;
		if (this._togglePrimary) lang = (lang==PRIMARY_LANG) ? SECONDARY_LANG : PRIMARY_LANG;
		// find first n words that begin with the given fragment
		const regex = new RegExp('^'+frag+'.*'); // start with fragment, than 0 or more of anything else
		const orderedWords = (lang==PRIMARY_LANG) ? this._pOrderedWords : this._sOrderedWords;
		const maxResults = this._trimSearch ? this._maxSearchResults : orderedWords.length;
		let results = [];
		for (const wordRef of orderedWords) {
			const [word,index] = wordRef;
			if (results.length == maxResults) return results;
			if (regex.test(word)) results.push(word);
		}
		return results;
	}
	forEachWord(callback, reverse) {
		const orderedWords = (!this._togglePrimary) ? this._pOrderedWords : this._sOrderedWords;
		for (let i = 0; i < orderedWords.length; i++) {
			const [word,index] = !reverse ? orderedWords[i] : orderedWords[orderedWords.length-1 - i];
			callback(this._data[index], word);
		}
	}
	// forEachEntry(callback, lang = PRIMARY_LANG, reverse) {}
}


