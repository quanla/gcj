
let str = `<h3>Problem</h3>\n<p>\n  <a href="https://code.google.com/codejam/contest/6254486/dashboard#s=p1">Last year</a>,\n  the Infinite House of Pancakes introduced a new kind of pancake.\n  It has a happy face made of chocolate chips on one side (the "happy side"),\n  and nothing on the other side (the "blank side").\n</p>\n<p>\n  You are the head cook on duty. The pancakes are cooked in a single row over a\n  hot surface. As part of its infinite efforts to maximize efficiency, the\n  House has recently given you an oversized pancake flipper that flips exactly\n  <b>K</b> consecutive pancakes. That is, in that range of <b>K</b> pancakes,\n  it changes every happy-side pancake to a blank-side pancake, and vice versa;\n  it does <i>not</i> change the left-to-right order of those pancakes.\n</p><p>\n  You cannot flip fewer than <b>K</b> pancakes at a time with the flipper,\n  even at the ends of the row (since there are raised borders on both sides of\n  the cooking surface). For example, you can flip the first <b>K</b> pancakes,\n  but not the first <b>K</b> - 1 pancakes.\n</p><p>\n  Your apprentice cook, who is still learning the job, just used the\n  old-fashioned single-pancake flipper to flip some individual pancakes and\n  then ran to the restroom with it, right before the time when customers come\n  to visit the kitchen. You only have the oversized pancake flipper left, and\n  you need to use it quickly to leave all the cooking pancakes happy side up,\n  so that the customers leave feeling happy with their visit.\n</p><p>\n  Given the current state of the pancakes, calculate the minimum number of uses\n  of the oversized pancake flipper needed to leave all pancakes happy side up,\n  or state that there is no way to do it.\n</p>\n\n<h3>Input</h3>\n<p>\n  The first line of the input gives the number of test cases, <b>T</b>.\n  <b>T</b> test cases follow. Each consists of one line with a string <b>S</b>\n  and an integer <b>K</b>. <b>S</b> represents the row of pancakes: each of its\n  characters is either <code>+</code> (which represents a pancake that is\n  initially happy side up) or <code>-</code> (which represents a pancake that\n  is initially blank side up).\n</p>\n\n<h3>Output</h3>\n<p>\n  For each test case, output one line containing <code>Case #x: y</code>, where\n  <code>x</code> is the test case number (starting from 1) and <code>y</code>\n  is either <code>IMPOSSIBLE</code> if there is no way to get all the pancakes\n  happy side up, or an integer representing the the minimum number of times you\n  will need to use the oversized pancake flipper to do it.\n</p>\n\n<h3>Limits</h3>\n<p>\n  1 &le; <b>T</b> &le; 100.<br/>\n  Every character in <b>S</b> is either <code>+</code> or <code>-</code>.<br/>\n  2 &le; <b>K</b> &le; length of <b>S</b>.<br/>\n</p>\n\n<h4>Small dataset</h4>\n<p>\n  2 &le; length of <b>S</b> &le; 10.<br/>\n</p>\n\n<h4>Large dataset</h4>\n<p>\n  2 &le; length of <b>S</b> &le; 1000.<br/>\n</p>\n\n\n<h3>Sample</h3>\n<div class="problem-io-wrapper">\n<table>\n<tr>\n<td>\n<br/>\n<span class="io-table-header">Input</span>\n<br/>&nbsp;\n</td>\n<td>\n<br/>\n<span class="io-table-header">Output</span>\n<br/>&nbsp;\n</td>\n</tr>\n<tr>\n<td>\n<pre class="io-content">3\n---+-++- 3\n+++++ 4\n-+-+- 4\n\n</pre>\n</td>\n<td>\n<pre class="io-content">Case #1: 3\nCase #2: 0\nCase #3: IMPOSSIBLE\n</pre>\n</td></tr></table>\n</div>\n\n\n<p>\n  In Case #1, you can get all the pancakes happy side up by first flipping the\n  leftmost 3 pancakes, getting to <code>++++-++-</code>, then the rightmost 3,\n  getting to <code>++++---+</code>, and finally the 3 pancakes that remain\n  blank side up. There are other ways to do it with 3 flips or more, but none\n  with fewer than 3 flips.\n</p><p>\n  In Case #2, all of the pancakes are already happy side up, so there is no\n  need to flip any of them.\n</p><p>\n  In Case #3, there is no way to make the second and third pancakes from the\n  left have the same side up, because any flip flips them both. Therefore,\n  there is no way to make all of the pancakes happy side up.\n</p>\n`;

function getBetween(content, from, to) {
    let index = 0;
    let ret = [];

    for (;;) {
        let found = content.indexOf(from, index);
        if (found == -1) {
            break;
        }

        let toIndex = content.indexOf(to, found + from.length);

        ret.push(content.substring(found + from.length, toIndex));

        index = toIndex + to.length;
    }
    return ret;
}

// console.log(getBetween(str, `<pre class="io-content">`, `</pre>`));
// console.log(str);

const ProblemReader = {
    readProblem(problem) {
        let between = getBetween(problem.body, `<pre class="io-content">`, `</pre>`);
        if (between.length == 2) {
            return {sample: {
                in: between[0],
                out: between[1],
            }};
        }
        return {};
    }
};

exports.ProblemReader = ProblemReader;