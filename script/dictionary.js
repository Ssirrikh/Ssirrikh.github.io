
////////////////////////////
//
//
/////////////////////////////

/*

Feature List:

*trie
	*nodes
	*add/remove
	*search
*dictionary
	*add entries (aka parse input)
	*search word (primary or secondary)
	*search fragment
	*forEach()
*processing
	*alphabetize
analytics
	//

*/

///////////////////////////////////////////////////////////////////

//// TRIE DATASTRUCTURE ////

class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.children = [];
	}

	get childCount() {
		return this.children.length;
	}

	hasChild(key) {
		for (let i = 0, n = this.children.length; i < n; i++) {
			if (this.children[i].key == key) return true;
		}
		return false;
	}
	addChild(key, value) {
		this.children.push(new Node(key, value));
	}
	getChild(key) {
		for (let i = 0, n = this.children.length; i < n; i++) {
			if (this.children[i].key == key) return this.children[i];
		}
	}
	removeChild(key) {
		for (let i = 0, n = this.children.length; i < n; i++) {
			if (this.children[i].key == key) {
				this.children.splice(i, 1);
				return;
			}
		}
	}
}
class Trie {
	constructor() {
		this.root = new Node('');
	}

	addWord(word, data) {
		let node = this.root, letter;
		for (let i = 0, n = word.length; i < n; i++) {
			letter = word[i];
			if (!node.hasChild(letter)) node.addChild(letter);
			node = node.getChild(letter);
		}
		node.value = data;
	}
	removeWord(word) {
		if (!this.contains(word)) return;
		this._removeHelper(word, this.root);
	}
	_removeHelper(word, root) {
		// recursive deletion
		if (word.length == 0) {
			root.value = undefined;
			return true;
		}
		if (this._removeHelper(word.substring(1), root.getChild(word[0]))) {
			if (root.getChild(word[0]).childCount == 0) {
				root.removeChild(word[0]);
				return true;
			}
		} else {
			return false;
		}
	}

	_searchHelper(word) {
		let node = this.root, contains = true,
			i = 0, n = word.length;
		for (; i < n; i++) {
			if (!node.hasChild(word[i])) {
				contains = false;
				break;
			} else {
				node = node.getChild(word[i]);
			}
		}
		return {
			contains: contains,
			value: (contains) ? node.value : undefined
		}
	}
	getSearch(word)	{ return this._searchHelper(word) }
	contains(word)	{ return this._searchHelper(word).contains }
	search(word)	{ return this._searchHelper(word).value }
}

///////////////////////////////////////////////////////////////////

//// DICTIONARY ////

class Dictionary {
	constructor(primary = {}, secondary = {}, tsv = '', parse = ()=>({})) {
		// helper funcs
		function comesBefore(target, reference, alphabet) {
			if (target == reference) return false;
			// Return true if target word comes before reference word when alphabetized.
			// If one is a subset of the other (ex. "book" and "booked"), the shorter word comes first.
			for (let i = 0; i < target.length && i < reference.length; i++) {
				// check for invalid characters (not found in alphabet)
				if (alphabet.indexOf(target[i]) == -1 || alphabet.indexOf(reference[i]) == -1) return false;
				// if letters are the same, check next letter
				if (target[i] == reference[i]) continue;
				// else, there was a difference so we can tell which comes first right away
				return (alphabet.indexOf(target[i]) < alphabet.indexOf(reference[i]));
			}
			// if words identical thus far and one ran out, the shorter one comes first
			return (target.length < reference.length);
		}
		function alphabetize(arr, alphabet) {
			let r = [arr[0]],
				currentWord = '';
			for (let wordPos = 1; wordPos < arr.length; wordPos++) {
				currentWord = arr[wordPos];
				let i = 0;
				for (i = 0; i < r.length; i++) {
					// current word should come before reference word, so stop
					if (comesBefore(currentWord, r[i], alphabet)) break;
				}
				// we should have stopped on the word in r[] that comes immediately after the current word, so just splice it in
				r.splice(i, 0, currentWord);
			}
			return r;
		}
		// init data objs
		let p = this._primary = {};
			p.name		= primary.name || 'Unnamed';
			p.abbr		= (primary.abbr || p.name.substr(0,2)).toLowerCase();
			p.alphabet	= primary.alphabet || `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`;
			p.trie				= new Trie();	// todo (analytical): build 2 tries for each; one using only a single form of each word, and the other comprehensive
			p.orderedWords		= []; // alphabetized searchable words
			p.orderedEntries	= []; // alphabetized entries (prevents duplicate entries if multiple forms of word)
		let s = this._secondary = {};
			s.name		= secondary.name || 'Unnamed';
			s.abbr		= (secondary.abbr || p.name.substr(0,2)).toLowerCase();
			s.alphabet	= secondary.alphabet || `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`;
			s.trie				= new Trie();
			s.orderedWords		= []; // alphabetized searchable words
			s.orderedEntries	= []; // alphabetized entries (prevents duplicate entries if multiple forms of word)
		// settings/etc
		this._togglePrimary = false;
		this._trimSearch = false;
		this._maxSearchResults = 10;
		// process data
		this._dataRaw = tsv;
		let d = this._dataParsed = parse(tsv),
			entriesBlob = {}, // use a data blob so entries access their data by reference, not value (prevent duplicate storages)
			blobRef;
		for (let entry of d) {
			blobRef = entry.pTags[0];
			entriesBlob[blobRef] = entry;
			for (let tag of entry.pTags) {
				if (p.orderedWords.indexOf(tag) == -1) {
					p.orderedWords.push(tag);
					p.trie.addWord(tag.toLowerCase(), entriesBlob[blobRef]); // force lowercase, for ease of searching later
				}
			}
			for (let tag of entry.sTags) {
				if (s.orderedWords.indexOf(tag) == -1) {
					s.orderedWords.push(tag);
					s.trie.addWord(tag.toLowerCase(), entriesBlob[blobRef]); // force lowercase, for ease of searching later
				}
			}
			p.orderedEntries.push(entry.pTags[0]);
			s.orderedEntries.push(entry.sTags[0]);
		}
		// p.orderedWords = alphabetize(p.orderedWords, p.alphabet);
		// s.orderedWords = alphabetize(s.orderedWords, s.alphabet);
		// p.orderedEntries = alphabetize(p.orderedEntries, p.alphabet);
		// s.orderedEntries = alphabetize(s.orderedEntries, s.alphabet);
		function sortCaseInsensitive(a, b) { return a.toLowerCase().localeCompare(b.toLowerCase()); }
		p.orderedWords.sort(sortCaseInsensitive);
		s.orderedWords.sort(sortCaseInsensitive);
		p.orderedEntries.sort(sortCaseInsensitive);
		s.orderedEntries.sort(sortCaseInsensitive);
	}

	get primary() { return (!this._togglePrimary) ? this._primary.name : this._secondary.name; }
	get secondary() { return (!this._togglePrimary) ? this._secondary.name : this._primary.name; }
	get abbr() { return (!this._togglePrimary) ? (this._primary.abbr+'-'+this._secondary.abbr) : (this._secondary.abbr+'-'+this._primary.abbr); }

	togglePrimary() { return (this._togglePrimary = !this._togglePrimary); }

	get maxSearchResults() { return this._trimSearch ? this._maxSearchResults : -1; }
	set maxSearchResults(n) { return this._maxSearchResults = parseInt(n); }
	toggleTrimSearch() { return this._trimSearch = !this._trimSearch; }

	searchWord(word, lang = 'primary') {
		// sterilize input
		word = word.toLowerCase();
		lang = lang.toLowerCase();
		if (lang != 'primary' && lang != 'secondary') return undefined;
		if (this._togglePrimary) lang = (lang=='primary') ? 'secondary' : 'primary';
		// check if word exists, and return its entry if it does
		let search = this['_'+lang].trie.getSearch(word);
		if (!search.contains)
			return false;
		else
			return this['_'+lang].trie.search(word);
	}
	searchFragment(frag, lang = 'primary') {
		// sterilize input
		frag = frag.toLowerCase();
		lang = lang.toLowerCase();
		if (lang != 'primary' && lang != 'secondary') return undefined;
		if (this._togglePrimary) lang = (lang=='primary') ? 'secondary' : 'primary';
		// empty string returns entire dictionary
		if (frag == '') {
			let r = [];
			for (let word of this['_'+lang].orderedWords) { r.push(word); }
			return r;
		}
		// else, search for fragment
		let r = [],
			orderedWords = this['_'+lang].orderedWords,
			lastPos = 0,
			maxResults = this._trimSearch ? this._maxSearchResults : orderedWords.length;
		for (let hitCount = 0; hitCount < maxResults; hitCount++) {
			let foundMatch = false;
			// iterate through all words in alphabetical order
			for (; lastPos < orderedWords.length; lastPos++) {
				// iterate through letters of current word
				for (let i = 0; i < orderedWords[lastPos].length; i++) {
					if (i == (frag.length-1) && orderedWords[lastPos][i].toLowerCase() == frag[i]) {
						// current word contained entire search fragment, so add it to the list
						r.push(orderedWords[lastPos]);
						lastPos++;
						foundMatch = true;
						break;
					} else if (orderedWords[lastPos][i].toLowerCase() != frag[i]) {
						// there was a difference, so try next word
						break;
					}
				}
				// check if a result was found yet
				if (foundMatch) break;
			}
		}

		return r;
	}
	forEachWord(callback, reverse) {
		let lang = (!this._togglePrimary) ? 'primary' : 'secondary';
		for (let word of this['_'+lang].orderedWords) callback(this['_'+lang].trie.search(word.toLowerCase()), word);
	}
	forEachEntry(callback, lang = 'primary', reverse) {
		lang = lang.toLowerCase();
		if (lang != 'primary' && lang != 'secondary') return undefined;
		if (this._togglePrimary) lang = (lang=='primary') ? 'secondary' : 'primary';
		for (let word of this['_'+lang].orderedEntries) callback(this['_'+lang].trie.search(word.toLowerCase()));
	}
}
class AnalyticalDictionary extends Dictionary {
	constructor(primary = {}, secondary = {}, tsv = '', parse = ()=>({})) {
		super (primary, secondary, tsv, parse);

		//
	}

	_searchFragInList(frag, list) {
		let t1 = Date.now();
		let r = [],
			fragLen = frag.length,
			potentialMatches = 0;
		// for each word, in alphabetical order
		for (let word = 0; word < list.length; word++) {
			let foundMatch = false;
			// for each letter of the current word
			for (let startLetter = 0, wordLen = list[word].length; startLetter+fragLen < wordLen; startLetter++) {
				// compare against fragment char by char
				for (let i = 0; i < fragLen; i++) {
					let letter = startLetter + i;
					if ( (i == fragLen-1) && (list[word][letter] == frag[i]) ) {
						// if entire fragment found in current word, add it to the list
						r.push(list[word]);
						word++;
						foundMatch = true;
						break;
					} else if (list[word][letter] != frag[i]) {
						// there was a difference, so try next start pos
						break;
					} else {
						// matched current char, so try next letter
						if (i == 0) potentialMatches++;
					}
				} 
				// check if a result was found yet
				if (foundMatch) break;
			}
		}

		////
		console.log('Done in ' + (Date.now()-t1) + ' ms. Out of ' + potentialMatches + ' partial matches, ' + r.length + ' contained the entire fragment.');
		////

		return r;
	}

	searchFragmentExtended(frag, lang = 'primary') {
		// sterilize input
		frag = frag.toLowerCase();
		lang = lang.toLowerCase();
		if (lang != 'primary' && lang != 'secondary') return undefined;
		if (this._togglePrimary) lang = (lang=='primary') ? 'secondary' : 'primary';

		////
		console.log('Searching ' + (lang=='primary'?this.primary:this.secondary) + ' for word fragment "' + frag + '"...');
		////

		// search
		let orderedWords = this['_'+lang].orderedWords;
		return this._searchFragInList(frag, orderedWords);
	}
	searchSentencesForFrag(frag, lang = 'primary') {
		// sterilize input
		frag = frag.toLowerCase();
		lang = lang.toLowerCase();
		if (lang != 'primary' && lang != 'secondary') return undefined;
		if (this._togglePrimary) lang = (lang=='primary') ? 'secondary' : 'primary';

		////
		console.log('Searching ' + (lang=='primary'?this.primary:this.secondary) + ' sentences for word fragment "' + frag + '"...');
		////

		let sentences = [];
		let translation = (lang=='primary') ? 'p' : 's';
		this.forEachEntry(function(entry) {
			for (let sentence of entry.sentences) {
				sentences.push(sentence[translation].toLowerCase());
			}
		});
		console.log(sentences);
		return this._searchFragInList(frag, sentences);
	}
}


