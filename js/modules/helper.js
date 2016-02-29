$(function() {
var login_form = $('.login-form'),
    login_enter = $('.page-header-options-login'),
    close_form = $('.login-form-btn-close'),
    chat = $('.online-chat'),
    chat_btn = $('.page-panel-chat'),
    close_chat = $('.online-chat-close-btn'),
    tabsIcons = $('.page-tabs-icons'),
    banner_text = $('.page-tabs-header-title'),
    scrollTop = $('body').scrollTop();

// Login and Chat

login_enter.on('click', function(){
  login_form.animate({ top: '0px'}, 700);
})

close_form.on('click', function(){
  login_form.animate({ top: '-370px'}, 700);;
})

chat_btn.on('click', function(){
  chat.slideDown('slow').show();
})

close_chat.on('click', function(){
  chat.slideUp('slow');
})


});


