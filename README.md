# typolar-template
Template parser for Typolar

Conditional:

```c#
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
@anchor(name)
Aperiam aperiam et sint consequuntur minima est non. Sed animi laboriosam nulla qui enim odio soluta. Suscipit consectetur voluptatem perferendis et. Consequatur illo natus. Numquam sit repellendus deserunt rerum velit optio ex. Blanditiis veniam recusandae magni.
@end

@ref(name)
```

Interpolate

```bash
${code}
```

Piping

```bash
<%arg|function1|function2%>
```

reference -> conditional -> eval -> piping