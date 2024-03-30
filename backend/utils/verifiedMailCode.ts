/**
 * Génère un code de vérification aléatoire composé de lettres et de chiffres.
 * @param length - La longueur du code de vérification.
 * @returns Le code de vérification généré.
 */
function generateVerificationCode(length: number = 4): string {
  // Définissez les caractères possibles pour le code. Inclut les lettres majuscules et minuscules et les chiffres.
  const characters: string = "0123456789";
  let result: string = "";

  // Générez un code de la longueur spécifiée.
  for (let i: number = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export { generateVerificationCode };
