const speak = (phrase, country) => {
  const synth = window.speechSynthesis;
  const utt = new SpeechSynthesisUtterance(phrase);
  utt.lang = country ?? "en-US";
  utt.rate = 0.85;
  synth.speak(utt);
};

export default speak;
