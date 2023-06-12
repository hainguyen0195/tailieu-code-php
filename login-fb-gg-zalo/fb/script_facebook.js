window.fbAsyncInit = function() {
    FB.init({
      appId      : '616818610402927',
      cookie     : true,
      xfbml      : true,
      version    : 'v17.0'
    });
      
    FB.AppEvents.logPageView();   
      
  };
function Login_fb()
{
    FB.login(function(response) {
     if (response.authResponse) 
     {
      getUserInfo_dn();
      return false;
    } else
    {
     console.log('User cancelled login or did not fully authorize.');
   }
  },{scope: 'email'});
};

function getUserInfo_dn() {
 FB.api('/me?fields=id,name,email,picture{url}', function(response) {
  response.type= "submit";
        $.post("api/ajax_facebook.php",response,function(data){ 
          if(data == 1){
            window.location.replace('https://earthlyglow.vn/');
          } else{
            alert('Something Went Wrong!');
          }                  
        });
      });
};
function Logout()
{
  FB.logout(function(){document.location.reload();});
};

(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
