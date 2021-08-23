
/////////////////////////////////////////////////////////////////////
//// design and developement (C) Narayana Adisasmito-Smith, 2021 ////
/////////////////////////////////////////////////////////////////////

let primary_eng = {
	name: 'English',
	abbr: 'en',
	alphabet: `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz`
};
let secondary_chk = {
	name: 'Chukchansi',
	abbr: 'ch',
	alphabet: `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzʔ'`
};
let forms_chk = {
	'n': ['subject', 'object', 'possessive',     'possessed', 'instrumental', 'locative'],
	'v': ['subject', 'object', 'yesterday past', 'ongoing',   'command',      'hypothetical', 'future']
};
function parse_en_ch(tsv) {
	let r = [],
		entries = tsv.split('\n'),
		line,
		temp;
	for (let entry of entries) {
		let e = {
			// meta info: searchable tags
			pTags: [],
			sTags: [],
			// entry data: part of speech, labeled forms, sentence pairs
			catg: '',
			pForms: [],
			sForms: [],
			sentences: [],
			// functions: for ease of searching
			pForm: function(form) {
				// console.log('searching primary form "' + form + '" of word "' + e.pTags[0] + '"');
				let i;
				for (i = 0; i < e.pForms.length; i++)
					if (e.pForms[i].name == form) break;
				if (i == e.pForms.length) return false;
				return e.pForms[i];
			},
			sForm: function(form) {
				// console.log('searching secondary form "' + form + '" of word "' + e.pTags[0] + '"');
				let i;
				for (i = 0; i < e.sForms.length; i++)
					if (e.sForms[i].name == form) break;
				if (i == e.sForms.length) return false;
				return e.sForms[i];
			}
		};
		line = entry.split('	');
		// part of speech
		e.catg = line[1];
		// eng forms
		let engForms = line[0].split('; ');
		for (let i = 0; i < engForms.length; i++) {
			e.pForms.push({name: `form`+i, word: engForms[i]});
			e.pTags.push(engForms[i]);
		}
		// chk forms
		let formNames = forms_chk[e.catg] || [];
		for (let i = 6; i < line.length; i++) {
			if (line[i] != '') {
				e.sForms.push({name: formNames[i-6] || ('form'+(i-6)), word: line[i]});
				if (i==6 || i==7) { e.sTags.push(line[i]); }
			}
		}
		// sentences
		for (let i = 2; i < 5; i += 2) {
			if (line[i] != '' && line[i+1] != '') {
				e.sentences.push({
					p: line[i+1],
					s: line[i]
				});
			}
			if (line[i] == '' && line[i+1] != '' || line[i] != '' && line[i+1] == '') {
				console.log('missing sentence translation for "' + line[0] + '"');
			}
		}

		r.push(e);
	}
	return r;
}

/////////////////////////////////////////

let audio_en_ch = ["baabas_H.mp3", "baabasi_H.mp3", "bokbokish_H.mp3", "bokbokshi_H.mp3", "boʔsha_H.mp3", "boʔush_H.mp3", "cheexaʔ_H.mp3", "cheexaʔan_H.mp3", "dadaach'i_H.mp3", "dadach'_H.mp3", "diwdiw_J.mp3", "gaaduʔ_H.mp3", "gaaduʔun_H.mp3", "heedin_H.mp3", "heedina_H.mp3", "k'ut'_H.mp3", "k'ut'a_H.mp3", "lopis_H.mp3", "lopso_H.mp3", "maamil'_H.mp3", "maamila_H.mp3", "maw'_J.mp3", "monosh_J.mp3", "peeli_H.mp3", "pel'_H.mp3", "saayiʔ_H.mp3", "saayiʔin_H.mp3", "shidgil'_J.mp3", "shoopin_H.mp3", "shoopina_H.mp3", "tew'_J.mp3", "weheeshit_J.mp3", "woshok'_J.mp3", "xomix_J.mp3", "xoʔ_H.mp3", "xoʔo_H.mp3", "ʔeeniʔ_H.mp3", "ʔeeniʔin_H.mp3", "ʔutuʔ_H.mp3", "ʔutuʔun_H.mp3"];

let image_en_ch = ["dadach'.jpg", "gaaduʔ.jpg", "galshuy.png", "heedin.jpg", "k'ut'.jpg", "lopis.jpg", "maamil'.jpg", "monosh.png", "pel'.jpg", "saayiʔ.jpg", "shidgil'.jpg", "shoopin.jpg", "weheeshit.jpg", "woshok'.png", "xomix.jpg", "xoʔ.jpg", "ʔeeniʔ.jpg", "ʔutuʔ.jpg", "baabas.jpg", "bokbokish.jpg", "boʔush.jpg", "cheexaʔ.jpg"];

let tsv_en_ch;

tsv_en_ch = `potato	n	K'oteehat baabas.	The potatoes grew bigger.	Kishaalen' naʔ baabasi ʔustuubaw.	I'm going to fry the potatoes on the stove.	baabas	baabasi	baabasin	baabasam'	baabasan	baabasiw	
hole (general)	n	Mich k'otiʔ bokbokish ʔodbinit.	A very big hole opened up.	Diʔishtaʔ naʔ bokbokshi sheleelaw.	I made a hole in the rock.	bokbokish	bokbokshi	bokbokshin	bokboksham'	bokbokshan	bokbokshiw	
meat	n	Ch'ik'neʔ miʔin boʔush.	The meat is going to rot soon.	Kewshit naʔ boʔsha.	I boiled the meat.	boʔush	boʔsha	boʔshin	boʔsham'	boʔshan	boʔshaw	
dog	n	Cheexaʔ yawaltaʔ noonoʔon.	The dog chased the man.	Yawaltaʔ noonoʔ cheexaʔan.	The man chased the dog.	cheexaʔ	cheexaʔan	cheexaʔan	cheexam'	cheexan	cheexaw	
foot	n	Taxeetaxon' nim dadach'.	My feet have been aching.	Taʔashʔan' naʔ nim dadaach'i.	I'm looking at my feet.	dadach'	dadaach'i	dadaach'in	dadaach'am'	dadaach'an	dadaach'iw	
hawk; chicken hawk	n	Hoyintaʔ diwdiw' sipin'.	The hawk flew above.	Yawaltaʔ k'otiʔ ch'enbay' diwdiwa.	A big bird chased the hawk.	diwdiw	diwdiwa	diwdiwin			diwdiwa	
cat	n	Xishwit gaaduʔ ʔutuʔun.	The cat scratched the tree.	Yawaltaʔ cheexaʔ gaaduʔun.	The dog chased the cat.	gaaduʔ	gaaduʔun	gaaduʔun	gaadum'	gaadun	gaaduw	
family; cousin; relative	n	ʔoyit nim heedin Pelesnow.	My family moved to Fresno.	Taʔishtaʔ naʔ ʔam heedina denderow.	I saw his family in the store.	heedin	heedina	heedinin	heedinam'		heedinaw	
tail	n	Goosin k'ut' yuxaʔich'.	The pig's tail is curly.	Dach'taʔ naʔ ʔam k'ut'a.	I stepped on its tail.	k'ut'	k'ut'a	k'ut'in	k'ut'am'		k'ut'aw	
fish	n	Shilit'taʔ lopis nim wakaayaw.	My fish jumped into the river.	Kuyʔulut lopso.	She salted the fish.	lopis	lopso	lopsin	lopsam'	lopsan	lopsow	
blackberry	n	Meejintaʔ k'uyuuk'ataʔ maamil'.	The blackberries were very sweet.	Goobeʔ naʔ miʔin maamila.	I'm going to pick blackberries soon.	maamil'	maamila	maamilin	maamilam'	maamilan	maamilaw	
grey squirrel	n	Xataʔan' maw' simiiyaʔan.	The grey squirrel is eating seeds.	Maawi naʔ wanit toonan.	I gave the grey squirrel some nuts.	maw'	maawi	maawin			maawiw	
eight	n	Hiʔ daʔ monosh bilaasuʔ.	Here are eight plates.	Xattaʔ ʔamaʔ monoosha duldiiyaʔan.	He ate eight tortillas.	monosh	monoosha	monooshin	monoosham'	monooshan	monooshaw	
road	n	Ch'apeeyataʔ pel'.	The road was wet.	Diʔsheʔ ʔaman peeli.	They will build the road.	pel'	peeli	peelin			peeliw	
wing; feather	n	Limeek'ataʔ ʔam saayiʔ.	Its wings became black.	Xayaataʔ saayiʔin lameesaw.	He put down the feather on the table.	saayiʔ	saayiʔin	saayiʔin			saayiw	
ground squirrel	n	Shidgil' ʔam waayit shoyxo.	The squirrel dug its hole.	Shidgila naʔ bokhil peeliw.	I found a squirrel on the road.	shidgil'	shidgila	shidgilin		shidgilan	shidgilaw	
three	n	Hoy'nit shoopin ch'enbay' waʔlaw.	Three birds flew in the sky.	Hoyuch'taʔ naʔ shoopina ʔaabula.	I wanted three apples.	shoopin'	shoopina	shoopinin	shoopinam'	shoopinan	shoopinaw	
cottontail rabbit	n	Tishtaʔ tew' ch'ayaaxiw.	The cottontail rabbit came out of the bush.	Yawaltaʔ cheexaʔ nim teewa.	My dog chased the rabbit.	tew'	teewa	teewin		teewan	teewaw	
mountain lion	n	Gadaayit weheeshit.	The mountain lion was hungry.	Weheeshita naʔ beeletaʔ.	I fed the mountain lion.	weheeshit	weheeshita	weheeshitin			weheeshitaw	
belt	n	Hiʔ woshok' mich dindinich'.	This belt is very thick.	Hech'eytaʔ naʔ woshook'o.	I tightened the belt.	woshok'	woshook'o	woshook'in	woshook'am'	woshook'an	woshook'ow	
jackrabbit	n	Shilit'taʔ xomix.	The jackrabbit jumped.	Yawaalit kaʔyuʔ xomxi.	The coyote chased the jackrabbit.	xomix	xomxi	xomxin			xomxiw	
house	n	Xoʔ nim ʔooch'iy'.	My house is nearby.	Walxon' may' ʔam xoʔo.	We are passing his house.	xoʔ	xoʔo		xoʔam'	xoʔan	xoʔow	
snow	n	Miʔin ʔeeniʔ ch'aapit.	Then the snow melted.	Taʔishtaʔ ʔaman ʔeeniʔin.	They saw the snow.	ʔeeniʔ	ʔeeniʔin				ʔeeniw	
tree	n	Bohloʔ miʔin galjin ʔutuʔ hew.	Many trees will soon grow here.	Halaxnit shidgil' ʔutuʔun.	The squirrel climbed the tree.	ʔutuʔ	ʔutuʔun	ʔutuʔun	ʔutum'	ʔutun	ʔutuw	`;

let dictionary_en_ch = new AnalyticalDictionary(
	primary_eng,
	secondary_chk,
	tsv_en_ch,
	parse_en_ch
);