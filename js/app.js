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
const navElements = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Build menu by iterating through the navelements
navElements.forEach((el) => {
  const navlistElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
  navList.insertAdjacentHTML('beforeend', navlistElement)
})

// Scroll to section on link click by listenting to the click-event in the navlist
navList.addEventListener('click', (e) => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement

  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({ block: 'end', behavior: 'smooth' })
})

// Set section and nav link as active using the IntersectionObserver pattern
const callback = (entries) => {
  entries.forEach((entry) => {
    console.log(entry.target)

    const navListElement = document.querySelector(
      `.menu__link[data-link='${entry.target.id}']`
    )
    console.log(navListElement)

    const section = document.getElementById(entry.target.id)

    if (entry && entry.isIntersecting) {
      navListElement.classList.add('your-active-class')
      section.classList.add('your-active-class')
      navListElement.classList.toggle('active')
      navListElement.firstElementChild.classList.toggle('active')
    } else {
      if (navListElement.classList.contains('your-active-class')) {
        navListElement.classList.remove('your-active-class')
        navListElement.classList.toggle('active')
        navListElement.firstElementChild.classList.toggle('active')
      }

      if (section.classList.contains('your-active-class')) {
        section.classList.remove('your-active-class')
      }
    }
    // if (navListElement.classList.contains('your-active-class')) {
    //   navListElement.classList.toggle('active')
    //   navListElement.firstElementChild.classList.toggle('active')
    // }
    // } else {
    //   navListElement.style.cssText = 'background:#fff ;color: #333; '
    //   navListElement.firstElementChild.style.cssText = ' color:  #333; '
    // }
  })
}

// Options for the observer. Most important is the threshold
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6, // form 0 t0 1
}

// Setting an observer with options and a callback which checks if the navelement should be active
const observer = new IntersectionObserver(callback, options)
navElements.forEach((el) => {
  observer.observe(document.getElementById(el.id))
})
