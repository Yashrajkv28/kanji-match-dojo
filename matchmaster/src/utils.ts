export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getColumnLabel(index: number): string {
  let label = '';
  let current = index + 1;

  while (current > 0) {
    const remainder = (current - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    current = Math.floor((current - 1) / 26);
  }

  return label;
}

export const SAMPLE_DATA = `Bikkuri shimashita - I was surprised.
Odorokimashita - I was surprised.
Kore wa himitsu desu - This is a secret.
Kore wa naisho desu - This is a secret.
Fushigi desu - It’s mysterious.
Joudan deshou - Must be a joke.
Shitsurei shimasu - Sorry to disturb.
Okuni wa dochira desuka - Where are you from?
Watashi wa Karunataka no shusshin desu - I am from Karnataka.
Sore wa donna imi desuka - What does it mean?
Yoku ganbarimashita - You worked very hard.
Oboete imasuka - Do you remember?
Wasure mashita - I forgot it.
Gakkari shimashita - I am disappointed.`;
