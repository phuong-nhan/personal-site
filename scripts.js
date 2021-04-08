
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


/* INTERACTING */


draggable('.drag')



// Draggable
function draggable(selector) {
  let dragItems = document.querySelectorAll(selector)
  for (let i = 0; i < dragItems.length; i++) drag(dragItems[i]);
  function drag(el) {
    let dragItem = el
    let body = document.body
    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let highestZ = 1
    let newZ = dragItem.style.zIndex || 1
    let xOffset = 0
    let yOffset = 0

    body.addEventListener('touchstart', dragStart, false)
    body.addEventListener('touchend', dragEnd, false)
    body.addEventListener('touchmove', drag, false)
    body.addEventListener('mousedown', dragStart, false)
    body.addEventListener('mouseup', dragEnd, false)
    body.addEventListener('mousemove', drag, false)

    function dragStart(e) {
      if (e.type === 'touchstart') {
        initialX = e.touches[0].clientX - xOffset
        initialY = e.touches[0].clientY - yOffset
      } else {
        initialX = e.clientX - xOffset
        initialY = e.clientY - yOffset
      }
      if (e.target === dragItem) {
        active = true
        dragItem.style.cursor = 'grabbing'
        newZ = makeHighestZ()
        let initZ = parseInt(dragItem.style.zIndex)
        if (newZ > initZ) {
          dragItem.style.zIndex = newZ
        } 
      }     
    }

    function makeHighestZ() { 
      let initZ = parseInt(dragItem.style.zIndex)
      for (let i = 0; i < dragItems.length; i++) {
        if (!dragItems[i].style.zIndex) {
          dragItems[i].style.zIndex = 1
        }
        if (parseInt(dragItems[i].style.zIndex) > highestZ) {
          highestZ = parseInt(dragItems[i].style.zIndex)
        } else {
          highestZ = highestZ
        }
      }
      if (initZ >= highestZ) {
        return initZ
      } else {
        return ++highestZ
      }
    }

    function dragEnd(e) {
      initialX = currentX
      initialY = currentY
      active = false
      dragItem.style.cursor = 'grab'
    }

    function drag(e) {
      if (active) {
        e.preventDefault();
        if (e.type === 'touchmove') {
          currentX = e.touches[0].clientX - initialX
          currentY = e.touches[0].clientY - initialY
        } else {
          currentX = e.clientX - initialX
          currentY = e.clientY - initialY
        }
        xOffset = currentX
        yOffset = currentY
        setTranslate(currentX, currentY, dragItem)
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = 'translate(' + xPos + 'px, ' + yPos + 'px)'
    }
  }
  function resetAllItems(e) {   
    e.preventDefault()
    for (let i = 0; i < dragItems.length; i++) {
      dragItems[i].style.transition = 'transform 1s'
      dragItems[i].style.transform = 'translate(0px,0px)'
      setTimeout(function() {
        dragItems[i].style.transition = ''
      }, 1000)      
    }
    draggable(selector)
  }
  if (document.querySelector('.reset')) {
    document.querySelector('.reset').addEventListener('click', resetAllItems)
  }
}
