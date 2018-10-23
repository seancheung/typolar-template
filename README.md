# typolar-template

[![Master Build][travis-master]][travis-url]
[![Develop Build][travis-develop]][travis-url]

Template parser for Typolar

[travis-master]: https://img.shields.io/travis/seancheung/typolar-template/master.svg?label=master
[travis-develop]: https://img.shields.io/travis/seancheung/typolar-template/develop.svg?label=develop
[travis-url]: https://travis-ci.org/seancheung/typolar-template

## Install

```bash
npm i typolar-template
```

## Usage

```javascript
const parse = require('typolar-template');
const template = '//template text';
const vars = {/* variables used in template */};
const content = parse(template, vars);
```

### Syntax

Conditional:

```perl
Pariatur officiis dolores soluta nisi rerum sapiente aut ut.
#if a > b
Et et non.
#else
Soluta libero dolores saepe dolorem repellat illo.
    #if x > y
Quia officia autem quod suscipit qui.
    #end
Qui nemo qui consectetur eum corrupti omnis qui.
#end
Distinctio porro repellat optio consectetur vel id aut odio.
```

Reference

```less
@set(name)
Aperiam aperiam et sint consequuntur minima est non.
Sed animi laboriosam nulla qui enim odio soluta. Suscipit consectetur voluptatem perferendis et.
Consequatur illo natus.
Numquam sit repellendus deserunt rerum velit optio ex. Blanditiis veniam recusandae magni.
@end

@ref(name)
```

Interpolate

```bash
${code}
```

Piping

```html
<%arg|function1|function2%>
```

Rendering order:

reference -> conditional -> interpolate -> piping