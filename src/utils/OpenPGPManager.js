import * as openpgp from "openpgp";

const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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
iyOna1b/dkVViWOMz6X2X1uB6JLtriI=
=pdKI
-----END PGP PUBLIC KEY BLOCK-----`;

const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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
=xktn
-----END PGP PRIVATE KEY BLOCK-----
`;

// encrypted private key

// console.log(openpgp);
// console.log(openpgp.config);
// console.log(openpgp.enums.compression);

class OpenPGPManager {
  async readPublicKey(publicKeyArmored) {
    return await openpgp.readKey({ armoredKey: publicKeyArmored });
  }

  async decryptPrivateKey(privateKeyArmored, passphrase) {
    return await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      }),
      passphrase,
    });
  }

  async encryptMessage(messageText, encryptionKeys, signingKeys) {
    return await openpgp.encrypt({
      message: await openpgp.createMessage({
        text: messageText,
        date: new Date().getDate(),
      }),
      config: { minRSABits: 32 },
      encryptionKeys,
      signingKeys,
      format: "armored",
    });
  }

  async decryptMessage(encryptedMessage, verificationKeys, decryptionKeys) {
    const message = await openpgp.readMessage({
      armoredMessage: encryptedMessage,
    });
    const { data: decrypted, signatures } = await openpgp.decrypt({
      message,
      verificationKeys,
      decryptionKeys,
    });
    return { decrypted };
  }

  async verifySignature(signatures) {
    try {
      await signatures[0].verified;
      return "Signature is valid";
    } catch (e) {
      throw new Error("Signature could not be verified: " + e.message);
    }
  }
}

// Create an instance of OpenPGPManager
const openPGPManager = new OpenPGPManager();

export async function startProcess(value) {
  const passPhrase = "CrmsTest2";

  try {
    // Decode the Base64-encoded input
    const encryptedBytes = atob(value);
    const encryptedText = new TextDecoder().decode(
      new Uint8Array([...encryptedBytes].map((char) => char.charCodeAt(0)))
    );

    // Read the private key
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      }),
      passphrase: passPhrase,
    });

    // Decrypt the encrypted text
    const { data: decryptedData } = await openpgp.decrypt({
      message: await openpgp.readMessage({
        armoredMessage: encryptedText,
      }),
      decryptionKeys: privateKey,
    });

    // Return the decrypted text
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting:", error);
    throw new Error(
      "Error decrypting the text. Please check your input and try again."
    );
  }
}

export const startEncryptProcess = async (value) => {
  const passPhrase = "CrmsTest2";
  const encryptedText = value;
  const publicKey = await openPGPManager.readPublicKey(publicKeyArmored);
  const privateKey = await openPGPManager.decryptPrivateKey(
    privateKeyArmored,
    passPhrase
  );

  try {
    // Encrypt the text
    const encryptedResult = await openPGPManager.encryptMessage(
      encryptedText,
      publicKey,
      privateKey
    );

    // Convert the encrypted result to Base64
    const encryptedBytes = new TextEncoder().encode(encryptedResult);

    // Chunked conversion to base64 to avoid maximum call stack size exceeded error
    let binaryString = "";
    const chunkSize = 8192; // 8 KB chunks
    for (let i = 0; i < encryptedBytes.length; i += chunkSize) {
      binaryString += String.fromCharCode(
        ...encryptedBytes.slice(i, i + chunkSize)
      );
    }

    const encryptedBase64String = btoa(binaryString);
    return encryptedBase64String;
  } catch (error) {
    console.error("Error encrypting:", error);
    throw new Error(
      "Error encrypting the text. Please check your input and try again."
    );
  }
};

class PgpManagerUtil {
  static uint8ArrayToBase64(uint8Array) {
    let binary = "";
    uint8Array.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary);
  }

  static base64ToUint8Array(base64String) {
    const binaryString = atob(base64String);

    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return uint8Array;
  }
}

export { OpenPGPManager };
