function makeCapital(nameString) {
    if (nameString === 'cpr') return 'CPR';
    else
        return nameString
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}

exports.makeCapital = makeCapital;
