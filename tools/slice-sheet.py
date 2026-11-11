#!/usr/bin/env python3
"""Cut a Higgsfield grid sheet into card art files.

  python3 tools/slice-sheet.py sheet.png 3x3 monsters 18 19 20 21 22 23 24 25 26

The sheet is a grid of paintings separated by white gutters. Cells are found from
the gutters (not by dividing the sheet evenly), read left to right, top to bottom,
and written to public/art/<theme>_<index>.jpg at 560px wide. Use - as an index to skip a cell.
Uses only Python's standard library and macOS `sips`. Add the new keys to ART afterwards.
"""
import os, struct, subprocess, sys, tempfile

WHITE, INSET, OUT_W, OUT_H = 235, 6, 560, 750


def bands(means, want):
    """Return the `want` widest runs of non-white lines as (start, end) pairs."""
    runs, start = [], None
    for i, m in enumerate(means + [255]):
        if m < WHITE and start is None:
            start = i
        elif m >= WHITE and start is not None:
            runs.append((start, i))
            start = None
    runs = sorted(sorted(runs, key=lambda r: r[0] - r[1])[:want])
    if len(runs) != want:
        sys.exit(f"found {len(runs)} bands, wanted {want}: the gutters are not clean, cut this sheet by hand")
    sizes = [b - a for a, b in runs]
    if max(sizes) > min(sizes) * 1.08:
        sys.exit(f"cells are uneven ({sizes}): check the sheet before using it")
    return runs


def main():
    if len(sys.argv) < 5:
        sys.exit(__doc__)
    sheet, grid, theme, idx = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4:]
    cols, rows = (int(n) for n in grid.split("x"))
    if len(idx) != cols * rows:
        sys.exit(f"{grid} needs {cols * rows} card indexes, got {len(idx)}")
    tmp = tempfile.mkdtemp()
    bmp = os.path.join(tmp, "s.bmp")
    # a small copy is enough to find the gutters
    subprocess.run(["sips", "-s", "format", "bmp", "-Z", "1000", sheet, "--out", bmp], check=True, capture_output=True)
    d = open(bmp, "rb").read()
    off, w, h, bpp = struct.unpack_from("<I", d, 10)[0], *struct.unpack_from("<ii", d, 18), struct.unpack_from("<H", d, 28)[0]
    flip, h, px = h > 0, abs(h), bpp // 8
    stride = (w * px + 3) & ~3
    grey = []
    for y in range(h):
        r = d[off + (h - 1 - y if flip else y) * stride:][: w * px]
        grey.append([min(r[x * px : x * px + 3]) for x in range(w)])
    xs = bands([sum(row[x] for row in grey) / h for x in range(w)], cols)
    ys = bands([sum(row) / w for row in grey], rows)
    out = subprocess.run(["sips", "-g", "pixelWidth", sheet], capture_output=True, text=True).stdout
    k = int(out.split()[-1]) / w
    n = 0
    for y0, y1 in ys:
        for x0, x1 in xs:
            X, Y = round(x0 * k) + INSET, round(y0 * k) + INSET
            W, H = round((x1 - x0) * k) - 2 * INSET, round((y1 - y0) * k) - 2 * INSET
            # trim to the output shape around the centre
            if W * OUT_H > H * OUT_W:
                nw = H * OUT_W // OUT_H; X += (W - nw) // 2; W = nw
            else:
                nh = W * OUT_H // OUT_W; Y += (H - nh) // 2; H = nh
            if idx[n] == "-":  # skip this cell
                n += 1
                continue
            dest = f"public/art/{theme}_{idx[n]}.jpg"
            cell = os.path.join(tmp, "cell.png")
            # crop and resize as two steps: sips resizes first when given both
            subprocess.run(["sips", "-c", str(H), str(W), "--cropOffset", str(Y), str(X), sheet, "--out", cell],
                           check=True, capture_output=True)
            subprocess.run(["sips", "-z", str(OUT_H), str(OUT_W), "-s", "format", "jpeg", "-s", "formatOptions", "72",
                            cell, "--out", dest], check=True, capture_output=True)
            print(dest, os.path.getsize(dest) // 1024, "KB")
            n += 1
    print("add to ART:", ",".join(f'"{theme}:{i}"' for i in idx if i != "-"))


main()
