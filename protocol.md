Royal Kludge R K84 RGB control over hid

65 bytes in total
following is 0-indexed

# light effect mode

## default (all modes except customize and music)
        0 0a
        1 01
        2 01
        3 02
        4 29
    5 rgb mode (used with presets) (1 - 15) (hex)
        6 00
    7 anim speed (1-5)
    8 brightness (1-5)
    9, 10, 11 (r, g, b) (0 - 255)
    12 color mixin (0, 1)
    13 sleep time (1-5)
        rest 00

## customize
a total of 8 packets gets sent
first packet conforms to default with mode `0e` (makes the kb to switch to custom light mode), then 7 packets follow that each start with:

    0 0a
    1 07 (maybe packet count?)
    2 sequence number (#1 of 7 had 1 etc, #7 had 7) (1-indexed)

each of these packets contains (r,g,b) values for each key ordered in a columnwise fashion (eg, ESC 2nd triplet of 1st packet, tilde 3rd triplet etc)

first three following bytes of the first packet (among the 7 rgb packets) is special and contains some meta information:
    1/3 -> 03 (0b00000011) (this is persistent read below in music to understand what it means)
    2/3 -> 7e
    3/3 -> custom lights profile number (01, 02, 03) {but why, firmware doesn't allow switching between those afaik?}

rest of the triplets are rgb triplets

## music

this is similar to customize section, with few differences:

- there is no first 'default'-conform packet
- this is not persistent (nothing gets flashed presumably), only transient. after a few seconds, colors revert back to their previous configuration

each tick consists of 7 packets like above, but the first few bytes of the first pack is different:
- instead of three header bytes, there are only two (so rgb triplets start one byte earlier)
- those two are:
    1/2 06 (0b00000110) (this makes the colors transient, unlike the customize option)
    2/2 00

# custom lights

same as music, everything is done in the software
