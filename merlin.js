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
    $.getScript('assets/js/script.js', function() {
      initNavbar();
      initPortfolio();
      initAnimations();
      initTwitterFeed();
      $(".loader .fading-line").fadeOut();
      $(".loader").fadeOut("slow");
    });
  }

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
