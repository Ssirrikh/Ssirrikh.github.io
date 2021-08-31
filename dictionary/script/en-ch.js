
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
		// eng form
		let engForms = line[0].split('; ');
		for (let i = 0; i < engForms.length; i++) {
			e.pForms.push({name: `form`+i, word: engForms[i]});
			e.pTags.push(engForms[i]);
		}
		// chk forms
		if (line[7] != '') {
			e.sForms.push({name: `subject`, word: line[6]});
			e.sForms.push({name: `object`, word: line[7]});
			e.sTags.push(line[6]);
			e.sTags.push(line[7]);
		} else {
			e.sForms.push({name: `standard`, word: line[6]});
			e.sTags.push(line[6]);
			if (line[6] == '') {
				console.log('missing form0 for "' + line[0] + '"');
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

let tsv_en_ch;

tsv_en_ch = `a while ago; earlier	adv	Naahil beenat naʔ nim shilshi.	I combed my hair a while ago.	Yooyoxoohil nan naahil.	She was calling me earlier.	naahil										
above; on top of; up	adv	Wuʔshul' hoyneʔ waʔ sipin' waʔlaw.	Eagles fly high above the sky.	Kaʔyuʔ ʔamaʔ yoʔ k'oliswaʔ watwat hulshaʔxon' sipin' ʔilk'aw.	Coyote and a little duck were sitting above the water.	sipin'										
accept	v	Gaabinit naʔ baanaʔan.	I accept the bread.	Gaabintaʔ ʔaman ʔilk'a.	They accepted water.	gaabinit	gaabintaʔ									
ache	v	Teeliy' nim taxeetat.	My tooth aches.	Taxeetataʔ ʔam k'ewet.	Her back was aching.	taxeetat	taxeetataʔ									
ache (to have one, on the leg)	v	Taxish nim gashgashit.	My calf aches.	Taxish nim gashgashtaʔ.	My calf ached.	gashgashit	gashgashtaʔ									
ache, stomach (to have one)	v	ʔumlunut ʔam nopop.	His father had a stomach ache.	ʔumluntaʔ naʔ ʔalit.	I had a stomach ache some time ago.	ʔumlunut	ʔumluntaʔ									
acorn dumpling, bread	n	Shit'eeyat won.	Acorn bread tastes good.	Diʔshit mokeela wooni.	The woman made acorn bread.	won	wooni									
acorn mush, meal	n	Limin' weelehantaʔ.	The acorn mush was stirred.	Diʔishtaʔ ʔamaʔ yunk'u limna.	She made warm acorn mush.	limin'	limna									
acorn soup	n	Shit'eeyat ʔuduulan.	Acorn soup tastes good.	ʔuduulana naʔ diʔshit.	I made acorn soup.	ʔuduulan	ʔuduulana									
acorn, black oak	n	Papyit xoch'ooyow budush.	Black oak acorns scattered on the ground.	Poyit naʔ budsha.	I ground the black oak acorn.	budush	budsha									
acorn, general	n	Bagnit ʔilk'aw bayin'.	The acorn soaked in the water.	ʔewintaʔ naʔ bayna.	I sifted the acorn.	bayin'	bayna									
acorn, ground	n	Bamannaw ʔeep'an'.	The ground acorn is in the sifting basket.	Diʔshit mokeela ʔeep'ani.	The woman made ground acorn.	ʔeep'an'	ʔeep'ani									
acorn, leached	n	Gaʔis putmut keweshaw.	The leached acorn boiled in the bowl.	Xayat gaʔsi keweshaw.	She put the leached acorn in the pot.	gaʔis	gaʔsi									
add_1	v	Shutut naʔ yoʔ bek'eewaʔan.	I added more beads (to the string).	Shuttaʔ naʔ bek'eewaʔan t'eewishaw.	I added beads to the basket.	shutut	shuttaʔ									
add_2	v	Ch'akit k'eexaʔan min won'shi.	She added more money to your purse.	Ch'aktaʔ ʔaman bobbila gahoonaw ʔalit.	They added more papers into the box	ch'akit	ch'aktaʔ									
African-American	n	Heweetit Kanaagaʔ Pelesnow.	The African-American walked to Fresno.	Taʔshit naʔ Kanaagaʔan Gadnew.	I saw an African-American in Picayune.	Kanaagaʔ	Kanaagaʔan									
after a while	adv	Washi naʔ taxneʔ.	I'll arrive after a while			washi										
again	adv	Nebech' nim k'eltaʔ yoʔ gullali.	My older brother painted the fence again.	Hach'a hosheewataw daʔ yoʔ.	Now it is autumn again.	yoʔ_1										
aim	v	Yixit ʔam weelaʔan ʔutuw.	He aimed his light at the tree.	Yixtaʔ sheleela nohʔow.	He aimed the stone at the bear.	yixit	yixtaʔ									
albino	n					shek'eewaʔ	shek'eewaʔan									
alcohol	n			ʔaach'i naʔ ʔugnut.	I drank alcohol.	ʔach'	ʔaach'i									
alive; sober	adj	Heddaʔ hoyul'.	He's still alive.			hoyul'										
all; every	n	ʔodibhantaʔ hidyaʔ windaraʔ.	All windows were opened.	Nancyʔ hidyaʔan ʔamaamin woshitit.	Nancy told all of them a story.	hidyaʔ	hidyaʔan									
alligator	n	Xattaʔ xooyi k'at'yayaʔ.	The alligator ate a deer.	Taʔishtaʔ naʔ k'at'yayaʔan.	I saw the alligator.	k'at'yayaʔ	k'at'yayaʔan									
almost	adv	Tanhil naʔ ʔeema lagyiw.	I almost went yesterday.	Bemeemat gahon ʔeema.	The box is almost full.	ʔeema										
already	adv	Hiyim' xi balk'it.	She's already pregnant.	Hiyim' xatit naaʔak' ʔaabula.	We both already ate the apples.	hiyim'										
always	adv	Holoomun ʔopootit naʔ nomeech'ataw.	I always get up at 7.	Hoxteʔ holoomun taʔan cheexaʔ.	The dog always barks.	holoomun										
ancient; old, very	adj	Hew wooyiʔ gewwishhiy'.	The ancient meeting place is here.	Bok'it naʔ wooyiʔin gewwishhiya.	I found an ancient meeting place.	wooyiʔ	wooyiʔin									
and; also	adv	Taʔishtaʔ ʔamaʔ nim nopoopo nim yoʔ noʔoomo.	She saw my father and my mother.	Goyeʔ naʔ haliinaʔan ʔam yoʔ hoona.	I mix the flour and the egg.	yoʔ_2										
angry (to become)	v	Holeelat taa mokeela nim xattaw gayeedaʔan.	The woman became angry when I ate the cookies.	Holeelataʔ ʔamak' p'aayin jalwintaw.	They both became angry when the child was noisy.	holeelat	holeelataʔ									
animal_1	n	Galjin hol'ginin ʔugnit ʔilka wakaayaw.	Lots of animals drink water at the river.	Cheexaʔ hoxtit hol'ginna.	The dog barked at the animals.	hol'ginin	hol'ginna									
animal_2	n	Hol'gigin demeenataʔ tantaʔ ʔamaa.	The animals tried to go there.	Yoyootoʔ hol'gigna mich gayis shasham'.	He called the animals with fine eyesight.	hol'gigin	hol'gigna									
ankle (Lit. Joints)	n	Taxeetaxon' ʔam dadaach'in kuyuʔ.	Her ankle has been hurting.	Taʔishtaʔ dokton' ʔam dadaach'in kuyuʔun.	The doctor looked at her ankle.	dadaach'in kuyuʔ	dadaach'in kuyuʔun									
annoyed by	v	Ch'alwinit naʔ nim p'aaya.	I was annoyed by my kids.	Ch'alwintaʔ ʔaman gaaduʔun.	They were annoyed by the cat.	ch'alwinit	ch'alwintaʔ									
annoying	adj	Ch'aliw' taa p'ay'.	That kid is annoying.	Hudaʔan' naʔ tan ch'alwi p'aaya.	I know that annoying kid.	ch'aliw'	ch'alwi									
answer	v	Heweyit ʔam leelilaych'i.	She answered the teacher.	Heweytaʔ nan.	He answered me.	heweyit	heweytaʔ									
ant	n	ʔach'ich'taʔ nan k'eenich' ch'alew'.	The bothersome ants bit me.	Dach'taʔ naʔ k'eenich'i.	I stepped on the ant.	k'eenich'	k'eenich'i									
ant, black	n	Xattaʔ pat'aakaʔ huuyaʔan.	The black ants ate the caterpillar.	Lipit kaʔyuʔ pat'aakaʔan.	The coyote watched the black ants.	pat'aakaʔ	pat'aakaʔan									
antelope	n					shoyooliʔ	shoyooliʔin									
anxious (being one)	v	Tawaasat ʔaman ʔam huushetaw.	They were nervous when he drove.	Tawaasataʔ noonoʔ ʔam boch'oonin tishtaw.	The man was anxious when his son was born.	tawaasat	tawaasataʔ									
apple	n	Mejnit lak'wunut ʔaabul' xoch'ooyow.	Many apples dropped on the ground.	Xatit naʔ ʔaabula.	I ate an apple.	ʔaabul'	ʔaabula									
argue with each other	v	Desheywishit p'ayeeʔi.	The kids argue with each other.	Desheywishtaʔ ʔamaʔ noonoʔ ʔamaʔ yoʔ mokeela.	The man and the woman argued.	desheywishit	desheywishtaʔ									
argue with someone	v	Hoyooshit boch'on' nim ʔam namxa.	My son argued with his friend.	Jack hoyoshtaʔ ʔam naʔata.	Jack argued with his older sister.	hoyooshit	hoyoshtaʔ									
argue; angry with someone	v	Mejnit ʔaman desheeyit.	They really argued.	Desheytaʔ noonoʔ ʔam boch'oono.	The man was angry with his son.	desheeyit	desheytaʔ									
arm	n	Dugmat nim weebin.	My arm got bruised.	Niwit ʔam weebina.	She touched his arm.	weebin	weebina									
armpit	n	Lak'lak' min k'aheeyat.	My armpit stank.	K'ettaʔ ʔamin lak'lak'i.	He shaved his armpit.	lak'lak'	lak'lak'i									
aromatic	adj	Mich damik' ʔeelaw'.	The flowers are very aromatic (or smell very good/sweet).			damik'	damk'i									
arrival place	n	ʔohom' daʔ hew panaʔhiy'.	The arrival place is not here.	K'eltaʔ ʔaman panaʔhiya.	They painted the arrival place.	panaʔhiy'	panaʔhiya									
arrive	v	Hoy'noʔ panat.	The airplane arrived.	Panaataʔ ʔamaʔ p'ay' leeleʔhiyaw.	The child arrived at school.	panat	panaataʔ									
arrive early	v	Walpit naʔ toy'ninaw.	I arrived early this morning.	Waliptaʔ ʔam noʔom denderow.	His mother arrived early at the store.	walpit	waliptaʔ									
arrow	n	Sasyinit t'oyosh.	The arrow broke.	Maaxit t'oyoosha.	He picked up the arrow.	t'oyosh	t'oyoosha									
ash	n	Hashin' xoch'ooyow.	Ash is on the ground.	Taʔshit naʔ hashna xoch'ooyow.	I saw ash on the ground.	hashin'	hashna									
ask	v	Beneetit naʔ huyuch' widnit.	I asked if she fell.	Noʔoomo nim benettaʔ naʔ k'eexaʔan.	I asked my mother for money.	beneetit	benettaʔ									
asleep	adj	Hidyaʔ ʔaman wooʔay'.	Everybody is asleep.	Miʔin taʔishtaʔ p'aaya wooʔayi.	Then he saw a baby asleep.	wooʔay'	wooʔayi									
attack	v	ʔochyot nohʔoʔ gamboch'i.	The bear attacked the campers.	Dawhalich' ʔochyotoʔ ʔam.	The worker attacked him.	ʔochyot	ʔochyotoʔ									
aunt (father's sister)	n	Noshosh ʔam hewettaʔ wakaayaw.	Her aunt walked to the river.	Hewettaʔ hitwash ʔam noshooshi.	She walked with her aunt.	noshosh	noshooshi									
aunt (mother's sister)	n	Shawighil neket nim galjina haliinaʔan.	My aunt bought a lot of flour.	ʔamleʔ ʔam nekeeta diʔshaach'i duldiiyaʔan.	I will help my aunt make tortillas.	neket	nekeeta									
awl	n	Hiʔ p'ewel' moxloʔ.	This awl is old.	Shawgit naʔ pewela.	I bought an awl.	p'ewel'	p'ewela									
axe	n	Sasyintaʔ laasaʔ.	The axe broke.	Yugushtaʔ ʔam laasaʔan.	He cleaned his axe.	laasaʔ	laasaʔan									
baby (to have one)	v	P'aymit nim gach'ab.	My daughter just had a baby.	P'ayimtaʔ.	She had a baby.	p'aymit	p'ayimtaʔ									
baby; child	n	Hiʔ p'ay' waxlit, halaadaʔ dawshit.	This baby cried because he's thirsty.	Yooyot mokeela ʔam p'aaya.	The woman called her child.	p'ay'	p'aaya									
back (body part)	n	Taxeetaxon' nim k'ewet.	My back is hurting.	Duguglag min k'eweeta!	Straighten your back!	k'ewet	k'eweeta									
bad	adj	T'oyux mich bajxaʔal.	The medicine is really bad.	Miʔin Lopis maaxit bajxaʔli shashaaʔan.	Then Fish got the bad eyes.	bajxaʔal	bajxaʔli									
bad (to become)	v	Bajeexat hiʔ xatash.	This food became bad.	Hihooloʔ bajeexataʔ.	The green beans have gone bad.	bajeexat	bajeexataʔ									
bad (to cause to become)	v	Bajixtat taa nopop ʔam boch'oono.	That father spoiled his son.	Wixwik bajixtataʔ ʔaabula.	Worms caused the apple to go bad.	bajixtat	bajixtataʔ									
badger	n	Waytaʔ bokbokshi ch'aniw'.	A badger dug a hole.	Hoxtit cheexaʔ nim ch'aniwa.	My dog barked at the badger.	ch'aniw'	ch'aniwa									
bald	adj	Saamen p'ay' p'al'shanaʔ.	Sam's baby is bald.	Yateʔ pal'shanaʔan leelilaych'i.	He will talk to the bald teacher.	p'al'shanaʔ	p'al'shanaʔan									
bald (to become)	v	P'alashnit maʔ.	You are going bald.	P'alaashintaʔ naʔ heyeemaʔ.	I went bald long ago.	p'alashnit	p'alaashintaʔ									
Bald Mountain	adv	Tanhil naʔ P'al'shanaw.	I went to Bald Mountain.	P'al'shanaw xootoʔ ʔaman.	They lived on Bald Mountain.	P'al'shanaw										
ball	n	Looluntaʔ ʔap'om' ʔutuw.	The ball hung in the tree.	Hanit ʔap'ooma.	He kicked the ball.	ʔap'om'	ʔap'ooma									
ball player	n	Wimtaʔ ʔap'ooma hik'eyich' naanin.	The ball players waved at us all.	Wimtaʔ naaʔan ʔap'ooma hik'eych'i.	We all waved at the ball players.	ʔap'ooma hik'eyich'	ʔap'ooma hik'eych'i									
barely	adv	Namay'si naʔ taʔshit.	I can barely see.	Hewettaʔ taa noonoʔ namay'si.	That man can barely walk.	namay'si										
bark (of a dog)	v	Hoxtit cheexaʔ saamila.	The dog barked at the gopher.	Meejintaʔ cheexaʔ hoxittaʔ .	The dog really barked.	hoxtit	hoxittaʔ									
basket (cone-shaped, carried on the back)	n	Hiʔ ʔanash mich migich'.	This basket is very heavy.	Mehiltaʔ naʔ ʔanaashi.	I carried the basket on my back.	ʔanash	ʔanaashi									
basket (for cooking acorn)	n	ʔutuyhantaʔ t'eewish ʔadlen lameesaʔan.	The basket was pushed under the table.	Wanga nan t'eewisha!	Give me the basket!	t'eewish	t'eewisha									
basket (for gathering)	n	Mich k'olis ʔam xaalay'.	Her gathering basket is very small.	Loolotaʔ ʔam xaalayi xoʔow.	She left her gathering basket at home.	xaalay'	xaalayi									
basket (for sifting)	n	Bamannaʔ mich k'otiʔ.	The sifting basket is very big.	Sasyit ʔamaʔ hach'aamiʔin bamannaʔan.	She broke the new basket.	bamannaʔ	bamannaʔan									
basket (made of redbud)	n	Bemeemataʔ ʔoboy'.	The redbud basket filled up.	Diʔishtaʔ ʔoboyo.	She made a redbud basket.	ʔoboy'	ʔoboyo									
basket maker	n					t'eewisha diʔsham'										
bat	n	Ch'ipch'ipil woʔoyʔan'.	The bat is sleeping.	Hoxtit cheexaʔ ch'ipch'ipla.	The dog barked at the bat.	ch'ipch'ipil	ch'ipch'ipla									
bathroom (Lit. washroom)	n	Xoch'ooyot hiʔ yugshuwshaʔhiy'.	This bathroom is dirty.	K'eltaʔ ʔaman yugshuwshaʔhiy'.	They painted the bathroom.	yugshuwshaʔhiy'	yugshuwshaʔhiya									
bead	n	Papyit lameesaw bek'eewaʔ.	The beads scattered on the table	Xayat naʔ yoʔ bek'eewaʔan ʔoboyow.	I put more beads into the redbud basket.	bek'eewaʔ	bek'eewaʔan									
beak	n	Deemaysuʔun p'umaʔhiy' mich waʔat'.	The hummingbird's beak is very long.	Wosit shelel' ch'enbayin p'umaʔhiya.	The stone hit the bird's beak.	p'umaʔhiy'	p'umaʔhiya									
bean	n	K'oteehat hihooloʔ.	The beans are getting bigger.	Kiwsheʔ naʔ miʔin hihooloʔon.	I'm going to boil the beans.	hihooloʔ	hihooloʔon									
bear	n	Nohʔoʔ hujut naanin.	The bear growled at us.	Taʔishtaʔ naʔ chibnaʔan nohʔoʔon.	I saw the skinny bear.	nohʔoʔ	nohʔoʔon									
bear, black	n	Hujut limik' nohʔoʔ naanin.	The black bear growled at us.	Potit ʔaman limk'a nohʔoʔon.	They caught the black bear.	limik' nohʔoʔ	limk'a nohʔoʔon									
bear, grizzly	n	Hujuʔnun' nan habilk'ay' nohʔoʔ.	Grizzly bears scare me.	T'uytaʔ ʔamaʔ hablik'ya nohʔoʔon.	He shot the grizzly bear.	habilk'ay' nohʔoʔ	hablik'ya nohʔoʔon									
beard	n	Daamus ʔamin mich waʔat'.	His beard is very long.	Beenat naʔ daamusa nim.	I combed my beard.	daamus	daamusa									
beaver	n	T'intaʔ tibik' wakaaya.	The beaver dammed up the river.	Taʔishtaʔ naʔ tibk'a.	I saw the beaver.	tibik'	tibk'a									
bed	n	Mich k'otiʔ nim gaamaʔ.	My bed is very big.	Xayan' naʔ miʔin nim gaamaʔan hidʔaniw woʔoyhuyaw.	I'm going to move my bed in a different bedroom.	gaamaʔ	gaamaʔan									
bedroom	n	Mich k'otiʔ ʔam woʔoyhuy'.	Her bedroom is very big.	Ch'enishhil ʔam woʔoyhuya.	She swept her bedroom.	woʔoyhuy'	woʔoyhuya									
bee, yellow-jacket	n	Bawnay' diyal mam naʔash.	The yellow-jacket bee might sting you.	Ch'ewexʔan' ʔamaʔ bawnayi.	He is squishing the yellow-jacket bee.	bawnay'	bawnayi									
begin; start	v	Weenit dawhalit.	He is going to start working.	Wentaʔ yattaʔ.	She started talking.	weenit	wentaʔ									
behind; back of	adv	Taʔshit kaʔyuʔun dik'in ʔutuʔun.	He saw a coyote behind a tree.			dik'in										
believe	v	Nogmut naʔ ʔam.	I believed him.	ʔohom' wat noogumtaʔ ʔamaamig.	No one believed them.	nogmut	noogumtaʔ									
bell	n	Gambaanaʔ lulhanit sipin' miisaʔhiyaw.	The bell is hung on top of the church.	Taa p'ay' nich'it gambaanaʔan.	That child pressed the bell.	gambaanaʔ	gambaanaʔan									
belly button	n	Ch'utkush ʔamaʔ mich k'olis.	Her belly button is very small.	Koyok'sataʔ gaaduʔ ʔam ch'utkusha.	The cat scratched its belly button.	ch'utkush	ch'utkusha									
belt	n	Hiʔ woshok' mich dindinich'.	This belt is very thick.	Hech'eytaʔ naʔ woshook'o.	I tightened the belt.	woshok'	woshook'o									
bend over	v	P'it'lit ʔamaʔ maaxach' bilaasuʔun.	Heʔs bending over to pick up a plate.	P'it'iltaʔ yoʔ hujtaʔ habilk'ay' nohʔoʔ.	The grizzly bear bent over and growled.	p'it'lit	p'it'iltaʔ									
best; most	adv	Mich ʔamaʔ gayis wakiy' hidyaʔan ʔamaamin.	He is the best. (Lit. He is better than everybody.)			wakiy'_1										
better; more than	adv	ʔamaʔ daʔ gayis huusheʔich' wakiy' ʔam namxa.	He is a better driver than his friend.			wakiy'_2										
big	adj	Hewethil denderow taa k'otiʔ noonoʔ hoy'li.	That big man walked to the store.	Taʔishtaʔ naʔ k'otiʔin p'alp'alya	I saw the big pounding rock.	k'otiʔ	k'otiʔin									
big (to become)	v	K'oteehat shidgilin naaway'.	The squirrel's cheek got bigger.	K'oteehataʔ wakay'.	The river got bigger.	k'oteehat	k'oteehataʔ									
bile	n	Ch'eeshaʔ mich k'iyit.	Bile is very bitter.	Ch'ipxilit galjina k'iyti ch'eeshaʔan.	He spat a lot of bitter bile.	ch'eeshaʔ	ch'eeshaʔan									
bird	n	Jalawnit ch'enbay' manaw.	The birds outside made a loud noise.	Hoxtit cheexaʔ ch'enbayi ʔutuw.	The dog barked at the birds in the tree.	ch'enbay'	ch'enbayi									
bird, yellowhammer (orange wings, grey/black body, feather used for ceremony)	n	Hoynit galjin ch'iw'shaʔ hew.	Many yellowhammer birds are flying here.	ʔohom' naʔ naʔash taʔshal ch'iw'shaʔan.	I can't see the yellowhammer birds.	ch'iw'shaʔ	ch'iw'shaʔan									
birthday	n	Lownishan' may' ʔam tishaʔit.	We are going to gather for her birthday.			tishaʔit										
bite	v	ʔach'ch'it naʔ ʔam.	I bit him just now.	ʔach'ich'taʔ cheexaʔ gaaduʔun.	The dog bit the cat.	ʔach'ch'it	ʔach'ich'taʔ									
bitter	adj	Toyux mich k'iyit.	The medicine is very bitter.			k'iyit	k'iyti									
bitter (to become)	v	K'eyeetat ch'itil.	The manzanita cider became bitter.			k'eyeetat	k'eyeetataʔ									
black oak	n	Hiʔ shawaʔ mich moxloʔ.	This black oak is very old.	T'ultaʔ wal'maʔ shawaʔan.	Lightning burned the black oak.	shawaʔ	shawaʔan									
black pepper	n	Papiytaʔ bimyindeʔ xoch'ooyow.	The black pepper scattered on the ground.	Poyit naʔ bimyindeʔen.	I crushed the black pepper.	bimyindeʔ	bimyindeʔen									
black root	n	ʔohom' daʔ shapaaship bohloʔ hew.	Black roots do not grow here.	Waytaʔ naʔ shapaashipa.	I dug black roots.	shapaaship	shapaashipa									
black widow	n	ʔach'ich'taʔ meech'aʔ ʔam.	A black widow bit him.	Daach'it naʔ meech'aʔan.	I stepped on a black widow.	meech'aʔ	meech'aʔan									
black; dark	adj	Sasyintaʔ xaaluʔ limik'.	The black bowl broke.	Hoyoch'ʔan' naʔ limk'a sabaaduʔun.	I like black shoes.	limik'	limk'a									
blackberry	n	Meejintaʔ k'uyuuk'ataʔ maamil'.	The blackberries were very sweet.	Goobeʔ naʔ miʔin maamila.	I'm going to pick blackberries soon.	maamil'	maamila									
blacken; darken	v	Limek'tat naʔ nim woʔoyhuya.	I made my bedroom dark.	Limek'tataʔ hedeesha t'ulmi.	He made the wood black when he burned it.	limek'tat	limek'tataʔ									
blanket_1	n	Mich gayis migich' shobon' soopultaw.	Heavy blanket is very good when it's freezing.	Shawgeʔ naʔ bonyo shoboono.	I will buy two blankets.	shobon'	shoboono									
blind	adj	Noonoʔ ch'aamaʔ baʔon'.	The blind man gropes around (or, feels his way around).	ʔamiltaʔ ʔaman ch'aamaʔan noonoʔon.	They helped the blind man.	ch'aamaʔ	ch'aamaʔan									
blink	v	Ch'imch'imit taa noonoʔ.	That man blinked his eyes.	Ch'imch'imtaʔ naʔ.	I blinked.	ch'imch'imit	ch'imch'imtaʔ									
blood	n	Habilk'ay' paayax.	The blood is red.	Dooyut dokton' nim paayaxa.	The doctor drew my blood.	paayax	paayaxa									
bloom	v	Galiideʔen ʔeelaw' ʔelwit.	The flowers of the watercress bloomed.	ʔelewtaʔ galjin ʔeelaw'.	Many flowers bloomed.	ʔelwit	ʔelewtaʔ									
blow	v	Puushut ʔoshto.	He blew the fire (to make it bigger).	Meejintaʔ poshtaʔ ʔoshto.	He blew the fire hard.	puushut	pushtaʔ									
blow nose	v	Sin'yat p'ay'.	The child blew his nose.	Sin'yataʔ taa noonoʔ.	That man blew his nose.	sin'yat	sin'yataʔ									
blue	n	Waʔlaʔ mich lisanyuʔ.	The sky is very blue.	Xayaawushtaʔ ʔam lisanyuʔun gamiishaʔan.	He put on his blue shirt.	lisanyuʔ	lisanyuʔun									
blue (to become)	v	Lisanyat ʔam gamiishaʔ.	His shirt turned blue.	Lisanyataʔ nim teeliy' kandeʔen xatmi.	My teeth turned blue after eating the candy.	lisanyat	lisanyataʔ									
bluejay	n	Hoy'nit ch'aych'ay' sipin'.	The bluejays are flying above.	Dihtaʔ ch'enbay' k'oliswaʔ ch'aych'ayi.	The small bird followed the bluejay.	ch'aych'ay'	ch'aych'ayi									
boat	n	Lik'nit ʔawon'.	The boat sank.	Lik'eenetaʔ ʔaman ʔawoona.	They sank the boat.	ʔawon'	ʔawoona									
bobcat	n	ʔamaʔ t'unul' gadaayit.	The bobcat is hungry.	Taʔshit naʔ t'unula.	I saw the bobcat.	t'unul'	t'unula									
body louse	n	Badach' ʔach'ch'it nan.	A louse bit me.	Dach'taʔ naʔ badaach'i.	I have stepped on the louse.	badach'	badaach'i									
body_1	n	Xayaahanhil ʔam xoʔin gaamaw.	His body was put down on the bed.	Chipneʔ balentaʔ ʔam xoʔina shoboonon.	The doctor wrapped his body with a blanket.	xoʔin'	xoʔina									
body_2	n					xon'	xoono									
boil	v	Putmut ʔilik'.	The water boiled.	Putumtaʔ ʔuduulan.	The acorn soup has boiled.	putmut	putumtaʔ									
boil something_1	v	Putuʔmut naʔ haloosa.	I just boiled rice.	Nomch'ina hoona naʔ putuʔmutaʔ.	I boiled seven eggs.	putuʔmut	putuʔmutaʔ									
boil something_2	v	T'eewishaw naʔ kiwshit gaʔsi.	I boiled the leached acorn in the cooking basket.	Kiwishtaʔ gayiinaʔan.	She boiled the chicken.	kiwshit	kiwishtaʔ									
bone	n	Sasyinit ch'ey'.	The bone broke.	Cheexaʔ poytoʔ ch'eeya ʔam teeliyan.	The dog crushed the bone with its teeth.	ch'ey'	ch'eeya									
boot	n	Mich limik' woodaʔ.	The boots are very black.	ʔoxiytaʔ ʔam woodaʔan manaw.	He took off his boots outside.	woodaʔ	woodaʔan									
boss	n	Taa mokeela nim ʔaamuʔ.	That woman is my boss.	Yattaʔ ʔamaʔ nim ʔaamuʔun.	He talked to my boss.	ʔaamuʔ	ʔaamuʔun									
bossy	adj	Xon' noonoʔ ʔaamuwush hew.	The bossy man lives here.	Yattaʔ naaʔak' ʔaamuwsha noonoʔon.	We both talked to the bossy man.	ʔaamuwush	ʔaamuwsha									
bother; annoy	v	Ch'alwit ʔamaʔ nan.	She bothered me.	ʔamaʔ nooch'oʔ ʔohom' ch'aliwtaʔ shidgila.	The boy didn't bother the squirrel.	ch'alwit	ch'aliwtaʔ									
bothered by a loud noise	v	Danxinit naʔ. K'eeshiw naʔ taaneʔ.	I'm bothered by the loud noise. I'm going inside.	Danxintaʔ ʔamak', miʔin tantaʔ.	They both were bothered by the loud noise, so they left.	danxinit	danxintaʔ									
bottle	n	Ch'alnit lameedaʔ k'eeshiw gustaliw.	The bottle broke inside the sack.	Gaabot naʔ lameedaʔan.	I grabbed the bottle.	lameedaʔ	lameedaʔan									
bounce	v			Hon'tetaʔ naaʔan ʔawoonaw.	We bounced in the boat.	hon'tet	hon'tetaʔ									
bowl; can; cup	n	Ch'alnit xaaluʔ.	The bowl broke.	ʔipistaʔ xaaluʔun.	She threw away the bowl.	xaaluʔ	xaaluʔun									
box; bin	n	K'amintaʔ gahon' manaw.	The box dried up outside.	Bememlataʔ ʔamak' k'otiʔin gahoono.	They both filled up the big bins.	gahon'	gahoono									
boy	n	ʔaltit taa nooch'oʔ ʔam bilaasuʔun.	The boy is licking his plate.	Taʔishtaʔ naʔ dishyina nooch'oʔon.	I saw the mean boy.	nooch'oʔ_1	nooch'oʔon									
bra	n	Mich hijmaʔ hiʔ heley'hiy'.	These bras are very cheap.	Wantaʔ ʔam noʔom shoopina heley'hiya.	Her mother gave her three bras.	heley'hiy'	heley'hiya									
braid	v	Wich'nit naʔ nim shilshi.	I braided my hair.	Wich'intaʔ ʔamaʔ nim shilshi.	She braided my hair.	wich'nit	wich'intaʔ									
brain	n	Sok' Nancy'in k'otiʔ.	Nancy's brain is big.	Kishaalataʔ ganaaduʔun sok'i gosneenoʔ.	The chef cooked the cow's brains.	sok'	sok'i									
branch of a tree	n	ʔutuʔun weewil' sasyit.	The branch of the tree broke.	K'aliiwig weewila!	Go trim the branches!	weewil'	weewila									
brave; tough; mean	adj	Hak'wiyit noneeʔi tantaʔ.	The brave men left.	K'unk'untaʔ naʔ hak'wiyta noonoʔon.	I beat up the mean guy.	hak'wiyit	hak'wiyta									
bread	n	Ch'ek'nit baanaʔ.	The bread became moldy.	Kishaalat naʔ baanaʔan.	I fried the bread.	baanaʔ	baanaʔan									
bread (to make)	v	Baanat naʔ.	I made some bread.	Baanataʔ min noʔom.	Your mom made some bread.	baanat	baanataʔ									
break loose	v	Walatnit ʔilik' t'inhanaw.	The water broke loose at the dam (because the dam is too weak to hold the water).	Walaatintaʔ ʔilik' t'inhanaw.	The water broke loose at the dam.	walatnit	walaatintaʔ									
break_1	v	Sasyit wech'eeta teeliyin ʔam.	He broke the stick with his teeth.	Sasiytaʔ ʔam p'onoosha.	He broke his hand.	sasyit	sasiytaʔ									
break_2	v	Sasyinit weewil'.	The branch just broke.	Sasyintaʔ saluujaʔ ʔalit.	The saw broke some time ago.	sasyinit	sasyintaʔ									
break_3	v	Ch'aalit naʔ bilaasuʔun.	I broke the plates.	Ch'altaʔ xaaluʔun.	She broke a bowl.	ch'aalit	ch'altaʔ									
breakfast (to eat)	v	Waʔlit naaʔan.	We all ate breakfast.	Waʔiltaʔ naʔ taw xataʔhiyaw.	I ate breakfast in that restaurant.	waʔlit	waʔiltaʔ									
breathe	v	ʔahlit naʔ.	I'm breathing.	ʔahiltaʔ lihimmi.	He breathed while running.	ʔahlit	ʔahiltaʔ									
bridge_1	n	Mich waʔat hiʔ dalumsaʔ.	This bridge is very long.	Diʔsheʔ ʔaman halumsaʔan hew.	They will build the bridge here.	dalumsaʔ	dalumsaʔan									
bridge_2	n	Mich waʔat' hiʔ hadamhiy'.	This bridge is very long.	Diʔsheʔ ʔaman hadamhiya sipin' wakaayaw.	They will build the bridge over the river.	hadamhiy'	hadamhiya									
bring water or liquid in a bucket	v	Hebeeyit ʔilk'a.	He brought water (in a bucket).	Hebeytaʔ ʔaman ch'itla xoʔow.	They brought the manzanita cider (in a big container) to the house.	hebeeyit	hebeytaʔ									
bring_1	v	ʔadet naʔ bayna.	I brought the acorn.	ʔadeetaʔ Kaʔyuʔ ʔoshto hew.	Coyote brought the fire here.	ʔadet	ʔadeetaʔ									
bring_2	v	Panaamixit taa mokeela ʔam lowto.	That woman brought along her husband.	Panaamixtaʔ ʔam boch'oona denderow.	He brought his son to the store.	panaamixit	panaamixtaʔ									
broom	n	Cheneeshil' widnit xoch'ooyow.	The broom fell on the ground.	Ch'eniishila naʔ beenawshit.	I brushed myself with a broom.	ch'eneeshil'	ch'eneeshila									
brother (older)	n	ʔohom' daʔ hew nebech' nim xon'.	My older brother does not live here.	Yooyon' galjil' ʔam nebeech'i.	He calls his older brother many times.	nebech'	nebeech'i									
brother (younger)	n	ʔaleejat min neʔesh.	Your little brother is acting crazy.	Panaamixtaʔ naʔ nim neʔesha leeleʔhiyaw.	I brought my younger brother to school.	neʔesh	neʔesha									
brother-in-law; sister-in-law	n	Gichgichit min ʔenbay'.	Your brother-in-law is nervous.	ʔulmuk'yat naʔ nim ʔenbaayi.	I dislike my brother-in-law.	ʔenbay'	ʔenbaayi									
brown	adj	Lameesaw ch'oonut' kapew'neʔ.	The brown shells are on the table.	Shawgit kapew'neʔen gahoona.	He bought a brown box.	kapew'neʔ	kapew'neʔen									
bruise	v	Dugmat nim weebin.	My arm bruised.	Dugmataʔ ʔam dadach'.	His foot bruised.	dugmat	dugmataʔ									
bruise by leaning hard on someone; bump	v	Bilyit nim boch'on' nim k'apshali.	My son leaned hard on my shoulder.	Biliytaʔ naʔ min k'owyo.	I bruised your hip.	bilyit	biliytaʔ									
brush	v	Banshit ʔam gamiishaʔan.	He brushed his shirt.	Banishtaʔ naʔ cheexaʔan shilshi.	I brushed the dog's hair.	banshit	banishtaʔ									
bucket; container; pot	n	Taa waldin bemeemat.	That bucket got full.	Heleyit waldina ʔam t'ashnaw p'onooshaw.	He carried the container in his left hand.	waldin	waldina									
buckeye (tree)	n	Dopin' wil' bohloʔ gew.	Buckeye trees used to grow over there.	Halaaxintaʔ naʔ dopina.	I climbed the buckeye tree.	dopin'	dopina									
bull	n	Xoyit nan dooroʔ.	The bull hit me with its horn.	ʔan' t'apelga dooroʔon!	Don't slap the bull!	dooroʔ	dooroʔon									
bull frog	n	ʔugugguʔ hulshaʔxon' sipin' ʔamaa.	Bullfrog is sitting up there.	Potit naʔ ʔugugguʔun.	I caught a bullfrog.	ʔugugguʔ	ʔugugguʔun									
bully (Lit. somebody who is no good)	n	ʔamaʔ mahmaʔach' dalew'hil nan.	That bully tripped me.	Mahmach’i naʔ woshil sheleelan.	I hit the bad guy with a rock.	mahmaʔach'	mahmach'i									
bump	v	Gowit naʔ ʔam ʔochowo.	I bumped his head.	Gowtoʔ mam.	He bumped you.	gowit	gowtoʔ									
bunch	n	Mich galijin tuʔuy huuwas.	There are many bunches of grapes.	Xayaataʔ tuʔya huuwasi xaalayiw.	He put the bunches of grapes in the gathering basket.	tuʔuy	tuʔya									
burn something; scorch something	v	Noonoʔ t'ulut shokooya.	The man burned the grass.	T'ultaʔ ʔaman bobbila.	They burn the paper.	t'ulut	t'ultaʔ									
burn_1	v	Hot'nit ʔoshit.	The fire is burning.			hot'nit	hot'intaʔ									
burn_2	v	K'amnaʔ shokoy' t'ulnut.	The dry grass burned.	Nahniʔ t'uluntaʔ heyeemaʔ.	It might have burnt up long ago.	t'ulnut	t'uluntaʔ									
burp	v	Xatit, miʔin kaʔit.	He ate, then he burped.	Taa noonoʔ kaʔtaʔ xataʔhiyaw.	That man burped at the restaurant.	kaʔit	kaʔtaʔ									
bury	v	Yuk'lut naʔ gahoona xoch'ooyow.	I buried the box in the ground.	Yuk'ulhantaʔ lagyiw.	He was buried yesterday.	yuk'lut	yuk'ultaʔ									
bus	n			Huusheʔ ʔamaʔ ʔesteejiʔin.	He drives a bus.	ʔesteejiʔ	ʔesteejiʔin									
bush; brush, heavy; thicket	n	T'uluntaʔ ch'ayax.	The bush burned down.	Chistaʔ naʔ ch'ayaaxi tishamyataw.	I cut the bush in the spring.	ch'ayax	ch'ayaaxi									
butt	n	Taxeetan' ʔam jootiʔ.	His butt is going to ache.	Nohʔoʔ ʔach'ich'taʔ ʔam jootiʔin.	The bear bit his butt.	jootiʔ	jootiʔin									
butter	n	Xap'eelat baadaʔ. ʔan' potgo!	The butter is hot. Don't touch it!	K'eeleʔ naʔ holoomun baadaʔan baanaw.	I always spread butter on the bread.	baadaʔ	baadaʔan									
butter knife	n	Mich gayis hiʔ k'eelaʔhiy'.	This butter knife is really good.	Tishataʔ ʔamaʔ baadaʔan ʔam yoʔ k'eelaʔhiya.	She took out a butter knife and the butter.	k'eelaʔhiy'	k'eelaʔhiya									
butterfly	n	ʔohyowʔan' naʔ miʔin waalapsuʔun.	I'm going to look for a butterfly.	Hoyintaʔ waalapsuʔ.	The butterfly flew.	waalapsuʔ	waalapsuʔun									
button	n	Hawshin daʔ min wodon'?	How many buttons do you have?	Bok'toʔ ʔaman galjina wodooni lameesaw.	They found many buttons on the table.	wodon'	wodooni									
buy	v	Shawgit naʔ xoʔo.	I bought a house.	Shawigtaʔ hablik'ya won'shi.	She bought a red purse.	shawgit	shawigtaʔ									
buzzard	n	K'aʔatwiyaʔ hoyonʔon'.	The buzzard is flying.	Taʔsheʔ ʔaman k'aʔatwiyaʔan sipin'.	They will see the buzzard above.	k'aʔatwiyaʔ	k'aʔatwiyaʔan									
by oneself	adv	Mayni naʔ yugushtaʔ ʔustuubaʔan.	I cleaned the stove myself.			mayni										
calf	n	Xataʔan' baseenoʔ shokooya.	The calf is eating grass.	Taʔishtaʔ naʔ baseenoʔon ʔooch'iy' gullali.	I saw a calf near the fence.	baseenoʔ	baseenoʔon									
calf (part of leg)	n	Taxeetaxon' nim taxish.	My calf is hurting.	Layit gawaayuʔ nim taxsha.	The horse kicked my calf	taxish	taxsha									
call	v	Yooyot nan nim noʔom.	My mother called me.	Yooyotoʔ dokton' nim naʔata.	The doctor called my older sister.	yooyot	yooyotoʔ									
camp	v	Gambot xiʔ.	He camped over there.	Gambotaʔ ʔaman Yosemitew heyeemaʔ.	They camped at Yosemite long ago.	gambot	gambotaʔ									
campsite; campground	n					gamboʔhiy'	gamboʔhiya									
can; could; may; might	adv	ʔeepal maʔ naʔash?	Can you swim?	ʔaman naʔash gobol taxaati'in.	They may gather sourberries.	naʔash										
canal	n	Mejnit k'oteehat saxis.	The canal is really big.	Deʔeshit ʔaman  saxsi.	They built the canal.	saxis	saxsi									
cane (to aid walking or to dig)	n	Hach'aamiʔ ʔamin ʔaasay'.	His cane is new.	Sasyit naʔ nim ʔaasayi.	I broke my cane.	ʔaasay'	ʔaasayi									
cannot do something; give up	v	Galaabiyit naʔ ʔahaalich’.	I couldn’t breathe. (Note: It does not mean 'I gave up breathing')	Galaabiytaʔ naʔ leheemich’.	I couldn't run (because I hurt myself or because I was told not to).	galaabiyit_2	galaabiytaʔ									
cannot quite do something	v	ʔamaʔ p'ay' shabakyit balaashich'.	That baby can't quite crawl.	Mugshay' ʔam shabaakiytaʔ heweetich'.	Her grandma couldn't quite walk.	shabakyit	shabaakiytaʔ									
canvas	n	Widintaʔ deyendaʔ xoch'ooyow.	The canvas fell on the ground.	Shawigtaʔ naʔ deyendaʔan.	I bought a canvas.	deyendaʔ	deyendaʔan									
cap	n	Siphantaʔ gajuujeʔ.	The cap was torn.	Shawigtaʔ naʔ gajuujeʔen.	I bought a cap.	gajuujeʔ	gajuujeʔen									
car	n	Dach'taʔ ʔotmobil' shidgila.	The car ran over the squirrel.	Naaʔan huushet dik'in goosinaʔich' ʔotmobiila.	We drove behind a slow car.	ʔotmobil	ʔotmobiila									
caress; rub	v	Maalut ʔam p'aaya.	She caressed her child.	Maalutaʔ naʔ ʔam k'eweeta.	I rubbed her back.	maalut	maalutaʔ									
caretaker	n					goyeeʔich'	goyeech'i									
carrot (wild)	n	K'amaanit k'ayash.	The carrots dried up.	Woyʔet naʔ k'ayaashi.	I planted the carrots.	k'ayash	k'ayaashi									
carry a person, on one's back	v	ʔaap'at naʔ p'aaya.	I carried the baby (on my back).			ʔaap'at	ʔaap'ataʔ									
carry a thing, on one's back	v	Mehlit naʔ nim ch'inch'in.	I carried my sandwich on my back.	Mehiltaʔ naʔ xooyi.	I carried the deer on my back.	mehlit	mehiltaʔ									
carry in one's arms	v	Heleeyit naʔ p'aaya.	I carried the baby in my arms.	Heleytaʔ naʔ t'eewisha.	I'm carrying the basket in my arms.	heleeyit	heleytaʔ									
casino	n	K'exmit mondeʔhiy'.	The casino got rich.	Shawigtaʔ mondeʔhiya taa noonoʔ.	That man bought a casino.	mondeʔhiy'	mondeʔhiya									
cast a spell	v	Shuhwat ʔaman.	They cast a spell.	Shuhwataʔ ʔamaʔ moxloʔ mokeela.	The old woman cast a spell.	shuhwat	shuhwataʔ									
cat	n	Xishwit gaaduʔ ʔutuʔun.	The cat scratched the tree.	Yawaltaʔ cheexaʔ gaaduʔun.	The dog chased the cat.	gaaduʔ	gaaduʔun									
catch; grab	v	Gaabot naʔ ʔap'ooma.	I caught the ball.	Gaabotaʔ ʔamaʔ tan bilaasuʔun.	He caught that plate.	gaabot	gaabotaʔ									
caterpillar	n	Balashʔan' huyaʔ t'appashiw.	The catterpillar crawled on the leaf.	Xattaʔ Sandy huyaʔan.	Sandy ate huuya.	huuyaʔ	huuyaʔan									
cave	n	Mich k'otiʔ ʔilip'.	The cave is really big.	Taʔishtaʔ ʔaman ʔilp'a.	They saw the cave.	ʔilip'	ʔilp'a									
cedar	n	Bohloʔ ch'eepin' dullaw.	Cedar trees grow on the mountain.	Chishtaʔ ch'eepina.	He cut the cedar (tree).	ch'eepin'	ch'eepina									
chair	n	Sasyinit hulushhuy'.	The chair broke.	ʔoyʔetaʔ naʔ hulushhuya.	I moved the chair.	hulushhuy'	hulushhuya									
change	v	ʔoy'et naʔ nim gamiishaʔan.	I changed my shirt.	ʔoy'etaʔ ʔam jageedaʔan.	He changed his jacket.	ʔoyʔet	ʔoyʔetaʔ									
charcoal; coal; ember	n	Xap'eelat shaaluʔ.	The coals became hot.	Shaaluʔun naʔ k'elwisheʔ.	I'm going to spread coal on myself.	shaaluʔ	shaaluʔun									
chase	v	Yawaltaʔ gaaduʔ shidgila.	The cat chased the squirrel.	Yawaltaʔ naʔ gaaduʔun.	I chased the cat.	yawaalit	yawaltaʔ									
cheap	adj	Hijmaʔ min loowit.	Your husband is cheap.	Panaamixit lowto hijmaʔan.	She brought her cheap husband.	hijmaʔ	hijmaʔan									
cheek	n	Shidgilin naaway' k'oteehat.	The squirrel's cheek got bigger.	Yawaltaʔ cheexaʔ naawayi.	The dog chased the squirrel.	naaway'	naawayi									
cheese	n	Hiʔ keesuʔ mich jajil'.	This cheese is very sour.	Gay'sineʔ naʔ keesuʔun.	I like cheese.	keesuʔ	keesuʔun									
chest	n	Taxeetaxon' ʔam piʔish.	His chest has been aching.			piʔish	piʔshi									
chew_1	v	Womchit ganaaduʔ shokooya.	The cows chewed grass.	Womichtaʔ saak'ati.	He chewed the gum.	womchit	womichtaʔ									
chew_2	v	Sak'tit ʔamaʔ kandeʔen.	He chewed a candy.	Saak'ittaʔ naʔ shaxaali.	I chewed the sap.	sak'tit	saak'ittaʔ									
chick	n	Boyiidaʔ tishit hoonaw.	The chick came out of the egg.	Nancy' wik'it ch'enbayin boyiidaʔan.	Nancy peeked at the bird's chick.	boyiidaʔ	boyiidaʔan									
chicken	n	P'umoʔ gayiinaʔ gaaduʔun.	The chicken is going to peck the cat.	Yawaltaʔ gaaduʔ gayiinaʔan.	The cat chased the chicken.	gayiinaʔ	gayiinaʔan									
chief	n	Mosow k'eshnit teeyish.	The chief went inside the sweat house.	Dihtaʔ yokuch' teysha.	People followed the chief.	teeyish	teysha									
children	n	Bonoy' ʔamin p'ayeeʔi.	He has two children.	Taʔishtaʔ naʔ ʔamingin p'ayeʔhi.	I saw their children.	p'ayeeʔi	p'ayeʔhi									
chili	n	Mejnit jiiliʔ bohlut.	The chili grew a lot.	Joe bohoolotoʔ jiiliʔin.	Joe grew chili.	jiiliʔ	jiiliʔin									
chin	n	Taxeetaxon' nim ʔujukshul'.	My chin has been hurting.	K'oyok'san' naʔ ʔujukshula.	I scratched my chin.	ʔujukshul'	ʔujukshula									
Chinese	n	Namix nim Jaanemaʔ.	My friend is Chinese.	Taʔishtaʔ ʔaman Jaanemaʔan.	They saw the Chinese person.	Jaanemaʔ	Jaanemaʔan									
chipmunk	n	Halaaxintaʔ t'uyt'uy' k'eemixya.	The chipmunk climbed the white oak.	Yuhut naʔ t'uyt'uya.	I hunted chipmunk.	t'uyt'uy	t'uyt'uya									
chocolate	n	Putmut chokoladeʔ.	The chocolate boiled.	Xayat naʔ chokoladeʔen ʔadlen gayeedaʔan.	I put the chocolate under the cookies.	chokoladeʔ	chokoladeʔen									
choke	v	Shollit ʔam.	He's choking him.	Sholiltaʔ ʔam paʔashch'i.	He choked his attacker.	shollit	sholiltaʔ									
chopper (person who chops)	n	Shawgeʔ laasach' galjina hedeesha.	Choppers buy a lot of woods.	Yattaʔ naʔ lasaach'i.	I talked to the chopper.	lasach'	lasaach'i									
chopping place	n	Mich k'otiʔ lasaʔhiy'.	The chopping place is very big.	Diʔsheʔ ʔaman lasaʔhiya.	They will build a chopping place.	lasaʔhiy'	lasaʔhiya									
church	n	Moxloʔ hiʔ miisaʔhiy'.	This church is old.	K'eeleʔ ʔaman miisaʔhiya.	They are going to paint the church.	miisaʔhiy'	miisaʔhiya									
clap	v	T'apt'apit ʔaman ʔam panaataw.	They clapped when he arrived.	T'apt'aptaʔ ʔaman ʔam panaataw.	They clapped when he arrived.	t'apt'apit	t'apt'aptaʔ									
clean	v	Shek'ewlat taa ʔam shinya.	She cleaned her blanket.	Shek'ewlataʔ gosneenoʔhiya.	He cleaned the kitchen.	shek'ewlat	shek'ewlataʔ									
climb	v	Halaxnit shidgil' ʔutuʔun.	The squirrel climbed the tree.	Halaaxintaʔ dullaw yet' semaaniw.	He climbed the mountain last week.	halaxnit	halaaxintaʔ									
close	v	Sunut ʔam shashaaʔan.	He closed his eyes.	Suntaʔ ʔaman teseech'i.	They close the door.	sunut	suntaʔ									
clothes	n	Moxlit nim haʔeeʔi.	My clothes are getting old.	Yugshut naʔ nim haʔehhi.	I washed my clothes.	haʔeeʔi	haʔehhi									
cloud	n	Meejinʔan' boyeemaxon' som'.	The cloud became really beautiful.	Taʔshit naʔ soomi.	I saw the cloud.	som'	soomi									
clover_1	n	ʔohom' daʔ maalis bohloʔ soopultaw.	Clover does not grow when it's freezing.	Xattaʔ naʔ maalisa.	I ate some clover.	maalis	maalisa									
clover_2 (sour type)	n	Bohloʔ shagmaʔ gew.	Sour clover grow over there.	Wil' xate' shagmaʔan.	She used to eat sour clover.	shagmaʔ	shagmaʔan									
coat	n	ʔohom' daʔ hijmaʔ gayis jageedaʔ.	Good coats are not cheap.	Xayaawushga min jageedaʔan!	Put on your coat!	jageedaʔ	jageedaʔan									
coffee	n	Putmoʔ kapeʔ keewishaw.	The coffee is boiling in the pot.	ʔugnoʔ naaʔan galjina kapeʔen.	We drink a lot of coffee.	kapeʔ	kapeʔen									
cold	adj	ʔustuubaw xap'eelan' xatash bich'ich'.	The cold food will become hot on the stove.	Lameesaw xayat ʔaman bich'ch'i xataashi.	They put the cold food on the table.	bich'ich'	bich'ch'i									
cold	v	Hoshwit dullaw.	It was cold in the mountain.	Hoshewtaʔ dullaw.	It was cold in the mountain.	hoshwit	hoshiwtaʔ									
cold (to become)	v	Hosheewat.	It was getting cold.	Hosheewataʔ nim xoʔow. ʔohmin daʔ xap'iltaʔhiy'.	It was cold in my house. There was no heater.	hosheewat	hosheewataʔ									
collapse	v	Wulnit ʔam xoʔ.	His house collapsed.	ʔamaʔ waʔaʔ bokbokish woolintaʔ.	The deep hole collapsed.	wulnit	woolintaʔ									
comb_1	n	Sasyineʔ miʔin taa beenaʔ.	That comb is going to break soon.	Wanga nan beenaʔan!	Give me a comb!	beenaʔ	beenaʔan									
comb_2	v	Beenat naʔ nim shilshiʔin.	I combed my hair.	Beenataʔ naʔ ʔam shilshi lagyiw.	I combed her hair yesterday.	beenat	beenataʔ									
come	v	Heleenit taxnit maʔ?	Where did you come from?	Miʔin ʔamaʔ taxintaʔ Siksikaʔ.	Then came Stinkbug.	taxnit	taxintaʔ									
come back; return	v	Miʔin yoʔketaʔ ʔamaʔ weelam'.	Then he came back with the light.			yoʔket	yoʔketaʔ									
come out; appear	v	Tishit k'osoy' ʔam shoyxow.	The mouse came out of its hole.	Tishtaʔ ʔaman mosow.	They came out of the sweat house.	tishit	tishtaʔ									
complete; finish	v	Hayk'itit ʔamaʔ ʔam dawhali.	He finished his job.	Hayk'ittaʔ naʔ gosneenoʔich' gayiinaʔan.	I finished cooking the chicken.	hayk'itit	hayk'ittaʔ									
confused_1	v	Dandanyat ʔamaʔ shalik'mi.	He was confused when he woke up.			dandanyat	dandanyataʔ									
confused_2	adj	ʔodibtaʔ ʔalaapaʔ noonoʔ teseech'i.	The confused man open the door.	Taʔishtaʔ naʔ ʔalaapaʔan noonoʔon.	I saw the confused man.	ʔalaapaʔ	ʔalaapaʔan									
cook_1	v	Gosneenot naʔ hoona.	I cooked eggs.	Gosneenotaʔ naʔ limna.	I cooked acorn drink.	gosneenot	gosneenotaʔ									
cook_2; chef	n	Walpeʔ gosneenoʔ xataʔhiyaw.	The cook arrives early at the restaurant.	Meejintaʔ ʔaman ch'awaltaʔ tan gosneenoʔon.	They paid the chef a lot.	gosneenoʔ	gosneenoʔon									
cook_3	v	Hishit baabas.	The potatoes are cooking.	Hishitaʔ baabas.	The potatoes have cooked.	hishit_3	hishitaʔ									
cookie	n	K'amnit gayeedaʔ.	The cookies dried up.	Bayan' xi gayeedaʔan diʔsham'.	He knows how to make cookies.	gayeedaʔ	gayeedaʔan									
cool down	v	Shupyut manaw.	It cooled down outside.	Shupuytaʔ dullaw.	It cooled down at the mountain.	shupyut	shupuytaʔ									
cool down something	v	Shopooyut naʔ hihooloʔon.	I cooled down the beans.			shopooyut	shopooyutaʔ									
copy_1	v	Donnit naʔ mam.	I copied you.			donnit	donintaʔ									
copy_2	v	Shutkuwshat ʔamaʔ min t'eewisha.	She copied your basket.			shutkuwshat	shutkuwshataʔ									
corn	n	Bohlut mayis.	The corn is growing.	Woyʔitaʔ naʔ maayisi hayaalataw.	I planted corn in the summer.	mayis	mayisa/mayisi									
corpse; dead person	n			Bok'toʔ galdiʔ hashwanaʔan.	The police found a dead person.	hashwanaʔ	hashwanaʔan									
cough	v	Hiʔ noonoʔ tixtinich' ʔohooyot.	This sick man coughed.	Meejintaʔ ʔohooyotoʔ.	He coughed a lot.	ʔohooyot	ʔohooyotoʔ 									
count	v	Pich'it naʔ hach'a nim bek'eewaʔan.	I counted my beads right now.	Pich'taʔ Kim p'aaya leeleʔhiyaw.	Kim counted the children at school.	pich'it	pich'taʔ									
cover_1	v	Somit bokbokshi waldinan.	He covered the hole with a bucket.	Somtoʔ bilaasuʔun banyun.	She covered the plate with a rag.	somit	somtoʔ									
cover_2	v	Shoplot naʔ ʔam shoboonon.	I covered her with a blanket.	Shoplotaʔ ʔamaamin shinyan.	He covered them with a sheet.	shoplot	shoplotaʔ									
cow	n	Womichtaʔ ganaaduʔ shokooya.	The cow chewed the grass.	Hoxtit cheexaʔ ganaaduʔun.	The dog barked at the cows.	ganaaduʔ	ganaaduʔun									
cowboy	n	Hulushʔan' wokeelaʔ gullaliw.	The cowboys are sitting on the fence.	Yooyotoʔ ʔam nopop wokeelaʔan.	His father called the cowboy.	wokeelaʔ	wokeelaʔan									
coyote	n	Kaʔyuʔ hadmit peeli.	The coyote crossed the road.	Taʔashʔan' ʔaman kaʔyuʔun.	They are looking at a coyote.	kaʔyuʔ	kaʔyuʔun									
cradle basket, made of white root or redbud	n	Xayathaneʔ gebel' lameesaw.	The cradle basket will be put on the table.	Diʔsheʔ naʔ gebela.	I'm going to make a baby basket.	gebel'	gebela									
cramp	v	Mik'ish nim doxnit.	My neck cramped.	Mik'ish ʔam doxintaʔ.	His neck cramped.	doxnit	doxintaʔ									
crane	n	Taʔashʔan' waaxat' mam.	The crane is watching you.	Taʔishtaʔ naʔ waaxat'i.	I saw the crane.	waaxat'	waaxat'i									
crash	v			Wuk'luntaʔ ʔam ʔotmobil'.	His car crashed.	wuk'lunut	wuk'luntaʔ									
crash something	v			John wuk'ultaʔ ʔotmobiila.	John crashed the car.	wuk'lut	wuk'ultaʔ									
crawl	v	Wixwik' balaashit.	The worm crawled.	Balashtaʔ ʔam p'ay' gaamaw.	Her child crawled on the bed.	balaashit	balashtaʔ									
crazy; funny	v	Boch'on' nim ʔaleejat.	My son is being crazy.	ʔaleejataʔ ʔam loowit manaw.	Her husband was being crazy outside.	ʔaleejat	ʔaleejataʔ									
cricket	n	Shil't'it jul'jul'naʔ ʔooch'iy' nan.	A cricket jumped near me.	Yawaltaʔ gaaduʔ jul'jul'naʔan.	The cat chased the cricket.	jul'jul'naʔ	jul'jul'naʔan									
cross_1	v	Hadmit kaʔyuʔ peeliw.	A coyote crossed the road.	Bafloʔ hadimtaʔ wakaayaw.	The buffaloes crossed the river.	hadmit	hadimtaʔ									
cross_2	n	Lulnaʔxon' galus ʔooch'iy' windaraʔan.	The cross is hanging near the window.	Padleʔ xayaataʔ galuusaʔan lameesaw.	The preacher put the cross on the table.	galus	galuusa									
crow_1	n	Dihit ch'axlal mokeelaʔan.	The crow followed the woman.	Yawaltaʔ p'ay' ch'axlali.	The child chased the crow.	ch'axlal	ch'axlali									
crow_2 (small black bird)	n	Hoyneʔ gagnay' sipin' naanin.	The crows fly above us.	Yawaltaʔ shidgil' gagnayi.	The squirrel chased the small black bird.	gagnay'	gagnayi									
crunch up_1	v	Kach'ayit naʔ k'amnaʔan baabasi.	I crunched up the dried potatoes.	Kach'aytaʔ ʔaman toona.	They crunched up the nuts.	kach'ayit	kach'aytaʔ									
crunch up_2	v	Ch'edat naʔ maalis.	I crunched (or, chewed) up the clover.	Ch'edataʔ ʔamaʔ k'ayaashi.	He chewed up the carrots.	ch'edat	ch'edataʔ									
cry	v	Woshanit ʔamaʔ, miʔin waxlit.	He was hit, then he cried.	Waxiltaʔ ʔam p'ay'.	His child cried.	waxlit	waxiltaʔ									
crybaby	n					waxlilin	waxlilna									
cure	v	Hoyoʔlat dokton' ʔamaamin.	The doctor cured them.	Dokton' hoyoʔlataʔ nan.	The doctor cured me.	hoyoʔlat	hoyoʔlataʔ									
curl	v	Yuxulut ʔam shilshi.	She curled her hair.	Yuxultaʔ min shilshi.	She curled your hair.	yuxulut	yuxultaʔ									
curly one	n	Shilish ʔam yuxayich'.	Her hair is curly.	Yattaʔ naʔ yuxaych'i.	I talked to the curly one.	yuxayich'	yuxaych'i									
curly; drunk (to become)	v	Shilwinit ʔam shilish.	Her hair is curly.	Taa noonoʔ shilwintaʔ.	That man got drunk.	shilwinit	shilwintaʔ									
cut in half	v	Nalt'it naʔ bobbila.	I cut the paper in half.	Nalit'taʔ ʔamaʔ gayeedaʔan.	She cut the cookie in half.	nalt'it	nalit'taʔ									
cut with a saw	v	Saljut naʔ hedeesha.	I cut the wood with a saw.	Salujtaʔ ʔaman k'otiʔin ʔutuʔun.	They have cut the big tree with a saw.	saljut	salujtaʔ									
cut with an axe; chop with an axe	v	Lasit naʔ ʔutuʔun.	I cut the tree with an axe.	Lastaʔ k'amnaʔan hedeesha.	She chopped the dry wood with an axe.	lasit	lastaʔ									
cut with scissors	v	Dihlit naʔ bobbila.	I cut the paper.	Dihiltaʔ ʔamaʔ nim shilshi.	She cut my hair.	dihlit	dihiltaʔ									
cut; slice	v	Chishit naʔ wech'eeta.	I cut the stick.	Chishtaʔ ʔaman ch'eepina.	They cut the cedar.	chishit	chishtaʔ									
dam	n	K'amintaʔ t'inhanaʔ.	The dam dried up.	Taʔshit ʔaman t'inhanaʔan.	They saw the dam.	t'inhanaʔ	t'inhanaʔan									
dam up	v	T'init ʔaman wakaaya sheleelan.	They dammed up the river with rocks.	T'intaʔ tipik wakaaya.	The beaver dammed up the river.	t'init	t'intaʔ									
dance	v	Waʔat' mokeela wodyit.	The tall woman danced.	Woodiytaʔ p'ayeeʔi leeleʔhiyaw.	The children danced at school.	wodyit	woodiytaʔ									
dance in a funeral ceremony	v	ʔahnat min heedin'.	My family danced at the funeral.	ʔahnataʔ ʔalit.	He danced at the funeral a while ago.	ʔahnat	ʔahnataʔ									
dark (to become); black (to become)	v	Limeek'at manaw.	It got dark outside.	T'ulunmi, Siksikaʔ limeek'ataʔ.	When he got burned, Siksika became dark/black.	limeek'at	limeek'ataʔ									
daughter-in-law	n	Heleenit taxnit min ʔonmil'?	Where did her daughter-in-law come from?	Tanmixtaʔ naʔ nim ʔonmila.	I took my daughter-in-law with me. 	ʔonmil'	ʔonmila									
daughter; niece	n	Diʔishtaʔ gach'ab nim t'eewisha.	My daughter made a basket.	Taʔshit naʔ nim gachaaba.	I saw my daughter.	gach'ab	gach'aaba									
day	n	Heweetaʔ naʔ bonyo hayil.	I walked for two days.			hayil										
day after	adv	ʔohyon' naʔ hoona hikaw xuʔnayni.	I'm going to look for eggs the day after tomorrow.	Tantaʔ naʔ lagyiw xuʔnayni.	I left the day before yesterday.	xuʔnayni										
daylight	n	ʔoheemat hay'liʔ.	The daylight disappeared.	Taʔshit naʔ hay'liʔin.	I saw daylight.	hay'liʔ	hay'liʔin									
daylight (to become)	v					tawnit	tawintaʔ									
deaf	adj	Taʔishtaʔ dank'anaʔ kaʔyuʔun.	The deaf person saw the coyote.	ʔamiltaʔ ʔaman dank'anaʔan.	They helped the deaf person.	dank'anaʔ	dank'anaʔan									
deal cards	v					xilit	xil'taʔ									
debt	n	Galjin nim deebewush.	My debt is big.	Ch'awaltaʔ naʔ nim deebewshi.	I paid off my debt.	deebewush	deebewshi									
deepen_1	v	Waʔeelat naʔ bokbokshi.	I made the hole deeper.			waʔeelat	waʔeelataʔ									
deepen_2	v	Waʔeeʔat bokbokish.	The hole got deeper.	Waʔeeʔataʔ t'aʔyiʔ.	The lake got deeper.	waʔeeʔat	waʔeeʔataʔ									
deer	n	Xattaʔ xoy' shokooya woloomiw.	The deer ate grass in the meadow.	Mehleʔ naʔ miʔin xooyi.	I'm going to carry the deer on my back.	xoy'	xooyi									
deergrass	n	Bohloʔ wot'oowit hidyaw.	Deergrass grows everywhere.	Shoogut naʔ wot'oowita.	I pulled out the deergrass.	wot'oowit	wot'oowita									
defecate; poop	v	Bedk'it ʔamaʔ cheexaʔ ʔooch'iy' gullali.	The dog pooped near the fence.	Bedik'taʔ ch'enbay' sheleelaw.	The bird pooped on the rock.	bedk'it	bedik'taʔ									
delicious; taste good	adj	Bech'eech'at shit'iʔ xatash lameesaw.	The delicious food is cooling down on the table.	Gosneenotaʔ shit'iʔin xataashi.	She cooked delicious food.	shit'iʔ	shit'iʔin									
design (e.g. for a basket, tattoo)	n	Mich gayis shepwash ʔam t'eewishaw.	The design on her basket is very good.	Gay'sineʔ taʔan shepwashi weebinaw.	He likes the tattoo on his arm.	shepwash	shepwashi									
diarrhea (to have one)	v	ʔohom' daʔ ʔoyiisat. Ch'ok'yot.	He's not happy. He had diarrhea.	Tanmixtaʔ ʔaman taa noch'oʔ hospitlaw, halaadaʔ ch'ok'yotaʔ.	They took that boy to the hospital, because he had diarrhea.	ch'ok'yot	ch'ok'yotaʔ									
die	v	Widnit, miʔin hashwinit ʔamaa.	He fell, then he died there.	Kaʔyuʔ ʔutuw lat'ayintaʔ, miʔin hashwintaʔ.	Coyote slipped off the tree, then he died.	hashwinit	hashwintaʔ									
different; another	adj	Bok'it hidʔan' p'ay' huuyaʔan.	Another kid found a caterpillar.	Taʔishtaʔ naʔ hidʔani gawaayuʔun.	I saw a different horse.	hidʔan'	hidʔani									
dig	v	Kaʔyuʔ waayit ʔam bokbokshi.	The coyote dug its hole.	Sawaadanaw xuʔnayni naʔ waytaʔ sheedina.	Last Saturday I dug onions.	waayit	waytaʔ									
dining room; restaurant	n	Limeek'an' xataʔhiy'.	The dining room will get darker.	K'eltaʔ ʔaman xataʔhiya.	They painted the dining room.	xataʔhiy'	xataʔhiya									
dinner	n	Shit'eeyat konoʔshen.	The dinner is delicious.	Konoʔshena naʔ gosneenoxon'.	I have been cooking dinner.	konoʔshen	konoʔshena									
dinner (to have one)	v	Konoʔshet naʔ nomeech'ataw.	I was having dinner at seven.	Konoʔshetaʔ naʔ ʔam xoʔow.	I had dinner at her house.	konoʔshet	konoʔshetaʔ									
dip_1 (in gravy)	v			Hontoʔ duldiiyaʔan biniidamiw.	He dipped the tortilla in the gravy.	honut	hontoʔ									
dip_2	v	Lalit naʔ bich'iw ʔilk'aw.	I dipped (myself) in the cold water.			lalit	laltaʔ									
dirt; ground; soil	n	Meejintaʔ xoch'oy' ch'apiytaʔ sheeʔaliw.	The ground was really wet in the rain.	Potgo xoch'ooyo!	Touch the ground!	xoch'oy'	xoch'ooyo									
dirty (to become)	v	Xoch'ooyot nim gamiishaʔ.	My shirt became dirty.	Xoch'ooyotaʔ ʔam sabaaduʔun.	His shoes became dirty.	xoch'ooyot	xoch'ooyotaʔ									
disappear	v	ʔoheemat shidgil'.	The squirrel disappeared.	ʔoheemataʔ nim k'eexaʔ.	My money disappeared.	ʔoheemat	ʔoheemataʔ									
dishwasher	n					bilaasuʔun yogoshuch'										
dislike animate things; hate animate things	v	ʔulmuk'yat naʔ ʔam.	I don't like him.	ʔulmuk'yataʔ ʔamaʔ lopso.	He doesn't like fish.	ʔulmuk'yat	ʔulmuk'yataʔ									
dislike objects; hate objects	v	ʔawaasit naʔ ʔaabula.	I don't like apples.	ʔawastaʔ taa p'ay' baabasi.	That child does not like potatoes.	ʔawaasit	ʔawastaʔ									
dive (for people); swim (for water animals)	v	Beelit dalim' wakaayaw.	The trout swam in the river.	Beltaʔ naʔ wakaayaw.	I dove in the river.	beelit	beltaʔ									
do as fast as one could	v	Mahaach'at naʔ deʔeshich' teewisha.	I made the basket as fast as I could.	Mahaach'ataʔ ʔamaʔ kishaalataʔ gayiinaʔan.	He fried the chicken as fast as he could.	mahaach'at	mahaach'ataʔ									
do not	adv	ʔan' ʔam ch'alewga!	Don't annoy him!			ʔan'										
do something well	v	Gayestat wodooyich'.	She danced well.	Gayestataʔ weet'ich' shinya.	He spread the sheet well.	gayestat	gayestataʔ									
do that way or like that; be like that	v	Taw'net naʔ.	I did it like that.	Taw'netaʔ xattaʔ.	He ate it like that.	taw'net	taw'netaʔ									
do this way or like this; be like this	v	Chismi hoopula hew'net.	He cut the root this way.	ʔohom' naʔ hudaʔan' huyuch' hew'netaʔ.	I don't know whether he did it like this.	hew'net	hew'netaʔ									
do_1	v	Haʔan daʔ maʔ hawit?	What did you do?	Haʔan daʔ taa mokeela hawtaʔ?	What did that woman do?	hawit_1	hawtaʔ									
do_2	v	ʔohom' naʔ ʔet.	I didn't do it.	Mokeela ʔeetaʔ ʔalit.	The woman did it some time ago.	ʔet_1	ʔeetaʔ									
doctor	n	Dokton' hoyoʔlataʔ nan.	The doctor cured me.	Yattaʔ naʔ doktoni.	I talked to the doctor.	dokton'	doktoni									
dog	n	Cheexaʔ yawaltaʔ noonoʔon.	The dog chased the man.	Yawaltaʔ noonoʔ cheexaʔan.	The man chased the dog.	cheexaʔ	cheexaʔan									
doll	n	Widnit p'ayem'saʔ xoch'ooyow.	The doll fell on the ground.	Shawigtaʔ p'ayem'saʔan denderow.	She bought a doll at the store.	p'ayem'saʔ	p'ayem'saʔan									
dollar (only with numbers one through ten)	n	Yet' beesuʔ daʔ hiʔ soodiʔ.	This soda is a dollar.	ʔamaʔ noonoʔ shawigtaʔ ʔam lameesaʔan ch'eyew beesuʔun.	The man bought his table for ten dollars.	beesuʔ	beesuʔun									
donkey	n	Jagach yalgiʔxon' ʔooch'iy' gullali.	The donkey has been standing near the fence.	Taʔashʔan' naʔ jagaachi.	I'm looking at the donkey.	jagach	jagaachi									
doodlebug	n	Wayaʔan' howiinaʔ xoch'ooyo.	The doodlebug is digging the dirt.	Xayat howiinaʔan sheleelaw.	He put the doodlebug on the rock.	howiinaʔ	howiinaʔan									
door; gate	n	ʔodbineʔ miʔin tesech'.	The door will open soon.	Gichag teseech'i!	Lock the door!	tesech'	teseech'i									
doubt	v	Neeyat ʔaman taʔsha ʔamaamin.	They doubted what they saw.	Neeyataʔ naʔ nim lanya.	I doubted what I heard.	neeyat	neeyataʔ									
dove	n	ʔuplalliʔ hatmit.	The mourning dove sings.	Yawaltaʔ gaaduʔ ʔuplalliʔin.	The cat chased the dove.	ʔuplalliʔ	ʔuplalliʔin									
down	adv	Xoʔ nim gew ʔadil'.	My house is down there.			ʔadil'										
drag	v	Xet'at ʔam dadaach'i.	He dragged his foot.	Xet'ataʔ p'ay' ʔam shoboono.	The child dragged the his blanket.	xet'at	xet'ataʔ									
dream	v	ʔanaswot naʔ.	I dreamed.	ʔanaswotaʔ taa p'ay'.	That child dreamed.	ʔanaswot	ʔanaswotaʔ									
dress	n	Shawigtaʔ naʔ naawashi.	I bought a dress.	Shawigtaʔ naʔ naawashi.	I bought dresses.	naawash	naawashi									
drink up	v	Shook'ot leejiʔin.	He drank up the milk.	Shok'toʔ ʔilk'a.	She drank up the water.	shook'ut	shok'toʔ									
drink_1	v	ʔugnut naʔ ʔilk'a.	I drank some water.	ʔuguntaʔ p'ay' ʔam leejiʔin.	The child drank his milk.	ʔugnut	ʔuguntaʔ									
drink_2	n	Bech'eech'at ʔugun.	The drink became cold.	Loxeʔ naʔ ʔugna.	I'm going to pour the drink.	ʔugun	ʔugna									
drip	v	Ch'uych'uyut ʔilik'.	The water dripped.	Ch'uych'uytaʔ ʔilik'.	The water dripped.	ch'uych'uyut	ch'uych'uytaʔ									
drive	v	Huushet naʔ min xoʔow.	I drove to your house.	Huushetaʔ ʔamaʔ dawhaliw noneepataw.	She drove to work at nine o'clock.	huushet	huushetaʔ									
driver	n	Hulushʔan' huusheʔich' ʔotmobiilaw.	The driver is sitting in the car.	Yooyotoʔ taa noonoʔ huusheʔch'i.	That man called the driver.	huusheʔich'	huusheʔch'i									
drool_1	n	Heejil' ʔam gamiishaw.	His drool is on his shirt.	Taxeshga min heejila!	Wipe your drool!	heejil'	heejila									
drool_2	v	Hejlit taa p'ay'.	That child drooled.	Cheexaʔ nim shil't'aʔ yoʔ heejiltaʔ naanaw.	My dog jumped and drooled on me.	hejlit	heejiltaʔ									
drop	v	Lodnit ʔam p'ay'.	Her baby dropped (slid out).			lodnit	loodintaʔ									
drop a load full of things	v	Loodit naʔ nim won'shi.	I dropped my purse (with stuff in it).			loodit	---									
drown	v	K'eenich' hognit.	The ant drowned.	Hoogintaʔ ch'enbay' ʔilkaw.	The bird drowned in the water.	hognit	hoogintaʔ									
drunk (to become)	v	Mejnit ch'ilwit taa noonoʔ.	That man became really drunk.	Ch'iliwtaʔ ʔaman.	They became drunk.	ch'ilwit	ch'iliwtaʔ									
drunk person_1	n	Ch'ilwaʔ taa banan'xon'.	That drunk is laying (there).	Taʔshit naʔ ch'ilwaʔan noonoʔon.	I saw the drunk man.	ch'ilwaʔ	ch'ilwaʔan									
drunk person_2	n	Ch'ilwiwin woʔoytaʔ hulushhuyaw.	The drunk slept on the chair.	Ch'ilwiwna naʔ taʔshit.	I saw the drunk.	ch'ilwiwin	ch'ilwiwna									
dry	adj	T'uluntaʔ k'amnaʔ hedesh.	The dry wood burned.	Lastaʔ k'amnaʔan hedeesha.	He chopped the dry wood.	k'amnaʔ	k'amnaʔan									
dry (to become)	v	K'amnit wakay'.	The river dried up.	K'amintaʔ hedesh.	The wood dried up.	k'amnit	k'amintaʔ									
dry something	v	K'amaanet naʔ bayna.	I dried the acorn.	K'amaanetaʔ ʔam haʔehhi.	He dried his clothes.	k'amaanet	k'amaanetaʔ									
duck	n	Ch'eneetat wat'wat'.	The ducks made loud noises.	Laniytaʔ naʔ wat'wat'i.	I heard the ducks.	wat'wat'	wat'wat'i									
dust	n	Hoyintaʔ shubuk'.	The dust flew.	Taxeshga shubk'a lameesaw!	Wipe the dust on the table!	shubuk'	shubk'a									
dusty (to be)	v	Shubk'ut hulushhuy'.	The chair was dusty.	P'oyuch' meejintaʔ shubuk'taʔ naanin.	The whirlwind made a lot of dust for us.	shubk'ut	shubuk'taʔ									
dye hair	v	T'oyxit naʔ nim shilshi hablik'yan.	I dyed my hair red.	Toyixtaʔ ʔam shilshi limk'an.	She dyed her hair black.	t'oyxit	t'oyixtaʔ									
eagle	n	Hoy'nit wuʔshul' waʔlaw.	The eagle flew in the sky.	Pothil naʔ wuʔshula.	I caught the eagle.	wuʔshul'	wuʔshula									
ear	n	K'uyuuk'at nim tuk'.	My ear itched.	Bogooshit naʔ ʔam tuk'a.	I pierced her ears.	tuk'	tuk'a									
earrings	n	Widintaʔ min liʔwaʔ lameesaw.	Your earrings fell on the table.	ʔoyʔet naʔ nim liʔwaʔan.	I changed my earrings.	liʔwaʔ	liʔwaʔan									
earthworm	n	Balashʔan' k'ew' xoch'ooyow.	The earthworm is crawling on the ground.	Pottoʔ naʔ k'ewa.	I touched the earthworm.	k'ew'	k'ewa									
earwax	n	Julnut ʔam jookul ʔoshtow.	His earwax melted in the fire.	ʔipisga min jookula ʔoshtow!	Throw your earwax in the fire!	jookul	jookula									
east	adv	Miʔin tantaʔ K'aʔyuʔ xoshim.	Then Coyote went east.			xoshim										
eat	v	Haweeshataw daʔ maʔ xatit?	What time did you eat?	Weheeshit xattaʔ teewa.	The mountain lion ate a cottontail rabbit.	xatit	xattaʔ									
eat (with smacking lips)	v	Baaguʔun shapshapnat.	He ate the mushroom (while smacking his lips).	Shapshapnataʔ p'ayeeʔi kandeʔen.	The children smacked their lips while eating candies.	shapshapnat	shapshapnataʔ									
eat greens	v					ch'eedat	ch'eedataʔ									
echo	n					dooniʔ	dooniʔin									
egg	n	Ch'alnit hon'.	The egg hatched.	Gosneenot naʔ hoona.	I cooked eggs.	hon'	hoona									
eight	n	Hiʔ daʔ monosh bilaasuʔ.	Here are eight plates.	Xattaʔ ʔamaʔ monoosha duldiiyaʔan.	He ate eight tortillas.	monosh	monoosha									
eight times	adv	Yooyotoʔ nan mon'shil'.	He called me eight times.			mon'shil'										
ejaculate	n					taxin	taxina									
elderberry	n	Hisheʔ wosheetaʔ sanum.	The elderberries are getting ripe soon.	Xattaʔ ch'enbay' galjina wosheetaʔan.	The bird ate a lot of elderberries.	wosheetaʔ	wosheetaʔan									
elders	n	Yalik'taʔ bahachhay' ʔooch'iy' ʔoshto.	The elders stood by the fire.			bahachhay'	bahachhayi									
embarrass	v	Seyeeset nan.	He embarrassed me.	Seyeesetaʔ ʔam naʔata.	He embarrassed his older sister.	seyeeset	seyeesetaʔ									
embarrassed (to be)	v	Seysit naʔ.	I was embarrassed.	Seyestaʔ naʔ lagyiw xuʔnayni.	I was embarrassed the day before yesterday.	seysit	seyestaʔ									
embarrassing	v	Widintaw nim xoch'ooyow siyiswilit.	Falling on the ground is embarrassing (for me). Lit: My falling on the ground is embarrassing.	Siyiswiltaʔ.	It was embarrassing.	siyiswilit	siyiswiltaʔ									
employee; worker	n	ʔutuytaʔ dawhalich' nan.	The employee pushed me.	Taʔshit boch'on' nim dawhalch'i.	My son saw the employee.	dawhalich'	dawhalch'i									
enter; go inside	v	K'eshnit ʔamaʔ xoʔow.	He entered the house.	K'eeshintaʔ naʔ ʔilp'aw.	I went into the cave.	k'eshnit	k'eeshintaʔ									
even though; anyway	particle	ʔohom' may' hudaʔan' hawitmi hoyil', ch'uyuʔ daʔ t'ulhantaʔ.	We don't know how he was alive, even though he was burned.	Ch'uyuʔ naʔ yoowit.	I went home anyway.	ch'uyuʔ										
evening (in the)_1	adv	Panat ch'oleepataw niʔwaw.	He arrived at six in the evening.	Taaneʔ hoy'noʔ niʔwaw.	The plane will leave in the evening.	niʔwaw										
evening (in the)_2	adv	Saweʔ taʔan ʔaman woyʔehanaʔan neʔewtaw.	They water the plants in the evening.			neʔewtaw										
evening star	n	ʔalʔalk'axon' niʔwin ch'aytash waʔlaw.	The evening star has been shining in the sky.	ʔohom' naʔ taʔishtaʔ niʔwin ch'aytashi.	I didn't see the evening star.	niʔwin ch'aytash	niʔwin ch'aytashi									
expensive	adj			Shawigtaʔ waʔaʔan shoboono.	He bought an expensive blanket.	waʔaʔ	waʔaʔan									
explode; pop	v			Balun t'ogotoʔ.	The balloon popped.	t'ogot	t'ogotoʔ									
eye	n	Shownit ʔam shashaʔ.	His eyes swelled.	Sunga min shashaaʔan!	Close your eyes!	shashaʔ	shashaaʔan									
eyebrow	n	Ch'apeeyataʔ ʔam t'emeeshil'.	His eyebrows became wet.	K'etwishtaʔ naʔ nim t'emeeshila.	I shaved my eyebrows.	t'emeeshil'	t'emeeshila									
eyeglasses	n	Ch'alnit shashiʔnawishhiy'.	The eyeglasses broke.	Shawgeʔ naʔ bonyo shashiʔnawishhiya.	I'm going to buy two pairs of eyeglasses.	shashiʔnawishhiy'	shashiʔnawishhiya									
eyelashes	n	Hiʔ duʔ ʔam limlimich'.	This is her eyelashes.	Taʔishtaʔ naʔ ʔam limlimch'a.	I saw her eyelashes.	limlimich'	limlimch'a									
fall	v	Widnit ʔaman xoch'ooyow.	They fell on the ground.	Widintaʔ naʔ waʔaw bokbokshiw.	I fell in the deep hole.	widnit	widintaʔ									
fall (season)	adv	Goobeʔ naʔ moonixil hosheewataw.	I gather redbud twines in the fall.			hosheewataw										
fall head first	v	Shik'aayuwut miʔin waxlit.	He fell head first, then he cried.	Dal'wintaʔ miʔin shik'aayuwtaʔ.	He tripped and fell head first.	shik'aayuwut	shik'aayuwtaʔ									
family; cousin; relative	n	ʔoyit nim heedin Pelesnow.	My family moved to Fresno.	Taʔishtaʔ naʔ ʔam heedina denderow.	I saw his family in the store.	heedin	heedina									
fan	n	Mich gayis nim shokow'hiy'.	My fan is very good.	Xayan' shokow'hiya ʔooch'iy' windaraʔan.	She puts the fan near the window.	shokow'hiy'	shokow'hiya									
fan	v	Naʔ ʔam shokow'yat.	I fanned her.	ʔamaʔ nan shokow'yataʔ.	She fanned me.	shokow'yat	shokow'yataʔ									
far; deep	adj	Mich ʔamaamin xoʔ waʔ.	Their house is very far.			waʔ	waʔa									
farmer	n	Hulushʔan' woyʔich' gullaliw.	The farmer is sitting on the fence.	Dihtaʔ ʔaman woyʔiich'i.	They followed the farmer.	woyʔich'	woyʔiich'i									
fast	adj	Lihimtaʔ ʔayax weheeshit woloomiw.	The fast mountain lion ran fast in the meadow.	Shawigtaʔ ʔaman ʔay'xa gawaayuʔun.	They bought a fast horse.	ʔayax	ʔay'xa									
fast; quick; right away	adv	Hoy'li lihimga!	Run fast!	Nahniʔ naʔash sheʔeeleʔ hoy'li.	It might rain right away.	hoy'li										
fat	adj	Hishaʔan' k'ayaxit heexaʔ dik'in sheleela.	The fat salmon is hiding behind the rock.	Pottoʔ heexaʔan k'ayaxti.	He caught a fat salmon.	heexaʔ_1	heexaʔan									
fat (to become)	v	Mijnit cheexaʔ nim hexnit.	My dog got really fat.			hexnit	heexintaʔ									
father	n	Nopop nim hoyootoʔ nan Bill.	My father named me Bill.	Goyet ʔam nopoopo.	He took care of his father.	nopop	nopoopo									
father-in-law	n	Panaahil ʔam naxaamish lagyiw.	His father-in-law arrived yesterday.	Yattaʔ ʔamaʔ nim naxaamisha.	She talked to my father-in-law.	naxaamish	naxaamisha									
fatten up	v	Hexeenet naʔ nim cheexaʔan.	I fattened up my dog.			hexeenet	hexeenetaʔ									
feed animals	v	Beelet dal'ma.	She fed the trout.	Beeletaʔ naʔ goosi.	I fed the pigs.	beelet	beeletaʔ									
feed someone (make someone eat)	v	Xatlat min naʔat ʔam p'aaya.	Your older sister fed her baby.	Xatlataʔ naʔ ʔam.	I fed him.	xatlat	xatlataʔ									
feel sorry for someone	v	ʔoyuwxit naʔ ʔam.	I felt sorry for him.	ʔoyuwixtaʔ naaʔan ʔamaamin.	We all felt sorry for them.	ʔoyuwxit	ʔoyuwixtaʔ									
fence	n	K'elhantaʔ ʔam gullal' shik'win.	His fence was painted white.	Taʔishtaʔ naʔ ʔam shik'win gullal'.	I saw his white fence.	gullal'	gullali									
fiddleneck; deertongue	n	Bohloʔ shep'eelaʔ hew.	Fiddleneck grows here.	Shogtoʔ naʔ shep'eelaʔan.	I pulled out the fiddleneck.	shep'eelaʔ	shep'eelaʔan									
fig	n	Hisheʔ ʔiykas miʔin.	The figs are getting ripe soon.	Xataʔan' ʔaman ʔiykasi.	They are eating figs.	ʔiykas	ʔiykasi									
fight_1	v	Paʔchishat p'ayeeʔi leeleʔhiyaw.	The children are fighting at school	Paʔchishataʔ ʔamak'.	They both fought.	paʔchishat	paʔchishataʔ									
fight_2	v			Paʔishtaʔ ʔam.	He fought.	paʔshit	paʔishtaʔ									
fill up	v	Bememlat ʔaman ʔoboyo.	They filled up the redbud basket.	Bememlataʔ naʔ waldina.	I filled up a bucket.	bememlat	bememlataʔ									
find	v	Huyaʔan kaʔyuʔ bok'it.	The coyote found the caterpillar.	Bok'toʔ ʔaman ʔam won'shi.	They found her purse.	bok'it	bok'toʔ									
finger (index)	n	Jugughuy' nim taxeetaxon'.	My index finger is hurting.	ʔach'ich'taʔ cheexaʔ jugughuya nim.	The dog bit my finger.	jugughuy'	jugughuya									
finger (middle finger)	n					toy'new	toynichi									
finger (small)	n					k'oliswaʔ_2	k'oliswaʔan									
finger_1; toe_1	n	Xoch'ooyot nim nimich'.	My fingers got dirty.	Taʔishtaʔ naʔ nim nimch'i.	I looked at my toes.	nimich'	nimch'i									
fingernail	n					p'onooshan xeeshix										
fire	n	K'oteehan' ʔoshit.	The fire is getting bigger.	Saptaʔ ʔaman ʔoshto.	They put out the fire.	ʔoshit	ʔoshto									
fire fighter	n					ʔoshto saapach'	ʔoshto saapach'i									
first	adv					dey'ya										
fish_1	n	Shilit'taʔ lopis nim wakaayaw.	My fish jumped into the river.	Kuyʔulut lopso.	She salted the fish.	lopis	lopso									
fish_2	v	Lopsilit ʔaman wakaayaw.	They went fishing at the river.	Lopsiltaʔ nim heedin t'inhanaw.	My family went fishing at the dam.	lopsilit	lopsiltaʔ									
fisherman	n	Nopop nim daʔ lopsilich' t'inhanaw.	My father is the fisherman at the dam.	Yatit lopsilch'i.	He talked to the fisherman.	lopsilich'	lopsilch'i									
fit	v	Pawit k'osoy' bokbokshiw.	The mouse fit in the hole.	Paw'taʔ naʔ hin gamiishaʔan.	I fit in this shirt.	paw'it	paw'taʔ									
five	n	Shilit'taʔ yitshinil' lopis lameesaw.	Five fish jumped onto the table.	Hashlataʔ ʔaman yitshinla lopso.	They grilled five fish.	yitshinil	yitshinla									
five times	adv	ʔipsintaʔ maʔ yitshil'.	You were lost five times.			yitshil'										
fix; repair; make; build	v	Diʔshit ʔaman t'eewisha.	They made a basket.	Diʔishtaʔ taa noonoʔ woshok'o.	That man made belts.	diʔshit	diʔishtaʔ									
flame	n	K'oteehataʔ hot'noʔ.	The flame got bigger.	Saptaʔ hot'noʔon.	He put out the flame.	hot'noʔ	hot'noʔon									
flat	v	Tapaapat nim galeedaʔan tayaʔ.	My wagon's tire is flat.	Tapaapataʔ baanaʔ.	The bread was flat.	tapaapat	tapaapataʔ									
flatten	v	Tapaplat naʔ baanaʔan.	I flattened the bread.			tapaplat	tapaplataʔ									
flea	n	Balashnit p'aak'il ʔam dadaach'i.	The flea crawled up his foot.	Somtoʔ ʔamaʔ banyun p'aak'ila.	He covered the flea with a rag.	p'aak'il	p'aak'ila									
flip over something	v	Ch'adbit naʔ nim p'onoosha.	I flipped over my hand.	Ch'adibtaʔ ʔam hoona.	She flipped over her egg.	ch'adbit	ch'adibtaʔ									
flour	n	Papiytaʔ haliinaʔ lameesaw.	The flour scattered on the table.	Goyut naʔ haliinaʔan, baanaʔan naʔ miʔin diʔsheʔ.	I mixed the flour; then I'm going to make bread.	haliinaʔ	haliinaʔan									
flow	v	Hulnut ʔilik' biibaw.	The water flowed in the pipe.	Huluntaʔ ʔilik' biibaw.	The water flowed in the pipe.	hulnut	huluntaʔ									
flower	n	ʔelwit galjin ʔeelaw'.	Many flowers bloomed.	Bayanag galjina ʔeelawi!	Pick many flowers!	ʔeelaw'	ʔeelawi									
fly_1	v	Hoy'nit k'oliswaʔ ch'enbay'.	The small bird flew away just now.	Lagyiw k'oliswaʔ ch'enbay' hoyinhil.	Yesterday, the small bird flew.	hoy'nit	hoyintaʔ									
fly_2	n	Hoyintaʔ k'amaasiʔ weelaw.	The fly flew to the light.	K'amaasiʔin naʔ wosit sabaadun.	I hit the fly with a shoe.	k'amaasiʔ	k'amaasiʔin									
foam	v	Jobbit ʔilik'.	The water foamed.	Jobobtoʔ ʔilik'.	The water foamed.	jobbit	jobobtoʔ									
fog	n	Soomoʔ k'uʔmal' ʔutuʔun.	The fog covers the trees.	Pushoʔ jawwan shokwoʔ k'uʔmali.	The strong wind blows the fog.	k'uʔmal'	k'uʔmali									
foggy (to become)	v	K'uʔmalit.	It was foggy.	K'uʔmaltaʔ toy'ninaw.	It was foggy in the morning.	k'uʔmalit	k'uʔmaltaʔ									
food	n	Hiʔ xatash xap'il.	This food is hot.	Xayaataʔ xataashi bilaasuw.	He put the food on the plate.	xatash	xataashi									
fool; trick	v	Mollit taa p'ay' ʔam naʔata.	That child fooled her older sister.	Moliltaʔ Kaʔyuʔ Tawaanisha.	Coyote tricked Morning Star.	mollit	moliltaʔ									
foot	n	Taxeetaxon' nim dadach'.	My feet have been aching.	Taʔashʔan' naʔ nim dadaach'i.	I'm looking at my feet.	dadach'	dadaach'i									
forehead	n	K'uyuuk'at nim pich'iw'.	My forehead was itchy.	K'uyuk'sat ʔam pich'iwa.	He itched his forehead.	pich'iw'	pich'iwa									
forget	v	Malwinit naʔ nim yaaweʔen.	I forgot my keys.	Malwintaʔ p'ayeeʔi sabaaduʔun ʔamaamin.	The kids forgot their shoes.	malwinit	malwintaʔ									
fork	n	Sasyintaʔ k'ashaʔhiy'.	The fork broke.	Sasiytaʔ naʔ k'ashaʔhiya.	I broke the fork.	k'ashaʔhiy'	k'ashaʔhiya									
four	n	Hiʔ daʔ hadbanay' bilaasuʔ.	Here are four plates.	Wanga nan hadbanya ʔaabula!	Give me four apples!	hadbanay	hadbanya									
four times	adv	Laytaʔ nan gawaayuʔ hadbil'.	The horse kicked me four times.			hadbil'										
fox	n	Kayamwushit ʔaw'jaʔ.	The fox yawned.	Yawaalit gaaduʔ ʔaw'jaʔan.	The cat chased a fox.	ʔaw'jaʔ	ʔaw'jaʔan									
freeze	v	ʔilik' soplit.	The water froze.	ʔilik' sopiltaʔ.	The water froze.	soplit	sopiltaʔ									
Friday	adv	ʔohom' naʔ dawhaleʔ Yat'eeshanaw.	I don't work on Fridays.			Yat'eeshanaw										
friend_1	n	Hiʔ daʔ nim kapash.	This is my friend.	ʔantaʔ naʔ nim kapaashi.	I leaned on my friend.	kapash	kapaashi									
friend_2; playmate	n	Jelettaʔ Kate ʔamaʔ yoʔ ʔam namix xataʔhiyaw.	Kate and her friend had lunch at the restaurant.	Walxot naʔ nim namxa.	I passed by my friend.	namix	namxa									
friendly	adj	ʔamiltaʔ ʔamaamin homuk' noonoʔ.	The friendly man helped them.	Taʔshit naʔ homook'a mokeelaʔan.	I saw the friendly woman.	homuk'	homook'a									
friendly (to be)	v	Mejnit homeek'at lopsiʔich'.	The fisherman was very friendly.	ʔohom' daʔ homeek'ataʔ.	She was not friendly.	homeek'at	homeek'ataʔ									
frog	n	Shilit'taʔ wadakshay' shokooyaw.	The frog jumped onto the grass.			wadakshay'	wadakshayi									
front (in front of)	adv	Cheexaʔ woʔoyʔan' deeyaw xoʔo.	The dog is sleeping in front of the house.			deeyaw										
frost; ice; ice cream	n	Ch'aapaʔan' soopul' miʔin.	The frost is melting soon.	ʔalittaʔ cheexaʔ soopuli.	The dog licked the ice.	soopul'	soopuli									
fry	v	Kishaalat naʔ gayiinaʔan.	I fried the chicken.	Kishaalataʔ ʔamaʔ gayiinaʔan xapliw heexaw.	He fried the chicken in hot oil.	kishaalat	kishaalataʔ									
full_3 (to become full and cannot eat anymore)	v	Balk'it naʔ.	I was full and can't eat anymore.	Balik'taʔ ʔaman.	They were full and couldn't eat anymore.	balk'it	balik'taʔ									
full_1	adj	Widnit bemmal' xaaluʔ xoch'ooyow.	The full bowl fell on the ground.	Xayaataʔ ʔaman bemmali xaaluʔun lameesaw.	They put the full bowl on the table.	bemmal'	bemmali									
full_2 (to become)	v	Bemeemat xoʔ.	The house was getting full.	Taa waasuʔ bemeemataʔ.	That glass was full.	bemeemat	bemeemataʔ									
funny (to be one)	n	Lihim'an' ʔaljanaʔ p'ay'.	The funny child is running.	Taʔishtaʔ naʔ p'aaya ʔaljanaʔan.	I saw the funny child.	ʔaljanaʔ	ʔaljanaʔan									
funny; crazy	adj	Lihimtaʔ ʔaleejaʔ noonoʔ.	The crazy man ran.	Taʔshit naʔ ʔaleejaʔan noonoʔon.	I saw the crazy man.	ʔaleejaʔ	ʔaleejaʔan									
gamble	v	Mondet naʔ nim k'eexaʔan.	I gambled my money.	Mondetaʔ naʔ nim k'eexaʔan.	I gambled my money.	mondet	mondetaʔ									
game (using bones or straw)	n					wexlewash	---									
garden	n	Boyeemat ʔam woyʔen.	Her garden is beautiful.	Saw'taʔ woyʔena.	He watered the garden.	woyʔen	woyʔena									
gather something_1; collect, pick, harvest	v	Yoloowit naʔ bayna.	I gathered up some acorns.	Yolowtaʔ naʔ t'appashi.	I gathered up the leaves.	yoloowit	yolowtaʔ									
gather something_2; collect, pick, harvest	v	Labayit ʔaman maamila.	They gathered blackberries.	Labaytaʔ naʔ galiideʔen.	I gathered watercress.	labayit	labaytaʔ									
gather_1	v	Chipneʔ yolownit.	The spirits gathered.	Yoloowintaʔ ʔaman ʔam tishaʔtaw.	They gathered at his birthday.	yolownit	yoloowintaʔ									
gather_2; celebrate at a party	v	Low'nishat ʔaman ʔam tishaʔtaw.	They gathered at his birthday.	Low'niwshataʔ ʔaman Tishamyuw.	They gathered at Spring time.	low'niwshat	low'niwshataʔ									
Gee!	exclamation					Hiyahawu!										
get	v	ʔet naʔ xaaluʔun.	I got the bowl.	ʔohom' naʔ ʔeetaʔ sheedina.	I didn't get the wild onions.	ʔet_2	ʔeetaʔ									
get knocked down	v	Wulhanit gullal'.	The fence was knocked down.	ʔutuʔ wulhantaʔ.	The tree was knocked down.	wulhanit	wulhantaʔ									
get off	v	Yet' simiiyaʔ lak'wunut ʔilk'aw.	One seed fell in the water.	Lak'wuntaʔ naʔ sheleelaw.	I got off the rock.	lak'wunut	lak'wuntaʔ									
get out of the way_1; move over_1	v	ʔishet naʔ.	I moved out of the way.	ʔishetaʔ, miʔin widintaʔ.	He moved out of the way and fell.	ʔishet	ʔishetaʔ									
get out of the way_2; move over_2	v	ʔoyit naʔ hidʔaniw lameesaw.	I moved to a different table.	ʔoytoʔ naaʔak'.	We both moved over.	ʔoyit	ʔoytoʔ									
get something; pick up	v	Maaxit ʔamaʔ noch'oʔ ʔap'ooma.	The boy got a ball.	Maxtaʔ naʔ nim yaaweʔen.	I picked up my keys.	maaxit	maxtaʔ									
get up	v	ʔopootit taa p'ay'.	That child just got up.	ʔopottoʔ naʔ nomeech'ataw.	I got up at seven.	ʔopootit	ʔopottoʔ									
get up fast	v	Gaamaw ʔam wotset.	He got up fast from his bed.	Holoshtaʔ, miʔin wotsetaʔ.	He sat down, then he got up fast.	wotset	wotsetaʔ									
get used to	v	Dushut naʔ hewetch'i.	I got used to walking.	Dushtoʔ naʔ gaaduʔun.	I got used to the cat.	dushut	dushtoʔ									
ghost	n	Panat ʔunuʔ hoy'li.	The ghost left quickly.	Taʔishtaʔ naʔ ʔunuʔun manaw.	I saw the ghost outside.	ʔunuʔ	ʔunuʔun									
giant	n	Dolk'ok'noʔ yunshut miʔin holook'ut k'otiʔin k'eemixya.	The giant shook and pulled out the big white oak tree.	Sawtaʔ Kaʔyuʔ Dolk'ok'noʔon.	Coyote shouted at Giant.	dolk'ok'noʔ	dolk'ok'noʔon									
girdle	n					hech'ey'hiy'	hech'ey'hiya									
girl_1	n					mokeedaʔ	mokeedaʔan									
girl_2	n	Shipaʔan' taa mokeet'aʔ shipaʔhiyan.	The girl is writing with a pencil.	Taʔishtaʔ naʔ mokeet'aʔan.	I saw the girl.	mokeet'aʔ	mokeet'aʔan									
give up; cannot do something	v	Galaabiyit naʔ.	I gave up.	Galaabiytaʔ cheexaʔ yawaalich' gaaduʔun.	The dog gave up chasing the cat.	galaabiyit_1	galaabiytaʔ									
give_1	v	Wanit nan bonyo ʔaabula.	She gave me two apples.	John wantaʔ p'aaya hedeeshan.	John gave the child some wood.	wanit	wantaʔ									
give_2	v	Wok'yit naʔ mam k'eexaʔan.	I gave you some money.	Wok'iytaʔ nan k'eexaʔan.	She gave me some money.	wok'yit	wok'iytaʔ									
glass (to drink from)	n	Taa waasuʔ bemeemat.	That glass was full.	Yugushtaʔ galjina waasuʔun.	He washed many glasses.	waasuʔ	waasuʔun									
gloves	n	Bonoy' p'onshuwshaʔhiy' t'apt'apnat teseech'iw.	Two gloves knocked at the door.	Taʔishtaʔ naʔ bonyo p'onshuwshaʔhiya lameesaw.	I saw two gloves on the table.	p'onshuwshaʔhiy'	p'onshuwshaʔhiya									
go ahead; go first; lead	v	Sandyʔ deyit gosneenot.	Sandy went ahead to cook.	Deytaʔ may'.	We went ahead (before anyone else).	deyit	deytaʔ									
go around; circle around; surround	v	P'ayeeʔi gidwiyat nan.	The children surrounded me.	Gidwiyataʔ naʔ ʔoshto.	I went around the fire.	gidwiyat	gidwiyataʔ									
go down (for water)	v	Mulnut' ʔilik' ʔadil' dullaw.	The water went down  the hill.	Muluntaʔ naʔ dullaw.	I rolled down the mountain.	mulnut	muluntaʔ									
go home	v	Kate yoowit toy'ninaw.	Kate went home in the morning.	Yowtoʔ naʔ.	I went home.	yoowit	yowtoʔ									
go next to	v	Nonit ʔamaʔ ʔam.	He went next to her.	Hoshiwmi, non'toʔ naʔ ʔam.	When I got cold, I went next to her.	nonit	non'toʔ									
go with somebody; accompany	v	Dihit naʔ ʔamaamin.	I went with them.	Dihtaʔ naʔ nim nopoopo.	I went with my father.	dihit	dihtaʔ									
goat	n	Xatit jiiwuʔ gayeedaʔan.	The goat ate cookies.	Xet'amewen' noonoʔ jiiwuʔun.	A man is dragging a goat.	jiiwuʔ	jiiwuʔun									
God (Lit. our above)	n					Sipin' mayin										
gold	n	Papiytaʔ galjin ʔooroʔ wakaayaw.	A lot of gold scattered in the river.	Wanga nan ʔooroʔon!	Give me some gold!	ʔooroʔ	ʔooroʔon									
good	adj	Mich gayis ʔaalitin kandeʔ.	Saltgrass candy is very good.	Himichga gay'si ʔoshto!	Make good fire!	gayis	gay'si									
good (to become)	v	ʔohom' daʔ ʔam dadach' gayeesat.	His foot did not get better.	Gayeesataʔ ʔam boch'on'.	His son got better.	gayeesat	gayeesataʔ									
good-looking	adj	Yatit gaaʔich'aʔ nan.	The good-looking one talked to me.	Yatit naʔ gaaʔich'aʔan.	I talked to the good-looking one.	gaaʔich'aʔ	gaaʔich'aʔan									
good-looking (for men)	adj	Mich nooch'oʔ ʔamaʔ noonoʔ.	That man is very good-looking.	Taʔishtaʔ naʔ nooch'oʔon noonoʔon.	I saw the good-looking man.	nooch'oʔ_2	nooch'oʔon									
goose	n	Hoy'nit laʔlaʔ waʔlaw.	The goose flew by in the sky.	Taʔishtaʔ naʔ laʔlaʔan belaach'i wakaayaw.	I saw the goose diving in the river.	laʔlaʔ	laʔlaʔan									
goose bumps (to have those)	v	Maʔ hach'aach'at.	You got goose bumps.	Hosheewataʔ. Hach'aach'ataʔ ʔaman.	It was cold. They had goose bumps.	hach'aach'at	hach'aach'ataʔ									
gooseberry	n	K'ashit nan sumsux.	The gooseberry (thorn) poked me.	Xatit ʔamaʔ galjina sumsuxa.	He ate a lot of gooseberries.	sumsux	sumsuxa									
gopher	n	ʔamaʔ saamil lihimtaʔ.	The gopher ran.	Yawaltaʔ cheexaʔ saamila.	The dog chased the gopher.	saamil	saamila									
grandfather	n	Panan' 'en'shay' miʔin.	Grandfather will arrive soon.	Gewtaʔ maʔ ʔen'shayi nim.	You have met my grandfather.	ʔen'shay'	ʔen'shayi									
grandmother	n	Mugshay' ʔamaʔ yoʔ ʔen'shay' yatwishʔan'.	Grandma and grandpa are talking to each other.	Yooyon' ʔam mugshayi.	She's going to call her grandma.	mugshay'	mugshayi									
grandson (diminutive); granddaughter (diminutive)	n	Waxalʔan' ʔam napshay'.	His grandson is crying.	K'epeenit mokeela ʔam napshayi.	The woman put her grandson on her lap.	napshay'	napshayi									
grandson; granddaughter	n					napash	napsha									
grape	n	Hisheʔ miʔin huuwas.	The grapes are going to be ripe soon.	Meejintaʔ gobtoʔ huuwasi.	He picked a lot of grapes.	huuwas	huuwasi									
grass	n	K'amnit ʔutuʔ ʔamaʔ yoʔ shokoy'.	The trees and grass dried up.	T'ulut shokooya.	He burned the grass.	shokoy	shokooya									
grasshopper	n	Shil't'eʔ miʔin ch'aaniwish lameesaw.	The grasshopper will soon jump onto the table.	Ch'aaniwsha naʔ dach'taʔ.	I stepped on the grasshopper.	ch'aaniwish	ch'aaniwsha									
gravy	n			Diʔishtaʔ naʔ biniidami.	I made gravy.	biniidam	biniidami									
green (to become)	v	Ch'iʔwik'yat t'appash.	The leaves turned green.	Ch'iwik'yataʔ ʔilik' t'inhanaw.	The water in the dam turned green.	ch'iʔwik'yat	ch'iʔwik'yataʔ									
green; blue	n	Jalawneʔ holoomun taa ch'enbay' ch'iwik'ay'.	That green bird always makes loud noises.	Shawgeʔ ʔamak' ʔotmobiila ch'iwik'ya.	They both are going to buy a green car.	ch'iwik'ay'	ch'iwik'ya									
greet	v	Homnit nan.	She greeted me.	Homintaʔ ʔam noʔoomo.	She greeted her mother.	homnit	homintaʔ									
grey	adj	Lip'aʔxon' humk'uk'un gaaduʔ ch'enbayi.	The grey cat has been watching the bird.	Hoxtit cheexaʔ gaaduʔun humk'uk'na.	The dog barked at the grey cat.	humk'uk'un	humk'uk'na									
grey (for hair)	n	Puʔxanaʔ shilish ʔam mich waʔat'.	Her grey hair is very long.	Chishtaʔ ʔam waʔaat'i puʔxanaʔan shilshi.	She cut her long grey hair.	puʔxanaʔ	puʔxanaʔan									
grey (to become, for hair)	v	Puʔxat ʔam shilish.	His hair turned grey.	Min shilish meejintaʔ puʔxataʔ.	Your hair turned really grey.	puʔxat	puʔxataʔ									
grey hair	n	Puʔxaʔ ʔam naʔash hew taʔishhanal.	Her grey hair can be seen from here.	ʔohom' gay'sineʔ ʔam puʔxaʔan.	He doesn't like his grey hair.	puʔxaʔ	puʔxaʔan									
grey-haired one	n	Taa mokeela puʔxaʔich' shilsham'.	She's the grey-haired woman.			puʔxaʔich'										
grill (for cooking tortillas)	n	Xap'eelat mejnit gumal'.	The grill got really hot.	Xitxittaʔ gumaali.	He scrubbed the grill.	gumal'	gumaali									
grind; pound	v	Poyit bimyindeʔen.	He crushed the black pepper.	Poytoʔ naʔ simiiyaʔan sheleelaw.	I ground the seeds on the rock.	poyit	poytoʔ									
grope	v	Baʔot naʔ limeek'ataw.	I groped around when it's the dark.	Baʔotaʔ ʔamaʔ limk'iw woʔoyhuyaw.	She groped around in the dark bedroom.	baʔot	baʔotaʔ									
grow	v	Mayish bohlut.	The corn grew.	Boohultaʔ ch'awik' hew.	Poison oak grew here.	bohlut	boohultaʔ									
grow long	v	Waʔatlat nim shilshi.	I grew my hair long.			waʔatlat	waʔatlataʔ									
grow something	v	Bohoolot naʔ ʔeelawi.	I grew flowers.	Bohoolotoʔ ʔaman sandiiyaʔan.	They grew watermelons.	bohoolot	bohoolotoʔ									
grow up	v	Nooneʔat taa nooch'oʔ.	That boy is growing up.	Meejintaʔ nooneʔataʔ Ted.	Ted really grew up.	nooneʔat	nooneʔataʔ									
growl_1	v	Hujut cheexaʔ.	The dog growled.	Nohʔoʔ hujtaʔ.	The bear growled.	hujut	hujtaʔ									
growl_2	v	K'oʔomwulat nim balik'.	My stomach just growled.	K'oʔomwulataʔ ʔam balik'.	His stomach growled.	k'oʔomwulat	k'oʔomwulataʔ									
guard; herder	n	Heweeteʔ deyeelich' miʔin.	The guard will walk soon.	ʔohom' daʔ ʔaman taʔishtaʔ deyelch'i.	They did not see the guard.	deyeelich'	deyelch'i									
gum (from milkweed)	n	Shit'eeyat saak'at.	Gum tastes good.	Xayat saak'ati shamaw ʔam.	He put the gum in his mouth.	saak'at	saak'ati									
gun	n	Lulnaʔxon' nok'on' laabuw.	The gun is hanging on the nail.	Lultaʔ nok'oono ʔooch'iy' teseech'i.	He hung the gun near the door.	nok'on'	nok'oono									
gut_1	v	Badaalit naʔ lopso.	I gutted the fish.	Badal'taʔ naʔ lopso.	I gutted the fish.	badaalit	badal'taʔ									
gut_2	n	Xayathantaʔ lopsin dosh lameesaw.	The gut of the fish was put on the table.	Yugushtaʔ dosho.	He washed the gut.	dosh	dosho									
hail	n	Mich k'otiʔ xowis.	The hail is very big.	Taʔshit naʔ xowso xoch'ooyow.	I saw hail on the ground.	xowis	xowso									
hair	n	Dameek'ataʔ ʔam shilish.	Her hair smelled sweet.	Heddaʔ beenaxon' ʔam shilshi.	She is still combing her hair.	shilish	shilshi									
hairy	adj	Mich taa shilshiin.	That person is really hairy.			shilshiin										
hammer	n	Sasyintaʔ nim hamaʔ hijmaʔ.	My cheap hammer broke.	Shawighil naʔ hach'aamiʔin hamaʔan lagyiw.	Yesterday I bought a new hammer.	hamaʔ	hamaʔan									
hand	n	P'onosh nim hoshwit.	My hands are cold.	Wimga min p'onoosha!	Wave your hand!	p'onosh	p'onoosha									
handle (Lit. Something to hold with)	n	Sasyintaʔ saluujaʔan potoʔhiy'.	The handle of the saw broke.	Yugshoʔ naʔ miʔin keweshin potoʔhiya.	I will soon wash the handle of the pot.	potoʔhiy'	potoʔhiya									
hang_1	v	Loolut naʔ dooroʔon xoyooshi teseech'iw.	I hung the bull's horns on the door.	Loltaʔ naʔ boʔsha.	I hung the meat.	loolut	loltaʔ									
hang_2; put something up and away	v	Lalkit naʔ bilaasuʔun.	I put away the plates.	Laliktaʔ banyuʔun manaw.	He hung the rag outside.	lalkit	laliktaʔ									
happy (to become)	v	ʔoyiisat naʔ ʔam panaataw.	I was happy when he arrived.	ʔoyiisataʔ ʔaman.	They were happy.	ʔoyiisat	ʔoyiisataʔ									
hard; strong	adj	ʔohom' daʔ sasyeʔ hiʔ jawwan shelel'.	This hard rock will not break.	Hantaʔ ʔamaʔ jawwani sheleela.	He kicked the hard rock.	jawwan	jawwani									
harden something	v	Jaweewalat hoona.	He made the egg hard.			jaweewalat	jaweewalataʔ									
harden; strong (to become)	v	Jaweewat baanaʔ.	The bread became hard.	Jaweewataʔ taa noch'oʔ.	That boy became strong.	jaweewat	jaweewataʔ									
hat	n	Mich k'otiʔ ʔam somleelaʔ.	Her hat is very big.	Xayawshit ʔam somleelaʔan.	He put on his hat.	somleelaʔ	somleelaʔan									
hatchet	n	Sasyintaʔ ʔam lasiidaʔ.	His hatched broke.	Sasiytaʔ naʔ ʔam lasiidaʔan.	I broke her hatchet.	lasiidaʔ	lasiidaʔan									
hate people; dislike people	v	Bajxinit naʔ ʔam.	I hated him.	Bajxintaʔ ʔaman nan.	They hated me.	bajxinit	bajxintaʔ									
have sex	v					shitit	shittaʔ									
hawk (red-tailed)	n	Hoyonʔon' buʔ sipin'.	The hawk is flying above.	Dihtaʔ naʔ buʔa.	I followed the hawk.	buʔ	buʔa									
hawk; chicken hawk	n	Hoyintaʔ diwdiw' sipin'.	The hawk flew above.	Yawaltaʔ k'otiʔ ch'enbay' diwdiwa.	A big bird chased the hawk.	diwdiw	diwdiwa									
head	n	Bogoogot ʔam ʔoch'ow' shoyxow.	Its head came out of the hole.	Gowit naʔ ʔam ʔoch'owo.	I bumped his head.	ʔoch'ow'	ʔoch'owo									
headache (to have one)	v	Hapt'is ʔamaʔ jinjinit.	He had a little bit of headache.	ʔohom' daʔ jinjintaʔ. 	He didn't have a headache.	jinjinit	jinjintaʔ									
heal	v	Cheexaʔan k'ut' hoylit.	The dog's tail healed up.	Hooyiltaʔ weebin ʔam.	His arm healed up.	hoylit	hooyiltaʔ									
hear; listen	v	Lanyit naʔ naʔata nim yataach'i.	I heard my older sister talking.	Laniytaʔ ʔaman jawwani shokwo.	They heard the strong wind.	lanyit	laniytaʔ									
heart	n	Taxeetat ʔam honhon'.	His heart is aching.			honhon'	honhoni									
heater	n					xap'iltaʔhiy'	xap'iltaʔhiya									
heavy	adj	Shobon' mich migich'.	The blanket is heavy.	Shawigtaʔ naʔ migch'i shoboono.	I bought heavy blankets.	migich'	migch'i									
help	v	ʔamlit ʔam noʔoomo.	He helped his mother.	ʔamilhil naʔ nim lowto.	I helped my husband.	ʔamlit	ʔamiltaʔ									
helper	n	Mich gayis ʔamaalich' maʔ.	You are a very good helper.	Yooyot naʔ ʔamalch'i.	I called helper.	ʔamaalich'	ʔamalch'i									
hemorrhoids	n	Loot'iʔ ʔam meejinʔan' k'uyuuk'axon'.	His hemorrhoids really itches.	Dokton' hoyoʔlataʔ ʔam loot'iʔin.	The doctor healed his hemorrhoids.	loot'iʔ	loot'iʔin									
her_1; him; it	pron	Gewtaʔ naʔ ʔam.	I met her.	Jack ʔutyut ʔam.	Jack pushed him.	ʔam										
her_2; his; its	pron	Mich' k'otiʔ ʔam xoʔ.	Her house is very big.	Hoxittaʔ ʔamin cheexaʔ.	His dog barked.	ʔam/ʔamin										
here	adv	Xayan' naʔ miʔin hew bilaasuʔun.	I'm going to put the plate down here.			hew										
hiccup	v	Sak'eeyat taa mokeet'aʔ.	That girl is hiccuping.	Sak'eeyataʔ p'ayeeʔi.	The children hiccupped.	sak'eeyat	sak'eeyataʔ									
hide	v	Hishnit taa noonoʔ.	That man hid.	Hishintaʔ ʔow'.	The turtle hid.	hishnit	hishintaʔ									
hide something	v	Hishit nim boch'on' gusali.	My son hid a spoon.	Hishtaʔ noonoʔ ʔam k'eexaʔan.	The man hid his money.	hishit_1	hishtaʔ									
hill; mountain	n	Dulul' t'uluntaʔ.	The hill got burned.	Dushoʔ ʔaman miʔin dulla.	They will get used to the mountain soon.	dulul'	dulla									
hit; beat_1	v	Wosit nim boshoona.	She hit my knee.	Cheexaʔ wostoʔ nan k'ut'an ʔam.	The dog hit me with its tail.	wosit	wostoʔ									
hold; catch; grab; touch	v	Potit naʔ p'aaya.	I held the baby.	Pottoʔ lameedaʔan. ʔeema widintaʔ.	He caught the bottle. It almost fell.	potit	pottoʔ									
hole (general)	n	Mich k'otiʔ bokbokish ʔodbinit.	A very big hole opened up.	Diʔishtaʔ naʔ bokbokshi sheleelaw.	I made a hole in the rock.	bokbokish	bokbokshi									
hole (made by animals)	n					shoyix	shoyxo									
hole in the rock	n					k'olwosh	---									
hole in the rock for pounding acorn	n	Bemeemataʔ denel' ʔilk'an.	The holes filled up with water.	Taʔishtaʔ naʔ galjina deneela.	I saw many holes (on the acorn pounding rock).	denel'	deneela									
honey	n	Keweshaw duwich' yunuuk'at.	The honey in the pot was warming up.	K'eelit naʔ duwich'a baanaw.	I spread honey on the bread.	duwich'	duwich'a									
horn (of animal)	n	Jawwan dooroʔon xoyosh.	The bull's horns are hard.	Loolut naʔ dooroʔon xoyooshi teseech'iw.	I hung the bull's horns on the door.	xoyosh	xoyooshi									
horned toad 	n	Holoshʔan' sopopoʔ sheleelaw.	The horned toad is sitting on the rock.	Taʔishtaʔ naʔ sopopoʔon.	I saw the horn-toad.	sopopoʔ	sopopoʔon									
horse	n	Gawaayuʔ nim hanhanʔan'.	My horses are kicking around.	Shawigtaʔ ʔaman galjina gawaayuʔun.	They bought many horses.	gawaayuʔ	gawaayuʔun									
horse (young)	n	Xatit bodniiyaʔ shokooya.	The young horse ate grass.	Beeletaʔ naaʔan bodniiyaʔan.	We all fed the young horse.	bodniiyaʔ	bodniiyaʔan									
hospital	n	Mich hospital k'otiʔ.	The hospital is really big.	Diʔishtaʔ ʔaman hew hospitla.	They built a hospital here.	hospital	hospitla									
hot	adj	Hiʔ xatash xap'il.	This food is hot.	ʔan' potgo xap'li hashlaʔhiya!	Don't touch a hot roaster!	xap'il	xap'li									
hot (to become)	v	Xap'eelat.	It was getting hot.	Xap'eelataʔ naʔ.	I felt hot.	xap'eelat	xap'eelataʔ									
house	n	Xoʔ nim ʔooch'iy'.	My house is nearby.	Walxon' may' ʔam xoʔo.	We are passing his house.	xoʔ	xoʔo									
house (round, for ceremony)	n	Mich k'otiʔ washaamaʔ.	The round house is very big.			washaamaʔ	---									
house (traditional)	n	Shaamish dullaw.	The traditional house is up in the mountain.	Diʔishtaʔ ʔaman shaamishi heyeemaʔ ʔalit.	They built the traditional house a long time ago.	shaamish	shaamishi									
house builder	n					xoʔo diʔsham'										
how many	adv	Hawshin daʔ min boch'on'?	How many sons do you have? (Lit: How many are your sons?)			hawshin										
how_1	wh	Hawt'it daʔ ʔamaʔ deʔeshich' teewisha?	How did she make the basket?	Hawit'taʔ daʔ ʔamaʔ ʔodeebich' teseech'i?	How did he open the door?	hawt'it	hawit'taʔ									
how_2	adv	Hawitmi daʔ maʔ chisheʔ hedeesha?	How do you cut the wood?			hawitmi										
howl	v	Kaʔyuʔ waʔoolot.	A coyote is howling.	Meejintaʔ waʔoolotoʔ nim cheexaʔ.	My dog howled a lot.	waʔoolot	waʔoolotoʔ									
hug	v	Gomooch'it ch'eexaʔan.	She hugged the dog.	Gomoch'taʔ noʔom nim hidyaʔan.	My mother hugged everybody.	gomooch'it	gomoch'taʔ									
hummingbird	n	Hoyonʔon' deemaysuʔ ʔooch'iy' ʔutuʔun.	The hummingbird is flying near the tree.	Taʔishmaʔshaxon' deemaysuʔun.	He wants to see a hummingbird.	deemay'suʔ	deemay'suʔun									
hundred	n	bonoy' pich	two hundred	shoopin pich	three hundred	pich	---									
hungry	adj	Mich gadyaʔ weheeshit xattaʔ teewa.	The very hungry mountain lion ate a rabbit.	Taʔishtaʔ ʔaman ch'axlali gadyaʔan.	They saw the hungry crow.	gadyaʔ	gadyaʔan									
hungry (to be)	v	Weheeshit gadaayit.	The mountain lion was hungry.	Meejintaʔ gadaytaʔ naaʔan.	We were very hungry.	gadaayit	gadaytaʔ									
hurry	v	ʔay'xat naʔ.	I just hurried.	ʔay'xataʔ ʔaman xatach'.	They hurried to eat.	ʔay'xat	ʔay'xataʔ									
husband	n	Loowit ʔam badal'taʔ lopso.	Her husband gutted a fish.	ʔamilhil naʔ nim lowto lagyiw.	I helped my husband yesterday.	loowit	lowto									
I	pron	Taʔishhil naʔ ʔamaamin.	I saw them.	Taʔishhil ʔaman nan.	They saw me.	naʔ	nan									
in possession of something that can be carried		Hidwam' Kaʔyuʔ ʔam t'oyoosha.	Coyote had his bow and arrows.	Hidwam' ʔam p'aaya.	He is with his child.	hidwam'										
inchworm	n	Taa duʔ honok'honok'.	That's an inchworm, y'know.	Taʔshit taa p'ay' honok'honook'a.	That child saw an inchworm.	honok'honok'	honok'honook'a									
indeed, do (expression of insistence, obligatory)	adv	ʔadeg ʔugdaʔ haliinaʔan gustaliw!	Do bring the flour in a sack!	Dihga ʔugdaʔ nan!	Do follow me!	ʔugdaʔ										
Indian paintbrush	n	Bohloʔ hodhodiʔ hidyaw.	Indian paintbrush grows everywhere.			hodhodiʔ	---									
infant	n	Chibnaʔ p'as.	The infant is skinny.	Xatlat ʔamaʔ p'aasa.	He fed the infant.	p'as	p'aasa									
infected	v			K'eewishtaʔ ʔam boshon'.	His knee was infected.	k'ewshit	k'eewishtaʔ									
inside	adv	Nim nohʔoʔ hiniʔ k'eeshiw xoʔow.	My bear is inside the house.			k'eeshiw										
iron	v	T'aalit naʔ nim gamiishaʔan.	I just ironed my shirt.	T'altaʔ ʔamaʔ ch'apya bobbila.	She ironed the wet paper.	t'aalit	t'altaʔ									
itch	v	K'uyuuk'at nim tuk'.	My ear itched.	Nim ʔoch'ow' k'uyuuk'ataʔ.	My head itched.	k'uyuuk'at_1	k'uyuuk'ataʔ									
jackrabbit	n	Shilit'taʔ xomix.	The jackrabbit jumped.	Yawaalit kaʔyuʔ xomxi.	The coyote chased the jackrabbit.	xomix	xomxi									
Japanese	n	Mokiy' ʔam Jaapaniʔ.	His wife is Japanese.			Jaapaniʔ	Jaapaniʔin									
jerk away	v	Wank'it ʔam yaaweʔen.	He jerked away her keys.	Wanik'taʔ noonoʔon gamiishaʔan.	He jerked away the man's shirt.	wank'it	wanik'taʔ									
job; work	n	Haʔ daʔ ʔam dawhal'?	What does she do? (Lit: What is his/her work?)	Gay'sineʔ ʔam dawhali.	He likes his job.	dawhal'	dawhali									
jump	v	Shil't'it ʔilk'aw.	He just jumped in the water.	Shilit'taʔ taa nooch'oʔ sheleelaw, miʔin widintaʔ.	That boy jumped onto the rock, then he fell.	shil't'it	shilit'taʔ									
just	adv	Huʔnay naʔ miʔin lihmeʔ.	I'm just going to run.			huʔnay										
keep doing something; continue doing something	v	Wilch'init sawit taa p'ay'.	That child kept screaming.	Kim wilch'intaʔ lihimtaʔ.	Kim continued running.	wilch'init	wilch'intaʔ									
key	n	Lulnaʔxon' yaaweʔ dik'in teseech'i.	The key has been hanging behind the door.	Wanga nan yaaweʔen!	Give me the key!	yaaweʔ	yaaweʔen									
kick (for big four-legged animals)	v	Layit gawaayuʔ cheexaʔan.	The horse kicked the dog.	Laytaʔ gawaayuʔ nan.	The horse kicked me.	layit	laytaʔ									
kick (general)	v	Hanit ʔap'ooma.	He kicked the ball.	Han'taʔ taa p'ay' gaaduʔun.	The child kicked the cat.	hanit	han'taʔ									
kill	v	Hashaʔwet naʔ k'oolapiʔin.	I just killed the mosquito.	Hashaʔwetaʔ xooyi.	He killed the deer.	hashaʔwet	hashaʔwetaʔ									
king snake	n	Golangiʔ beyech'nit.	The king snake coiled.	Beyeech'it naʔ golangiʔin.	I coiled the king snake.	golangiʔ	golangiʔin									
kiss	v	P'ay' shumut Nancy'in.	The child kissed Nancy.	Shum'taʔ ʔam mokyi.	He kissed his wife.	shumut	shum'taʔ									
kitchen	n	Xoch'ooyot ʔam gosneenoʔhiy'.	His kitchen was dirty.	Ch'enishtaʔ ʔam gosneenoʔhiya.	He swept his kitchen.	gosneenoʔhiy'	gosneenoʔhiya									
knead	v	Booyut naʔ haliinaʔan.	I kneaded the flour.	Boytoʔ haliinaʔan.	She kneaded the flour.	booyut	boytoʔ									
knee	n	K'uyuuk'at boshon' nim.	My knees were itchy.	Gowit naʔ nim boshoono	I bumped my knee.	boshon'	boshoono									
kneel down	v	Nuhk'ut miisaʔhiyaw.	He knelt down at the church.	Nuhuk'taʔ naʔ ʔooch'iy' gaamaʔan.	I knelt down by the bed.	nuhk'ut	nuhuk'taʔ									
knife	n	Mich hijmaʔ hiʔ nok'ochoʔ.	This knife is very cheap.	Mokeela xanich'tataʔ nok'ochoʔon.	The woman sharpened the knife.	nok'ochoʔ	nok'ochoʔon									
knife (pocket knife)	n	Widintaʔ ʔam nawaahaʔ xoch'ooyow.	His knife fell on the ground.	Shawigtaʔ naʔ bonyo nawaahaʔan.	I bought two pocket knives.	nawaahaʔ	nawaahaʔan									
knock down	v	Wolit tashik' ʔutuʔun.	Those two knocked down a tree.	Woltoʔ naʔ ʔam xoʔo.	I knocked down his house.	wolit	woltoʔ									
knock_1	v	K'ok'owit naʔ ʔam teseech'i.	I knocked at his door.	K'owk'owtaʔ ʔamaʔ min windaraʔan shopyil'.	She knocked at your window three times.	k'owk'owit	k'owk'owtaʔ									
knock_2	v	T'alt'alnat naʔ ʔam teseech'i.	I knocked at his door.			t'alt'alnat	t'alt'alnataʔ									
knock_3; tap	v	Guʔguunat teseech'i.	He knocked the door.	Guʔguunataʔ p'ay' windaraʔan.	The child knocked at the window.	guʔguunat	guʔguunataʔ									
know	v	Hudit naʔ mam.	I know you.	Hudtaʔ naʔ hatma.	I knew how to sing.	hudit	hudtaʔ									
know well how to do something; good at doing something	adj	Taa noonoʔ mich bayan' hatma.	That man is good at singing.			bayan'										
ladle	n	Xoch'ooyotoʔ weeleʔhiy'.	The ladle got dirty.	Xayaataʔ weeleʔhiya keewishaw.	He put the ladle in the pot.	weeleʔhiy'	weeleʔhiya									
lake	n	Mich lisanyuʔ t'aʔyiʔ.	The lake is really blue.	Bok'it Nancyʔ t'aʔyiʔin.	Nancy found the lake.	t'aʔyiʔ	t'aʔyiʔin									
late (to be)_1	v	Haylit taa noonoʔ.	That man was late.	Hayiltaʔ ʔaman.	They were late.	haylit	hayiltaʔ									
late (to be)_2	v	ʔayat maʔ.	You were late.	ʔayataʔ naʔ.	I was late.	ʔayat	ʔayataʔ									
later	adv	Mokeela wishi ch'amaaxeʔ baabasi.	She will mash a potato later.			wishi										
laugh at; smile at	v	Hayshitit Kim ʔam p'aaya.	Kim smiled at her child.	Nim noʔom hayshittaʔ ʔam.	My mother smiled at him.	hayshitit	hayshittaʔ									
laugh out loud	v	Haheelat dawhalich'.	The workers are laughing out loud.	Haheelataʔ taa mokeela yatmi.	That woman laughed out loud while talking.	haheelat	haheelataʔ									
laugh; smile	v	Haayit taa noonoʔ nim panaataw.	That man laughed when I arrived.	Haytaʔ mokeela.	The woman laughed.	haayit	haytaʔ									
lawyer	n	Hewettaʔ ʔepeesich' ʔam ʔotmobiilaw.	The lawyer walked to this car.	Yattaʔ naaʔan namoogun ʔepesch'i.	We talked to our lawyer.	ʔepeesich'	ʔepesch'i									
lay down	v	Banaanat cheexaʔ nim gaamaw.	The dog laid down on my bed.	Banaanataʔ gaaduʔ nim jageedaw.	The cat laid down on my jacket.	banaanat	banaanataʔ									
lay down someone/something_1	v			Miʔin ʔamaʔ noonoʔ banan'lataʔ ʔam ʔooch'iy' Tawaanishaw.	Then the man laid him down close to the Morning Star.	banan'lat	banan'lataʔ									
lay down someone/something_2	v					banaanalat	banaanalataʔ									
lazy one	n	Liwgana ʔaman.	They are the lazy ones.	Taʔishtaʔ naʔ liwganaʔan.	I saw the lazy one.	liwganaʔ	liwganaʔan									
lead (by holding someone's hand/arm)	v	Dubut naʔ ʔam xoʔow.	I lead her to the house.	Dubtaʔ ʔam noʔoomo.	He lead his mother.	dubut	dubtaʔ									
leaf	n	Galjin t'appash xoch'ooyow.	There are a lot of leaves on the ground.	Seepeʔ naʔ miʔin t'appashi.	I'm going to tear the leaf soon.	t'appash	t'appashi									
lean on something	v	ʔanit naʔ ʔutuw.	I leaned on a tree.	ʔan'taʔ naʔ ʔamaw.	I leaned on her.	ʔan'it	ʔan'taʔ									
leach (e.g. get rid of tannins in acorns)	v					loxshitit	loxshittaʔ									
learn how to do something	v	Bayeenat boch'on' nim ʔotmobiila huusheʔich'.	My son learned to drive a car.	Bayeenataʔ naʔ hedeesha chishach'.	I learned to cut wood.	bayeenat	bayeenataʔ									
leather	n	Woshok' nim chaplaʔ.	My belt is (made of) leather.	Shawgeʔ woodaʔan chaplaʔan.	He will buy leather boots.	chaplaʔ	chaplaʔan									
leave behind	v	Loolot naʔ won'shi leleeʔhiyaw.	I left my purse at school.	Loolotoʔ naaʔan ʔotmobiila ʔadlen ʔutuʔun.	We left the car under a tree.	loolot	loolotoʔ									
leave; go	v	Taanit min ʔoomiʔ denderow.	My mom just left to the store.	Tantaʔ nohʔoʔ hujmu.	The bear left while growling.	taanit	tantaʔ									
left (direction)	adj	Hiʔ nim t'asnaw p'onosh.	This is my left hand.			t'asnaw										
let	v	K'eeshiw naʔ ʔam huyʔat xoʔow.	I let him go inside the house.	Huyʔataʔ naʔ ʔam.	I let him be.	huyʔat	huy'ataʔ									
liar_1	n	K'eshintaʔ ʔamaʔ shutguy' denderow.	The liar entered the store.	Taʔshit naʔ shutkuya.	I saw the liar.	shutguy'	shutguya									
liar_2	n	K'eshintaʔ ʔamaʔ shutguyun denderow.	The liar entered the store.	Taʔshit naʔ shutkuyna.	I saw the liar.	shutguyun'	shutguyna									
lice (head lice)	n	Hoynoʔ patis ʔam shilshiw.	Head lice will fly to his hair.	Bok'toʔ ʔaman shoopina patsi.	They found three head lice.	patis	patsi									
lick	v	ʔaltit kandeʔen.	He licked the candy just now.	ʔalittaʔ taa noch'oʔ ʔam bilaasuʔun.	That boy licked his plate.	ʔaltit	ʔalittaʔ									
lid; cover	n	Xap'eelan' miʔin somoʔhiy'.	The lid will be hot soon.	Halaʔleg somoʔhiya!	Lift the lid!	somoʔhiy'	somoʔhiya									
lie down	v	Moynit naʔ, miʔin geweewat naʔ.	I was tired, then I lied down.	Geweewataʔ cheexaʔ nim gaamaw.	The dog lied down on my bed.	geweewat	geweewataʔ									
lie on one's back	v	Dagaagat p'ayeeʔi shokooyaw.	The children were on their back on the grass.	Dagaagataʔ ʔow'. ʔohom' gayis.	The turtle was on its back. That's not good.	dagaagat	dagaagataʔ									
lift	v	Halaʔlet taa noonoʔ gahoona.	That man lifted the box.	Halaʔletaʔ naʔ t'eewisha.	I lifted the basket.	halaʔlet	halaʔletaʔ									
light	n	Weelaʔ meejinʔan' ʔalʔalk'axon'.	The light is bright.	Weelaʔan p'ishga!	Turn on the light!	weelaʔ	weelaʔan									
light (in weight)	adj	Cheexaʔ nim sabik'.	My dog is light.	Taʔishtaʔ naʔ sabk'i cheexaʔan.	I saw the light dog.	sabik'	sabk'i									
light-colored	adj	Cheexaʔ nim ʔalk'anaʔ.	My dog is light-colored.	Taʔishtaʔ naʔ cheexaʔan ʔalk'anaʔan.	I saw the light-colored dog.	ʔalk'anaʔ	ʔalk'anaʔan									
lighten	v	Mijnit ʔalak'nit.	It got really light.			ʔalak'nit	ʔalak'intaʔ									
lightning	n	T'ultaʔ wal'maʔ shawaʔan.	Lightning burned the black oak.	Taʔishtaʔ naʔ wal'maʔan.	I saw the lightning	wal'maʔ	wal'maʔan									
like_1	v	Gay'sinit jiiliʔin.	He liked chili.	Gay'sintaʔ ʔam dawhal.	He liked his job.	gay'sinit	gay'sintaʔ									
like_2; as if	adv	ʔamaʔ neyeh gaaduʔ yawaalich' saamila.	He's like a cat going after a gopher.			neyeh										
limp_1	adj	ʔamaʔ t'ayax.	He limps.			t'ayax										
limp_2	v	T'ay'xinit ʔamaʔ widinmi.	He limped after he fell.	T'ay'xintaʔ ʔamaʔ dal'winmi wakaayaw.	He limped after he tripped in the river.	t'ay'xinit	t'ay'xintaʔ									
lip	n	Dugmat ʔam yebeech'il'.	His lips are bruised up.	ʔalt'it ʔam yebeech'ila.	She licked her lips.	yebeech'il'	yebeech'ila									
listen to different noises	v	Lanaanat ʔaman manaw.	They were listening to noises outside.	ʔowoowataʔ yoʔ lanaanataʔ.	He sat up and listened to noises.	lanaanat	lanaanataʔ									
little (a little); little (a little bit)	adv	Waʔlaʔ hapt'is soomit.	The sky is a little bit cloudy.			hapt'is										
oak (live oak)	n	Bohloʔ galjin ch'axish hew.	Many live oaks will grow here.	Lasmaʔshotoʔ ʔaman ch'axsha.	They wanted to chop down the live oak.	ch'axish	ch'axsha									
liver	n	Xayathantaʔ dip bilaasuw.	The liver was put on the plate.	Taʔishhil naʔ ganaaduʔun dipa.	I saw the cow's liver.	dip	dipa									
lizard	n	Taʔishhil nan teesaʔhiʔ.	The lizard watched me.	Teesaʔhiʔin naʔ pottoʔ.	I touched a lizard.	teesaʔhiʔ	teesaʔhiʔin									
lizard (big kind)	n	Holoshʔan' honch'oʔ sheleelaw.	The big lizard is sitting on the rock.	Potit ʔamaʔ tan honch'oʔon.	He caught that big lizard.	honch'oʔ	honch'oʔon									
loan; lend	v	Lushut taa mokeela nan galjina k'eexaʔan.	That woman is loaning me a lot of money.	Lushtaʔ naʔ ʔam k'eexaʔan.	I loaned him money.	lushut	lushtaʔ									
lock	v	Gichat naʔ teseech'i.	I locked the door.	Gichataʔ hidyaʔan windaraʔan.	She locked all the windows.	gichat	gichataʔ									
long ago	adv	Bewintaʔ Dan gamiishaʔan heyeemaʔ.	Dan sewed a shirt a long time ago.			heyeemaʔ										
look back	v	ʔeek'at naʔ ʔam.	I looked back at him.			ʔeek'at	ʔeek'ataʔ									
look for; search	v	ʔohyoowit p'ayeeʔi hoona.	The kids are looking for eggs.	ʔohyowtoʔ ʔamak' hijmaʔan ʔotmobiila.	They both looked for a cheap car.	ʔohyoowit	ʔohyowtoʔ									
look at; see	v	Taʔshit naʔ ʔuplalliʔin.	I just saw a pigeon.	Taʔishtaʔ naʔ mam ʔalit.	I saw you a while ago.	taʔshit	taʔishtaʔ									
lost (to be)	v	Gaaduʔ ʔipsinit.	The cat got lost.	Jageedaʔ ʔipsintaʔ.	The jacket was lost.	ʔipsinit	ʔipsintaʔ									
loud_1	adj	Mich wemyas danix.	The thunder is very loud.	Laniyhil naaʔan danxi wemyasi.	We heard the loud thunder.	danix	danxi									
loud_2; noisy	adj	K'eshnit ʔamak' ch'int'i nooch'oʔ denderow.	The two loud boys went in the store.	Lanyit naʔ ch'int'i yataach'i denderow.	I heard the loud talkers in the store.	ch'init'	ch'int'i									
loud_3	adj	Piwan' ʔam huch.	Its growl is loud.			piwan'	---									
lunch	n	Bech'eech'at ʔam ch'inch'in'.	His lunch became cold.	Xattaʔ ʔam ch'inch'ina.	He ate his lunch.	ch'inch'in	ch'inch'ina									
lunch (to have one)	v	Jelet hidyaʔ xataʔhiyaw.	Everybody is having lunch at the dining room.	Jeleetaʔ hitwash nan.	She had lunch with me.	jelet_1	jeleetaʔ									
lungs	n	Mich jawwan ʔam sumux.	His lungs are very strong.	Sumxu maʔ xatit.	You ate the lungs.	sumux	sumxu									
make fire	v	Himchit ʔoshtoʔ, miʔin hashlat gayiinaʔan.	He just built a fire, then he grilled the chicken.	Sox himichtaʔ ʔoshto.	Skunk made fire.	himchit	himichtaʔ									
make loud noises	v	Jalawnit p'ayeeʔi leleeʔhiyaw.	The children made loud noises at school.	Jalawintaʔ shokwoʔ.	The wind made a loud noise.	jalawnit	jalawintaʔ									
man (plural)	n	Noneeʔi taanit.	The men left.	Taʔishtaʔ noneʔhi.	He saw the men.	noneeʔi	noneʔhi									
man (singular)	n	ʔipsinxon' taa noonoʔ.	That man is lost.	Jogoogot naʔ ʔam noonoʔon.	I pointed at the man.	noonoʔ	noonoʔon									
many times	adv	Pothil naʔ ʔap'ooma galjil'.	I caught the ball many times.			galjil'										
many; a lot of	adv	ʔelwit galjin ʔeelaw'.	Many flowers are blooming.	Naʔ naʔash maaxal galjina ʔaabula.	I can get a lot of apples.	galjin	galjina									
manzanita cider	n	Bech'eechan' ch'itil.	The manzanita cider will get cold.	ʔuguntaʔ taa noonoʔ galjina ch'itla.	The man drank a lot of manzanita cider.	ch'itil	ch'itla									
manzanita plant	n	Mich galjin ʔapsuʔ hew.	There are many manzanita plants here.	Chishtaʔ ʔaman ʔapsuʔun.	They cut manzanita plants.	ʔapsuʔ	ʔapsuʔun									
marry_1 (get a husband)	v	Lowitnat ʔamaʔ nim noxooxi.	She married my uncle.	Lowitnataʔ ʔam.	She married him.	lowitnat	lowitnataʔ									
marry_2 (get a wife)	v	Mokyit ʔamaʔ nim naʔata.	He married my older sister.	Mokyataʔ ʔam.	He married her.	mokyit	mokyataʔ									
mash	v	Ch'amaaxit naʔ deenaʔan.	I mashed the wild potatoes.	Ch'amaxtaʔ k'uyk'u.	She mashed the fruits.	ch'amaaxit	ch'amaxtaʔ									
mass (to go to)	v	Miisat ʔaman Dominkanaw.	They went to church on Monday.	Miisataʔ ʔalit.	He went to church some time ago.	miisat	miisataʔ									
matches	n	Hot'intaʔ maajis.	The matches burned.	Puushut naʔ maajisa.	I blew the matches.	maajis	maajisa									
maybe_1	adv	Nahniʔ naʔash naʔ k'eshnal xoʔow.	Maybe I could go inside the house.	Nahniʔ naʔ naʔash gosneenol gayiinaʔan.	I could cook the chicken.	nahniʔ_1										
maybe_2	adv	ʔahmuch hew naʔ yalk'eʔ.	Maybe I'll stand here.			ʔahmuch										
maybe_3	adv	ʔohom' ʔaxam' sheeʔeleʔ.	Maybe it's not going to rain.			ʔaxam'										
me	pron	Nancyʔ diʔishshittaʔ nan t'eewish.	Nancy made a basket for me.			nan										
meadow	n	T'ulunʔan' wolom'.	The meadow is burning.	Taʔshit naʔ woloomi.	I saw the meadow.	wolom'	woloomi									
mean	adj	Dishyin ʔamaʔ.	He is mean.	Taʔishtaʔ naʔ dishyina nooch'oʔon.	I saw the mean boy.	dishyin	dishyina									
measure	v	Keelat wech'eeta.	She measured the stick.	Keelataʔ naʔ min weebina.	I measured (the length of) your arm.	keelat	keelataʔ									
meat	n	Ch'ik'neʔ miʔin boʔush.	The meat is going to rot soon.	Kewshit naʔ boʔsha.	I boiled the meat.	boʔush	boʔsha									
medicine	n	T'oyux mich k'iyit.	The medicine is very bitter.	ʔugunga hin t'oyxo!	Drink this medicine!	t'oyux	t'oyxo									
medicine man; spirit doctor	n	ʔamaʔ chipneʔ hoʔkeshishtaʔ naanin.	The medicine man prayed for us.	Yattaʔ naaʔan chipneʔen.	We talked to the medicine man.	chipneʔ	chipneʔen									
meet	v	Geewit naaʔak' hidyaʔan hew.	We both met everybody here.	Gewtaʔ naʔ ʔam xataʔhiyaw.	I met him at the restaurant.	geewit	gewtaʔ									
meeting place/room	n	Limeek'at geewaʔhiy'. P'ishga weelaʔan!	The meeting room is dark. Turn on the light!	Boyeemataʔ ʔaman geewaʔhiya.	They decorated the meeting room.	geewaʔhiy'	geewaʔhiya									
melt something_1	v	Ch'aapit ʔop soopuli.	The sun melted the ice.	Ch'aptaʔ ʔoshit soopuli.	The fire melted the ice.	ch'aapit	ch'aptaʔ									
melt something_2	v	Julut naʔ heexaʔan.	I melted the oil.	Jultaʔ naʔ badaaʔan.	I melted the butter.	julut	jultaʔ									
melt_1	v	ʔeeniʔ ch'apnit.	The snow melted.	Ch'aapintaʔ soopul'.	The ice melted.	ch'apnit	ch'aapintaʔ									
melt_2	v	Julnut heexaʔ.	The oil is melting.	Juluntaʔ kandeliʔ, miʔin limeek'ataʔ.	The candle melted, then it was dark.	julnut	juluntaʔ									
Mexican/Hispanic	n	ʔamiltaʔ naanin ʔoyeʔay'.	The Mexican helped us.	ʔamiltaʔ naaʔan ʔoyeʔayi.	We helped the Mexican.	ʔoyeʔay'	ʔoyeʔayi									
midday; midnight	n					jelet_2										
middle	adv	Holoshtaʔ toynew.	He sat in the middle.			toynew										
milk	n	Leejiʔ jajeelataʔ.	The milk soured.	Shok'ot leejiʔin.	He drank up the milk.	leejiʔ	leejiʔin									
milk (cow, goat)	v	Ch'eemit naʔ ganaaduʔun.	I milked the cow.	Ch'emtaʔ jiiwuʔun manaw.	I milked the goat outside.	ch'eemit	ch'emtaʔ									
mill	n	ʔohom' daʔ galjin moliinaʔ hew.	There are not many mills here.			moliinaʔ	moliinaʔan									
millipede	n	Wuk'yut meejinmi goosinmi ʔitwayuʔ.	The millipede moved very slowly.	Xatit ch'enbay' ʔitwayuʔun.	A bird ate a millipede.	ʔitwayuʔ	ʔitwayuʔun									
mischievous one	n	ʔamaʔ' ch'ixichxay' p'ay' haheelataʔ.	The mischievous kid laughed out loud.	Ch'ixichxayi noch'oʔon naʔ taʔshit.	I saw the mischievous boy.	ch'ixichxay'	ch'ixichxayi									
miss someone or something	v	ʔohminit naʔ nim boch'oono.	I missed my son.	ʔohmintaʔ naʔ nim ʔaamuʔun.	I missed my boss (He/She was supposed to be there but he/she was not).	ʔohminit	ʔohmintaʔ									
miss something	v	Wolooyat naʔ ʔap'ooma.	I missed (catching) the ball.	Wolooyataʔ shidgil' weewila.	The squirrel missed the branch.	wolooyat	wolooyataʔ									
Miwok (or Southerner)	n	Tantaʔ Xoshoomoʔ mosow.	The Miwoks went to the sweathouse.	Taʔishhil naaʔan Xoshoomoʔon ʔamaa.	We saw the Miwoks there.	Xoshoomoʔ	Xoshoomoʔon									
mix	v	Goyut na haliinaʔan; baanaʔan naʔ miʔin diʔsheʔ.	I mixed the flour; then I'm going to make bread.	Goytoʔ haliinaʔan, k'uyuʔun, leejiʔin.	She mixed flour, sugar, milk.	goyut	goytoʔ									
moccasin	n	Shuyun ʔam moxlit.	His moccasins are getting old.	Dolk'ok'onoʔ ʔohyot ʔam shuyna.	Giant looked for his moccasin.	shuyun	shuyna									
mommy	n	Taanit min ʔoomiʔ denderow.	Your mommy went to the store.	Yattaʔ ʔaman nim ʔoomiʔin.	They talked to my mommy.	ʔoomiʔ	ʔoomiʔin									
Monday	adv					Luunas										
money	n	ʔoheemat nim k'eexaʔ.	My money disappeared.	Xayat ʔam k'eexaʔan lameesaw.	He put his money on the table.	k'eexaʔ	k'eexaʔan									
money counter	n					k'eexaʔan pich'ach'	k'eexaʔan pich'ach'i									
Mono (or Northerner)	n	Lopsileʔ Nutaʔ taʔan hew.	The Monos are going to fish here.	Nutaʔan naʔ yattaʔ.	I talked to the Monos.	Nutaʔ	Nutaʔan									
moon	n	Tishit toy'nimni ʔop.	The moon is coming out.	Taʔishtaʔ k'otiʔin toy'nimni ʔoopo.	He saw the big moon.	toy'nimni ʔop	toy'nimni ʔoopo									
morning star	n	ʔalʔalk'an' tawaanish.	The morning star twinkles.	Kaʔyuʔ ʔoshtoʔ tawaanisha.	Coyote stole morning star.	tawaanish	tawaanisha									
morning	adv	Walipga ʔug toy'ninaw!	You must arrive early in the morning!			toy'ninaw										
mosquito	n	K'oolapiʔ hoy'nit weelaw.	The mosquito flew to the light.	Daach'it ʔamaʔ k'oolapiʔin.	He stepped on the mosquito.	k'oolapiʔ	k'oolapiʔin									
mother	n	Mich noʔom nim waʔat'.	My mother is really tall.	Taʔishtaʔ ʔamaʔ nim nopoopo yoʔ nim noʔoomo.	She saw my father and my mother.	noʔom	noʔoomo									
mother-in-law	n	Xataʔan' min ʔontipa maamila.	Your mother-in-law is eating blueberries.	Diheʔ naʔ ʔam ʔontipa.	I will follow her mother-in-law.	ʔontip	ʔontipa									
mountain lion	n	Gadaayit weheeshit.	The mountain lion was hungry.	Weheeshita naʔ beeletaʔ.	I fed the mountain lion.	weheeshit	weheeshita									
mourn	v					p'axaatit	p'axattaʔ									
mouse	n	ʔamaʔ gadyaʔ k'osoy' xon' xoch'ooyow.	That hungry mouse lives in the ground.	Gaaduʔ yawaalit k'osoyi ʔam shoyxow.	The cat chased the mouse into its hole.	k'osoy'	k'osoyi									
mouth	n	K'amnit nim shamaʔ.	My mouth is dry.	Somgo min shamaaʔan!	Cover your mouth!	shamaʔ	shamaaʔan									
move something	v	ʔoyet ʔaman hulushhuya.	They moved the chairs.	ʔoyeetaʔ 'am 'otmobiila.	He moved his car.	ʔoyet	ʔoyeetaʔ									
move_1	v	ʔoyut ʔaman xoʔow dullaw.	They moved to the house in the mountain.	ʔoytoʔ ʔalit Pelesnow.	He moved to Fresno a while ago.	ʔoyut	ʔoytoʔ									
move_2	v	Holkiʔ wukyut.	The earth is moving. (Or, earthquake)	ʔamaʔ p'ay' wuk'uytaʔ balk'iw.	The baby moved in her belly.	wuk'yut	wuk'uytaʔ									
mud	n					loxaʔ	loxaʔan									
mule	n	Mich jawwan muulaʔ.	Mules are very strong.	Ch'iktaʔ ʔamaʔ muulaʔan gullaliw.	He tied the mule to the fence.	muulaʔ	muulaʔan									
mushroom (field mushroom)	n	Bohloʔ baaguʔ hew.	Field mushrooms grow here.	Kishaalataʔ ʔaman baaguʔun.	They fried the mushrooms.	baaguʔ	baaguʔun									
mushroom (growing stacked up on trees)	n	Mich galjin peetiʔ.	There are many mushrooms.	Naʔash naʔ taʔsheʔ peetiʔin.	I can see the mushrooms.	peetiʔ	peetiʔin									
mushroom (growing under oak trees)	n	K'eemixyaw xaxay'.	The mushrooms are under the white oak tree.	Kiwshit naʔ xaxaayi keewishaw.	I boiled the mushrooms in the pot.	xaxay'	xaxaayi									
my	pron	Yuhuʔun' naʔ nim won'shi.	I'm looking for my wallet.			nim										
nail_1	n	Xeeshix ʔam k'ashtaʔ nan.	Her nails poked me.	K'eelit ʔam xeeshixi hablik'ya.	She painted her nails red.	xeeshix	xeeshixi									
nail_2	n	K'ashtaʔ nan laabuʔ.	The nail poked me.	Haman naʔ k'oʔtoʔ laabuʔun.	I hit the nail with a hammer.	laabuʔ	laabuʔun									
name_1	n	Hoyowush ʔam Ninaʔ. 	Her name is Nina.	Shepga min hoyowusha hew!	Write your name here!	hoyowush	hoyowusha									
name_2	n	Haʔ daʔ mayin hiʔ hoyun' worm?	What is the word for 'worm'? (Lit. What is our word/name for 'worm'?			hoyun										
nape	n	ʔuk'uch nim k'uyuuk'axon'.	My nape is itchy.	K'oolapiʔ ʔach'ich'taʔ nim ʔuk'cha.	A mosquito bit my nape.	ʔuk'uch	ʔuk'cha									
near	prep	Holoshtaʔ ʔooch'iy' ʔoshto.	She sat near the fire.			ʔooch'iy'										
near (to become)	v	ʔoch'yet naaʔan ʔilk'a.	We all got close to the water.	ʔoch'yeetaʔ naʔ kaʔyuʔun.	I got close to the coyote.	ʔoch'yet	ʔoch'yeetaʔ									
neck	n	K'uyuuk'axon' ʔam mik'ish.	His neck is itchy.	Xishiwtaʔ gaaduʔ nim mik'shi.	The cat scratched my neck.	mik'ish	mik'shi									
needle	n	Mich ʔawuuhaʔ xanich'.	The needle is very sharp.	Dokton' maxtaʔ k'oliswaʔan ʔawuuhaʔan.	The doctor got the small needle.	ʔawuuhaʔ	ʔawuuhaʔan									
needle (from pine)	n	Maayaʔ mich xanich'.	The pine needles are very sharp.	Taʔshit naʔ maayaʔan.	I saw the pine needle.	maayaʔ	maayaʔan									
nephew	n	Xon' naʔway' nim Pelesnow.	My nephew lives in Fresno.	Naʔwayi naʔ tanʔet wakaayaw.	I took my nephew to the river.	naʔway'	naʔwayi									
nervous (to be)	v	Gichgichit naʔ hoy'now k'eeshinmi.	I was nervous when I went in the airplane.	Gichgichtaʔ ʔaman ʔam panaataw.	They were nervous when he arrived.	gichgichit	gichgichtaʔ									
nest	n	Widintaʔ ch'enbayin ladin xoch'ooyow.	The bird's nest fell on the ground.	Diʔsheʔ ch'enbay' ʔamaamin ladna gew sipin'.	The birds make their nests up there.	ladin	ladna									
new; young	adj	Hach'aamiʔ ʔamin sabaaduʔ.	Her shoes are new.	Yattaʔ ʔaman noonoʔon hach'aamiʔin.	They talked to the young men.	hach'aamiʔ	hach'aamiʔin									
nickel (10 cents)	n			Meek'it dindinch'a.	He swallowed a nickel.	dindinich'_1	dindinch'a									
niece; daughter	n	Tanmixhil gachab nim ʔam boch'oono lagyiw.	My daughter took her son with her.	Wantaʔ ʔam gachaaba gaaduʔun.	She gave her daughter a cat.	gachab	gachaaba									
night time	n	Hujuʔnun' nan toyun.	Nighttime scares me.	ʔohom' daʔ hoyoch'ʔan' toy'no.	I don't like nighttime.	toyun	toy'no									
night	adv	Taʔishtaʔ naʔ toy'now.	I saw her at night.	P'ayeeʔi gewew'an' toy'now.	The child will lie down tonight.	toy'now										
nine	n	Hewettaʔ noonip noonoʔ peeliw.	Nine men walked on the street.	Kishaalan' naʔ noonipa hoona.	I will fry nine eggs.	noonip	noonipa									
nine times	adv	Taʔishtaʔ naaʔak' ʔam nonp'il'.	We both saw him nine times.			nonp'il'										
nipple	n	Minich' bemeemat.	The breast is full.	Ch'eemit naʔ ʔam minch'a.	I milked its nipple.	minich'	minch'a									
nit	n	ʔoheemataʔ k'aach'ik' ʔam gaamaw.	Nits have disappeared from his bed.	K'aach'ik'a naʔ xeptaʔ ʔam shilshiw.	I pulled the lice's eggs off his hair.	k'aach'ik'	k'aach'ik'a									
noisy (to become)	v	Ch'eneetat ʔamak'.	The two of them got noisy.	Ch'eneetataʔ naʔ halum'sam.	I got noisy while tiptoeing.	ch'eneetat	ch'eneetataʔ									
north	adv					nootu										
nose	n	K'uyuuk'axon' ʔam sinik'.	Her nose is itchy.	K'uyuk'sataʔ ʔam sink'a.	He scratched his nose.	sinik'	sink'a									
not	adv	ʔohom' ʔamaʔ ch'enbay' taʔshit ʔam.	The bird did not see it.	ʔohom' naʔ k'eexam'.	I don't have money.	ʔohom'										
not exist	v	ʔohmit dolk'ok'noʔ.	Giants do not exist.			ʔohmit										
not have something; there is/are no X	v	ʔohmin naʔ k'eexaʔ.	I don't have money.	ʔohmin shidgil'.	There is no squirrel.	ʔohmin										
now	adv	Ch'amaxxon' naʔ baabasi hach'a.	I'm mashing the potatoes right now.			hach'a										
nurse a baby/child	v	Mench'at ʔam p'aaya.	She nursed her child.	Mench'ataʔ ʔam p'aaya gosneenoʔich'.	She nursed her baby while cooking.	mench'at	mench'ataʔ									
nut; pine nut	n			Poyeʔ naʔ toona.	I'm going to crush the pine nut.	ton'	toona									
Oakhurst	n	Xon' ʔaman ʔapaʔashaw.	They live in Oakhurst.			ʔapaʔashaw										
obsidian	n	Sasyintaʔ chesh.	The obsidian broke.	Ch'alit naʔ cheesha.	I broke the obsidian.	chesh	cheesha									
ogre	n	Mostoʔ sanwawaʔ wil' taaneʔ ʔamaamin xoʔow.	The old ogre would come to their house.	Miʔin ʔaman yokuch' taʔishtaʔ moxloʔon sanwawaʔan.	Then the people saw the old ogre.	sanwawaʔ	sanwawaʔan									
oil	n	Xap'eelat heexaʔ.	The oil was heating up.	Loxtoʔ ʔamaʔ heexaʔan keewishaw.	She poured oil into the cooking pot.	heexaʔ_2	heexaʔan									
old	adj	Heyeemaʔ ʔalit, hew xootoʔ moxloʔ k'oliswaʔ mokeela.	A long time ago, there lived an old small woman.	Xayaawushit moxloʔon gamiisha.	She wore an old shirt.	moxloʔ	moxloʔon									
old (to become)	v	Moxlit noonoʔ.	The man is getting old.	Moxiltaʔ ʔam gamiishaʔ.	Her shirt was old.	moxlit	moxiltaʔ									
old people	n	Moxolhoy' 'yokuch' yalk'it ʔooch'iy' ʔoshto.	The old people stood near the fire.	Taʔishtaʔ naʔ moxolhoyi yokooch'i.	I saw the old people.	moxolhoy'	moxolhoyi									
old person	n	Wil' xon' taa mostoʔ hew.	That old person used to live here.	ʔamiltaʔ ʔaman mostoʔon hospitlaw.	They helped the old person in the hospital.	mostoʔ	mostoʔon									
once	adv	Yeech'at naʔ tantaʔ ʔapaʔashaw.	I went to Oakhurst once.			yeech'at										
one	n	Yet' nim gaaduʔ.	I have one cat.	Tishag yeet'a bilaasuʔun!	Take out one plate!	yet'	yeet'a									
onion	n	Widintaʔ sebooyaʔ xoch'ooyow.	The onion fell on the ground.	Chishtaʔ naʔ sebooyaʔan.	I cut the onion.	sibooyaʔ	sibooyaʔan									
onion (wild)	n	Bohloʔ sheedin hew.	Wild onions grow here.	Panaamixit sheedina.	He brought wild onions.	sheedin	sheedina									
only	adv	Goobit ʔut't'al' k'uyk'u maamila gay'siw chaxshaw.	He picked only the sweet berries from the best bushes.			ʔut't'al'										
open	v	ʔodbinit tesech'.	The door just opened.	ʔodbintaʔ windaraʔ ʔalit.	The window has opened for some time.	ʔodbinit	ʔodbintaʔ									
open mouth wide	v	Kamaamat ʔam p'ay' waxilmi.	His child opened his mouth wide when he cried.	Kayamwushtaʔ yoʔ kamaamataʔ.	He yawned and opened his mouth wide.	kamaamat	kamaamataʔ									
open something	v	Taa mokeela ʔilk'a ʔodbit.	That woman turned on the water.	ʔodibtaʔ ʔamaʔ teseech'i.	She opened the door.	ʔodbit	ʔodibtaʔ									
orange	adj	Xoch'ooyot ʔam gamiishaʔ sakaakaʔ.	His orange shirt got dirty.	Yugshoʔ ʔam gamiishaʔan sakaakaʔan.	He's going to wash his orange shirt.	sakaakaʔ	sakaakaʔan									
orange	n	Hisheʔ ʔorinjiʔ miʔin.	The oranges are getting ripe soon.	Ch'oolit naʔ ʔorinjiʔin.	I peeled (the skin of) the orange.	ʔorinjiʔ	ʔorinjiʔin									
our	pron	Bemeeman' mayin xoʔ.	Our house will get full.			maayin										
our (dual, including you)	pron	Yawaltaʔ gaaduʔun maagin boch'on'.	Our son chased the cat.			maagin										
our (dual, not including you)	pron	Yawaltaʔ nim gaaduʔun nimgin boch'on'.	Our son chased your cat.			nimgin										
outside	adv	Maʔ naʔash taʔshal ch'aytashi manaw.	You can see the stars outside.			manaw										
over here	adv	Holoshga xaami hew!	Sit over here!			xaami hew										
over there	adv	Holoshga xuʔnay' gew!	Sit over there!			xuʔnay gew										
owl	n	Holoshʔan' hihiinaʔ weewilaw.	The owl is sitting on the branch.	Laniyhil naʔ hihiinaʔan lagyiw.	I heard the owl yesterday.	hihiinaʔ	hihiinaʔan									
pace up and down	v	Noxnoxit taa noonoʔ yatmi.	That man was pacing up and down while talking.	Noxnoxtoʔ naʔ piʔmi ʔesteejiʔin.	I paced up and down while waiting for the bus.	noxnoxit	noxnoxtoʔ									
pack down	v	Tik'it ʔamaʔ xoch'ooyo.	He packed down the dirt.			tik'it	tik'taʔ									
paint; spread_2	v	Nebech' nim k'eelit gullali.	My older brother painted the fence.	K'eltaʔ duwich'a baanaw.	He spread honey on the bread.	k'eelit	k'eltaʔ									
painter	n	Shawgeʔ k'eelach' miʔin.	The painter will leave soon.	Taʔishhil naʔ k'eelaach'i.	I saw the painter.	k'eelach'	k'eelach'i									
pan (for frying)	n	Xap'eelan' mijneʔ saldin.	The frying pan is going to get really hot.	Yugshut naʔ saldina.	I washed the frying pan.	saldin	saldina									
pants	n			Taʔishtaʔ naʔ nim galshuʔun.	I saw my pants.	galshuʔ	galshuʔun									
pants	n	Xoch'ooyotoʔ ʔam galushhuy'.	His pants got dirty.	Xayan' galjina galushhuya ʔam gaamaw.	He put many pants on the bed.	galushhuy'	galushhuya									
paper	n	Hot'nit bobbil'.	The paper is burning.	Dihlit naʔ bobbila.	I cut the paper.	bobbil'	bobbila									
pass by_1	v	Walxot ʔaman nim namxa.	They are passing by my friend.	Mokeela walxotaʔ nim xoʔo.	The woman passed by my house.	walxot	walxotaʔ									
pass by_2	v	Wosgit ʔaman hew.	They are passing by here.	Wosigtaʔ naʔ ʔam.	I passed by him.	wosgit	wosigtaʔ									
patch; mend	v	Ch'adit taa mokeela ʔam naawashi.	That woman just mended her dresses.	Ch'adtaʔ galjina gamiishaʔan ʔalit.	He mended many shirts.	ch'adit	ch'adtaʔ									
pay	v	Ch'awaalat naʔ nim ʔotmobiila.	I paid for my car.	Ch'awaalataʔ ʔam debewush denderow.	He paid off his debt at the store.	ch'awaalat	ch'awaalataʔ									
pay on credit	v	Deebet naʔ nim xataashi.	I paid my food on credit.			deebet	deebetaʔ									
peach	n	Hisheʔ miʔin biichis.	The peaches are getting ripe soon.	Xatit ʔaman galjina biichisa.	They ate a lot of peaches.	biichis	biichisa									
peach (wild variety)	n	Bohloʔ hew woch'oshil'.	Wild peaches grow here.			woch'oshil'	---									
pear	n	Bajeexat beelas.	The pear rotted.	Waanit ʔaman shoopina beelasi.	He gave them three pears.	beelas	beelasi									
peck_1	v	P'ump'umut gayiinaʔ gaaduʔun.	The chicken pecked the cat.	P'ump'umtoʔ ch'enbay' shidgila.	The bird pecked the squirrel.	p'ump'umut	p'ump'umtoʔ									
peck_2	v	K'ukk'uknat ch'enbay' ʔooch'iy' ʔutuʔun.	The bird is pecking near the tree.	K'ukk'uknataʔ gayiinaʔ gullaliw.	The chicken pecked on the fence.	k'ukk'uknat	k'ukk'uknataʔ									
peek	v	Wik'it ʔamaʔ ch'enbayi.	He peek at the bird.	Nancyʔ wik'taʔ shidgila.	Nancy peeked at the squirrel.	wik'it	wik'taʔ									
peek out	v	Wek'k'it nim boch'on'.	My son peeked out.	Wek'ik'taʔ ʔamaʔ saamil shoyxow.	The gopher peeked out of the hole.	wek'k'it	wek'ik'taʔ									
peel_1 (for fruits: oranges, bananas, grapefruits, etc.)	v	Ch'oolut naʔ k'emeexiʔin.	I peeled (the skin off of) the white oak acorn	Ch'oltoʔ naʔ ʔorinjiʔin.	I peeled the orange.	ch'oolut	ch'oltoʔ									
peel_2 (for potatoes, carrots, etc.)	v	Shalbit naʔ baabasi.	I peeled the potatoes.	Shalibtaʔ ʔaman k'ayaashi.	They peeled the carrots.	shalbit	shalibtaʔ									
peeler	n	Lak'wunit shalabhiy' nim xoch'ooyow.	My peeler fell on the ground.	Tanʔetaʔ naʔ nim shalabhiya.	I took my peeler.	shalabhiy'	shalabhiya									
pencil (Lit: something to write with); pen (Lit: something to write with)	n	Hili ʔam shipaʔhiy'?	Where is her pencil?	ʔipistaʔ ʔam shipaʔhiya.	She threw away her pencil.	shipaʔhiy'	shipaʔhiya									
penis	n					shot'	shoot'a									
people	n	Taaneʔ yokuch' wakaayaw.	The people are going to the river.	Galjina naʔ yokooch'i taʔishtaʔ.	I saw many people.	yokuch'	yokooch'i									
perch; sit	v	Shoowin' holooshut weewilaw.	The pigeon is perching on a branch.	Holoshtaʔ ʔooch'iy' ʔoshto.	She sat near the fire.	holooshut	holoshtaʔ									
let someone be	v	ʔaanat ʔamaʔ p'aaya.	He let the child be.			ʔaanat	ʔaanataʔ									
pick (flower, grass, leaf)	v	Xabch'it ʔeelawi.	She picked flowers.	Xabich'taʔ naaʔan ʔeelawi.	We picked flowers.	xabch'it	xabich'taʔ									
pick for oneself	v	ʔishliʔ ʔooposhit maamila.	Ishli picked blackberries for herself.	ʔooposhtoʔ ʔaman ʔaabula.	They have picked apples for themselves.	ʔooposhit	ʔooposhtoʔ									
pick something out	v	Hupshut ʔaman k'otiʔin.	They picked out the big one.	Hupushtaʔ naʔ habilk'ya ʔeelawi.	I picked out the red flowers.	hupshut	hupushtaʔ									
pick up	v	Gomooyat ʔaman bayna.	They picked up the acorn.	Gomooyataʔ naʔ nim haʔeehi.	I picked up my clothes.	gomooyat	gomooyataʔ									
pick_2	v	Bayannat naʔ ʔaabula.	I picked apples. 	Bayannataʔ naaʔak' ʔorinjiʔin.	We both picked oranges.	bayannat	bayannataʔ									
pick_1; collect; gather; harvest	v	Goobit naaʔan moonixla soopultaw.	We pick redbuds after the first frost.	Gobtoʔ naʔ k'uyk'u maamila.	I gathered sweet berries.	goobit	gobtoʔ									
pierce	v	Bogooshit naʔ ʔam tuk'a.	I pierced her ear.	Bogoshtaʔ naʔ nim tuk'a.	I pierced my ear.	bogooshit	bogoshtaʔ									
pig	n	Kuyoʔon' gos xoch'ooyow.	The pig is digging its nose in the ground.	Beeletaʔ naʔ goosi.	I fed the pig.	gos	goosi									
pigeon	n	ʔugunʔan' shoowin ʔilk'a.	The pigeon is drinking water.	Yawalhil gaaduʔ shoowina.	The cat chased the pigeon.	shoowin'	shoowina									
pile	v	Lumut naʔ hedeesha.	I piled the wood.	Lumtaʔ ʔam naawashi gaamaw.	She piled her dresses on the bed.	lumut	lumtaʔ									
pile here and there	v	Lumlumut naʔ ʔam naawashi gaamaw.	I piled her dresses all over her bed.	Lumlumtaʔ ʔam leeleʔhiya xoch'ooyow.	He piled his books all over the ground.	lumlumut	lumlumtaʔ									
pillow	n	ʔipsintaʔ ʔodix hap'is.	The soft pillow was lost.	Xetʔaxon' nim cheexaʔ hap'si ʔodxo.	My dog has been dragging the soft pillow. 	ʔodix	ʔodxo									
pilot (Lit: driver of plane)	n	Hiʔ huusheʔich' hoy'noʔon walpeʔ holoomun.	This pilot always arrives early.	Hewetmixtaʔ ʔamaʔ huusheʔch'i hoy'noʔon.	She walked with a pilot.	huusheʔich' hoy'noʔon	huusheʔch'i hoy'noʔon									
pinch	v	P'itit ʔoomiʔ nim ʔam naaway'.	My mom pinched his cheeks.	P'it'taʔ naʔ ʔam weebina.	I pinched her arm.	p'it'it	p'it'taʔ									
pine (yellow pine)	n	Bohloʔ ʔinnil' dullaw.	Yellow pines grow in the mountain.	Lastaʔ ʔaman tan ʔinnila.	They chopped that yellow pine.	ʔinnil'	ʔinnila									
pink	n	K'amnit ʔam gamiishaʔ saliik'in.	Her yellow shirt has dried up.	Shawigtaʔ ʔamaʔ ʔotmobiila saliik'ina.	He bought a pink car.	saliik'in	saliik'ina									
pipe	n	Widintaʔ biibaʔ lameesaw.	The pipe fell on the table.	Shawgit naʔ biibaʔan.	I bought the pipe.	biibaʔ	biibaʔan									
pistol	n	Lulnaʔxon' ʔooch'iy' teseech'i bistoolaʔ.	The pistol has been hanging by the door.	Tishat ʔam bistoolaʔan.	He pulled out his pistol.	bistoolaʔ	bistoolaʔan									
pitch; sap (esp. from pine trees)	n	Ch'uwch'uwoʔ goosinmi shaaxal'.	The sap drips slowly.	Saak'ittaʔ naʔ shaaxali.	I chewed the sap.	shaaxal'	shaaxali									
placenta	n					xoʔich'	---									
plane	n	Hoy'noʔ yaligtaʔ gew.	The plane has stopped there.	Taʔshit na hoy'noʔon.	I saw the plane.	hoy'noʔ	hoy'noʔon									
plant	v	Woyʔet naʔ mayshi.	I'm planting corn.	Haʔan daʔ min ʔen'shay' woy'etaʔ?	What did your grandma plant?	woyʔet	woyʔetaʔ									
plate	n	Widintaʔ bilaasuʔ sheleelaw.	The plate fell on the rock.	Ch'aalit naʔ min bilaasuʔun.	I broke your plate.	bilaasuʔ	bilaasuʔun									
play	v	Hikyit taa p'ay' shukshuyaw.	That child is playing in the sand.	Hik'iytaʔ naʔ hitwash nim ʔot'aayi.	I played with my younger sister.	hik'yit	hik'iytaʔ									
play the gambling hand game (using bones, straw, or sticks)	v	Wexlawshit ʔaman nim xo’ow.	They gambled in my house.	Bonyil' wexlawshitaʔ ʔamak'.	They both gambled twice.	wexlawshit	wexlawshitaʔ									
play together	v	Namxit ʔaman.	They are playing together.	P'ayeeʔi yoʔ ʔamaamin heedin namixtaʔ.	The children and their family played together	namxit	namixtaʔ									
playground; place to play	n	Mich k'otiʔ hik'ey'hiy'.	The playground is really big.	Diʔishʔan' ʔaman hik'ey'hiya.	They are building a playground.	hik'ey'hiy'	hik'ey'hiya									
Please!	exclamation	Kaʔyuwush laniyga nan!	Please listen to me!	Kaʔyuwush wanga nan kandeʔen!	Please give me a candy!	kaʔyuwush										
point at someone	v	Jogoogot naʔ ʔam noonoʔon.	I'm pointing at the man.	Jogogtoʔ leelilayich' nan.	The teacher pointed at me.	jogoogot	jogogtoʔ									
poison oak	n	Wil' bohloʔ ch'awik' hew.	Poison oak used to grow here.	ʔan' potgo ch'awk'a!	Don't touch the poison oak!	ch'awik'	ch'awk'a									
poke out, poke up	v	Bogoogot ʔam ʔoch'ow' shoyxow.	Its head poked out of the hole.	Bogogto' hoopul' xoch'ooyow.	The root poked out of the ground.	bogoogot	bogogtoʔ									
police; sheriff; guard	n	Hewetʔan' galdiʔ peeliw.	The sheriff is walking on the street.	Benettaʔ galdiʔin.	He asked the sheriff.	galdiʔ	galdiʔin									
pop something	v			T'oglataʔ naʔ baluna.	I popped the balloon.	t'oglat	t'oglataʔ									
porcupine	n	Hadimtaʔ kinkin peeli.	The porcupine crossed the road.	Hoxotʔan' cheexaʔ kinkina.	The dog is barking at the porcupine.	kinkin	kinkina									
possibly	adv	Bajxineʔ nan k'ay'.	He possibly does not like me.			k'ay'										
pot (for cooking)	n	Xap'eelat keewish.	The pot is getting hot.	Soomoʔ naʔ keewisha.	I'm going to cover the pot.	keewish	keewisha									
potato_1	n	K'oteehat baabas.	The potatoes grew bigger.	Kishaalen' naʔ baabasi ʔustuubaw.	I'm going to fry the potatoes on the stove.	baabas	baabasi									
potato_2 (wild, round)	n	Bohloʔ wil' deenaʔ hew.	Wild potatoes used to grow here.	Ch'amaaxit naʔ deenaʔan.	I mashed the wild potatoes.	deenaʔ	deenaʔan									
potato_3 (wild, oblong-shaped)	n	Shit'eeyan' homoogiʔ.	The little potatoes will taste good.	Kishaalen' homoogiʔin.	She will fry the potatoes (wild, oblong-shaped).	homoogiʔ	homoogiʔin									
pour	v	Loxit naʔ kuyuʔun.	I poured the salt.	Loxtoʔ bich'ch'i ʔilk'a naanaw.	He poured cold water on me.	loxit	loxtoʔ									
pray	v	Hookishat naaʔan miisaʔhiyaw.	We prayed in the church.	Hookishataʔ ʔaman, miʔin tantaʔ.	They prayed, then they left.	hookishat	hookishataʔ									
preacher	n	Badleʔ xayaataʔ galuusaʔan lameesaw.	The preacher put the cross on the table.	Wimwimtaʔ ʔaman badleʔen.	They waved at the preacher.	badleʔ	badleʔen									
pregnant	adj	Hewettaʔ taa mokeela balak' hospitlaw.	That pregnant woman walked to the hospital.	Yattaʔ dokton' mokel'ha balaak'i.	The doctor talked to the pregnant woman.	balak'	balaak'i									
press; squeeze; squash	v	Taa p'ay' nich'it gambaanaʔan.	That child pressed the bell.	Nich'taʔ p'ayeeʔi huuwas ʔamaamin p'onooshaw.	The kids squeezed the grapes in their hands.	nich'it	nich'taʔ									
pretty (to make something pretty)	v	Boyeemit naʔ hin p'aaya.	I made this child pretty.	Boyemtaʔ may' leeleʔhiya.	We made the school beautiful.	boyeemit	boyemtaʔ									
pretty; beautiful	adj	Mich' boyoomiʔ hiʔ xoʔ.	This house is very pretty.	Panaamixtaʔ ʔam boyoomiʔin gachaaba.	She came with her pretty daughter.	boyoomiʔ	boyoomiʔin									
prostitute	n	Yalk'iʔxon' buudaʔ deeyaw denderoʔon.	The prostitute has been standing in front of a store.	Taʔishhil naʔ buudaʔan lagyiw.	I saw the hooker yesterday.	buudaʔ	buudaʔan									
protect	v			Gooyetaʔ ʔam noʔoomo.	He protected his mother.	gooyet	gooyetaʔ									
pull	v	Taweelet naʔ tuxaach'i.	I pulled the rope.	Taweeletaʔ gawaayuʔun.	He pulled a horse.	taweelet	taweeletaʔ									
pull out_1 (eyebrows)	v	Biwiwshat naʔ nim t'emeeshila.	I'm pulling out my eyebrows.	Naʔat nim biwiwshataʔ.	My sister pulled out her eyebrows.	biwiwshat	biwiwshataʔ									
pull out_2 (grass)	v	Shoogut shokooya.	He is pulling out grass.	Shogtoʔ wot'oowita.	He pulled out the deergrass.	shoogut	shogtoʔ									
pull out_3 (tree, grass)	v	Holook'ut naʔ shokooya.	I pulled out the grass.	Holok'toʔ ʔaman k'amnaʔan ʔutuʔun.	They pulled out the dried-up tree.	holook'ut	holok'toʔ									
pull somebody's hair; grab somebody's hair	v	Ch'oodut ʔamaʔ nim ch'eexaʔan shilshi.	She pulled my dog's hair.	Ch'udtaʔ naʔ ʔam shilshi.	I pulled his hair.	ch'oodut	ch'udtaʔ; ch'odtoʔ									
pumpkin; squash	n	K'oteehan' galwansaʔ.	The pumpkins are going to get bigger.	Ch'isheʔ naʔ miʔin galwansaʔan.	I'm going to cut the pumpkin soon.	galwansaʔ	galwansaʔan									
punch	v	K'unut naʔ ʔodxo.	I punched the pillow.	K'untaʔ ʔamaʔ windaraʔan.	He punched the window.	k'unut	k'un'taʔ									
punch several times	v	K'unk'unut taa p'ay' lameesaʔan.	That child is punching the table several times.	K'unk'untaʔ ʔaman gustali.	They punched and punched the sack.	k'un'k'unut	k'un'k'un'taʔ									
purple	adj	Hiʔ mukaaniʔ ʔeelaw' mich boyoomiʔ.	These purple flowers are pretty.	Taʔishga hin mukaaniʔin won'shi!	Look at these purple purses!	mukaaniʔ	mukaaniʔin									
push	v	Jack ʔutyut ʔam.	Jack pushed him	ʔutuytaʔ teseech'i.	He pushed the door.	ʔutyut	ʔutuytaʔ									
put down	v	Xayat naʔ nim won'shi lameesaw.	I put (down) my purse on the table.	Nancyʔ xayaataʔ hedeesha xoch'ooyow.	Nancy put the wood on the ground.	xayat	xayaataʔ									
put out; turn off; extinguish	v	Saapit naʔ ʔoshto.	I put out the fire.	Saptaʔ naʔ weelaʔan.	I turned off the light.	saapit	saptaʔ									
put on pants	v	Galshuwshat.	He put on his pants.			galshuwshat	galshuwshataʔ									
put someone on one's lap	v	K'epeenit naʔ p'aaya.	I put the child on my lap.	K'epeeneʔ naʔ miʔin napaasha.	I'm going to put my grandchild on my lap.	k'epeenit	k'epentaʔ									
quail	n	Galjin humnul' meejinʔan' hoyeenexon'.	Lots of quails are flying around.	Humnula naʔ xateʔ.	I eat quails.	humnul'	humnula									
Quartz Mountain	adv					Gochmoodenaw										
quiet	v	Teeyish mejnit yananat.	The chief is very quiet.	Yanaanataʔ hidyaʔ.	Everybody got quiet.	yanaanat	yanaanataʔ									
rabbit (cottontail)	n	Tishtaʔ tew' ch'ayaaxiw.	The cottontail rabbit came out of the bush.	Yawaltaʔ cheexaʔ nim teewa.	My dog chased the rabbit.	tew'	teewa									
raccoon	n	Shanhay' taʔshit nan.	The raccoon saw me.	Taʔshit saamil shanhayi.	The gopher saw the raccoon.	shanhay'	shanhayi									
race	v	Kaʔyuʔ baanet t'oyoosha.	Coyote raced the arrow.			baanet	baanetaʔ									
race with each other	v	ʔaman p'ayeeʔi baanewshit.	The children raced.	Gawaayuʔ ʔamaamin baanewishtaʔ.	Their horse raced.	baanewshit	baanewishtaʔ									
rain_1	n	Panan' sheeʔal' miʔin.	The rain will come soon.	Gay'sineʔ naaʔan sheeʔali hew.	We like rain here.	sheeʔal'	sheeʔali									
rain_2	v	Mejnit sheʔeelit. K'eeshinga!	It's raining hard. Go inside!	Meejintaʔ sheʔiltaʔ dullaw.	It rained a lot in the mountain.	sheʔeelit	sheʔiltaʔ									
rainbow	n	Gew daʔ takaalap'!	The rainbow is over there!	Taʔashʔan' ʔaman takaalap'i.	They are watching the rainbow.	takaalap'	takaalap'i									
rattle (made of cocoon)	n	Gahoonaw galjin sunul'.	There are many rattles in the box.	Xayaataʔ sunulo lameesaw.	He put the rattle on the table.	sunul'	sunulo									
rattlesnake	n	Beyeech'intaʔ nasis dik'in sheleela.	The rattlesnake coiled behind the rock.	Deyliwshataʔ ʔaman nassi.	They watched out for rattlesnake.	nasis	nassa/nassi									
raw	adj	Hishwaʔ mich' gayiinaʔ.	The chicken is still raw.	ʔut't'al' chistaʔ hishwaʔan boʔsha.	He cut only the raw meat.	hishwaʔ	hishwaʔan									
read	v	P'ayeeʔi leelet woʔoyhuyaw.	The children are reading in the bedroom.	Leeletaʔ ʔaman galjina washhanaʔan.	They read a lot of stories.	leelet	leeletaʔ									
reader (someone who reads a lot)	n	Yooyot mam leeleʔsiʔ.	The one who reads a lot called you.	Taʔishtaʔ naʔ leeleʔsiʔin.	I saw the one who reads a lot.	leeleʔsiʔ	leeleʔsiʔin									
ready to do something	v	Shidit naʔ xatach'.	I was ready to eat.	Shidtaʔ naʔ taanach'.	I was ready to leave.	shidit	shidtaʔ									
really	adv	Yooyot nan? Madiʔ?	Did she call me? Really?			madiʔ										
really, a lot	v	Mijnit ʔohooyot.	He coughed a lot.	Meejintaʔ cheexaʔ hoxittaʔ.	The dog really barked.	mijnit	meejintaʔ									
receptionist_1	n	Yalk'eʔ gaabinich' dik'in lameesaʔan.	The receptionists stand behind the tables.	Benetga gaabinch'i gew!	Ask a receptionist over there!	gaabinich'	gaabinch'i									
receptionist_2	n					geewich'	geewich'i									
recognize	v	Hodoonat naʔ noonoʔon.	I recognized the man.	Hodoonataʔ ʔaman nan.	They recognized me.	hodoonat	hodoonataʔ									
red	adj	Hatamʔan' habilk'ay' ch'enbay'.	The red bird is singing.	Shawighil gachab nim naawashi hablik'ya lagyiw.	My daughter bought a red dress yesterday.	habilk'ay'	hablik'ya									
red (to become)	v	ʔamin naaway' hablik'yat.	His cheeks turned red.	Nim gamiishaʔ shik'win hablik'yataʔ.	My white shirt became red.	hablik'yat	hablik'yataʔ									
redbud (bush)	n	K'amintaʔ moonixil.	The redbud dried up.	Ch'oltoʔ ʔamaʔ moonixla.	She peeled the redbud (sticks).	moonixil	moonixla									
reduce; small (to make)	v	K'olestat ʔamak' ʔilk'a.	They both reduced the water.	K'olestataʔ ʔoshto.	He made the fire smaller.	k'olestat	k'olestataʔ									
rest	v	Hiyim' naʔ yeheshnit.	I already rested.	Yeheshintaʔ naʔ xoʔow.	I rested at home.	yeheshnit	yeheshintaʔ									
restroom_1 (Lit. place to urinate)	n	K'aheeyataʔ ch'uyuʔhuy'.	The restroom stank.	ʔan' k'aheeyag ch'uyuʔhuya!	Don't stink up the restroom!	ch'uyuʔhuy'	ch'uyuʔhuya									
restroom_2 (Lit. place to defecate)	n					bedek'hiy'	bedek'hiya									
ribs	n	Sasiytaʔ ʔam xamach'i.	He broke his ribs.	Ganaaduʔun xamach'i naʔ xatit.	I ate cow's ribs.	xamach'	xamach'i									
rice	n	Hiʔ duʔ halos bilaasuw.	There is rice on the plate, y'know.	Putuʔmut naʔ haloosa.	I boiled the rice.	halos	haloosa									
rich	adj	Taa k'exmuʔ mokeela mich galjin denderom'.	That rich woman has many stores.	Yattaʔ naaʔan kexmuʔun yokooch'i.	We talked to the rich people.	k'exmuʔ	k'exmuʔun									
rich (to become)	v	ʔamaʔ mich liham' kexmit.	The best runner is getting rich.	K'eximtaʔ dawhalich'.	The worker got rich.	k'exmit	k'eximtaʔ									
ride	v	Shatgenit naʔ ʔam galeedaw.	I rode in her wagon.	Shatgentaʔ ʔaman ʔesteejiʔin.	They rode in a bus.	shatgenit	shatgentaʔ									
ridge (on the ridge)	adv	Ch'emyaw galjin ʔeelaw' bohloʔ dullaw.	Many flowers grow on the ridge in the mountain.	Taʔishhil naʔ lagyiw k'otiʔin soopuli ch'emyaw.	Yesterday I saw thick ice on the ridge.	ch'emyaw										
rifle	n	Lulnaʔxon' nipleʔ dik'in teseech'i.	The rifle has been hanging behind the door.	Tishag min nipleʔen!	Take out your rifle!	nipleʔ	nipleʔen									
right here	adv	Loolog heedam.	Leave it right here!	Heedam daʔ yalik'taʔ.	She stood right here.	heedam										
right (direction)	adv	Hiʔ nim peewaw p'onosh.	This is my right hand.	Tanga peewaw!	Go to the right!	peewaw										
ring	n	ʔalʔalk'at ʔam ʔaniiyaʔ.	Her ring is sparkly.	Shawigtaʔ ʔamaʔ k'otiʔin ʔaniiyaʔan.	He bought a big ring.	ʔaniiyaʔ	ʔaniiyaʔan									
ripen	v	Hishit maamil'.	Blackberries are getting ripe.	Meejintaʔ hishtaʔ sandiiyaʔ.	The watermelon was very ripe.	hishit_2	hishtaʔ									
river	n	Mijnit k'oteehat wakay'.	The river is very big.	T'intaʔ ʔaman wakaaya.	They dammed up the river.	wakay'	wakaaya									
road	n	Ch'apeeyataʔ pel'.	The road was wet.	Diʔsheʔ ʔaman peeli.	They will build the road.	pel'	peeli									
roadrunner	n	Hadimtaʔ ʔuwiy-ʔuwiy' peeli.	The roadrunner crossed the street.	Yawaltaʔ kaʔyuʔ ʔuwiy'-ʔuwiya.	A coyote chased a roadrunner.	ʔuwiy'-ʔuwiy'	ʔuwiy'-ʔuwiya									
roast	v	Hashlat naʔ boʔsha.	I roasted the meat.	Hashlataʔ gayiinaʔan.	He roasted the chicken.	hashlat	hashlataʔ									
roaster; roasting place	n	Xap'eelan' hashlaʔhiy'.	Roasters get hot.	ʔan' potgo xap'li hashlaʔhiya!	Don't touch a hot roaster!	hashlaʔhiy'	hashlaʔhiya									
rob	v	Bombomyot tan noonoʔon.	He robbed that man.	Bombomyotoʔ taa noonoʔ nopoopo nim.	That man robbed my father.	bombomyot	bombomyotoʔ									
robber	n	Lihimtaʔ bombomyoʔ woloomiw.	The robber ran to the meadow.	Wostoʔ bombomyoʔon nok'onon.	He hit the robber with a gun.	bombomyoʔ	bombomyoʔon									
rock (pestle rock)	n	Lat'aynit sey' dullaw.	The pestle rock rolled down the hill.	Heleeyit ʔaman seeya.	They carried the pestle rock.	sey'	seeya									
rock (with holes for pounding acorns)	n	Galjin p'alp'alay' dullaw.	There are many pounding rocks at the mountain.	Taʔishtaʔ naʔ k'otiʔin p'alp'alya.	I saw the big pounding rock.	p'alp'alay'	p'alp'alya									
root (dig with nose, e.g. for pigs)	v	Kuyot gos xatmi.	The pigs were digging with their nose while eating.	Kuyotoʔ gos xoch'ooyow.	The pig dug its nose in the ground.	kuyot	kuyotoʔ									
root (white root, for making basket)	n	ʔohom' daʔ galjin hoopul' hew.	There are not many white root plants here.	Holok'taʔ naʔ ch'ayaaxin hoopuli.	I pulled out the root of the bush.	hoopul'	hoopuli									
rope	n	Jaweewataʔ tuxach'.	The rope has become stiff.	Hech'eytaʔ ʔaman tuxaach'i.	They tightened the rope.	tuxach'	tuxaach'i									
rot	v	Ch'ek'nit boʔush.	The meat rot.	Baabas ch'eek'intaʔ.	The potato rotted.	ch'ek'nit	ch'eek'intaʔ									
run	v	Lihmit mejnit p'ayeeʔi.	The children really ran.	Lihimtaʔ bombomyoʔ woloomiw.	The robber ran to the meadow.	lihmit	lihimtaʔ									
run out; use up; erase	v	Ch'oknut min ʔilik'.	Your water ran out (or: You ran out of water).	Ch'okuntaʔ nim xatash.	I ran out of food.	ch'oknut	ch'okuntaʔ									
sack	n	ʔamaʔ gustal' widnit.	The sack fell.	Xayaataʔ naʔ gustali xoʔow.	I put the sack in the house.	gustal'	gustali									
sage	n	K'amneʔ meesiniʔ manaw.	The sage will dry up outside.	Bohulga meesiniʔin hew!	Grow the sage here!	meesiniʔ	meesiniʔin									
salamander	n	Lihimtaʔ ʔalajaanaʔ hoy'li.	The salamander ran fast.	Hoxtit cheexaʔ ʔalajaanaʔan.	The dog barked at the salamander.	ʔalajaanaʔ	ʔalajaanaʔan									
salmon	n	Hiʔ k'ayaxit heexaʔ.	This salmon is fat.	Nohʔoʔ potit k'ayaxti.	The bear caught a salmon.	k'ayaxit	k'ayaxti									
salt	n	Papiytaʔ kuyuʔ naanaw.	The salt scattered on me.	Wanga nan kuyuʔun!	Give me the salt!	kuyuʔ	kuyuʔun									
salt something	v	Kuyʔulut lopso.	She salted the fish.	Kuyʔultaʔ ʔam k'ayaxti.	He put salt on his salmon.	kuyʔulut	kuyʔultaʔ									
saltgrass	n	Bohloʔ ʔaalit hew.	Saltgrass grows here.	ʔalithil naʔ ʔaalita.	I licked the saltgrass.	ʔaalit	ʔaalita									
San Joaquin River	adv	ʔeepeʔ naʔ San Wakanew.	I'm going to swim in San Joaquin River.			San Wakanew										
sand	n	Papiytaʔ shukshuy' lameesaw.	Sand scattered on the table.	K'oʔtoʔ shukshuya naanaw.	He threw sand at me.	shukshuy'	shukshuya									
Saturday	adv	Taaneʔ ʔaman denderow Sawaadanaw.	They go to the store on Saturdays.			Sawaadanaw										
save	v	Yaynit ʔaman tewa.	They are saving the rabbit.	Cheexaʔan naʔ yaayintaʔ.	I saved the dog.	yaynit	yaayintaʔ									
saw	n	Saluujaʔ sasyinit.	The saw broke.	Sasiytaʔ saluujaʔan.	He broke the saw.	saluujaʔ	saluujaʔan									
say	v	Simon wilit, Shilit'ga!	Simon said, Jump!	Kate wiltaʔ, Noonoʔ goosinmi hewettaʔ.	Kate said, The man walked slowly.	wilit	wiltaʔ									
say loudly; talk loudly	v	Piwnit hapt'is ʔam yata.	He said it a little more loudly.	Meejintaʔ ʔaman piwintaʔ yatmi.	They were very loud when they talked.	piwnit	piwintaʔ									
startle someone; frighten someone; scare someone	v	Hujuʔnut wal'maʔ p'ayeʔhi.	The lightning startled the kids.	Hujuʔnutaʔ nan.	It frightened me.	hujuʔnut	hujuʔnutaʔ									
startled (to become); frightened (to become); scared (to become)	v	Hujnut p'ayeeʔi.	The children are scared.	Hujuntaʔ naʔ.	I got frightened.	hujnut	hujuntaʔ									
scarf	n					mik'shin banyuʔ	mik'shin banyuʔun									
scatter	v	Papyit haliinaʔ lameesaw.	The flour scattered on the table.	Papiytaʔ simiiyaʔ xoch'ooyow.	The seeds scattered on the ground.	papyit	papiytaʔ									
school; book	n	Mich k'otiʔ leeleʔhiy'.	The school is very big.	Xayat ʔam leeleʔhiya gustaliw.	He put his books in his sack.	leeleʔhiy'	leeleʔhiya									
scissors	n	Hiʔ dehel' widintaʔ xoch'ooyow.	This pair of scissors fell on the ground.	Shawgeʔ ʔamaʔ miʔin shoopina deheela.	She will buy three pairs of scissors.	dehel'	deheela									
scold	v	Bohiyit ʔamak' p'aaya.	They two scolded the child.	Bohiytaʔ taa mokeela ʔam boch'oona.	That woman scolded her son.	bohiyit	bohiytaʔ									
scoop_1	v	Ch'aʔyit naʔ ʔilk'a.	I scooped some water.	Ch'aʔiytaʔ limna xaaluw.	She scooped some acorn mush into a bowl.	ch'aʔyit	ch'aʔiytaʔ									
scoop_2	v	K'olit shukshuya waldinaw.	She scooped the sand into the bucket.	K'oltaʔ bayna sheleelaw.	He scooped acorn from the rock.	k'olit	k'oltaʔ									
scorch	v	Shank'init boʔush.	The meat scorched.	Shank'intaʔ t'eewish.	The basket scorched.	shank'init	shank'intaʔ									
scorch something; burn something	v	Shank'it ʔamaʔ boʔsha.	He scorched the meat.	Shanik'taʔ na keek'a.	I scorched the cake.	shank'it	shanik'taʔ									
scrape	v	Xepit Matt taxaatiʔin wech'eeta.	Matt is scraping the sourberry stick.	Xeptaʔ hedeesha ʔaman.	They scraped the wood.	xepit	xeptaʔ									
scratch_1	v	Xishwit ʔamaʔ nan.	She scratched me.	Xishiwtaʔ naʔ ʔam naaway'.	I scratched her cheeks (in a fight).	xishwit	xishiwtaʔ									
scratch_2; itch	v	K'uyuk'sat naʔ nim ʔoch'owo.	I scratched my head.	K'uyuk'sataʔ ʔam boshoona.	He scratched his knee.	k'uyuk'sat	k'uyuk'sataʔ									
scream	v	Nancyʔin ch'enbay' mijnit sawit.	Nancy's bird screamed a lot.	Sawtaʔ ʔaman taʔishmi ʔunuʔun.	They screamed when they saw the ghost.	sawit	sawtaʔ									
search; hunt; look for	v	Yuhut ʔam yaaweʔen.	He searched for his keys.	Yuhtoʔ ʔaman humnula.	They hunted quails.	yuhut	yuhtoʔ									
seed (general)	n	Papyeʔ simiiyaʔ xoch'ooyow.	The seeds scatter on the ground.	Xaateʔ ch'enbay' simiiyaʔan.	Birds eat seeds.	simiiyaʔ	simiiyaʔan									
seed (of fruits)	n	Taxaatiʔin ch'eelin' gayis.	Sourberry seeds are good.	Cheelina naʔ k'achayit.	I crunched the seeds.	ch'eelin'	ch'eelina									
send	v	Gadnew naʔ hooyet min t'eewisha.	I'm sending my basket to Picayune.	Noʔom nim daʔ mam hooyetaʔ xataashi.	My mother sent you some food.	hooyet	hooyetaʔ									
seven	n	Woodoyʔan' nomch'in mokeet'aʔ.	Seven girls are dancing.	Shuttoʔ naʔ nomch'ina bek'eewaʔan xaaluw.	I added seven beads into the bowl.	nomch'in	nomch'ina									
seven times	adv	K'owk'owit naʔ ʔug, nomch'il'.	I did knock, seven times.			nomch'il'										
sew	v	Bewintaʔ naʔ naawashi ʔawuuhan.	I stitched the dress with a needle.	Ninaʔ bewinʔan' naawashi hach'a.	Cheryl is sewing a dress right now.	bewnit	bewintaʔ									
shade (in the shade)	adv	ʔamaʔ holoshʔan' ch'enawiw.	He is sitting in the shade.	Ch'enawiw poyit naʔ bayna seeyen.	I ground the acorn with a pestle in the shade.	ch'enawiw										
shadow	n	Ch'enbayin ch'enaw taʔishhantaʔ xoch'ooyow.	The bird's shadow was seen on the ground.	Taʔishtaʔ naʔ nim ch'enawi.	I saw my shadow.	ch'enaw'	ch'enawi									
shake	v	Yunshut ʔam sunulo.	He's shaking his rattle.	Yunushtaʔ ʔam ʔoch'owo.	He shook his head.	yunshut	yunushtaʔ									
sharp_1	adj	Nokoch'oʔ xanich'.	The knife is sharp.	Shawigtaʔ naʔ xanch'i nokoch'oʔon.	I bought a sharp knife.	xanich'	xanch'i									
sharp_2; pointy	adj	Shipt'an' p'ewel'.	The awl is sharp.	Maxtaʔ shipt'ani sheleela.	He got the sharp rock.	shipt'an'	shipt'ani									
sharpen	v			Mokeela xanich'tataʔ nok'ochoʔon.	The woman sharpened the knife.	xanich'tat	xanich'tataʔ									
shave oneself	v	K'etwishit ʔam lak'lak'i.	She's shaving her armpit.	K'etwishtaʔ naʔ nim ʔoch'owo.	I shaved my head.	k'etwishit	k'etwishtaʔ									
shave wood	v	Kate daʔ xitxitit hedeesha gew.	Kate is shaving wood over there.	Xitxittaʔ naʔ hedeesha.	I shaved the wood.	xitxitit	xitxittaʔ									
shave someone	v	Keetit jiiwuʔun daamusa.	He's shaving the goat's beard.	K'ettaʔ naʔ ʔam.	I shaved him.	k'eetit	k'ettaʔ									
she; he; it	pron	Hoxtit ʔamaʔ nan.	It barked at me.	K'oʔtoʔ Jack ʔam sumsuxan.	Jack pelted her with gooseberries.	ʔamaʔ	ʔam									
sheep	n	Xataʔan' boliigaʔ shokooya.	The sheep are eating grass.	Deylit naʔ boliigaʔan.	I guarded the sheep.	boliigaʔ	boliigaʔan									
sheet; blanket_2	n	Xoch'ooyot ʔam shiniy.	Her sheet got dirty.	Shek'ewlataʔ ʔam shinya.	She cleaned her sheet.	shiniy	shinya									
shin	n	Baw' nim k'uyuuk'at.	My shin itched.	K'uyuk'sat naʔ nim bawi.	I scratched my shin	baw'	bawi									
shine brightly	v	Gamiishaʔ ʔam ʔalʔalk'at.	Her shirt shines brightly (or, is sparkly).	ʔalʔalk'ataʔ ch'aytash.	The stars shone brightly.	ʔalʔalk'at	ʔalʔalk'ataʔ									
shirt	n	Gamiishaʔ k'aminhil lagyiw.	The shirt dried yesterday.	Yugshoʔ ʔam shik'wina gamiishaʔan.	She will wash her white shirt.	gamiishaʔ	gamiishaʔan									
shoe	n	Limik' sabaaduʔ nim.	My shoes are black.	Mokeela ʔoxit ʔam sabaaduʔun.	The woman took off her shoes.	sabaaduʔ	sabaaduʔun									
shoot	v	T'uyut nan ʔilk'an.	He's shooting me with water.	T'uytaʔ ch'enbayi.	He has shot a bird.	t'uyut	t'uytaʔ									
short; low	adj	Xoch'ooyotoʔ lameesaʔ k'ebes.	The short table was dirty.	Pel' k'ebes.	The road is short.	k'ebes	k'ebesi									
shorts (Lit: short pants)	n					k'ebes galshuy'	k'ebeesi galshuya									
shoulder	n	Taxeetat ʔam k'apshal'.	Her shoulder is aching.	Pothil naʔ ʔam k'apshali.	I touched her shoulder.	k'apshal'	k'apshali									
shovel	n	Sasyintaʔ baalaʔ.	The shovel broke.	Shawigtaʔ ʔamaʔ bonyo baalaʔan.	He bought two shovels.	baalaʔ	baalaʔan									
show someone how to do something	v	Peteelat naʔ ʔam huusheʔich'.	I showed her how to drive.	Peteelataʔ nan deʔeshich' teewisha.	She showed me how to make a basket.	peteelat	peteelataʔ									
show something	v	Pitlit nan diʔsha limna.	She showed me how to make acorn mush.	Pitiltaʔ nan ʔam xoʔo.	She showed me her house.	pitlit	pitiltaʔ									
sick (to be)	v	Tixtinit.	She was sick.	Tixtintaʔ hidyaʔ taw xoʔow.	Everybody in that house was sick.	tixtinit	tixtintaʔ									
side (the other side)	n	ʔamaʔ xuʔnay' taʔshit nan.	The person on the other side saw me.	Taʔshit naʔ xuʔnayi tan.	I saw the person on the other side.	xuʔnay'	xuʔnayi									
sift	v	Bamannaw naʔ ʔewnit bayna.	I sifted the acorn in the basket.	Ewintaʔ ʔaman haliinaʔan.	They sifted the flour.	ʔewnit	ʔewintaʔ									
silly	adj	K'eeshintaʔ jahichk'ay' noonoʔ xoʔow.	The silly man went into the house.	Taʔishtaʔ naʔ noonoʔon jahichk'ayi.	I say the silly man.	jahichk'ay'	jahichk'ayi									
sing	v	Hatmit ʔuplalliʔ.	The mourning dove sang.	Dolk'ok'noʔ jalawinmi hatimtaʔ.	The Giant sang loudly.	hatmit	hatimtaʔ									
singer	n	Walpeʔ hataamich' holoomun.	The singers always arrive early.	Dihtaʔ ʔaman hatamch'i manaw.	They followed the singers outside.	hataamich'	hatamch'i									
singer (for a funeral ceremony)	n	Walpeʔ ʔahnayich' hikaw.	The singer will arrive early tomorrow.	Dihtaʔ min nopop ʔahnaych'i.	Your father followed the singer.	ʔahnayich'	ʔahnaych'i									
singing place	n	Mich k'otiʔ hatam'hiy'.	The singing place is very big.	Diʔsheʔ ʔaman hatam'hiya gew.	They will build the singing place over there.	hatam'hiy'	hatam'hiya									
sink	v	Lek'nit shelel' ʔilk'aw.	The rock sank in the water.			lek'nit	lek'intaʔ									
sink in the mud	v	Loxnit naʔ.	I'm sinking in the mud.	Loxintaʔ ʔam ʔotmobil.	His car sank in the mud.	loxnit	loxintaʔ									
sink; soak_2	v	Bagnit shelel' ʔilk'aw.	The rock sank in the water.	Bagintaʔ sandiiyaʔ wakaayaw.	The watermelon sank in the river.	bagnit	bagintaʔ									
sister (older)	n	Naʔat nim shawigtaʔ hablik'ya ʔotmobiila.	My older sister bought a red car.	Taʔishtaʔ naʔ min naʔata xoʔow.	I saw my older sister at home.	naʔat	naʔata									
sister (younger)	n	Woʔyut ʔot'ay' nim.	My younger sister slept.	Hoxtit cheexaʔ ʔamin ʔot'aayi.	The dog barked at his younger sister.	ʔot'ay'	ʔot'aayi									
sit up and listen	v	ʔowoowat ʔaman ʔam panaataw.	They sat up and listened when she arrived.	ʔowoowataʔ naʔ.	I sat up and listened.	ʔowoowat	ʔowoowataʔ									
six	n	Lihimwishtaʔ ch'olippiy kaʔyuʔ.	The six coyotes ran with each other.	Ch'aalit xaaluʔun ch'olippiya.	She broke six bowls.	ch'olippiy	ch'olippiya									
six times	adv	K'owk'owit ch'olpil' naʔ ʔam teseech'i.	I knocked at her door six times.	Ch'adbintaʔ ch'olpil' bilaasuʔun.	He flipped over the plates six times.	ch'olpil'										
skin of fruit; bark of tree; shell of nuts	n	Limeek'at ch'oonut' biichisin.	The skin of the peach became dark.	Ch'oltaʔ naʔ k'iyta ch'oonut'i.	I peeled the bitter shell.	ch'oonut'	ch'oonut'i									
skinny	adj	Taa chibnaʔ noonoʔ wumilhanit.	That skinny man got thrown down.	Taʔishtaʔ naʔ chibnaʔan nohʔoʔon.	I saw a skinny bear.	chibnaʔ	chibnaʔan									
skinny (to become)	v	Mich ʔamaʔ cheexaʔ chibnit.	The dog was very skinny.	Chibintaʔ taa p'ay' ʔalit.	That child was skinny a while back	chibnit	chibintaʔ									
skunk	n	Sox mich k'ahiy'.	The skunk stinks a lot.	Taʔshit naʔ sooxi.	I saw the skunk.	sox	sooxi									
sky	n	Waʔlaʔ mijnit ch'iwuk'yat.	The sky is very blue/green.	Taʔshiʔxon' naʔ waʔlaʔan.	I'm looking at the sky.	waʔlaʔ	waʔlaʔan									
slap	v	T'apeelit gawaayuʔun.	He just slapped the horse.	Taa p'ay' t'apeltaʔ ʔam namxa.	That child slapped his friend.	t'apeelit	t'apeltaʔ									
sleep	v	Wuʔyut p'ay'.	The child fell asleep.	Cheexaʔ woʔoytaʔ deeyaw xoʔo.	The dog slept in front of the house.	wuʔyut	woʔoytaʔ									
sleep with someone	v					woʔoymuxut	woʔoymuxtaʔ									
sleepy (to be)	v	Neʔjat naʔ.	I'm getting sleepy.	Neʔjataʔ ʔamaʔ huushem.	He got sleepy while driving.	neʔjat	neʔjataʔ									
slide down	v	Lat'aynit naʔ dullaw.	I slid down the hill.	Lat'ayintaʔ ʔaman sheleelaw ch'apyiw.	They slid down on the wet rock.	lat'aynit	lat'ayintaʔ									
slip and fall down	v			Lalwintaʔ naʔ xoch'oyoow.	I slipped and fell down on the dirt.	lalwinit	lalwintaʔ									
slippery	adj	Pel' dullaw mich lat'ay'.	The road on the mountain is very slippery.	Yugshut lat'aayi peeli.	He cleaned the slippery road.	lat'ay'	lat'aayi									
slow (a slow one)	n	Jagach' mich goosinayich'.	Donkeys are very slow.			goosinayich'	goosinaych'i									
slowly	adv	Goosinmi mokeela gosneenotaʔ xataashi.	The woman cooked the food slowly.			goosinmi										
small	adj	Hoy'no ch'enbay' mich k'olis.	The flying bird is very small.			k'olis	k'oleesi									
small (size, amount)	adj	K’oliswaʔ maʔ. ʔohom’ maʔ naʔash leelupsal gayis.	You are small. You can’t swing well.	Shawigtaʔ naʔ k’oliswaʔan kuyuʔun.	I bought a little salt.	k'oliswaʔ_1	k'oliswaʔan									
small (to become)	v	K'oleesat wakay'.	The river is getting small.	K'oleesataʔ ʔap'om'.	The ball got smaller.	k'oleesat	k'oleesataʔ									
small one	n			Taʔshit naʔ k'oleesi.	I saw the small one.	k'olis	k'oleesi									
smell something stinky	v	Seenit naʔ ʔamin galseedaʔan.	I smelled her socks.			seenit	-----									
smell something (neutral)	v	ʔaagit naʔ xataashi.	I smelled the food.	Cheexaʔ nan ʔagtaʔ.	The dog smelled me.	ʔaagit	ʔagtaʔ									
smell sweet/aromatic	v	Dameek'at ʔeelaw'.	The flowers smelled sweet.	Dameek'ataʔ ʔeelaw'.	The flower smelled sweet.	dameek'at	dameek'ataʔ									
smelly (to become); stinky (to become)	v	Sheneetat ʔam lak'lak'.	His armpit was smelly.	Meejintaʔ sheneetataʔ ch'ek.	The diaper was really stinky.	sheneetat	sheneetataʔ									
smelly; stinky	adj	ʔamaʔ shinit cheexaʔ lihimtaʔ woloomiw.	The smelly dog ran to the meadow.	Yawaltaʔ naʔ shinita cheexaʔan woloomiw.	I chased the smelly dog to the meadow.	shinit	shinita									
smoke_1	v	Namix nim baʔmot tobakoʔon.	My friend smoked tobacco.	Baʔmotaʔ ʔaman manaw.	They smoked outside.	baʔmot	baʔmotaʔ									
smoke_2	n	Taʔishhantaʔ ch'eehan dullaw.	The smoke was seen on the mountain.	Poshtaʔ naʔ ch'eehani.	I blew the smoke away.	ch'eehan	ch'eehani									
smoke_3	v	Mijnit ch'ehnit ʔustuubaʔ.	The stove is really smoking.	Meejintaʔ ch'eehintaʔ ʔoshit.	The fire smoked a lot.	ch'ehnit	ch'eehintaʔ									
smooth	adj	Hedesh mich k'ilsan'.	The wood is smooth.	Chistaʔ naʔ k'ilsani hedeesha.	I cut the smooth wood.	k'ilsan'_1	k'ilsani									
sneeze	v	Hat'ishat naʔ manaw.	I was sneezing outside.	Hat'ishataʔ bonyil'.	He sneezed twice.	hat'ishat	hat'ishataʔ									
snore	v	Xok'lit gaaduʔ.	The cat snored.	Xok'iltaʔ cheexaʔ.	The dog snored.	xok'lit	xok'iltaʔ									
snot	n	Gamiishaw ʔam taa p'aayin sonop'.	That child's snot got on her shirt.	Taxeshga min soonop'a!	Wipe your snot!	soonop'	soonop'a									
snotty (to be)	v	Sonp'init nim sinik'.	My nose is runny.	Sonp'intaʔ ʔam sinik'.	Her nose was snotty.	sonp'init	sonp'intaʔ									
snow_2	v	ʔeenit manaw.	It's snowing outside.	ʔeenitaʔ ʔam panaataw.	It snowed when he arrived.	ʔeenit	ʔeenitaʔ									
snow_1	n	Miʔin ʔeeniʔ ch'aapit.	Then the snow melted.	Taʔishtaʔ ʔaman ʔeeniʔin.	They saw the snow.	ʔeeniʔ	ʔeeniʔin									
soak_1	v	Ch'eewit naʔ bilaasuʔun ʔilk'aw.	I'm soaking the plates in the water.	Ch'ewtaʔ hoopula yunk'uw ʔilk'aw.	She soaked the roots in warm water.	ch'eewit	ch'ewtaʔ									
soap	n	Widintaʔ hawon' banyuw.	The soap fell on the towel.	Nalt'it ʔamaʔ hawoona.	She cut the soap in half.	hawon'	hawoona									
soaproot	n	Bohloʔ soxis hidyaw helew dullaw.	Soaproot grows everywhere in the mountain.	Way'hil naʔ soxsi.	I dug out soaproot.	soxis	soxsi									
soapstone (for cooking acorn)	n	Mich k'otiʔ hiʔ halix.	This soapstone is very big.	ʔutuyga halxa hew!	Push the soapstone here!	halix	halxa									
socks	n	Lulnaʔxon' min galseedaʔ manaw.	Your socks have been hanging outside.	Meejintaʔ xoch'ooyotoʔ galseedaʔan min.	Your socks are very dirty.	galseedaʔ	galseedaʔan									
soda	n	Soodiʔ shit'eeyat.	Soda tastes good.	Shawigshiteʔ soodiʔin hidyaʔan.	I will buy soda for everybody.	soodiʔ	soodiʔin									
soft	adj	K'aminʔan' hap'is banyuʔ k'eeshiw xoʔow.	The soft cloth is drying up inside the house.	Lushga nan min hap'si ʔodxo!	Lend me your soft pillow!	hap'is	hap'si									
soften	v			Hap'estataʔ xoch'ooyo.	He softened the dirt.	hap'estat	hap'estataʔ									
soldier	n	Yoowoʔon' soldaadiʔ.	The soldiers are going home.	ʔamiltaʔ ʔaman soldaadiʔin yoowoch'i.	They helped the soldiers to go home.	soldaadiʔ	soldaadiʔin									
some	n	Juʔbaʔ yugshut bilaasuʔun.	Some (people) washed the plates.	Xatit naʔ juʔbaʔan toona.	I ate some nuts.	juʔbaʔ	juʔbaʔan									
some time ago	adv	ʔamaʔ hishtaʔ xoʔow ʔalit.	He hid in the house some time ago.	Shawigtaʔ naʔ nim sabaaduʔun ʔalit.	I bought my shoes a while back.	ʔalit										
sometimes	adv	Taaneʔ naʔ nahniʔ gew.	Sometimes I go there.	Taʔsheʔ naʔ nahniʔ ʔam.	I sometimes see him.	nahniʔ_2										
son	n	Boch'on' nim hik'eyʔan' shukshuyaw.	My son is playing in the sand.	Taʔshit naʔ ʔam jawwani boch'oona.	I saw his strong son.	boch'on'	boch'oona									
son-in-law	n	Heleenit taaxintaʔ min napaatim?	Where did your son-in-law come from?			napaatim	---									
soon_1	adv	Taaneʔ naʔ hiyaʔ.	I'll go soon.			hiyaʔ										
soon_2	adv	Sanum naʔ miʔin xon' Pelesnow.	Soon I'm going to live in Fresno.	ʔaabul' miʔin hisheʔ sanum.	The apples are going to ripen soon.	sanum										
soon_3; then	adv	Bememnan' naʔ miʔin waldina ʔilk'an.	I will fill up the bucket with water soon.	Nancy hewettaʔ miʔin yalik'taʔ.	Nancy walked, then she stopped.	miʔin										
sore	n	Hooyiltaʔ ʔam k'eewish.	His sore healed up.	K'oyoksataʔ ʔam k'eewisha.	He scratched his sore.	k'eewish	k'eewisha									
sour	adj	Mich jajil' kandeʔ.	The candy is very sour.	Tanʔetaʔ jajli maamila ʔam t'eewishaw.	He took the sour blackberries from his basket.	jajil'	jajli									
sour (to become)	v	Leejiʔ jajeelat.	The milk became sour.	Jajeelataʔ ʔapsuʔ.	The manzanita cider soured.	jajeelat	jajeelataʔ									
sourberry	n	Mich jajil' taxaatiʔ.	Sourberries are very sour.	Gobhil naʔ taxaatiʔin lagyiw.	I harvested sourberries yesterday.	taxaatiʔ	taxaatiʔin									
sourgrass	n	Bohloʔ sagmaʔ k'amnaw xoch'ooyow.	Sourgrass grows on dry soil.	Naʔash may' xatal sagmaʔan?	Can we eat sourgrass?	sagmaʔ	sagmaʔan									
south_1	adv	Nim xoʔ xomooti taawanaw.	My house is south of town.			xomooti										
south_2	adv	Taxoolow naʔ wil' xon'.	I used to live in the South.			taxoolow										
speak; talk	v	Yatit ʔamaʔ yokooch'i.	He is speaking to the people.	Yattaʔ naʔ leelilaych'i.	I talked to a teacher.	yatit	yattaʔ									
spider_1 (Lit. the fuzzy one)	n	Hishaʔan' soysoyich' dik'in gusaliw.	The spider is hiding behind the sack.	ʔan' hashaʔweg hin soysoych'i!	Don't kill this spider!	soysoyich'	soysoych'i									
spider_2 (Lit. weaver)	n	Sheleewich' diʔishtaʔ ʔam ladna ʔutuw.	The weaver spider built its nest on the tree.	ʔamaʔ jawwan shokwoʔ pushpushtaʔ shelewch'i.	The strong wind blew away the weaver spider.	sheleewich'	shelewch'i									
spill	v	ʔopxit naʔ ʔilk'a.	I spilled the water.	Taa p'ay' ʔopixtaʔ limna.	That child spilled the acorn mush.	ʔopxit	ʔopixtaʔ									
spirit (something that is not really there)	n			Taʔishtaʔ naʔ haʔhich'iwa.	I saw the spirit.	haʔhich'iw	haʔhich'iwa									
spit	v	Ch'ipxilit ʔaman.	They spat.	Ch'ipxiltaʔ tabakoʔon xoch'ooyow.	He spat the tobacco on the ground.	ch'ipxilit	ch'ipxiltaʔ									
split	v	Ch'aat'it naʔ hedeesha.	I split the wood.	Ch'attaʔ sheleela laasan.	He split the rock with an ax.	ch'aat'it	ch'at'taʔ									
spoon	n	Hiʔ nim gusal'.	This is my spoon.	Xayaataʔ gusali boshowow.	He put the spoon on the round stone.	gusal'	gusali									
spread_1	v	Weet'it naʔ shoboono.	I spread out the blanket.	Wet'taʔ ʔaman deyendaʔan.	They spread out the canvas tent.	weet'it	wet'taʔ									
spread something on oneself	v	Shaaluʔun naʔ k'elwisheʔ.	I'm going to spread coal on myself.			k'elwishit	k'elwishtaʔ									
spring (freshwater)	n	Hiʔ paaxish k'amaanitaʔ ʔalit.	This spring dried up some time ago.	Taʔishtaʔ ʔaman k'amna paaxisha.	They saw the dried up spring.	paaxish	paaxisha									
springtime	adv	ʔelweʔ ʔuk hodhodiʔ tishamyuw?	Does Indian paintbrush bloom in the spring?			tishamyuw										
spruce up	v	Majeeʔat nim naʔat.	My big sister spruced up.			majeeʔat	majeeʔataʔ									
spruce up someone	v	Majeeʔalat naʔ nim naʔata.	I made my big sister spruced up.			majeeʔalat	majeeʔalataʔ									
spurs	n	Lulnaʔxon' sepwelaʔ nim gullaliw.	My spurs have been hanging on the fence.	Xayaawushit naʔ nim sepwelaʔan.	I put on my spurs.	sepwelaʔ	sepwelaʔan									
spy on somebody/something	v	Lipit gaaduʔ ch'enbayi.	The cat spied on the bird.	Liptaʔ kaʔyuʔ gawaayuʔun.	A coyote spied on the horse.	lipit	liptaʔ									
squeeze; squish	v	Ch'eweexit ʔaman tomaatiʔin.	They squeezed the tomatoes.	Ch'ewextaʔ naʔ patsi.	I squeezed the hair lice.	ch'eweexit	ch'ewextaʔ									
squirrel, grey; grey squirrel	n	Xataʔan' maw' simiiyaʔan.	The grey squirrel is eating seeds.	Maawi naʔ wanit toonan.	I gave the grey squirrel some nuts.	maw'	maawi									
squirrel, ground; ground squirrel	n	Shidgil' ʔam waayit shoyxo.	The squirrel dug its hole.	Shidgila naʔ bokhil peeliw.	I found a squirrel on the road.	shidgil'	shidgila									
stab	v	K'ashk'ashit noonoʔon.	He just stabbed the man.			k'ashk'ashit	k'ashk'ashtaʔ									
star	n	Sipin' ʔamaa ch'aytash xot.	The star was up there.	ʔohom' ʔoch'yeetaʔ ch'aytashi.	He did not get closer to the star.	ch'aytash	ch'aytashi									
star (shooting star)	n					t'uyahin ch'aytash										
stay	v	Xot ʔaman nim xoʔow.	They are staying in my house.	ʔamaa duʔ naʔ xootoʔ yet' semaniw.	I stayed there last week, y'know.	xot	xootoʔ									
stay overnight	v	ʔaxit naʔ ʔam xo'ow.	I'm staying overnight in her house.	ʔaxtaʔ ʔaman dullaw.	They stayed overnight in the mountain.	ʔaxit	ʔaxtaʔ									
stay until morning	v	Tawnit ʔaman nim xoʔow.	They stayed in my house until morning.	Taawintaʔ naʔ hew.	I stayed here until morning.	tawnit	taawintaʔ									
steal	v	ʔooshut taa noonoʔ ʔotmobiila.	That man stole a car.	ʔoshtoʔ nim won'shi.	He stole my purse.	ʔooshut	ʔoshtoʔ									
step on something	v	Daach'it naʔ laabuʔun.	I stepped on a nail.	Dach'taʔ naʔ cheexaʔan k'uta.	I stepped on the dog's tail.	daach'it	dach'taʔ									
step over	v	Lahwit p'ayeeʔi sheleela.	The children are stepping over the rocks.	Lahiwtaʔ naʔ wakaaya.	I stepped over the creek.	lahwit	lahiwtaʔ									
stepchild	n	Taanit p'aayeʔhanaʔ nim hidwash ʔamaamin.	My stepchild went with them.	Taʔishtaʔ ʔaman nim p'aayeʔhanaʔan.	They saw my stepchild.	p'aayeʔhanaʔ	p'aayeʔhanaʔan									
stepfather	n					nopop nanan										
stepmother	n					noʔom nanan										
stick	n	Ch'apeeyahil wech'et sheeʔaliw lagyiw.	The stick got wet in the rain yesterday.	Chishit naʔ wech'eeta nok'ochon.	I cut the stick with a knife.	wech'et	wech'eeta									
stick tongue out at somebody	v	Maldit ganaaduʔ ʔamaamin.	The cow is sticking its tongue out at them.	Malidtaʔ maʔ nan.	You stuck your tongue out at me.	maldit	malidtaʔ									
stick; glue	v	Bobbil' ch'aʔit nim nomchi.	The paper stuck to my thumb.	Ch'aʔtaʔ saak'at ʔam teeliya.	The gum stuck to his teeth.	ch'aʔit	ch'aʔtaʔ									
stiff (to be)	v	Heejat nim k'ewet.	My back became stiff.	Heejataʔ k'ewet nim.	My back became stiff.	heejat	heejataʔ									
still	adv	Heddaʔ beenaxon' ʔam shilshi.	He is still combing his hair.			heddaʔ										
sting	v	Diyit nan bawnay'.	The bee stung me.	Diytaʔ bawnay' ʔam cheexaʔan.	The bee stung his dog.	diyit	diytaʔ									
stink up	v	K'aheytat ʔaman ch'uyuʔhuya.	They stank up the bathroom.			k'aheytat	k'aheytataʔ									
stinky_1	adj	Sox mich k'ahiy'.	The skunk really stinks.	Cheexaʔ hoxotʔon' k'ahyi sooxi.	The dog is barking at the stinky skunk.	k'ahiy'	k'ahyi									
stinky (to become)_1	v	K'aheeyat nim cheexaʔ.	My dog stank.	Sox k'aheeyataʔ.	The skunk stank.	k'aheeyat	k'aheeyataʔ									
stinky_2	adj	Mich xohish taa ch'iknaʔ boʔush.	That rotten meat is really stinky.			xohish	---									
stinky (to become)_2	v	Hiʔ noonoʔ mijnit xoheeshat.	This man became really stinky.			xoheeshat	xoheeshataʔ									
stinky_3; smelly_3	adj					sheenit	---									
stir	v	Weelet naʔ leejiʔin.	I stirred the milk.	Weeletaʔ naʔat nim limna.	My older sister stirred the acorn mush.	weelet	weeletaʔ									
stomach	n	K'oʔomwulan' nim balik'.	My stomach is growling.	Bilyit' ʔamaʔ nim balk'a.	He leaned hard on my stomach.	balik'	balk'a									
stone	n	Widintaʔ shelel' dadaach'iw ʔam.	The rock fell on his foot.	K'oʔut sheleela baalaw.	He threw the rock at the shovel.	shelel'	sheleela									
stone (round kind, to crack acorns)	n	Bagneʔ boshow' ʔilk'aw.	The stone is going to sink in the water.	Maaxeʔ naʔ boshowa.	I'm going to pick up the round stone.	boshow'	boshowa									
stop; stand	v	Yalk'it naʔ teseech'iw.	I stopped (myself) at the door.	Yalik'taʔ naaʔak' ch'enawiw.	Both of us stood in the shadow.	yalk'it	yalik'taʔ									
store	n	Haʔehhin denderoʔ t'uluntaʔ.	The clothing store burned up.	Namix nim k'eltaʔ denderoʔon.	My friend painted the store.	denderoʔ	denderoʔon									
story	n	Mich gayis washhanaʔ.	The story is very good.	Laniyga ʔam washhanaʔan!	Listen to his story!	washhanaʔ	washhanaʔan									
story teller	n	Washach' panan' miʔin.	The story teller will arrive soon.	Yattaʔ naʔ washaach'i.	I talked to the story teller.	washach'	washaach'i									
stove	n	Xap'eelat hiʔ ʔustuubaʔ.	This stove is getting hot.	Mayni naʔ yugushtaʔ ʔustuubaʔan.	I myself cleaned the stove.	ʔustuubaʔ	ʔustuubaʔan									
straight	adj	Taa Kim dugugwal' shilsham'.	That's Kim with straight hair.	Taʔshit naʔ ʔam dugugwali shilshi.	I saw her straight hair.	dugugwal'	dugugwali									
straighten	v	Duguglat naʔ nim k'eweeta.	I straightened my back.	Duguglataʔ taa mokeela ʔam shilshi.	That woman straightened her hair.	duguglat	duguglataʔ									
stretch	v			Yuttaʔ tuxach'.	The rope stretched.	yutut	yuttaʔ									
stretch something	v	Yutnut naʔ tuxaach'i.	I stretched the rope.	Yutuntaʔ naʔ hiiluʔun.	I stretched the thread.	yutnut	yutuntaʔ									
string; thread	n	Widnit hiiluʔ ʔadlen lameesaʔan.	The thread fell under the table.	Beyeechit naʔ hiiluʔun.	I twisted the string.	hiiluʔ	hiiluʔun									
stuck (to be, to become)	v	Gashit dadach' ʔam ʔadlen sheleela.	His foot got stuck under the rock.	Gashtaʔ naʔ biibaw.	I got stuck in the pipe.	gashit	gashtaʔ									
stud	n	Laytaʔ ʔam gananyuʔ.	The stud kicked him.	Ch'ik'taʔ gananyuʔun noonoʔ gullaliw.	The man tied the stud to the fence.	gananyuʔ	gananyuʔun									
student	n	Xateʔ leleeyich' manaw.	The students will eat outside.	Yooyot ʔamaʔ leleych'i.	She called the students.	leleeyich'	leleych'i									
suck (and chew)	v	K'eshgat naʔ ch'eeya.	I sucked on the bone.	K'eshgataʔ ʔam nomchi.	He chewed his thumb.	k'eshgat	k'eshgataʔ									
suck (e.g. blood)	v	Dooyut k'oolapiʔ nim paayax.	The mosquito sucked my blood.	Mijnit ʔam doytoʔ leejiʔin.	She really sucks the milk.	dooyut	doytoʔ									
sugar	n	Papyit suugalaʔ lameesaw.	The sugar scattered on the table.	Wanhil naʔ ʔam suugalaʔan.	I gave him some sugar.	suugalaʔ	suugalaʔan									
summer	adv	ʔeepeʔ naʔ hayaalataw.	I swim in the summer.			hayaalataw										
sun; clock	n	Haweeshataw ʔop tishit?	What time did the sun come out?	Piʔaʔxon' ʔaman ʔoopo.	They have been waiting for the sun.	ʔop	ʔoopo									
Sunday	adv	Miisan' wil' Dominkanaw.	He used to go to church on Sundays.			Dominkanaw										
swallow	v	Meek'it naʔ saak'at.	I swallowed the gum.	Mek'taʔ ʔilk'a.	She swallowed the water.	meek'it	mek'taʔ									
sweat_1	n	Ch'uwch'uwut ʔam sumk'un.	His sweat dripped.	Sumk'una ʔam taxeshhil.	He wiped his sweat.	sumk'un	sumk'una									
sweat_2	v	Noonoʔ sumk'unut.	The man was sweating.	Taa p'ay' sumk'untaʔ.	That child was sweating.	sumk'unut	sumk'untaʔ									
sweater	n	Looluntaʔ shuwedaʔ teseech'iw.	The sweater hung on the door.	Xayaawushga shuwedaʔan!	Put on a sweater!	shuwedaʔ	shuwedaʔan									
sweathouse	n	Taʔishhaneʔ mos hew.	The sweathouse is visible from here.	Diʔsheʔ ʔaman moso ʔooch'iy' wakaaya.	They will build the sweathouse near the river.	mos	moso									
sweep	v	Ch'enshit naʔ xoʔo.	I swept the house.	Ch'enishtaʔ hidyaw helew.	He swept everywhere.	ch'enshit	ch'enishtaʔ									
sweet	adj	Mich k'uyuk' suugalaʔ.	Sugar is very sweet.	Xatit naʔ k'uyk'u ʔaabula.	I ate a sweet apple.	k'uyuk'	k'uyk'u									
sweet (to become)	v	K'uyuuk'at hiʔ ʔaabul'.	This apple just became sweet.	Meejintaʔ k'uyuuk'ataʔ sandiiyaʔ.	The watermelon became really sweet.	k'uyuuk'at_2	k'uyuuk'ataʔ									
swell	v	Shownit min shashaʔ.	My eyes are swollen.	Mejnit dugmaʔich' showintaʔ.	The bruise really swelled.	shownit	showintaʔ									
swim	v	Lagyiw Cheryl ʔeepit wakaayaw.	Yesterday Cheryl swam in the river.	ʔeptaʔ ʔaman t'inhanaw.	They swam in the dam.	ʔeepit	ʔeptaʔ									
swimming pool	n					ʔipaʔhiy'	ʔipaʔhiya									
swimsuit	n	Looluntaʔ ʔam ʔepmixiʔ ʔooch'iy' lameesaʔan.	Her swimsuit hung near the table.	Shawigtaʔ ʔepmixiʔin.	She bought a swimsuit.	ʔepmixiʔ	ʔepmixiʔin									
swing	v	Leelupsat ʔamaʔ ʔinnilaw, miʔin widnit.	He swung in the yellow pine tree, then he fell.	Leelupsataʔ naʔ ʔutuw.	I swung in the tree.	leelupsat	leelupsataʔ									
swing while hanging	v	Lullulyat naʔ ʔutuw.	I swung in the tree.			lullulyat	lullulyataʔ									
table	n	Xoch'ooyot lameesaʔ manaw.	The table became dirty outside.	K'eltaʔ lameesaʔan shik'wina.	She painted the white table.	lameesaʔ	lameesaʔan									
tail	n	Goosin k'ut' yuxaʔich'.	The pig's tail is curly.	Dach'taʔ naʔ ʔam k'ut'a.	I stepped on its tail.	k'ut'	k'ut'a									
tailor	n	Yooweʔ beweenich' nomeech'ataw.	The tailor goes home at eight oʔclock.	Ch'awaalataʔ naʔ bewench'i.	I paid the tailor.	beweenich'	bewench'i									
take away from	v	Wodlit ʔaman gayeedaʔan naanin.	He took away the cookies from us.	Wodiltaʔ ʔam beenaʔan.	He took away her comb.	wodlit	wodiltaʔ									
take care of someone	v	Goyet ʔam nopoopo.	He took care of his father.	Goyetaʔ naʔ nim ʔen'shayi.	I took care of my grandmother.	goyet	goyetaʔ									
take off (e.g. clothes)	v	Noonoʔ jageedaʔan ʔam ʔoxiwit.	The man took off his coat.	ʔoxiwtaʔ ʔam sabaaduʔun ʔooch'iy' teseech'i.	He took off his shoes by the door.	ʔoxyit	ʔoxiytaʔ									
take out	v	Tishat ʔam yaaweʔen.	He took out his keys.	Tishataʔ gusali.	He took out the spoons.	tishat	tishataʔ									
take something	v	Tanʔet naʔ gayeedaʔan.	I took the cookies.	Miʔin Kaʔyuʔ tanʔetaʔ shukshuya.	Then Coyote took the sand.	tanʔet	tanʔetaʔ									
take something home	v	Limk'i naʔ yowmixit.	I took the black one home.	Yowmixtaʔ ʔamaʔ nim somleelaʔan.	She took home my hat.	yowmixit	yowmixtaʔ									
talkative	adj	Hiʔ yast'itin noonoʔ.	Here is the man who talks a lot.	Doshtoʔ yast'itni, Yanaanag!	He told the blabber mouth to be quiet.	yast'itin	yast'itni									
tall; long	adj	Noʔom nim waʔat'.	My mother is tall.	Chishtaʔ ʔam waʔat'i shilshi.	She cut her long hair.	waʔat'	waʔat'i									
tarantula	n	Shaʔlalluʔ heweetit peeliw.	The tarantulas walked on the road.	Wantaʔ naʔ ʔam k'otiʔin shaʔlalluʔun.	I gave him a big tarantula.	shaʔlalluʔ	shaʔlalluʔun									
tarweed seed	n	Papiytaʔ lipis xoch'ooyow.	Tarweed seeds scattered on the ground.	Gobtoʔ naʔ lipsa.	I gathered the tarweed seeds.	lipis	lipsa									
taste good; delicious	v	Shit'eeyat hiʔ xatash.	This food tastes good.	Shit'eeyataʔ lopis.	The fish tasted good.	shit'eeyat	shit'eeyataʔ									
taste something	v	Daʔit naʔ gayeedaʔan.	I tasted some cookies.	Daʔtaʔ xataashi.	He tasted the food.	daʔit	daʔtaʔ									
tattler	n	Taʔshit doosheenaʔ nan.	The tattler saw me.	Taʔishtaʔ naʔ ʔam doosheenaʔan.	I saw the tattler.	doosheenaʔ	doosheenaʔan									
tea	n	Xap'eelat tiy'.	The tea is hot.	Tiya naʔ miʔin ʔugnoʔ.	I'm going to drink tea soon.	tiy'	tiya									
teacher	n	K'eshneʔ miʔin leelilayich'.	The teachers will come in soon.	Shawigshittaʔ leelilaych'i bobbila.	She bought papers for the teachers.	leelilayich'	leelilaych'i									
tear	v	Seepit naʔ bobbila.	I tore the paper.	Septaʔ ʔam naawashi.	She tore her dress.	seepit	septaʔ									
tear (for eyes)	v	Manaalit nim shashaʔ.	My eyes teared up.	Manaltaʔ ʔam shashaʔ.	His eyes teared up.	manaalit	manaltaʔ									
tease	v	T'igt'igit naʔ ch'enbayi.	I'm teasing the bird.	T'igt'igtaʔ naʔat nim ʔam namxa.	My older sister teased her friend.	t'igt'igit	t'igt'igtaʔ									
television (Lit. something to watch)	n	Hili min taʔashhiy'?	Where's your t.v.?	Taʔshiʔxon' naʔ taʔashhiya.	I'm watching t.v.	taʔashhiy'	taʔashhiya									
tell a story	v	Matt washit.	Matt told a story.	Washtaʔ taa noonoʔ nim xoʔow.	That man told a story at my house.	washit	washtaʔ									
tell someone about something; report	v	Doshit ʔam nim nopop yoloowin .	My father told him about the gathering.	Doshtoʔ nan hoshew.	He told me about the cold.	doshit	doshtoʔ									
ten	n	Halaʔlet ch'eyew' noonoʔ hedeesha migch'i.	Ten men lifted the heavy wood.	Tishataʔ ʔaman ch'eywa bilaasuʔun.	They took out ten plates.	ch'eyew'	ch'eywa									
ten times	adv	Poytoʔ sheleela ch'eywil'.	He pounded the rock ten times.			ch'eywil'										
testicles	n					honoch'	honooch'a									
that	det	Taa noonoʔ k'eeshinhil denderow.	That man went in the store.	Taʔishtaʔ ʔamak' tan noonoʔon.	They both saw that man.	taa	tan									
that (indefinite)	dem	ʔohom' hudtaʔ ʔamaʔ haʔ daʔ xi.	He didn't know what that was.			xi										
that way	adv	Taamum' gobgo bayna!	Gather some acorns that way!			taamum'										
that way (farther away than taamum')	adv	Huyuch' daʔ ʔamak' lihimtaʔ geemum'?	Did they both run that way?			geemum'										
their	pron	Xoʔ ʔamaamin ʔooch'iy' naanin xoʔ.	Their house is close to ours.			ʔamaamin										
their (dual)	pron	P'ay' ʔamaagin mich kandeʔich'.	Their child is a real candy-eater.			ʔamaagin										
there_3 (over there, farther than 'taw', or a location not visible to the speaker)	adv	Hewetga gew!	Walk over there!			gew										
there_1	adv	Miʔin ʔamaʔ noonoʔ xayaataʔ hedeesha ʔamaa ʔoshtow.	Then a man put the log there in the fire.			ʔamaa										
there_2	adv	K'eeshintaʔ xoʔow taw.	He went into the house there.			taw										
these	det	Hishin mokeela hach'aamiʔ.	These women are young.	Hishin yokuch' gadaayit.	These people are hungry.	hishin										
these two	n	Saniysilit hishik'.	These two are scary.	Yoyootoʔ naʔ hishiik'a.	I called these two.	hishik'	hishiik'a									
they	pron	ʔaman xataʔan'.	They are eating.	Linda wantaʔ ʔamaamin hedeeshan.	Linda gave them wood.	ʔaman	ʔamaamin									
they (dual)	pron	Bememlataʔ ʔamak' k'otiʔin gahoona.	They both filled up the big box.	Jack ʔutyut ʔamaamig.	Jack pushed them both.	ʔamak'	ʔamaamig									
thick	adj	Shobon' mich dindinich'.	The blanket is very thick.	Jageedaʔ ʔam dindinich'.	Her jacket is thick.	dindinich'_2	dindinch'a									
thief	n	Tishit ʔilp'aw ʔushtutun.	The thief came out of the cave.	Taʔishtaʔ naʔ ʔushtutna.	I saw the thief.	ʔushtutun	ʔushtutna									
thigh (hip to knee)	n	Heexaʔ nim k'owiy'.	My thighs are fat.	ʔach'ch'it k'oolapiʔ nim k'owyo.	A mosquito bit my thigh.	k'owiy'	k'owyo									
thin and tall	adj	Noonoʔ mich k'ilsan'.	The man is really thin and tall.	Yattaʔ naʔ k'ilsani noonoʔon.	I talked to the thin man.	k'ilsan'_2	k'ilsani									
think	v	Ch'edmat naʔ nim noʔoomo.	I thought about my mother.	Haʔan daʔ maʔ ch'edmataʔ?	What did you think about?	ch'edmat	ch'edmataʔ									
thirsty (to be)	v	Dawshit naʔ.	I'm thirsty.	Meejintaʔ Kate dawishtaʔ.	Kate was very thirsty.	dawshit	dawishtaʔ									
this (visible)	dem	Hiʔ k'ayaxit heexaʔ.	This salmon is fat.	Paw'taʔ naʔ hin gamiishaʔan.	I fit in this shirt.	hiʔ_2	hin_2									
this direction	adv	Xamen' taxintaʔ Kaʔyuʔ.	Coyote came this direction.			xamen'										
this one (invisible)	n, dem	Nim nohʔoʔ hiniʔ k'eeshiw xoʔow.	My bear is inside the house.			hiniʔ	hinin									
this one (visible)	n	Hiʔ daʔ nim kapash.	This is my friend.	Haʔan daʔ maʔ hoyʔon' hin?	What do you call this?	hiʔ_1	hin_1									
this way	adv	Taʔishtaʔ naʔ mam panaach'i heemum'.	I saw you coming this way.			heemum'										
those	dem	Hewetʔan' tashin hach'aamiʔ mokeela.	Those young women are walking.			taashin										
those two	dem	T'ultaʔ taashik' xoʔ.	Those two houses burned down.			taashik'										
thousand	n	yet' mil'	one thousand	bonoy' mil'	two thousand	mil'	---									
thread	v	Shuyt'ut naʔ ʔawuuhaʔan.	I threaded the needle.	Shuyut'taʔ naʔ nim sabaaduʔun.	I threaded (the laces of) my shoes.	shuyt'ut	shuyut'taʔ									
three	n	Hoy'nit shoopin ch'enbay' waʔlaw.	Three birds flew in the sky.	Hoyuch'taʔ naʔ shoopina ʔaabula.	I wanted three apples.	shoopin	shoopina									
three o'clock	adv	Shopeeyataw naʔ doktoni taʔsheʔ hikaw.	I'm going to see the doctor at three o'clock tomorrow.			shopeeyataw										
three times	adv	ʔop tishit shopyil'.	The sun came out three times.			shopyil'										
throw away	v	ʔipsit naʔ bilaasuʔun.	I threw away the plate.	ʔipistaʔ jageedaʔan.	He threw away the jacket.	ʔipsit	ʔipistaʔ									
throw down	v	Jageedaʔan nim naʔ wumlit.	I threw down my jacket.	Wumiltaʔ wech'eeta laʔlaw.	He threw a stick at the goose.	wumlit	wumiltaʔ									
throw up	v					hoxshat	hoxshataʔ									
throw; hit	v	K'oʔut Ninaʔ ʔap'ooma gullaliw.	Nina threw the ball to the fence.	Hamaʔan naʔ k'oʔtoʔ laabuʔun.	I hit the nail with a hammer.	k'oʔut	k'oʔtoʔ									
thumb; finger_2; toe_2	n	Waʔat' nim noomich.	My fingers are long.	K'eshgat ʔam nomchi.	He chewed his thumb.	noomich	nomchi									
thump	v			ʔamaʔ dolk'ok'noʔ t'ink'otoʔ ʔamaamin ʔoch'owo.	The giant thumped their head.	t'ink'ot	t'ink'otoʔ									
thunder	n	Meejintaʔ wemyas jalaawintaʔ.	The thunder is very loud.	Wemyasi naʔ laniytaʔ waʔ henew.	I heard the thunder far away.	wemyas	wemyasi									
Thursday	adv	Panan' Pelesnow Hadeebanaw.	She is going to arrive in Fresno on Thursday.			Hadeebanaw										
tick	n	Mich galjin tipik' hew.	There are many ticks here.	Hashaʔwetaʔ tipk'a.	He killed the tick.	tipik'	tipk'a									
tie	v	Ch'ik'it baseenoʔon gullaliw.	He tied the calf to the fence.	Ch'ik'taʔ ʔam shilshi ʔalit.	He tied his hair some time ago.	ch'ik'it	ch'ik'taʔ									
tighten	v	Hech'eeyit naʔ hiiluʔun.	I tightened the thread.	Hech'eytaʔ ʔaman tuxaach'i.	They tightened the rope.	hech'eeyit	hech'eytaʔ									
tiptoe	v	Halum'sat p'ayeeʔi k'eeshinmi xoʔow.	The kids tiptoed when they came in the house.	Halum'sataʔ ʔaman halaadaʔ woʔyexootoʔ noʔom.	They tiptoed because mother was sleeping.	halum'sat	halum'sataʔ									
tired (to become)	v	Moynit naʔ.	I'm tired.	Moyintaʔ Deemaysuʔ.	Hummingbird was tired.	moynit	moyintaʔ									
today	adv	Lopsineʔ ʔaman miʔin hay'li.	They are going to go fishing today.			hay'li										
together with; with	adv	Lopsilit hitwash ʔam nopoopo.	He went fishing together with his father.			hitwash										
tomato	n	Bohlut tomaatiʔ nim woyʔenaw.	Tomatoes are growing in my garden.	Ch'eweexit naʔ tomaatiʔin.	I crushed the tomatoes (by stepping on them).	tomaatiʔ	tomaatiʔin									
tomorrow	adv	Hikaw may' heweeteʔ.	We are going to walk tomorrow.			hikaw										
tongue	n	Taxeetat ʔam talxas.	His tongue is hurting.	ʔach'ch'it ʔam talxasi.	She bit her tongue.	talxas	talxasi									
tooth	n	Shek'eewat ʔam teeliy'.	His teeth became white.	Yugshut naʔ nim teeliya.	I washed (i.e. brushed) my teeth.	teeliy'	teeliya									
tortilla	n	Duldiiyaʔ galaabiyit diʔishtin.	Tortilla is difficult to make.	Xattaʔ naʔ hidyaʔan duldiiyaʔan.	I ate all the tortillas.	duldiiyaʔ	duldiiyaʔan									
touch	v	Niwit ʔam weebina.	She is touching his arm.	Niw'taʔ taa p'ay' ʔam namxa. 	That child touched his friend.	niwit	niw'taʔ									
towel_2 (Lit: something to dry with)	n	Xoch'ooyot k'amaanewishhiy'.	The towel is dirty.	Maaxit k'amaanewishhiya.	He picked the towel.	k'amaanewishhiy'	k'amaanewishhiya									
towel_1; rag; cloth	n	Ch'apyit banyuʔ.	The towel is wet.	Shawgeʔ naʔ banyuʔun shoopina.	I'm going to buy three towels.	banyuʔ	banyuʔun									
town	n	Mich gayis hiʔ taawan'.	This town is very good.	Miʔin ʔamak' Nohʔoʔ ʔamaʔ yoʔ Kaʔyuʔ loltoʔ taawana.	And Bear and Coyote left town.	taawan'	taawana									
toy	n	Hik'eywish hidyaw xoch'ooyow.	The toys are everywhere on the floor.	Shawgeʔ ʔamaʔ juʔbaʔan hik'eywishi.	He's going to buy some toys.	hik'eywish	hik'eywishi									
train	n	Mich ʔayax hiʔ galil'.	This train is very fast.	Galiila naʔ shadgintaʔ.	I rode the train.	galil'	galiila									
treat medically	v					wexlit	weexiltaʔ									
tree	n	Bohloʔ miʔin galjin ʔutuʔ hew.	Many trees will soon grow here.	Halaxnit shidgil' ʔutuʔun.	The squirrel climbed the tree.	ʔutuʔ	ʔutuʔun									
trim branches	v	K'aalit naʔ ʔutuʔun.	I trimmed the branches of a tree.	K'altaʔ naʔ hedeesha.	I trimmed the branches off the wood.	k'aalit	k'altaʔ									
trip	v	Dal'wit tan noonoʔon.	He tripped that man.	Daliw'taʔ cheexaʔan k'ut' nan.	The dog's tail tripped me.	dal'wit	daliw'taʔ									
trip and fall	v	Dal'winit ʔamaʔ halaaxinmi ʔutuʔun.	He tripped and fell when he climbed the tree.	ʔohom' daʔ dal'wintaʔ ʔamaʔ.	He did not trip and fall.	dal'winit	dal'wintaʔ									
trouble (to cause one); cause trouble	v					dishyinat	dishyinataʔ									
trout	n	ʔamaʔ dalim' beelit wakaayaw.	The trout swam in the river.	Taʔshit naʔ dal'ma.	I saw the trout.	dalim'	dal'ma									
try	v	Dameenataʔ naʔ gayeedaʔan.	I tried the cookies.	Dameenataʔ naʔ deʔeshich' woshok'o.	I tried to make a belt.	dameenat	dameenataʔ									
Tuesday	adv	Taaneʔ naʔ Pelesnow Boneeyanaw.	I'm going to Fresno on Tuesday.			Boneeyanaw										
tule (round)	n	Bohleʔ bumuk' hew.	Tule grows here.	Chishit ʔaman bumuk'a.	They cut some tules.	bumuk'	bumuk'a									
turkey	n					wohloodeʔ	wohloodeʔen									
flip over oneself	v	Ch'adbinit ʔow'.	The turtle flipped over.	Ch'adbintaʔ cheexaʔ, miʔin lihimtaʔ.	The dog flipped over, then it ran.	ch'adbinit	ch'adbintaʔ									
turn on	v	P'ishit Ninaʔ weelaʔan.	Nina turned on the light.	P'ishtaʔ ʔaman weelaʔan xoʔow.	They turned on the lights in the house.	p'ishit	p'ishtaʔ									
turn one's back on others (with anger)	v	Bishlit magwa ch'enbay'.	The bird turned its back on both of us.	Holeelataʔ ʔamaʔ, bishiltaʔ nan.	She got angry, she turned her back on me.	bishlit	bishiltaʔ									
turtle	n	Ch'adbinit ʔow'.	The turtle flipped over.	Ch'adibtaʔ naʔ ʔoowi.	I flipped the turtle over.	ʔow'	ʔoowi									
tweezers	n	Widneʔ biwiwshiy' xoch'ooyow.	The tweezers will fall on the ground.	Shawgit naʔ biwiwshiya.	I bought a pair of tweezers.	biwiwshiy'	biwiwshiya									
twice	adv	Bonyil' naʔ han'taʔ waldina.	I kicked the bucket twice.			bonyil'										
twins; coffee berry (Rhamnus californica)	n	Waxalʔan' nim ch'iinalis.	My twins are crying.	Yooyot naʔ ch'iinalisa.	I called the twins.	ch'iinalis	ch'iinalisa									
twist	v	Beyeechit naʔ ʔam nomch'i.	I twisted his finger.	Beyech'taʔ naʔ nim dadaach'in kuyuʔun.	I twisted my ankle.	beyeech'it	beyech'taʔ									
two	n	K'eshneʔ xoʔow bonoy' noch'oʔ.	Two boys are going to go inside the house.	Walxog bonyo teseech'i!	Pass two doors!	bonoy'	bonyo									
uncertain expression	particle	Huyuch' ʔug maʔ hoyoch'ʔan' keek'a?	Maybe you'd like some cake?			ʔug										
uncle	n	Xon' noxox nim Pelesnow.	My uncle lives in Fresno.	Miʔin yoʔkem taʔishtaʔ ʔam noxooxi.	When he came back, he saw his uncle.	noxox	noxooxi									
under	prep	Huluushaxon' ʔadlen waʔat'i ʔutuʔun.	She is sitting under a tall tree.			ʔadlen										
underpants	n					galshimsiya										
urinate	v	Ch'oyot ʔam tantaw ch'uyuʔhuyaw.	He's wetting as he's walking to the restroom.	Ch'oyootaʔ taa p'ay' xattaw.	That child wetted himself while eating.	ch'oyot	ch'oyootaʔ									
urinate (for animals or slang use)	v	Cheexaʔ k'ay'it ʔutuʔun.	The dog peed the tree.	Xoy' k'ay'taʔ ʔeelawi.	The deer peed on the flower.	k'ay'it	k'ay'taʔ									
us (dual, not including you) (cf. we dual)	pron	Basyalit maʔ naanig.	You visited us both.			naanig										
us (including you)	pron	Taʔishtaʔ maywa.	He saw us (including you).			maywa										
us (not including you)	pron	Hujut nohʔoʔ naanin.	The bear growled at us (excluding you).			naanin										
used to	adv	Xon' naʔ wil' Pelesnow.	I used to live in Fresno.			wil'										
vagina	n					godos	godosi									
valley oak; oak (valley)	n	Mich waʔat' k'eemixiy'.	The white oak is very tall.	Halaaxintaʔ t'uyt'uy' k'eemixya.	The chipmunk climbed the white oak.	k'eemixiy	k'eemixya									
valley; meadow	n	P'aʔash mijnit k'amnit.	The valley is really dry.	Wal'maʔ t'ultaʔ p'aʔaashi.	The lightning burned the meadow.	p'aʔash	p'aʔaashi									
vegetables, crunchy	n					ch'edaʔhiy'	ch'edaʔhiya									
vegetables, leafy greens	n	Ch'eeʔam naʔ woyʔit.	I planted green vegetables.			ch'eeʔam	---									
venereal disease	n					k'oyach	---									
very; really	adv	T'inhanaʔ mich k'otiʔ.	The dam is very big.	Mich galjin kuyuʔ.	There is an awful lot of salt.	mich										
visit	v	Basyalit naʔ nim naʔata.	I visited my older sister.	Basyaltaʔ ʔamak' ʔamin noshoosho.	The two of them visited their aunt.	basyalit	basyaltaʔ									
vomit	v	Hokshat ʔam tantaw hospitlaw.	She's throwing up as she was going to the hospital.	Tixtanaʔ hokshataʔ.	The sick one threw up.	hokshat	hokshataʔ									
vulture (Lit. one that circles around)	n					gidwiyaʔich'	---									
wait for	v	Piʔit ʔamaʔ ʔesteejiʔin.	He's waiting for the bus.	Piʔtaʔ naaʔan mam.	We waited for you.	piʔit	piʔtaʔ									
wake up	v	Shalk'it p'ay', miʔin waxlit.	The baby woke up and cried.	Shalik'taʔ ʔaman, miʔin waʔiltaʔ.	They woke up and had breakfast.	shalk'it	shalik'taʔ									
walk	v	Heweetit ʔaman.	They are walking.	ʔohom' Ninaʔ hewettaʔ.	Nina didn't walk.	heweetit	hewettaʔ									
walk around	v	Hew'hewtat.	He walked around.			hew'hewtat	hew'hewtataʔ									
walk fast	v	Hiw'hiwit.	She's walking fast.	Hiw'hiwtaʔ ʔaman.	They walked fast.	hiw'hiwit	hiw'hiwtaʔ									
wallet; purse; pocket; pouch	n	ʔoshhantaʔ nim wonish.	My wallet was stolen.	Shawigtaʔ hablik'ya won'shi.	She bought a red purse.	wonish	won'shi									
want; like	v	Hoych'it kandeʔen.	She wanted a candy.	Nopop nim hoyuch'taʔ hach'aamiʔin xoʔo.	My father wanted a new house.	hoych'it	hoyuch'taʔ									
warm_1	adj	ʔohom' daʔ nomik' kapeʔ shit'eeyan'.	Warm coffee does not taste good.	ʔopixtaʔ ʔamak' nomk'i ʔilk'a.	They two poured out the warm water.	nomik'	nomk'i									
warm_2	adj	Baanaʔ yunuk'.	The bread is warm.	Diʔishtaʔ ʔamaʔ yunk'u limna.	She made warm acorn mush.	yunuk'	yunk'u									
warm (to become)	v	Yunuuk'at ʔamaʔ.	He got warm.	Yunuuk'ataʔ manaw.	It warmed up outside.	yunuuk'at	yunuuk'ataʔ									
warm up something	v	Yunuk'tat xataashi.	He warmed up the food.	Yunuk'tataʔ ʔam kapeʔen.	She warmed up her coffee.	yunuk'tat	yunuk'tataʔ									
wash	v	Yugshut naʔ banyuʔun.	I washed a rag.	Yugushtaʔ ʔam teeliya.	He washed his teeth.	yugshut	yugushtaʔ									
washing machine	n	ʔohom' daʔ hijmaʔ yugushhuy'.	Washing machine is not cheap.	Shawigtaʔ ʔaman yugushhuya.	They bought a washing machine.	yugushhuy'	yugushhuya									
watch; guard; herd	v	Deyilhil naʔ ʔam p'aaya.	I watched her child.	Deyiltaʔ ʔaman gawaayuʔun.	They guarded the horses.	deylit	deyiltaʔ									
water	n	Xap'eelat ʔilik'.	The water got hot.	Wantaʔ ʔilk'a nan.	He gave me water.	ʔilik'	ʔilk'a									
water oak; oak (water)	n	Bohloʔ wimiy' hew.	Water oaks grow here.	ʔan' lasga wimya!	Don't chop down the water oaks!	wimiy'	wimya									
water snake	n	Gewt'ayich' beelit ʔilk'aw.	The water snake dove in the water.	Potit naʔ gewt'aych'i.	I caught a water snake.	gewt'ayich'	gewt'aych'i									
water something	v	Sawit naʔ ʔutuʔun.	I watered the tree.	Saw'taʔ hidyaʔan ʔeelawi.	She watered all the flowers.	saw'it	saw'taʔ									
watercress	n	Bohultaʔ galiideʔ hew.	Watercress grew here.	Labayit naʔ galiideʔen.	I gathered watercress.	galiideʔ	galiideʔen									
watermelon	n	Mich bajix sandiiyaʔ.	The watermelon is rotten.	Ch'attaʔ naʔ sandiiyaʔan.	I split the watermelon.	sandiiyaʔ	sandiiyaʔan									
wave	v	Wimit ʔam p'onoosha.	He waved his hand.	Wimtaʔ min p'onoosha ʔam panaataw.	I waved my hand when she arrived.	wimit	wimtaʔ									
we (dual, including you)	pron	Yawaltaʔ mak' gaaduʔun.	You and I chased the cat.	Taʔishtaʔ magwa.	She saw us (you and me).	mak'	magwa									
we (dual, not including you)	pron	Taʔishhil naaʔak' mam.	We (two) saw you.	Basyalit maʔ naanig.	You visited us both.	naaʔak'	naanig									
we (including you)	pron	Xaateʔ may' miʔin jeleetaw.	We all (including you) are going to eat at noon	Taʔishtaʔ maywa.	He saw us (including you).	may'	maywa									
we (not including you)	pron	Wosit naaʔan ʔamaamin.	We (excluding you) hit them.	Hujut nohʔoʔ naanin.	The bear growled at us (excluding you).	naaʔan	naanin									
wear; put something on oneself	v	Xayawshit naʔ somleelaʔan.	I put on a hat.	Xayaawishtaʔ ʔam lisanyuʔun gamiishaʔan.	He wore his blue shirt.	xayawshit	xayaawishtaʔ									
weave; curl	v	Shilwit naʔ hiiluʔun.	I weaved the thread.	Shiliwtaʔ ʔaman hoopulan.	They weaved (with) whiteroot.	shilwit	shiliwtaʔ									
Wednesday	adv	Taaneʔ ʔam nopop Shopeeyanaw.	His father is going on Wednesday.	Banewishtaʔ ʔaman Shopeeyanaw.	They raced on Wednesday.	Shopeeyanaw										
west	adv	Xayaataʔ Kaʔyuʔ weelaʔan toxil.	Coyote put the light in the west.			toxil										
wet	adj	Taa ch'apiy' noonoʔ shawigtaʔ jageedaʔan.	That wet man bought a jacket.	Naʔat nim xayaataʔ ch'apyi banyuʔun ʔaabulaw.	My older sister put the wet towel on the apple.	ch'apiy'	ch'apyi									
wet (to become)	v	Taa noonoʔ ch'apyit.	That man was wet.	Meejintaʔ mokeela ch'apiytaʔ sheeʔaliw.	The woman got really wet in the rain.	ch'apyit	ch'apiytaʔ									
wet something	v	Boch'on' nim ch'apeey'at banyuʔun.	My son made the cloth wet.	Mokeela ch'apeeyataʔ ʔam naawashi.	The woman made her dress wet.	ch'apeey'at	ch'apeey'ataʔ									
what	n	Haʔ hujuʔnut p'aaya?	What scared the child?	Haʔan daʔ maʔ xattaʔ?	What did you eat?	haʔ	haʔan									
what time_1	adv	Haweeshat hach'a?	What time is it now?			haweeshat										
what time_2 (at what time)	adv	Haweeshataw daʔ maʔ xattaʔ?	What time did you eat?			haweeshataw										
when	adv	Hawal'maʔ daʔ maʔ taʔishtaʔ nim naʔata?	When did you see your older sister?			hawal'maʔ										
where	adv	Hiliʔ daʔ wakay'?	Where is the river?			hili										
where at; where to	adv	Helew Kate taanit?	Where did Kate go?			helew										
which one	n	Hiliʔsiʔ p'ay' gadaayit?	Which child is hungry?	Hiliʔsiʔin noonoʔon naʔ wosit?	Which man did I hit?	hiliʔsiʔ	hiliʔsiʔin									
whip	v	Gawaayuʔun shilshin lap'it naʔ ʔam.	I whipped him with horse hair.	Cheexaʔan waʔat' k'ut' lap'taʔ nan.	The dog's long tail whipped me.	lap'it	lap'taʔ									
whirlwind	n	Hujuʔnutaʔ nan p'ooyach'.	The whildwind scared me.	ʔawaasit naʔ p'oych'a.	I hate storms.	p'ooyach'	p'oych'a									
whisper	v	Miʔin ʔaman yatmi kashkilit.	Then they talked in whisper.	Kashkiltaʔ min panaataw.	She whispered when you arrived.	kashkilit	kashkiltaʔ									
white	adj	Taaneʔ shik'win som'.	The white cloud will leave.	ʔamaʔ taʔshit shik'wina soomi waʔlaw.	He looked at the white cloud in the sky.	shik'win	shik'wina									
white (to become)	v	Shek'eewat paaxish.	The spring turned white.	Shek'eewataʔ ʔilk'aw gamiishaʔ nim.	My shirt turned white in the water.	shek'eewat	shek'eewataʔ									
white person	n	ʔeptaʔ migaanaʔ wakaayaw.	The white man swam in the river.	Yooyotoʔ ʔaman migaanaʔan.	They called the white man.	migaanaʔ	migaanaʔan									
who	n	Wat' daʔ hiʔ?	Who is this?	ʔohom' naʔ yathil waat'a.	I didn't talk to anyone.	wat'	waat'a									
whup; beat_2	v	Xap'it ʔamaʔ ʔam.	He whupped him.			xap'it	xap'taʔ									
why	v	Hawit daʔ naʔat nim taanit xoʔow min?	Why did my older sister go to your house?	Hawtaʔ daʔ ʔamaʔ xattaʔ nim gayeedaʔan?	Why did she eat my cookie?	hawit_2	hawtaʔ									
wide-eyed, due to surprise	v	Taʔishtaw shidgila, ch'eleelat ʔamaʔ.	When he saw the squirrel, his eyes widened.	Cheexaʔan hoxittaw, ch'eleelataʔ ʔamaʔ.	When the dog barked, his eyes widened.	ch'eleelat	ch'eleelataʔ									
wife	n	Mokiy nim balak'.	My wife is pregnant.	ʔamaʔ noonoʔ shum'taʔ ʔam mokyi. 	The man kissed his wife.	mokiy	mokyi									
wild	adj					ch'ok'ot'	---									
willow	n	Bohloʔ shalim gew.	Willows grow there.	Chishit ʔaman shalma.	They cut the willow.	shalim	shalma									
win	v	Jack ch'awit wodyo.	Jack won the dance competition.	ʔamaʔ mokeela ch'aw'taʔ lihma.	That woman won the running competition.	ch'awit	ch'aw'taʔ									
wind	n	Papyit shokwoʔ t'appashi.	The wind scattered the leaves.	Doshtoʔ Kaʔyuʔ Shokwoʔon, Poshga!	Coyote told Wind, Blow!	shokwoʔ	shokwoʔon									
window	n	Ch'aalintaʔ windaraʔ denderoʔon.	The window of the store broke.	ʔodibga hidyaʔan windaraʔan!	Open all the windows!	windaraʔ	windaraʔan									
windy (to be)	v	Shokwit.	It's windy.	Shokowtaʔ naanin yowtaw.	It was windy when we went home.	shokwit	shokowtaʔ									
wing	n					hoyoonich'	hoyonch'i									
wing; feather	n	Limeek'ataʔ ʔam saayiʔ.	Its wings became black.	Xayaataʔ saayiʔin lameesaw.	He put down the feather on the table.	saayiʔ	saayiʔin									
wink at somebody	v	Ch'ayaxnit naʔ ʔam.	I winked at him.	Ch'ayaaxintaʔ ʔamaʔ, miʔin tantaʔ.	She winked, then she left.	ch'ayaxnit	ch'ayaaxintaʔ									
winter; year	n					tomooxish	tomooxisha									
wipe	v	Taxeeshit ʔam manaali.	He wiped his tears.	Sumk'una ʔam taxeshtaʔ.	She wiped her sweat.	taxeeshit	taxeshtaʔ									
wire (e.g. wiremesh, wire for stable)	n			Someʔ waayaʔan shukshuyan.	She covered the wiremesh with sand.	waayaʔ	waayaʔan									
wish for something	v	Yashintaʔ naʔ baanaʔan.	I wished for bread.	Yashnit naʔ soopuli.	I wished for ice cream.	yashnit	yashintaʔ									
wolf	n	Hujtaʔ ʔiweyich'.	The wolf growled.	Yawaltaʔ nohʔoʔ ʔiweych'i.	The bear chased the wolf.	ʔiweyich'	ʔiweych'i									
woman	n	Tashin hach'amiʔ mokeela taʔishtaʔ nan.	Those young women saw me.	Taʔishtaʔ naʔ k'oliswaʔan mokeelaʔan.	I saw the little woman.	mokeela	mokeelaʔan									
wonder	v	Hanhantat Kate haʔan ʔuk.	Kate wondered about something.	Hanhantataʔ naʔ taanach'.	I wondered if I should go.	hanhantat	hanhantataʔ									
wood (general, for fireplace)	n	K'amintaʔ hedesh.	The wood dried up.	Lastaʔ k'amnaʔan hedeesha.	He chopped the dried wood.	hedesh	hedeesha									
wood (for lumber)	n					boshleedaʔ	---									
woodpecker	n	Holoshtaʔ palaat'at' ʔutuw.	A woodpecker perched in a tree.	Taʔishtaʔ naʔ palaat'at'i.	I saw a woodpecker.	palaat'at'	palaat'at'i									
woodrat	n	Hishnit homuch' k'eeshiw hedeeshaw.	The woodrat hid inside the wood.	Xattaʔ ʔaman homuch'a.	They ate woodrat.	homuch'	homuch'a									
work	v	Dawhalit naʔ xoʔow.	I worked at home.	Dawhaltaʔ ʔaman hospitlaw.	They worked at the hospital.	dawhalit	dawhaltaʔ									
workplace	adv	Huushen' naʔ taʔan dawhaliw noneepataw.	I drive to work at 9.			dawhaliw										
worm	n	Wixwik balashʔan' ʔam k'eweetaw.	The worm is crawling on his back.	Potit naʔ wixwika.	I caught the worm.	wixwik	wixwika									
wrap	v	Balenit naʔ p'aaya shobonow.	I wrapped the baby in a blanket.	Balentaʔ ʔamin p'onoosho k'amaanewishhiya.	He wrapped his hand with a towel.	balenit	balentaʔ									
wring	v	Bebiich'at ʔamaʔ ʔam gamiishaʔan.	He wrung his shirt.	Bebiich'ataʔ naʔ banyuʔun.	I wrung the rag.	bebiich'at	bebiich'ataʔ									
wrinkled (to be)	v	Yupp'ut ch'onut bimyindeʔen.	The skin of the black pepper wrinkled.	ʔilk'aw naʔ xootoʔ, miʔin xoʔin nim yup'p'utaʔ.	I was in the water, then my body (skin) wrinkled up.	yup'p'ut	yup'p'utaʔ									
write	v	Sheepit naʔ nim hoyowush ʔamaa.	I wrote my name over there.	Sheptaʔ ʔam hoyowush bobbilaw.	He wrote his name on the paper.	sheepit	sheptaʔ									
writer	n	Xayat taa shipach' ʔam bobbila lameesaw.	That writer put down her paper on the table.	Dihtaʔ naʔ shipaach'i.	I went with the writer.	shipach'	shipaach'i									
wrong	adv	Doolew maʔ ʔet.	You did it wrong.			doolew										
y'know	particle	K'eeshintaʔ xoʔow duʔ.	He went in the house, y'know.			duʔ										
yank	v	Xiplit nim somleelaʔan.	She yanked off my hat.	Xipiltaʔ naʔ ʔam bilaasuʔun.	I yanked away his plate.	xiplit	xipiltaʔ									
yarn (for belt or headband)	n	K'amintaʔ bahaʔ manaw.	The yarn dried up outside.	Yuhuʔun' ʔamaʔ bahaʔan.	She is looking for the yarn.	bahaʔ	bahaʔan									
yawn	v	K'ayamwishit gaaduʔ.	The cat yawned.	P'ay' kayamwishtaʔ.	The child yawned.	kayamwishit	kayamwishtaʔ									
yellow	n	ʔalʔalk'axon' k'otiʔ ʔalk'ik'in ʔop sipin' hidyaʔan.	The big yellow sun shines over them all.	Heleyʔan' shokow' ʔalk'ik'ni t'appashi, walxom ʔeelawi.	The wind is carrying the yellow leaves, past the flower.	ʔalk'ik'in	ʔalk'ik'ni									
yes		Huuhuʔ, halaxnit ʔutuʔun.	Yes, he climbed the tree.			huuhuʔ										
yesterday	adv	Waldin shawighanhil lagyiw.	The bucket was purchased yesterday.			lagyiw										
you (dual)	pron	Yawalhil maaʔak' gaaduʔun.	You two chased the cat.	Nancyʔ wanit maamik' maamila.	Nancy gave the two of you some blackberries.	maaʔak'	maamik'									
you (plural)	pron	Hidyaʔ maaʔan taʔishhil nan.	You all saw me.	Kate hidyaʔan maamin hoyoch'ʔan'.	Kate likes all of you.	maaʔan	maamin									
you (singular)	pron	ʔamaamin maʔ wosit.	You hit them.	Yooyot naʔ mam.	I called you.	maʔ	mam									
your (dual)	pron	Waʔ mingin xoʔ.	Your house is far.	Taʔishtaʔ naʔ mingin cheexaʔan.	I saw your dog.	mingin										
your (singular)	pron	Waʔ min xoʔ.	Your house is far.	Ch'aawaliwig min xataashi!	Go pay for your food!	min	`;

let dictionary_en_ch = new AnalyticalDictionary(
	primary_eng,
	secondary_chk,
	tsv_en_ch,
	parse_en_ch
);