function generateCert(email, pubKey, certDuration, callback) {
  // Call to backend to generate cert
  $.ajax({
    url: '/api/cert_key',
    data : {
      pubkey: pubKey,
      duration: certDuration,
      email: email
    },
    type: 'POST',
    header: {"Content-Type": "application/json"},
    success: function (data) {
      if (data.success) {
        callback(data.certificate);
      } else {
        navigator.id.raiseProvisioningFailure('Could not certify key');
      }
    },
    error: function(data) {
      navigator.id.raiseProvisioningFailure('Could not connect to certifer');
    }
  });
}

function startProvisioning() {
  navigator.id.beginProvisioning(function(email, certDuration) {
    $.ajax({
      url: '/api/whoami',
      type: 'GET'
    }).done(function (data) {
      var user = email.split('@')[0].toLowerCase();
      if (user != data.user) {
        return navigator.id.raiseProvisioningFailure('user is not authenticated as target user');
      }
      navigator.id.genKeyPair(function(publicKey) {
        generateCert(email, publicKey, certDuration, function (certificate) {
          navigator.id.registerCertificate(certificate);
        });
      });
    }).fail(function (data) {
      navigator.id.raiseProvisioningFailure('user is not authenticated');
    });
  });
}

function startAuthenticating() {
  navigator.id.beginAuthentication(function(email){
    var user = email.split('@')[0].toLowerCase();

    // We can check if user is in the system

    $("form button.cancel").click(function(e) {
      e.preventDefault();
      navigator.id.raiseAuthenticationFailure("user canceled authentication");
    });

    $("form").submit(function(e) {
      e.preventDefault();
      var pass = $("form input[name='pass']").val();

      $.ajax({
        url: '/api/signin',
        type: 'POST',
        data: { user: user, pass: pass },
        header: {"Content-Type": "application/json"},
        success: function() {
          navigator.id.completeAuthentication();
        },
        error: function() {
          $("div.error").text("Yikes, that password looks wrong. Try again.");
        }
      });

    });
  });
}