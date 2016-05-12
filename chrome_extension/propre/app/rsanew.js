function generateRSAKeyPair(keysize) {
    var rsa = forge.pki.rsa;
    var keypair = rsa.generateKeyPair({bits: keysize, e: 0x10001, workers: -1});
    return keypair;
}

function getPubKeyPem(keypair) {
    return forge.pki.publicKeyToPem(keypair.publicKey);
}

function decryptRSA(encryptedString, privateKey) {
     var decrypted = privateKey.decrypt(forge.util.decode64(encryptedString), 'RSA-OAEP', {
         md: forge.md.sha256.create(),
         mgf1: {
             md: forge.md.sha256.create()
         }
     });
     return decrypted;
 }

 function doRSA(stringToBeEncrypted, pubkey) {
    var publicKey = forge.pki.publicKeyFromPem(pubkey);
    var buffer = forge.util.createBuffer(stringToBeEncrypted, 'utf8');
    var binaryString = buffer.getBytes();
    var encrypted = publicKey.encrypt(binaryString, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create()
        }
    });
    return forge.util.encode64(encrypted);
}