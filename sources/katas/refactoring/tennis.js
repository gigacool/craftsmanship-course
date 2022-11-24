

function getScore1(m_score1, m_score2) {
    var score = "";
    var tempScore = 0;
    if (m_score1 === m_score2) {
        switch (m_score1) {
            case 0:
                score = "Love-All";
                break;
            case 1:
                score = "Fifteen-All";
                break;
            case 2:
                score = "Thirty-All";
                break;
            default:
                score = "Deuce";
                break;
        }
    } else if (m_score1 >= 4 || m_score2 >= 4) {
        var minusResult = m_score1 - m_score2;
        if (minusResult === 1) {score = "Advantage player1";}
        else if (minusResult === -1) {score = "Advantage player2";}
        else if (minusResult >= 2) {score = "Win for player1";}
        else {score = "Win for player2";}
    } else {
        for (var i = 1; i < 3; i++) {
            if (i === 1) {tempScore = m_score1;}
            else {
                score += "-";
                tempScore = m_score2;
            }
            switch (tempScore) {
                case 0:
                    score += "Love";
                    break;
                case 1:
                    score += "Fifteen";
                    break;
                case 2:
                    score += "Thirty";
                    break;
                case 3:
                    score += "Forty";
                    break;
            }
        }
    }
    return score;
}

function getScore2(P1point, P2point) {
    var score = "";

    if (P1point === P2point && P1point < 3) {
        if (P1point === 0) {
            score = "Love";
        }
        if (P1point === 1) {
            score = "Fifteen";
        }
        if (P1point === 2) {
            score = "Thirty";
        }
        score += "-All";
    }
    if (P1point === P2point && P1point > 2) {
        score = "Deuce";
    }

    var P1res;
    var P2res;
    if (P1point > 0 && P2point === 0) {
        if (P1point === 1) {
            P1res = "Fifteen";
        }
        if (P1point === 2) {
            P1res = "Thirty";
        }
        if (P1point === 3) {
            P1res = "Forty";
        }

        P2res = "Love";
        score = P1res + "-" + P2res;
    }
    if (P2point > 0 && P1point === 0) {
        if (P2point === 1) {
            P2res = "Fifteen";
        }
        if (P2point === 2) {
            P2res = "Thirty";
        }
        if (P2point === 3) {
            P2res = "Forty";
        }

        P1res = "Love";
        score = P1res + "-" + P2res;
    }

    if (P1point > P2point && P1point < 4) {
        if (P1point === 2) {
            P1res = "Thirty";
        }
        if (P1point === 3) {
            P1res = "Forty";
        }
        if (P2point === 1) {
            P2res = "Fifteen";
        }
        if (P2point === 2) {
            P2res = "Thirty";
        }
        score = P1res + "-" + P2res;
    }
    if (P2point > P1point && P2point < 4) {
        if (P2point === 2) {
            P2res = "Thirty";
        }
        if (P2point === 3) {
            P2res = "Forty";
        }
        if (P1point === 1) {
            P1res = "Fifteen";
        }
        if (P1point === 2) {
            P1res = "Thirty";
        }
        score = P1res + "-" + P2res;
    }

    if (P1point > P2point && P2point >= 3) {
        score = "Advantage player1";
    }

    if (P2point > P1point && P1point >= 3) {
        score = "Advantage player2";
    }

    if (P1point >= 4 && P2point >= 0 && (P1point - P2point) >= 2) {
        score = "Win for player1";
    }
    if (P2point >= 4 && P1point >= 0 && (P2point - P1point) >= 2) {
        score = "Win for player2";
    }
    return score;
}

function getScore3(p1, p2) {
    var s;
    let p1N = "player1";
    let p2N = "player2";
    if ((p1 < 4 && p2 < 4) && (p1 + p2 < 6)) {
        var p = ["Love", "Fifteen", "Thirty", "Forty"];
        s = p[p1];
        return (p1 === p2) ? s + "-All" : s + "-" + p[p2];
    } else {
        if (p1 === p2) {
            return "Deuce";
        }
        s = p1 > p2 ? p1N : p2N;
        return ((p1 - p2) * (p1 - p2) === 1) ? "Advantage " + s : "Win for " + s;
    }
}


function isPlaying(player1Points, player2Points){
    return (['0-0', '0-1', '0-2', '0-3', '1-0', '1-1', '1-2', '1-3', '2-0', '2-1', '2-2', '2-3', '3-0', '3-1', '3-2',]
        .indexOf(player1Points+'-'+player2Points) >=0);

}

function isDeuce(player1Points, player2Points){
    return (!isPlaying(player1Points, player2Points) &&
        player1Points === player2Points);
}

function isAdvantage(player1Points, player2Points){
    return (Math.abs(player1Points - player2Points) < 2);
}

function playingScore(player1Points, player2Points){
    const POINTS = ["Love", "Fifteen", "Thirty", "Forty"];
    let score = POINTS[player1Points];
    if (player1Points === player2Points){
        return score +'-All';
    }
    return score + "-" + POINTS[player2Points];
''}

function getScore4(player1Points, player2Points, player1="player1", player2="player2") {

    if(isPlaying(player1Points, player2Points)){
        return playingScore(player1Points, player2Points);
    }    
    
    if (isDeuce(player1Points, player2Points)) {
        return "Deuce";
    }
    
    let leadingPlayer = player1Points > player2Points ? player1 : player2;
    
    if (isAdvantage(player1Points, player2Points)){
        return "Advantage " + leadingPlayer;
    }

    return "Win for " + leadingPlayer;
}

module.exports = {
    getScore1,
    getScore2,
    getScore3,
    getScore4
};