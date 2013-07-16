function activeSessionFor(email) {
  // In here, we ask the server if this email has an active session
  // TODO: Implementation
  return true;
}

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
    if (activeSessionFor(email)) {
      navigator.id.genKeyPair(function(publicKey) {
        generateCert(email, publicKey, certDuration, function (certificate) {
          navigator.id.registerCertificate(certificate);
        });
      });
    } else {
      navigator.id.raiseProvisioningFailure('user is not authenticated as target user');
    }
  });
}
