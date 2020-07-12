/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll('section')
const ulList = document.getElementById('navbar__list')

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Build menu by iterating through the sections
sections.map((section) => {
  const ulListElement = `<li class='menu__link ${section.className}' data-link=${section.id}><a href="#${section.id}">${section.dataset.nav}</li>`
  ulList.insertAdjacentHTML('beforeend', ulListElement)
})

// Scroll to section on link click by listenting to the click-event in the ulList
ulList.addEventListener('click', (e) => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement

  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({ block: 'end', behavior: 'smooth' })
})

// Set section and nav link as active using the IntersectionObserver pattern
const cb = (entries) => {
  entries.map((entry) => {
    const ulListElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`
    )

    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      ulListElement.classList.add('your-active-class')
      section.classList.add('your-active-class')
      ulListElement.classList.toggle('active')
      ulListElement.firstElementChild.classList.toggle('active')
    } else {
      if (ulListElement.classList.contains('your-active-class')) {
        ulListElement.classList.remove('your-active-class')
        ulListElement.classList.toggle('active')
        ulListElement.firstElementChild.classList.toggle('active')
      }

      if (section.classList.contains('your-active-class')) {
        section.classList.remove('your-active-class')
      }
    }
    // if (ulListElement.classList.contains('your-active-class')) {
    //   ulListElement.classList.toggle('active')
    //   ulListElement.firstElementChild.classList.toggle('active')
    // }
    // } else {
    //   ulListElement.style.cssText = 'background:#fff ;color: #333; '
    //   ulListElement.firstElementChild.style.cssText = ' color:  #333; '
    // }
  })
}

// Options for the observer. Most important is the threshold
const options = {
  root: null,
  rootMargin: '40px',
  threshold: 0.6, // form 0 t0 1
}

// Setting an observer with options and a callback which checks if the navelement should be active
const observer = new IntersectionObserver(cb, options)
sections.map((section) => {
  observer.observe(document.getElementById(section.id))
})
