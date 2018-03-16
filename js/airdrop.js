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
    window.alert('メールアドレスもしくはETHアドレスがが正しくありません。');
    return false;
  }
  else{
    var result = register_data();
    if (result == 0) {
      window.alert('入力されたメールアドレスまたはETHアドレスはすでに登録されています。');
      return false;
    }
    else if (result == 1) {
      window.alert('メールアドレス、ETHアドレスを登録しました。');
    }
    else {
      window.alert('現在AirDrop準備中です。今しばらくお待ち下さい。');
      return false;
    }

    function register_data() {
      var result;
      $.ajax({
        url: 'https://153.126.204.171/post_request',
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
