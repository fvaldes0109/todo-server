const enums = {
    status: ['PENDING', 'COMPLETED'], // Valid status values
    priority: ['Low', 'Medium', 'High'], // Valid priority values
}

// Comparer to sort tasks by priority
const priorityCompare = (p1, p2) => {

    const i1 = enums.priority.indexOf(p1);
    const i2 = enums.priority.indexOf(p2);

    return i1 - i2;
}

module.exports = {
    enums,
    priorityCompare,
};