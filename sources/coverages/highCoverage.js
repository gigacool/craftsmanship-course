
function computeQuestions(questions){
    let result = 0;
    for (const question of questions) {
        result += question && question.isCorrect ? question.score:0;
    }
    return result;
}

function highCoverage(questions = []){
    if (questions.length === 0){
        return 0;
    }
    return computeQuestions(questions);
}

module.exports = {
    highCoverage
}