function startBatch() {
anime.timeline({
	loop:true,
	easing: 'steps(5)'

})
.add({
  targets: '.anmld2',
    duration: 500,
  opacity: .2,
})
.add({
  targets: '.anmld5',
    duration: 725,
  opacity: .5,
})
.add({
  targets: '.anmld4',  
  duration: 725,
  opacity: .5,
})
.add({
  targets: '.anmld3',
  duration: 725,
  opacity: .5,
})
.add({
  targets: '.anmld2',
  opacity: 1,
  duration: 725,
})
.add({
  targets: '.anmld2',
  opacity: 1,
  duration: 600,
  easing: 'steps(1)'
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


startBatch();


const ladderAnimation = (list) => list.reduce((chain, val) => chain.add({targets:val,opacity:1}), anime.timeline({duration:120, loop:true}).add({targets:'.anmld1', opacity: 0, duration:500 }));
const arrayify = x => Array.prototype.slice.call(x);
const elements = document.querySelectorAll('.anmld1');

ladderAnimation(arrayify(elements))
.add({targets:'.anmld1', duration: 500})
.add({targets:'.anmld1',opacity:0,duration: 2});


