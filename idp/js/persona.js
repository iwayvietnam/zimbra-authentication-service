

function activeSessionFor(email) {
  // In here, we ask the server if this email has an active session
  // TODO: Implementation
  return true;
}

function generateCert(email, pubkey, certDuration, callback) {
  // Call to backend to generate cert

  $.ajax({
    url: 'http://localhost:8080/cert_key',
    data : {
      pubkey: pubKey,
      duration: certDuration
    },
    type: 'POST',
    header: {'Content Type': 'application/json'},
    dataType: 'json',
    success: function (data) {
      if (data.success) {
        callback(data.certificate);
      } else {
        navigator.id.raiseProvisioningFailure('Could not certify key');
      }
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