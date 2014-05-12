if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to merlin.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.hello.rendered = function() {
    var nav = $().onePageNav; // To be fixe: HACK the check of jquery plugin

    if (Session.get('isLoaded') != true || nav == null) {
      Session.set('isLoaded', true);

      $('head').append(
        '<script src="assets/js/jquery.min.js"></script>' +
        '<script src="assets/js/bootstrap.min.js"></script>' +
        '<script src="assets/js/isotope.pkgd.min.js"></script>' +
        '<script src="assets/js/imagesloaded.min.js"></script>' +
        '<script src="assets/js/jquery.scrollTo.min.js"></script>' +
        '<script src="assets/js/jquery.nav.min.js"></script>' +
        '<script src="assets/js/jquery.appear.min.js"></script>' +
        '<script src="assets/js/twitterFetcher.min.js"></script>'
      );
    }
    Meteor.setTimeout(function() {
      $.getScript('assets/js/script.js', function() {
        initNavbar();
        initPortfolio();
        initAnimations();
        initTwitterFeed();
        $(".loader .fading-line").fadeOut();
        $(".loader").fadeOut("slow");
      });
    }, 500);
  }

  Template.layout.rendered = function() {
    Session.set('ready', 1);
  }

  Template.layout.events({
    'click .merlin': function(e) {
      var showHide = Session.get('ready');
      console.log('showHide: ' + showHide);
      if (showHide == 0)
        showHide = 1;
      else
        showHide = 0;
      Session.set('ready', showHide);
    }
  })

  Template.layout.helpers({
    loadHello: function() {
      return Session.get('ready') == 1;
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
