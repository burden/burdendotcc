document.addEventListener('DOMContentLoaded', function() {

  toggleActiveNav();
  initHamburgers();
  enableMailto();
  
  function toggleActiveNav() {
    getAll('.navbar-item').forEach(function (el) {
      if (el.pathname) {
        if (window.location.pathname.split("/")[1] == el.pathname.split("/")[1]) {
          el.classList.toggle('is-active');
        }
      }
    });
  }
  
  function initHamburgers() {
    var navbarBurgers = getAll('.navbar-burger');
    if (navbarBurgers.length > 0) {
      navbarBurgers.forEach(function(el) {
        el.addEventListener('click', function() {
          var target = document.getElementById(el.dataset.target);
          el.classList.toggle('is-active');
          target.classList.toggle('is-active');
        });
      });
    }  
  }
  
  function enableMailto() {
    var meta_contact = getAll('meta[name=contact]');
    var meta_key = meta_contact[0].getAttribute('data-key');
    var meta_encoded = meta_contact[0].getAttribute('data-encoded');

    var emails = getAll(".has-secret-mailto");
    emails.forEach(function(element){
      element.setAttribute("href", "mailto:" + decodeEmail(meta_key, meta_encoded));
    });  
  }
  
  function decodeEmail(key, coded) {
    shift=coded.length
    link=""
    for (i=0; i<coded.length; i++) {
      if (key.indexOf(coded.charAt(i))==-1) {
        ltr = coded.charAt(i)
        link += (ltr)
      }
      else {
        ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
        link += (key.charAt(ltr))
      }
    }
    return link
  }
  
  function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
  }
  
});
