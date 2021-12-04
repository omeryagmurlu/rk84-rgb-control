# RK84 RGB Control Library

Everything is reverse engineered, take notice of this before using the library. I'm not responsible for bricked keyboards, worn flashes etc. YOU are choosing to use this library, so it is your responsibility.

# Usage

Source code is trivial enough to understand, there are some examples too, you can take a look them. Run the examples with `npx ts-node` or compile them beforehand with `npx tsc`. I've also included my chaotic reverse engineering notes in the [protocol.md] file for convenience.

I was planning on extending the library with hysterese-aware methods, but got bored. You can implement hysterese easily with Layout if you want, as it is immutable per design.