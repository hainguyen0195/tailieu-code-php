var googleUser = {};
var startApp = function() {
  gapi.load('auth2', function(){
  auth2 = gapi.auth2.init({
    client_id: '261571004219-s3h7vpkdopptv13mg64gj1i5apmc4tak.apps.googleusercontent.com',
    scope: "email",
    cookiepolicy: 'single_host_origin',
    plugin_name:'Web client 3'
  });
  attachSignin(document.getElementById('login_gg'));
});
};
function attachSignin(element) {
  auth2.attachClickHandler(element, {},
    function(googleUser) {
      var profile = googleUser.getBasicProfile();
      gg_id = profile.getId();
      gg_name = profile.getName();
      gg_img = profile.getImageUrl();
      gg_email = profile.getEmail();

      $.ajax({
        type: "POST",
        data: {'id':gg_id,'name':gg_name,'img':gg_img,'email':gg_email},
        url: 'https://earthlyglow.vn/api/ajax_google.php',
        success: function(msg){
            window.location.replace('https://earthlyglow.vn/');
        }
      });
    }, function(error) {
    });
};

//Client secret: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