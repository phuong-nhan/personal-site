
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