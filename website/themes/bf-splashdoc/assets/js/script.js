const elements = document.querySelectorAll('.anmld1');

anime({
  targets: elements,
  opacity: [
    { value: 0},
    { value: 1}
  ],
  loop: true,
  delay: anime.stagger(102)
});





// anime({
//   targets: document.querySelectorAll('.anmld2'),
//   opacity: 1,
// });
// const elements2 = document.querySelector('#_4');


// anime({
//   targets: elements2,
//   opacity: [
//     { value: 0},
//     { value: 1}
//   ],
//   loop: true,

//   delay: anime.stagger(200)
// });



var tl = anime.timeline({
  loop: true,
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


