var navItems = document.querySelectorAll('.has-dropdown');
var activeClass = "isActive";
var closeButton = document.querySelector('.header__hamburger');
var mobileMenu = document.querySelector('.main-nav-mobile');
var dropdownDesktop = document.querySelectorAll('.main-nav__dropdown');

function initHeader() {
    navItems.forEach(function(navItem) {
        navItem.addEventListener('click', initDropdown)
    })

    closeButton.addEventListener('click', onClickCloseButton);

    // Removes flickering of dropdown on load
    document.onload = dropdownDesktop.forEach(function(item) {
        item.classList.add('show');
    })
}

function initDropdown(e) {
    e.preventDefault()
    e.stopPropagation()
    var self = this;
    var parentItem = this.parentNode;

    if (parentItem.classList.contains(activeClass)) {
        parentItem.classList.remove(activeClass)
    } else {
        navItems.forEach(function(navItem) {
            navItem.parentNode.classList.remove(activeClass);
        })

        parentItem.classList.add(activeClass)
    }

    document.addEventListener('click', function(){
        self.parentNode.classList.remove(activeClass);
    });
}


function onClickCloseButton() {
    this.classList.toggle('open');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');   
}

initHeader ();

