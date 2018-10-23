class Line {

    constructor(i, text) {
        this.i = i + 1;
        this.text = text;
    }

}
class Ref extends Line {

    constructor(name, i, line) {
        super(i, line);
        this.name = name;
        this.lines = [];
        this.end = null;
        this.text = null;
    }

    push(line) {
        if (this.end) {
            throw new Error(`invalid syntax at line ${line.i}: ${line.text}`);
        }
        this.lines.push(line);
    }

    dump() {
        if (!this.text) {
            this.text = this.lines.map(l => l.text).join('\n');
        }

        return this.text;
    }

}

module.exports = function(template, options) {
    const lines = template.split('\n');
    const map = new Map();
    let current;
    const contents = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\s*@set\(.+\)\s*$/i.test(line)) {
            if (current != null && !current.end) {
                throw new Error(`expecting @end at line ${i}: "${line}"`);
            }
            const name = line.replace(/^\s*@set\(\s*(.+?)\s*\)\s*$/i, '$1');
            if (map.has(name)) {
                throw new Error(
                    `duplicate reference name "${name}" at line ${i}: ${line}`
                );
            }
            current = new Ref(name, i, line);
            map.set(name, current);
        } else if (/^\s*@end\s*$/i.test(line)) {
            if (!current) {
                throw new Error(`invalid syntax at line ${i}: ${line}`);
            }
            current.end = new Line(i, line);
            current = null;
        } else if (current) {
            current.push(new Line(i, line));
        } else {
            contents.push(new Line(i, line));
        }
    }
    if (current && !current.end) {
        throw new Error(
            `missing @end for line ${current.i}: "${current.text}"`
        );
    }

    return contents
        .map(line =>
            line.text.replace(/@ref\(\s*(.+?)\s*\)/gi, (_, name) => {
                const ref = map.get(name);
                if (!ref) {
                    if (options && options.silent) {
                        return _;
                    }
                    throw new Error(
                        `ref name "${name}" not found at line ${line.i}: ${
                            line.text
                        }`
                    );
                }

                return ref.dump();
            })
        )
        .join('\n');
};
