const util = require('./util')
const definitions = require('./definitions')

function encode(quiz) {
    // Start by creating a flat list of all words and all definitions, their
    // indicies in this flat list will be used in the code
    //
    // The format will be:
    //   Each question separated by a dash
    //   Each part of each question separated by a dot
    //     - The index of the word this question is based on from the flat list of q's
    //     - The relative index of the correct answer for this q.  0 to n-1 where n is 
    //       the number of answers to this question.
    //     - params: The rest of the dot separated values are the definitions that make
    //       up the possible answers to this question.  There are n of them.
    // <word-idx>.<correct-ans-idx>.

    let allWords = Object.keys(definitions)
    let allDefinitions = Object.values(definitions).reduce((arr, defs) => arr.concat(defs), [])

    let wordToAnswers = util.arrayToObject(quiz.answerKey, "word")
    let encoding = ''

    for(let i=0; i<quiz.questions.length; ++i) {
        if (i != 0) encoding += '-'

        let q = quiz.questions[i]
        let wordIndex = allWords.indexOf(q.word)
        let correctChoiceIndex = wordToAnswers[q.word].correctChoiceIndex

        let qCode = `${wordIndex}.${correctChoiceIndex}`

        for(let answer of q.answers) {
            qCode += '.' + allDefinitions.indexOf(answer)
        }

        encoding += qCode
    }

    return encoding
}

function decode(encodedQuiz) {



}

module.exports = {encode, decode}