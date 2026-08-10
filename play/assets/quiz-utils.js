(function (global) {
  "use strict";

  function optionKey(value) {
    return String(value).trim().toLocaleLowerCase();
  }

  function normalizeSingleAnswerOptions(bank, randomize) {
    if (!Array.isArray(bank)) return bank;

    bank.forEach(function (question) {
      if (!question || !Array.isArray(question.options) || !Array.isArray(question.answers)) return;
      if (question.answers.length !== 1 || !Number.isInteger(question.answers[0])) return;

      const answerIndex = question.answers[0];
      if (answerIndex < 0 || answerIndex >= question.options.length) return;

      const correctOption = question.options[answerIndex];
      const uniqueOptions = [];
      const seen = new Set();
      question.options.forEach(function (option) {
        const key = optionKey(option);
        if (!seen.has(key)) {
          seen.add(key);
          uniqueOptions.push(option);
        }
      });

      if (uniqueOptions.length === question.options.length) return;

      const normalized = typeof randomize === "function"
        ? randomize(uniqueOptions.slice())
        : uniqueOptions;
      const normalizedAnswer = normalized.findIndex(function (option) {
        return optionKey(option) === optionKey(correctOption);
      });

      if (normalizedAnswer < 0) return;
      question.options = normalized;
      question.answers = [normalizedAnswer];
      if (Number.isInteger(question.answerIndex)) question.answerIndex = normalizedAnswer;
    });

    return bank;
  }

  global.JVQuizTools = Object.freeze({
    normalizeSingleAnswerOptions: normalizeSingleAnswerOptions
  });
})(window);
