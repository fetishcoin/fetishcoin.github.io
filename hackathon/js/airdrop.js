function check(){
  var contact = document.getElementById("contact-form")
  var email = contact.querySelector('input[name="email"]').value
  var eth = contact.querySelector('input[name="eth"]').value
  var flag = 0;

  if(!email.match(/.+@.+\..+/)){
    flag = 1;
  }
  if(!eth.match(/^[0-9a-zA-z]+$/)){
    flag = 1;
  }
  if(flag){
    window.alert('Please check your E-mail or ETH address.\nメールアドレスもしくはETHアドレスがが正しくありません。');
    return false;
  }
  else{
    var result = register_data();
    if (result == 0) {
      window.alert('Your info already have been registered.\n入力されたメールアドレスまたはETHアドレスはすでに登録されています。');
      return false;
    }
    else if (result == 1) {
      window.alert('Thanks! You have been registered.\nメールアドレス、ETHアドレスを登録しました。');
    }
    else {
      window.alert('Submit failed. Please wait a moment or please inform us.\n何らかの問題によりデータ送信できませんでした。しばらく時間をおいてから再度お試しいただくか、運営まで不具合をお知らせください。');
      return false;
    }

    function register_data() {
      var result;
      $.ajax({
        url: 'https://fetishcoin-project.com/post_request',
        type: 'POST',
        data: {
          'email': email,
          'eth': eth
        },
        async: false
      }).done(function(data) {
        result = JSON.parse(data.ResultSet).flag;
      }).fail(function(data) {
        result = 2;
      });
      return result;
    }
  }
}
