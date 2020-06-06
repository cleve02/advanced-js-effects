/* global $ */
;(function () {
  /* Header Menu */
  var selectedMenu = null;
  $('.menu-box').hide();
  $('.js-menu-item').click(function() {
    var name = $(this).data('name');
    if (!selectedMenu) {
      selectedMenu = name;
      $('.overlay').show();
      $('.menu-box[data-name="' + name + '"]').slideDown(100);
      $('.menu-dropdown[data-name="' + name + '"]').slideDown(100);
      $('.publish-menu-dropdown[data-name="' + name + '"]').slideDown(100);
      $('.analyze-menu-dropdown[data-name="' + name + '"]').slideDown(100);
      $(this).addClass('selected');
    }
    else {
      if (selectedMenu === name) {
        $('.overlay').hide();
        $('.menu-box').slideUp(100);
        $('.menu-dropdown').slideUp(100);
        $('.publish-menu-dropdown').slideUp(100);
        $('.analyze-menu-dropdown').slideUp(100);
        $('.menu-item').removeClass('selected');
        $('.platform-header-menu-item').removeClass('selected');
        $('.publish-header-menu-item').removeClass('selected');
        $('.analyze-header-menu-item').removeClass('selected');
        selectedMenu = null;
      }
      else {
        selectedMenu = name;
        $('.menu-item:not([data-name="' + name + '"])').removeClass('selected');
        $('.platform-header-menu-item:not([data-name="' + name + '"])').removeClass('selected');
        $('.publish-header-menu-item:not([data-name="' + name + '"])').removeClass('selected');
        $('.analyze-header-menu-item:not([data-name="' + name + '"])').removeClass('selected');
        $('.menu-box:not([data-name="' + name + '"])').slideUp(100);
        $('.menu-box[data-name="' + name + '"]').slideDown(100);
        $('.menu-dropdown:not([data-name="' + name + '"])').slideUp(100);
        $('.menu-dropdown[data-name="' + name + '"]').slideDown(100);
        $('.publish-menu-dropdown:not([data-name="' + name + '"])').slideUp(100);
        $('.publish-menu-dropdown[data-name="' + name + '"]').slideDown(100);
        $('.analyze-menu-dropdown:not([data-name="' + name + '"])').slideUp(100);
        $('.analyze-menu-dropdown[data-name="' + name + '"]').slideDown(100);
        $(this).addClass('selected');
      }
    }
    return false;
  });
  $('.overlay').click(function() {
    selectedMenu = null;
    $('.overlay').hide();
    $('.menu-box').slideUp(100);
    $('.menu-dropdown').slideUp(100);
    $('.publish-menu-dropdown').slideUp(100);
    $('.analyze-menu-dropdown').slideUp(100);
    $('.menu-item').removeClass('selected');
    $('.platform-header-menu-item').removeClass('selected');
    $('.publish-header-menu-item').removeClass('selected');
    $('.analyze-header-menu-item').removeClass('selected');
  });

  // Publisher
  $('.btn-goto-publisher').on('click', function() {
    $('html, body').animate({
      scrollTop: $(".publishing").first().offset().top - $('.header').outerHeight()
    }, 600);
  });

  // Analyze Sign Up For Early Access
  $('.js-analyze-earlyaccess').on('click', function() {
    $('html, body').animate({
      scrollTop: $(".analyze-earlyaccess").first().offset().top
    }, 600);
    return false;
  });

  // Map
  $('.map-point').hover(function() {
    var name = $(this).data('name');
    $(this).addClass('selected');
    $('.map-avatar[data-name="' + name + '"]').addClass('selected');
  }, function() {
    var name = $(this).data('name');
    $(this).removeClass('selected');
    $('.map-avatar[data-name="' + name + '"]').removeClass('selected');
  });
  $('.map-avatar').hover(function() {
    var name = $(this).data('name');
    $(this).addClass('selected');
    $('.map-point[data-name="' + name + '"]').addClass('selected');
  }, function() {
    var name = $(this).data('name');
    $(this).removeClass('selected');
    $('.map-point[data-name="' + name + '"]').removeClass('selected');
  });

  // Video
  $('.video-button').click(function() {
    var name = $(this).data('name');
    $(this).parent().fadeOut(100);
    $('.video-container[data-name="' + name + '"]').get(0).play();
  });
  $('.video-container').on('ended',function(){
    var name = $(this).data('name');
   $('.video-play[data-name="' + name + '"]').fadeIn(100);
  });

  // NEW Video
  $('.video__button').click(function() {
    var name = $(this).data('name');
    $(this).parent().fadeOut(100);
    $('.video__container[data-name="' + name + '"]').get(0).play();
  });
  $('.video__container').on('ended',function(){
    var name = $(this).data('name');
   $('.video__overlay[data-name="' + name + '"]').fadeIn(100);
  });

  // Accordian
  $('.accordion .accordion-question').click(function(event) {
    $(this).toggleClass('accordion--opened');
    $(this).next().slideToggle();
  });

  // Modal
  var modalTriggers = $('.js-modal-trigger')
  var modal = $('.js-modal')
  var modalClose = modal.find('.js-modal-close')
  var modalContentIframe = modal.find('.js-modal-content')
  var openClassname = 'open'
  function showModal (e) {
    e.preventDefault()
    var url = this.getAttribute('data-url')
    if (!url) {
      console.error('Trigger element missing data-url attribute')
    }
    if (url.indexOf('/') === 0) {
      url = 'https://' + window.location.host + url
    }
    modalContentIframe[0].src = this.getAttribute('data-url')
    modal.addClass(openClassname)
  }
  function closeModal () {
    modal.removeClass(openClassname)
    modalContentIframe[0].src = ''
  }
  modalTriggers.on('click', showModal)
  modalClose.on('click', closeModal)

  // Handle the modal iframe telling us to close itself
  function handlePostMessage (e) {
    if (e.origin !== ('https://' + window.location.host)) {
      return
    }
    if (e.data === 'close') {
      closeModal()
    }
  }
  window.addEventListener('message', handlePostMessage, false)

  // Install extension buttons:
  var EXTENSIONS = {
    CHROME_INSTALL_URL: 'https://chrome.google.com/webstore/detail/noojglkidnpfjbincgijbaiedldjfbhh',
    OPERA_ID: 'bbbfjmllpkjhkmljjeahemghjhkecfae'
  }
  var $installButtons = $('.js-install-extension')
  function onInstallSuccess () {
    $installButtons.text('Extension Installed!')
  }
  $installButtons.on('click', function (e) {
    e.preventDefault()
    if (window.opr && window.opr.addons.installExtension) {
      window.opr.addons.installExtension(EXTENSIONS.OPERA_ID, onInstallSuccess)
    } else if (window.chrome && window.chrome.webstore.install) {
      window.chrome.webstore.install(EXTENSIONS.CHROME_INSTALL_URL, onInstallSuccess)
    }
  })

  // Extension installed CTA
  var $extensionMarker = $('#browser-extension-marker')
  if ($extensionMarker.length) {
    // magic 300px value
    if (window.getComputedStyle($extensionMarker.get(0)).getPropertyValue('left') === '300px') {
      $('.js-install-extension-cta').hide()
      $('.js-share-page-via-add').show()
    }
  }

  function addParamToUrl (url, param, value) {
    var pair = param + '=' + value
    if (url.indexOf('?') > 0) {
      if (url[url.length - 1] === '&' || url.substr(-5) === '&amp;') {
        return url + pair
      } else {
        return url + '&' + pair
      }
    }
    return url + '?' + pair
  }

  // Trial start - Adds a csrf token to any trial start url
  var trialStartCTAs = $('.js-trial-start')
  if (trialStartCTAs.length) {
    $.ajax('/ajax/csrf_token').then(function (data) {
      trialStartCTAs.each(function (i, j) {
        var href = j.getAttribute('href')
        var newHref = addParamToUrl(href, 'csrf_token', data.csrf_token)
        j.setAttribute('href', newHref)
      })
    })
  }

  $.ajax('/ajax/plans_config').then(function (data) {
    if (data && data.hasSimplifiedFreePlanUX) {
      // Being extra careful because of the trafic sent to this page :)
      if (data.plans_config && data.plans_config.free && data.plans_config.free.accounts) {
        var html = data.plans_config.free.accounts + ' Social Profile';
        if (data.plans_config.free.accounts > 1) {
          html += 's';
        }
        $('.js-individual-accounts-limit').html(html);
      }
    }
  })

  // Sticky side nav on /Legal page
  if (window.location.pathname.indexOf('/legal') >= 0) {
    window.onscroll = function() {setStickyNav()};
    var sideBar = document.querySelector(".side-nav");
    var sideBarInner = document.querySelector(".side-nav__wrapper");
    var fixedNavClass = "side-nav__wrapper--fixed";

    var sticky = sideBar.offsetTop - 100;
    var footer = document.querySelector(".footer").offsetTop - 300;

    function setStickyNav() {
      if (window.pageYOffset >= sticky ) {
        sideBarInner.classList.add(fixedNavClass);
      } else {
        sideBarInner.classList.remove(fixedNavClass);
      }
    }
  }

  // Emoji animation on Business page

  var emojiAnimation = {
    timeout: null,
    timeout2: null,
    timeout3: null,
    timeout4: null,
    slotsSpeed: 150,

    init: function() {
      $('.emoji-slots').on('mouseenter', () => {
        this.startEmojiSlots();
        return this.timeout = setInterval(() => {
          return this.startEmojiSlots();
        }, this.slotsSpeed * 4);
      });
      return $('.emoji-slots').on('mouseleave', () => {
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        return this.stopEmojiSlots();
      });
    },

    startEmojiSlots: function() {
      var emojis;
      emojis = $('.emoji-slots img');
      emojis.hide();
      $(emojis[1]).show();
      this.timeout2 = setTimeout((function() {
        emojis.hide();
        return $(emojis[2]).show();
      }), this.slotsSpeed);
      this.timeout3 = setTimeout((function() {
        emojis.hide();
        return $(emojis[3]).show();
      }), this.slotsSpeed * 2);
      return this.timeout4 = setTimeout((function() {
        emojis.hide();
        return $(emojis[0]).show();
      }), this.slotsSpeed * 3);
    },

    stopEmojiSlots: function() {
      var emojis;
      emojis = $('.emoji-slots img');
      emojis.hide();
      return $(emojis[0]).show();
    },
  };

  emojiAnimation.init();
  

  // Cookie consent banner

  var cookieName = 'buffer-cookie-compliance';   // Name of the cookie
  var cookieValue = 'on';                        // Value of cookie

  function createCookie(name,value) {
      var date = new Date();
      date.setTime(date.getTime()+(10*365*24*60*60*100));
      var expires = "; expires="+date.toGMTString();

      document.cookie = name+"="+value+" ;domain=.buffer.com"+expires+"; path=/";
  }

  function showBanner() {
      var noticeBanner =  document.querySelector('.cookie-banner');
      var acceptButton = document.querySelectorAll('.accept-cookie');
      noticeBanner.classList.add('cookie-banner--visible');

      acceptButton.forEach( function(button, index) {
        button.addEventListener('click',function(){
          createCookie(cookieName,cookieValue);
          closeBanner(noticeBanner);
        })
      });
  }

  function closeBanner(banner){
    banner.classList.remove('cookie-banner--visible');
    banner.style.display = "none";
  }

  function cookieIsSet(name,value) {
    if (document.cookie.split(';').filter(function(item) {
      return item.indexOf(name+'='+value) >= 0
    }).length) {
      return true;
    }

    return false;
  }

  // Checks to see if the cookie exists on window load
  document.addEventListener('DOMContentLoaded', function() {
    if (!cookieIsSet(cookieName,cookieValue)){
      showBanner(); // If cookie doesnt exist it will display the banner
    }
  });
})()
