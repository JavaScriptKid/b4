
var hasSamePairMembers = function(candidate=[1,2], master=[2,1]) {
    return master.indexOf(candidate[0]) > -1 && master.indexOf(candidate[1]) > -1
};

export function getMatchupPairs(participants=[]) {
    var pairs = [];
    participants.forEach(p1 => {
        participants.forEach(p2 => {
            const candidate = [p1,p2];

            var isNewPair = true;
            if (p1 !== p2) { //Note. This version includes duplicates. So a pair will be ["a","a"]
                pairs.forEach(pair => {
                    if (hasSamePairMembers(candidate,pair)) {
                        isNewPair = false;
                    }
                })
            }

            if (isNewPair) {
                pairs.push(candidate)
            }

        })
    });
    return pairs;
}
