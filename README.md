# Ladder.loader()

Ladder.loader() is a simple non-blocking image loading function for static-style sites that runs on the client browser and loads images one at time, but in tiers. 

That means the images in the first tier will load, one-by-one, top-to-bottom, before the second tier starts to load. This apporach provides a progressive loading experience that lets you set priorities, while keeping it simple. 

It requires you to properly format the relevant \<img\> tags in the site's raw HTML, and call Ladder.loader() using JavaScript in the browser.

**In HTML:**

**1)** Assign your \<img\> tags to tiers by class,
**2)** assign the actual link to a data slot,
**3)** & fill the src with a temporary image. 

*Here's an example:*
	
```HTML
<img class="first-tier" data-llsrc="/images/fullImage.jpg" src="/images/tempLoading.svg">
```

Also, you'll need to import the ladderLoader.js in your header or footer. You can host the file yourself, or pull from a CDN.

*example:*
```HTML

<footer>
<script type="text/javascript" src="script/ladderLoader.js"></script>
</footer>
```

**In JavaScript:**

**1)** Define a tier using a 2-element array of stings containing **a)** the tier's class, and **b)** the relevant data-attribute, **or** pass in the tier's class as a string and 'llsrc' will be used as the default data-attribute.

*example:* 
```javascript 
['first-tier','llsrc'] 
```

**2)** pass as many of these arugments into Ladder.loader() as you want, in the order that you want them loaded,

*example:* 
```javascript 
Ladder.loader(['first-tier','llsrc'],['second-tier','llsrc'],['third-tier','llsrc'])
```

**3)** & then call Ladder.loader() at the appropriate time!

*example:*
```javascript 
Window.onload = Ladder.loader(['first-tier','llsrc'])
```

## Pro-tips:

Remember you can pass functions that return strings as arguments. A common use for this would be to provide smaller versions of files to mobile devices.

*Here's an example:*

**In HTML:**

```HTML 
<img class="first-tier" data-llsrcFull="/fullImage.jpg" data-llsrcMobile="/smallImage.jpg" src="/images/tempLoading.svg"> 
```

**In JavaScript:**

```javascript 
const isMobile = () => window.innerWidth <= 800 ? "llsrcMobile" : "llsrcFull";

Window.onload = Ladder.loader(['first-tier',isMobile()])

```

Also, Window.onload is an obvious moment to run a Ladder.loader(), but you can trigger it any way you want, and you could also trigger multiple instances of the function based on different conditions. **It's a really simple function, so you can be creative with it.**
