const elements = document.querySelectorAll('.anmld1');


function startAnimation() {
	
	anime({
  targets: document.querySelectorAll('.anmld1'),
  opacity: [
    { value: 0},
    { value: 1}
  ],
  delay: anime.stagger(101.5),
  loop: true,

    loopBegin: () => startBatch()

});



}


function startBatch() {

var tl = anime.timeline({

});

tl
.add({
  targets: '.anmld2',
    duration: 500,
  opacity: .2,
})
.add({
  targets: '.anmld5',
    duration: 776,
  opacity: .5,
})
.add({
  targets: '.anmld4',  
  duration: 777,
  opacity: .5,
})
.add({
  targets: '.anmld3',
  duration: 777,
  opacity: .5,
})
.add({
  targets: '.anmld2',
  opacity: 1,
  duration: 570,
})
.add({
  targets: '.anmld2',
    duration: 1,
  opacity: .2,
})
.add({
  targets: ['.anmld5','.anmld4','.anmld3'],
  opacity: 0,
  duration: 1,
})
}


startAnimation();
