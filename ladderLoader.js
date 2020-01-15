
/*/ 
Distributed with an MIT license.

Ladder.loader() is a simple <img> loader for static-style sites that loads images one at time, but in tiers.

It requires you to properly format the relevant <img> tags in the raw HTML, and call Ladder.loader() in JavaScript.

	Here's a properly formated <img> tag:

<img class="first-tier" data-llsrc="/images/fullImage.jpg" src="/images/tempLoading.svg">

	Here's a properly formated Ladder.loader() call:

Window.onload = Ladder.loader(['first-tier','llsrc'],['second-tier','llsrc'],['third-tier','llsrc'])
	
More info at https://ladderloader.dev

(by @benjfriedrich)

/*/


class Ladder {

	constructor() {

	}

	static loader() {

		const arrayify = x => Array.prototype.slice.call(x);

		const format = (x) => x.map((x) => Array.isArray(x) && x.length == 2 ? x : Array.isArray(x) && x.length == 1 ? [x[0],'llsrc'] : [x,'llsrc'] );

		const retrieveClass = className => arrayify(document.getElementsByClassName(className));

		const stripData = (x) => x.slice(0,5) == 'data-' ? x.slice(5) : x;

		const bundle = (elements, source) => elements.map( element => [element, stripData(source)]);

		const processTier = tier => bundle(retrieveClass(tier[0]), tier[1]);

		const process = x => x.map(tier => processTier(tier)).flat();

		const imageList = process(format(arrayify(arguments)));
		
		const downloadIMG = (element, source) => {

			const promise = new Promise( (resolve, reject) => {
			    const img = new Image()
			    img.onload = () => resolve( element.src = element.getAttribute(`data-${source}`) )
			    img.onerror = () => reject( `Ladder.loader() src error: Check to see if data-${source} is valid on items with class ${element.classList}`)
			    img.src = element.getAttribute(`data-${source}`)
			 			})

			return promise;

		};

		const functionGenerator = (list) => list.map( (item) => () => downloadIMG(item[0],item[1]));

		const promiseChain = () => functionGenerator(imageList).reduce((chain, val) => chain.finally( () => val() ).catch((err) => console.error(err)), Promise.resolve([]) );

		promiseChain();

	}

}
