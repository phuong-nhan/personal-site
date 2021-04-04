
// Mobile nav toggle
function navToggle(selector) {
	if (document.querySelector(selector)) {
		let tgl = document.querySelector(selector)
		tgl.addEventListener('click', function() {
			document.body.classList.toggle('nav-open')
		})
	}
}
navToggle('.mobile-nav-toggle')


// Smooth scroll to on page anchors with specified selector

function anchorscroll(speed = 0.5, selector = '.anchorscroll', offset = 30) {

  // Request animation frame prefixes and fallback
  window.raf = (function() {
  	return window.requestAnimationFrame    ||
  	window.webkitRequestAnimationFrame ||
  	window.mozRequestAnimationFrame    ||
  	function (callback) {
  		window.setTimeout(callback, 1000 / 60)
  	}
  })()

  // Get all requested selectors, and all links that are on-page hashes
  let anchors = [].slice.apply(document.querySelectorAll(selector)),
  links   = [].slice.apply(document.querySelectorAll('a')),
  hashes  = links.filter(x => x.getAttribute('href').charAt(0) === '#')

  // Add event listeners to all selectors on page
  for (let i = 0; i < hashes.length; i++) {

  	((num) => {
  		hashes[num].addEventListener('click', (e) => {
  			e.preventDefault()
  			let hash     = hashes[num].getAttribute('href'),
  			match    = anchors.filter(x => `#${x.id}` === hash),
  			position = window.pageYOffset,
  			top      = match[0].offsetTop

  			function scrollDown() {
          // Handle scrolling down to anchor
          if (top >= position + offset) {
          	window.scrollTo(0, position)
          	position += speed * 50
          	raf(scrollDown)
          }                    
      }

      function scrollUp() {
          // Handle scrolling up to anchor
          if (top <= position  + offset) {
          	window.scrollTo(0, position)
          	position -= speed * 50
          	raf(scrollUp)
          }                    
      }

      top >= position ? scrollDown() : scrollUp()

  }, false)

  	})(i)
  }
} 

anchorscroll(0.5, '.scroll', 0)



/* AUDIO/VIDEO */


console.log('test')

let playVid = document.querySelector('.play')
let video  = document.querySelector('.vid')
let timhortons = document.querySelector('.timhortons')

function playPauseVid() {
  if (document.body.id === 'playing') {
    video.pause()
    timhortons.pause()
    document.body.id = ''
  } else {
    video.play()
    timhortons.play()
    document.body.id = 'playing'
  }

}

playVid.addEventListener('click', playPauseVid)


function playAudio() {
  timhortons.play() 
  console.log('play')
}

function pauseAudio() {
  timhortons.pause()
  console.log('pause')
}

jupiter.addEventListener('click', playAudio)
jupiter.addEventListener('mouseleave', pauseAudio)


