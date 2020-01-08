# Ladder.loader()

Ladder.loader() is a simple non-blocking image loading function for static-style sites that runs in the client browser and loads the images on a page one at time, but in tiers. 

That means the images in the first tier of images will load, one-by-one, top to bottom, before the second tier starts to load. This apporach provides a progressive loading experience that lets you set priorities, while keeping it simple. 

It requires you to properly format the relevant <img> tags in the raw HTML, and call Ladder.loader() in JavaScript.

**In HTML:**

**1)** Assign your <img> tags to tiers by class,
**2)** assign the actual link to a data slot,
**3)** & fill the src with a temporary image. 

*Here's an example:*
	
```HTML
<img class="first-tier" data-llsrc="/images/fullImage.jpg" src="/images/tempLoading.svg">
```

**In JavaScript:**

**1)** Define a tier using a 2-element array with the tier's class, and the relevant url data-attribute (note: don't include 'data-'),

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

## Pro-tip:

Remember you can pass functions that return strings as arguments. The most common use for this would be to provide smaller versions of files to mobile devices.

*Here's an example:*

**In HTML:**

```HTML <img class="first-tier" data-llsrcFull="/fullImage.jpg" data-llsrcMobile="/smallImage.jpg" src="/images/tempLoading.svg"> ```

**In JavaScript:**

```javascript 
const isMobile = () => window.innerWidth <= 800 ? "llsrcMobile" : "llsrcFull";

Window.onload = Ladder.loader(['first-tier',isMobile()])

```
