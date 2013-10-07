(function() {

  return {
    events: {
      'ticket.save': 'onTicketSave'
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

    commentIsValid: function() {
      var comment = this.comment().text(),
          keywords = this.setting('keywords').split(','),
          re = new RegExp(keywords.join('|'));

      return !re.exec(comment);
    }

  };

}());
