(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 350
    navbarlinks.forEach(navbarlink => {
      let sectionId = navbarlink.getAttribute('onclick').match(/scrollTo([A-Za-z]+)/)[1].toLowerCase()
      let section = select(`#${sectionId}`)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
    if (isScrolledToBottom()) {
      navbarlinks[3].classList.remove('active')
      navbarlinks[4].classList.add('active')
    }
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - 80,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 150) {
          selectHeader.classList.add('header-scrolled')
          // document.getElementById("logo").style.visibility = 'visible'
        } else {
          selectHeader.classList.remove('header-scrolled')
          // document.getElementById("logo").style.visibility = 'hidden'
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 200) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
 * Scrool with ofset on links with a class name .scrollto
 */
  on('click', '.scrollto', function(e) {
      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        mobileMenu();
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
  }, true)

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
    setTimeout(function() {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    }, 400);
  });


  /**
   * Team Slider Desktop
   */
  new Swiper('.slider', {
    navigation: {
      nextEl: '.right',
      prevEl: '.left',
    },
  });

  /**
 * Team Slider Mobile
 */
    new Swiper('.swiper-mobile', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.fa-angle-right',
      prevEl: '.fa-angle-left',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

})()

function isScrolledToBottom() {
  // Height of the entire document
  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  // Current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Visible height of the window
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  // Check if the sum of scroll position and visible height equals the document height
  return scrollTop + windowHeight >= docHeight;
}

function Show () { 
  var vis = (document.getElementById("yes").checked) ? "block" : "none";
  document.getElementById("options").style.display = vis;
  document.getElementById("categories").setAttribute("required", true);
  document.getElementById("research").setAttribute("required", true);
}
  
function Hide () { 
  var vis = (document.getElementById("no").checked) ? "none" : "none";
  document.getElementById("options").style.display = vis;
  document.getElementById("categories").removeAttribute("required");
  document.getElementById("research").removeAttribute("required");
}

function countChar1(val) {
  var len = val.value.length;
  if (len >= 2500) {
    val.value = val.value.substring(0, 2500);
  } else {
    $('#charNum1').text(2500 - len);
  }
};

function countChar2(val) {
  var len = val.value.length;
  if (len >= 2500) {
    val.value = val.value.substring(0, 2500);
  } else {
    $('#charNum2').text(2500 - len);
  }
};

var dateObj = new Date();
var y = dateObj.getUTCFullYear();

//footer year change
document.getElementById("footerYear").innerText = y;

function scrollToAbout() {
  const element = document.getElementById("about");
  if (!element) {
    window.location.href = "index.html#about";
  }
  document.getElementById('about').scrollIntoView();
}

function scrollToDays() {
  const id = 'days';
  const yOffset = -80; 
  const element = document.getElementById(id);
  if (!element) {
    window.location.href = "index.html#days";
  }
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function scrollToJoin() {
  const id = 'join';
  const yOffset = -80; 
  const element = document.getElementById(id);
  if (!element) {
    window.location.href = "index.html#join";
  }
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function scrollToTeam() {
  const id = 'team';
  const yOffset = -80; 
  const element = document.getElementById(id);
  if (!element) {
    window.location.href = "index.html#team";
  }
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function scrollToFooter() {
  const id = 'footer';
  const yOffset = -80; 
  const element = document.getElementById(id);
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

function day(dayClick) {
  if (dayClick == "day1Click") {
    document.getElementById("day1Click").classList.add("active");
    document.getElementById("day1").classList.add("show");
  }
  else {
    document.getElementById("day1Click").classList.remove("active");
    document.getElementById("day1").classList.remove("show");
  }
  if (dayClick == "day2Click") {
    document.getElementById("day2Click").classList.add("active");
    document.getElementById("day2").classList.add("show");
  }
  else {
    document.getElementById("day2Click").classList.remove("active");
    document.getElementById("day2").classList.remove("show");
  }
  if (dayClick == "day3Click") {
    document.getElementById("day3Click").classList.add("active");
    document.getElementById("day3").classList.add("show");
  }
  else {
    document.getElementById("day3Click").classList.remove("active");
    document.getElementById("day3").classList.remove("show");
  }
  if (dayClick == "day4Click") {
    document.getElementById("day4Click").classList.add("active");
    document.getElementById("day4").classList.add("show");
  }
  else {
    document.getElementById("day4Click").classList.remove("active");
    document.getElementById("day4").classList.remove("show");
  }
  if (dayClick == "day5Click") {
    document.getElementById("day5Click").classList.add("active");
    document.getElementById("day5").classList.add("show");
  }
  else {
    document.getElementById("day5Click").classList.remove("active");
    document.getElementById("day5").classList.remove("show");
  }
}


function mobileMenu() {
  var backToTop = document.getElementById("backToTop");
  
  // if (document.body.classList.contains("stop-scrolling")) {
  //   document.body.classList.remove("stop-scrolling");
  //   backToTop.style.opacity = 1;
  // }
  // else {
  //   document.body.classList.add("stop-scrolling");
  //   backToTop.style.opacity = 0;
  //   backToTop.style.removeProperty(opacity);
  // }



}