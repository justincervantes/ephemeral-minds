const exclusion = [
  "I",
  "we",
  "you",
  "he",
  "she",
  "it",
  "they",
  "me",
  "us",
  "her",
  "him",
  "it",
  "the",
  "a",
  "an",
  "some",
  "A",
  "i",
  "them",
  "us",
  "to",
  "at",
];

export function removeCommonWords(words) {
  let newArr = words.filter((word) => {
    if (exclusion.includes(word.value)) {
      return false;
    }
  });

  return newArr;
}
