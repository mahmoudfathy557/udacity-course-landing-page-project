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
const body = document.body

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// test the performance of the adding the navbar
const t0 = performance.now()

// Build menu by iterating through the sections
sections.forEach((section) => {
  const ulListElement = document.createElement('LI')
  ulListElement.setAttribute('class', `menu__link  `)
  ulListElement.setAttribute('data-link', `${section.id}`)
  const aElement = document.createElement('a')
  aElement.href = `#${section.id}`
  const textnode = document.createTextNode(`${section.dataset.nav}`)
  aElement.appendChild(textnode)
  ulListElement.appendChild(aElement)
  ulList.appendChild(ulListElement)
})

const t1 = performance.now()
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`)

// Scroll to section on link click by listenting to the click-event in the ulList
ulList.addEventListener('click', (e) => {
  e.preventDefault()
  const parent = e.target.hasAttribute('data-link')
    ? e.target
    : e.target.parentElement

  const elementToScrollTo = document.getElementById(parent.dataset.link)
  elementToScrollTo.scrollIntoView({ block: 'end', behavior: 'smooth' })
})

// Options for the observer.
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6, // form 0 t0 1
}

//  using the IntersectionObserver method to observe the sections
const cb = (entries) => {
  entries.forEach((entry) => {
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
  })
}

// Setting an observer with options and a callback which checks if the navelement should be active
const observer = new IntersectionObserver(cb, options)
sections.forEach((section) => {
  observer.observe(document.getElementById(section.id))
})
