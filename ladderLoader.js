
/*/ 

Ladder.loader() is a simple IMG loader for static-style sites that loads images one at time, but in tiers.

It requires you to properly format the relevant <img> tags in the raw HTML, and call Ladder.loader() in JavaScript.

In HTML:

	1) Assign your <img> tags to tiers by class,
	2) assign the actual link to a data slot,
	3) & fill the src with a temporary image. 

Here's an example:

	<img class="first-tier" data-llsrc="/images/fullImage.jpg" src="/images/tempLoading.svg">

In JavaScript:

	1. Define a tier using a 2-element array with the tier class, and the url data-attribute (note: don't include 'data-'),

		example: ['first-tier','llsrc']

	2. pass as many of these arugments into Ladder.loader() as you want, in the order that you want them loaded,

		example: Ladder.loader(['first-tier','llsrc'],['second-tier','llsrc'],['third-tier','llsrc'])

	3. & then call Ladder.loader() at the appropriate time!

		example: Window.onload = Ladder.loader(['first-tier','llsrc'])

Pro-tip:

	Remember you can pass functions that return strings as arguments. The most common use for this would be to
	provide smaller versions of files to mobile devices.

Here's an example:

	In HTML:

	<img class="first-tier" data-llsrcFull="/fullImage.jpg" data-llsrcMobile="/smallImage.jpg" src="/images/tempLoading.svg">

	In JavaScript:

	const isMobile = () => window.innerWidth <= 800 ? "llsrcMobile" : "llsrcFull";

	Window.onload = Ladder.loader(['first-tier',isMobile()])



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
