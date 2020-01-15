const elements = document.querySelectorAll('.anmld1');


function startAnimation() {
	
	anime({
  targets: document.querySelectorAll('.anmld1'),
  opacity: [
    { value: 0},
    { value: 1}
  ],
  delay: anime.stagger(101.5),
  loop: true

});

var tl = anime.timeline({

	loop: true


});

// Add children
tl
.add({
  targets: '.anmld2',
    duration: 500,
  opacity: .2,
})
.add({
  targets: '.anmld5',
    duration: 800,
  opacity: .5,
})
.add({
  targets: '.anmld4',  
  duration: 800,
  opacity: .5,
})
.add({
  targets: '.anmld3',
  duration: 800,
  opacity: .5,
})
.add({
  targets: '.anmld2',
  opacity: 1,
  duration: 540,
})

}


startAnimation();
