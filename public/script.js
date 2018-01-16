new Vue({
  el: '#app',
  data: {
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    message: ''
  },
  methods: {
    onSubmit: function() {
      console.log('to=' + this.to);
      console.log('cc=' + this.cc);
      console.log('bcc=' + this.bcc);
      console.log('message=' + this.message);
      console.log('YAY');
      this.axios.post('/send/', {
        to: this.to,
        cc: this.cc,
        bcc: this.bcc,
        subject: this.subject,
        message: this.message
      })
        .then(function (response) {
          console.log('Successfully sent email request: ' + JSON.stringify(response));
      })
        .catch(function (error) {
          console.error('Failed to send email request: ' + error);
      })
    }
  }
});