(function() {

  return {
    events: {
      'ticket.save': 'onTicketSave',
      'comment.text.changed': 'onCommentTextChanged'
    },

    onTicketSave: function() {
      if (this.commentIsValid()) {
        return true;
      } else {
        return this.I18n.t('forbidden_keywords_found', {
          keywords: this.setting('keywords')
        });
      }
    },

    onCommentTextChanged: _.debounce(function(){
      if (!this.setting('disable_submit'))
        return;

      if (this.commentIsValid()) {
        this.enableSave();
      } else {
        this.disableSave();
      }
    }, 200),

    commentIsValid: function() {
      var comment = this.comment().text(),
          keywords = this.setting('keywords').split(','),
          re = new RegExp(keywords.join('|'));

      return !re.exec(comment);
    }

  };

}());
