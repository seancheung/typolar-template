const exec = require('./exec');

class Node {

    constructor(i, line) {
        this.i = i + 1;
        this.line = line;
    }

    dump() {
        return this.line;
    }

}

class EndNode extends Node {}

class Block extends Node {

    constructor(i, line) {
        super(i, line);
        this.nodes = [];
    }

    push(node) {
        this.nodes.push(node);
    }

    *exec(sandbox) {
        for (const node of this.nodes) {
            if (node instanceof Block) {
                yield* node.exec(sandbox);
            } else {
                yield node.dump();
            }
        }
    }

}

class RootBlock extends Block {

    constructor() {
        super();
        delete this.i;
        delete this.line;
    }

}

class IfBlock extends Block {

    constructor(i, line) {
        super(i, line);
        this.code = line.replace(/^\s*#\s*if\s+(.+)\s*$/i, '$1');
        this.else = null;
        this.elifs = [];
    }

    push(node) {
        if (this.end) {
            throw new Error(`invalid syntax at line ${node.i}`);
        }
        if (node instanceof ElifBlock) {
            this.elifs.push(node);
        } else if (node instanceof ElseBlock) {
            this.else = node;
        } else if (node instanceof EndNode) {
            this.end = node;
        } else {
            super.push(node);
        }
    }

    *exec(sandbox) {
        const success = exec(this.code, sandbox);
        if (success) {
            yield* super.exec(sandbox);
        } else {
            let block;
            for (const elif of this.elifs) {
                if (elif.test(sandbox)) {
                    block = elif;
                    break;
                }
            }
            if (!block) {
                block = this.else;
            }
            if (block) {
                yield* block.exec(sandbox);
            }
        }
    }

}

class ElseBlock extends Block {}

class ElifBlock extends Block {

    constructor(i, line) {
        super(i, line);
        this.code = line.replace(/^\s*#\s*elif\s+(.+)\s*$/i, '$1');
    }

    test(sandbox) {
        const success = exec(this.code, sandbox);

        return success;
    }

}

module.exports = function(template, sandbox) {
    const lines = template.split('\n');
    let i = -1,
        line;

    function readLine() {
        if (i > lines.length - 1) {
            return null;
        }

        line = lines[++i];
    }

    function readBlock(block) {
        readLine();
        while (line != null) {
            if (/^\s*#\s*if/i.test(line)) {
                const child = new IfBlock(i, line);
                readBlock(child);
                block.push(child);
            } else if (/^\s*#\s*elif/i.test(line)) {
                if (block instanceof IfBlock) {
                    const child = new ElifBlock(i, line);
                    readBlock(child);
                    block.push(child);
                } else if (block instanceof ElifBlock) {
                    i--;

                    return;
                } else {
                    throw new Error(`invalid syntax at line ${i}`);
                }
            } else if (/^\s*#\s*else/i.test(line)) {
                if (block instanceof IfBlock) {
                    const child = new ElseBlock(i, line);
                    readBlock(child);
                    block.push(child);
                } else if (block instanceof ElifBlock) {
                    i--;

                    return;
                } else {
                    throw new Error(`invalid syntax at line ${i}`);
                }
            } else if (/^\s*#\s*end/i.test(line)) {
                if (block instanceof IfBlock) {
                    block.push(new EndNode(i, line));
                } else if (block instanceof RootBlock) {
                    throw new Error(`invalid syntax at line ${i}`);
                } else {
                    i--;
                }

                return;
            } else {
                block.push(new Node(i, line));
            }
            readLine();
        }
        if (block instanceof IfBlock && !block.end) {
            throw new Error(`if block not closed at line ${block.i}`);
        }
    }

    const root = new RootBlock();
    readBlock(root);

    return Array.from(root.exec(sandbox)).join('\n');
};
