import * as openpgp from "openpgp";

const publicKeyArmored = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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
iyOna1b/dkVViWOMz6X2X1uB6JLtriI=
=pdKI
-----END PGP PUBLIC KEY BLOCK-----
`;

const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xcaGBGe/FnQBEADS+X0Z7s5Mks9PPrpXtPOJqHUBvwEJVaGDKl7T5k6IXqf9kR3I
nfjjKyTdLHlSbbw2OYphjzKTW5ngLBg1mhU2ml29+jDAbAoBU0Kl3trOIGKPUEQ+
b+G634RFd+9ZvG23Lj301Abkcg/gRDz4kYbrNEJ3ZUcscOKyLqlp0A9osca36E4w
mE1Q69kaMkId/3CbATeLVOyKD28/rbNJzFP48KXyCBWw6xwQ9ehh8Ula0ZhVPuhK
VCjciMijiErBea1W5ZHcBq0XXrfxqjp0F9MXVQT5RjGsxDlSP47jwchYjDDPAR0H
TFmykzY6lt1PFrvqB7hLXNOAp47VLV7gl6w0sf2LRZvhmx2S4bfFPoSU9wGjVF7F
SVfz/Q3MfXIfs2N31rQb4MM5/FivEjoPRJ6Qftn4CQBSGtoKVcO+fPODznFV9jdx
ukFh6ctFgI1k5X6lGXy3t/+7OUhaesrKPexk+8gMRfNF0PSLBa8yo0i98puO+Oqc
8CUiAXXmKVGl5FYhZ7lAI/DHn5Zf+MnYR48/khsexNhQv8s2UzMUrfP6tb7UBi7k
VnFvQVtuxSdsPFi/Ld3KqU1V/SN0YmZmevEeRJSVO5vOhttl9N21HIUH6bP+ZW/e
sZjgzkmtNOzKeb47gLZw8VEXUhAPfOdVwe8b/QpGci1nNdG6nL2mDJbfuwARAQAB
/gkDCMCIO9bo4NHtYBh7VlsMbMpH9wgWO34+WFp4u+/caYV5qWGzlgmJsBQBL/xb
mqFsZEAwg0izUkL1WaA8wpC8fia3mtNC8E4kiqkECcSJAYXK9xbTHmEcccp2IrCS
NcvW1wV8JupaRRTjkEXhcOMyrBtbbb+s8OV0Hz0h/NkQoQoGAzKI0Smx/6PxBbx1
hobYFLKg1uUH//99FG5SNOL4jwscIUYVAj8vylSLX/6TFS5krClBhu8zFcm/ul4w
bJoPjsO1R0dogGAb7jzZleed9zxuPhbfZBsGfpZgc0eXbQ+Rp75M511OKt4+RZTt
kUhWQnSSbcLVZwBnW2loagd0qNEcmY+5wEDEVnYgeFmoAzI0z16Cf3sbGQwJbQDG
kIpqnqrKLAWAshC/o2sKK5tdK22jRhtav6gCVobntsC6c5aWUGyR4bfRiFEBxfMq
M1mnHYP4KY8dAZlXVsxpRs+Xz/TH3EQ7UQOLj9vcKFS5FHMIwRyKUHdEETanyBvl
GHV/B2ApzFM0OB2l+pwvZsxyQ5R3ZVhrEv1JYTk/T8kC+GpNIjuig909T9+EM+5u
hDQOxjgJ1/y7xxfj5Dy5l3mf96Ci7Q45LLuSG8yWtaN4+LfuszBD0YO9QyCNiA0u
0rHUINu00ZW3T9/ECr8YLK2/IuE0TcprmkxBWk6y/kk3BGovoZecKAK/5ZTooN34
GS+vfTbrkx8QUuXyOa2GO4zNctz9xy/Z+7byJvrUHzJ2gOU/P/2jusrcz4cqkOlW
VigsQ/3zo3nIbr7RwFfE+5yB5jlEvopJsBzviHho18mCItDB9BGWYrnFJCmJ6QLH
tUHex96JjiKfDkphMcAn7GPvJGHEdfC9a848Qcv80pDkRvwkZOrdELcsqz1ZGyBy
0qMb4K3IS9aGia+HyfKc7uiutof08V7Sk2tC+Zx1EFinq5ZudyyyFfMx3ey3gB6R
KRvmcZY5EflHB49L494r1lv8f3E+uU2FKzHC0PI6hPkc4FFf4uYzxbe3Bl80VWrP
JMRG3MtP52cw5/vSFtXk+hGbwRXGHO/z72VDiMCv7+nPj+lxEFB5YqlmQ/H7Buw8
ckVVOKZK/+h24jd+i+A5ORNvMkLU+94ynhdhM3byeJZlcjGZ1tnOkVBHZVNx4Kyd
XKGaD1yD38iqCY5aiiHPR0/i/cIFn57xvcS4Xpa0z1fARVnxvjYrZRy5sU9FmPRO
UzllxDPoqvkTrCeMg7PUAYQowfEzI58JKw6kCvbJMs+rmT3IN90Sg+LcNGM//BfV
2GgYAM46ueYnWZ5sj7ZLqnG2c5v4ZTSkGDt2MfO3v08Xbd5qyCifZtLLMzRTCpSV
dLCoe/Du28I5JgC0ITzhF7VobrAj5wTAfwAK3UnnBtDNYmEnk7ryKSa1BWu3fMzi
rysPrgtU+Gvjojq9XrCfxtdndrEldg2nCWkRUmJ0Tbkv0NNDKta7BQDMAh8bF6RC
0jsfuqGL9UnOGBoKU2pxUVo9k/0vh+fWiVLZ5tFnc/OFgsmT3ECucABHULxAPXfO
zMFUIir9jhOn7HYs1RAj9w0n8dZ2W5aojQrM3HWWuI0roFDyQEUkTSzH8PC1TRYZ
5KIsluhE/m++tL8vBpK111CI1pObEFkMcM9jkLa2pGv0N9l1sAx+Au9bcdl1O9XB
cPIgRv76E/D7nqiasKK0glmNpZSMRYBY51+fC3WxM9vqS+edpLQElGXPh+MprrEq
gK/c8UWO4swjd2WSgwgRai0YSxlGBMrrSTYrqPgeJ8jFBqocq7tGkfjNLnZpY3Rv
cmlhIG9kZW1ha2luIDx2aWN0b3JpYW9kZW1ha2luQGdtYWlsLmNvbT7CwW0EEwEK
ABcFAme/FnQCGy8DCwkHAxUKCAIeAQIXgAAKCRCy3ZugW/O92tnoD/9XGqp8g8np
fu2D9IHEaJHgpW2PgLaJPKmeTZ2hcGf+N+n8C3uNEOxrflxmvcQn55z4Z3pwQVCb
z+6H6ZukAeMHME4Vypu2LhI3+ULIYmYLt37MJxzdSIcyknRBpY5hafNj4PT5my0l
OGvx6yt+4cutetaZof+1RoeAzouPmKk5XGknL8g7sQdi6Ybeu5b4kIe0XXQgVie3
o2FRxRnNWOlxmmSnobOrUNhzef9v4oHM8YyHn2GGxL0UkjqvTqxggjzWEJCpeF5i
/YWDzkhyrMW8TzRLBdfP1llM6N66NpWkE83LN5brPlJ7rttAP/jM06nAu2MO/hue
EQch8rqGranhN8+mNzqr3GFyN+OC5a1los/56GwJad18kiZFLwJ24aGydhcC8cR3
tqfWrFUq9EuykEldqugauQYG/NldoTWMlMocutzOkuf9DuIVCk5zZkZMOZQNESyT
1KPHyKwQ2/5279MSmadiMxy+DcvjkQcf0ZolXxIGiYRPq9eQ+tP9pIIJ2eoPLKDy
fNHxrfBa2xBYacZjXDaMH3VKbUGbQbDO9/ByA8Qa8lFo8/OMKwCF6mBbkC5ZWmq1
dZpkmWtoPsxXf5AqaymmqrOe7pjmeAekN7i1NrUa1yqja6q5aPry5wfFD24mBjv2
9v6L4RFm6CWPWGbzMdMTon4OmOAD5AMw9MfGhgRnvxZ0ARAAxuoLgr/+6GjMceWe
9nlMEynTe7MzdF8BvcXDSaWBRm7ElUfsDw2q7WDglwB19dkXcTa9SIwMbrffH4lf
bq6llAbFHkZU3Y8w8ScjBqBK4Nw3/j+BxUC2EBx+8wyhvteBlEM0Cs7MDwx0kBpK
7It75oMmwcMXwtTEf6IKkzguKkMYnI8XHJRofop/Nb77FPyY6lg2+8CM6T1C6STN
20SLQsuB4kHywvAZtwIQlFuvULMzmzMkgLkO+TO9nCs0SavWZ8sg1mAwJRGg3Lsx
ZkX/zrGgZwIqL7XwyM94+geKZ7cgwU+ahtHWEr3HrjvesAqQn/tbrnKhk/nvNZjE
y9GflL6BA2zPuSBoQu/qvZm1ZKoxd62e+EJG1TcCwuRO8Iugwb7nyqnTOGGsFJBA
LmiY7WmZmopSr4RCtseQ7cQ/fRMUqZmmp1cyTBG3OghYt+nUp+Lqx9gHDrLJcCPY
bRBdZDzCJGJYX3s1buk4HbDejUxamFpQG8V4p0s9WIpDNNyPecgCi08VadNR+ozB
xmKEdYJqrL5VfR7p8+3SAONxuywg5DMrS1DM8t/7XGQ9mlCyOM42jQAF57JAGytw
BMQd79lJSveihZ+bG3GepM8IsArz6zk3R1AJzJC3Jt+xBeSGhwJQhL3W7g8gjgPs
7SWFreEqIWDr0do8DTk5ue9JVqsAEQEAAf4JAwgfMVRHAAf5q2Bz3ZV0Zbgb0AhV
i8uP85MztcelQSP1xfk3jJqGBwMFpFnF1o+Lm3YHvYxJta2r3agDX8I1ZpsSZNvm
9qsXhyrl/DGpZYcMO+HtWKjTKScCycM2YHfVg4gpHcxw7am/Mgcn/UpfHjQeQXHW
vnKDDu+itOcudGC8fm3XF4bSrPK0abN3ECbjGJeDZb0ikQZYirJiO7kgnivuZrHm
K8YoMexxyNpRCgAqIKtdC7x2JPIWsbv9Z9erDULkR7MPtjfTyYRm/9fQ0zR6JDUp
ksBQ4um7Givnp/xGzAYUXOAhDRapO6opl5RahaO0t2pJdAm0BW3wTn2n9T/usoB0
rEaUuFi3ZL/lyzjL4/fenFxmWtpnI4R8IOy0nJ0RVTR8iFmaet+zvoJfEuN/jRs7
AqCOuFJRTh1vjeomS3erxvwFiRxIUcFOtnfaOVArUI9yOms6eF5p7L/HcD54as6t
ZjVyRtzPvGpQZQn1dF3hpqwbf5lzTNDbmO0awepHZo2Hghvdr1plTcn23LJsrY2p
ZWbUCAaCHt24Fz/jRLIbYl5T+sp9OAU43liCFG82WAfGVqyL4Fro7foSbxuKuhK2
6gplUlOzJ+HuoVlGC4qq/kHhfUOcocR+faKeZO15XaLR55hT47r+meAgVYlWeSUk
fGzYtbkZA1LznsjjJl16cO9R5qMFSg1ZiZYS+NIyWZb6JnpJkMnzAv4h1nfbIYej
D88KRLmO8Z3RnaaHkD/XyDViiL3WR6qhWPpT+HluPuMiJJRP+zmAQVdqcrCm5+yJ
tcdk0WV6+ZWJ52zH1Zzh4bo7uH0GTdqUYZVuv1IwD1tOpasHvHZYQuhmtHPix9Tj
CsiJn6anM3iOsHLaQglbAZdbbcWWk/s1uxJ1U4SyJ2GwkvBARzKoLCJBaZSGHXKU
3rvd8/0mvani4NGM9OL8QXcCcL330JHtsMF8K/m+at2S04Xwljcn77AfXW2CIeBy
FT1B6WT2SNqiZ3ikvW9A6qWUhk4BdgrUp02kWABo5bHKbUmd/UoRYV6GSmGs5GLA
7e7GMftYxlkEBCipCZS8yyRiObwB3fD1E+h20YHQCuVkMFrC+a0Oapb/dcJV8/sM
hV1Kbyp2iq+2ktD3ps5zhLZCLPldYbX8i3wxCRSCyJVGxPZGbuKEfGXrX15bd9se
GhVKCjxqN2e/kxZl333Fan7SEFsGzptyBvuUmCQhV39bTl+2nDPYpa6r5HktlpAa
xrWojyCSPO6OrKzU2JhMi49gF3e4nBklQmlP8q7JtCHmqvFsrl4SrbRN21U09AjR
Lq/l/JOI1GA1PY6spo3eGpwvpFm1EZdjDPZzByi+L6TTd+7+SUU8BbSRT2/PknoL
AqM+GHfKZjqlDQIFtfo947TTtgegBx7PdkBHGkRtFNYKDbZ/XsgWLc14VsshfYXR
RhTmhZwsW/wQNQMq7wc1eBNE4MZ+wm1w4nAMN+DSy20gZI1KVdx4XF9NidOF5+kA
9Wz19hdI6+ybXsM58C7wbd0+8iazSkMaUtGN/vKXz013Kduh+VzY8pI3Sk4hObVs
3Age5sYM2ZIldecalCB8v/fou+Jk6ky1Q3IuOCH2hSfs2N4f6S8u1p2cqj/Q1Sj1
rLZT+hA1hhsXlQjkeRfKWjBxIXbZkwnhMJEGm9BqIcWiNDrBPOGahwyiBfrK+Few
pV80Vzcy0S6/ZhWzjWpCfl/2JpM4nZRFOuCIP4GaTINwEgd/1UKr5diDu403gzTj
QLb9yw/noD5hMxfDoBwgodgDwsOEBBgBCgAPBQJnvxZ0BQkPCZwAAhsuAikJELLd
m6Bb873awV0gBBkBCgAGBQJnvxZ0AAoJEJ5TkTyRMv/CbaUP/ijPqMMYiJ5ysDhB
G77FTHRniAeQRKJiSmbnuN4TB+DkdNBohf6PL5Jp70Man/2ZaaF9s1Du4u7d8OMX
sQyfl2bI/CtVHkYF4bTs/ifXBOpwIQoqSIYcNIEWAyMjI6GxEHEBtoI81lfFMHOS
ivxtQLYKyK9myjFaO0vJXX45CiUHldVrs65YxU8qJlWPQl8xARAsndHVL/23rr0A
ql+xTOU09ujwxoWS5NPfFjZEDTC9cQ7YSgie+01WRaOxR2JxKnyZb1gUSAnyXWJ9
xJ2YTrgMadBs1PbRCjowzYwCQTOpvE+f3UC6Ny4GQ5yTrUyHb25KQfNqOn5b9heE
+pidKMVBTqSfqhH638qGPPhEKjDF5Wk+CdRgN1FtHIK6siJlSGWFaUIuwRaGHQqG
f4V4azeTF9hGqdbzLhJAJZbLL/yAScMx2uZf9E/ATAcnq7nA6fznNGXropJxI4uq
QxmJ9mNHLDvqbf2VNCZOp09HWnkc1EHX1odXtz3ifBHcKNjlPTeLdkrihwPeCzFd
1Mrj4a/40WQJciL2koIMcXDFxTxHLDfzBFvBgQ5HNKWutSwdM+5v7tcicZ5UXYbm
ZYK3ov3KAQXvnj7GjsQiosDBUCrqyZMBvG25a708Sbib4zYMk3S9KhdzTfAcQub7
keHFvTVWxEJKpfoGi92QuOaMNw0aaPAQAJy53UE5T9Eeh+tQcXVkdsWhdzO9OuzV
VZ6fmvpdnFmI3N2tiWD8MwXhnerVSPjfuVC097b02BSJ45v67PoamB2fA3u9wRLk
AgVS+nhKpnqtxA/qMnavPOF+cyhX3to/vknd/nMuf4ZfdKlIxaFkDV5Y9SgJzjET
YZFYmJ3i7XGEyJlwkAlOqx7O1b5WRTxbuQNs85XiZHlMegjQD0IU/kTziXktQKl8
JZ6EUi6ltW2XwGkQv0V4WhwUxmKKdVEAlPkSUOLFohovHtsZBUKaa7UD1Mt8fn+m
WDtuOv3eTvkELXznGGYKR3wevnaPG/T74BeY6Co3FxyvgryOAuPJj2/+bTPLxlyg
/PeEA9cwwUbo4rbcSWKEZEi8EPusDLisD2iZ2WEyyk33xKKwhff5zBHdoPCn4gnn
ArMwZkt9xgpbq0SR5aoZczG9CtCAUoy83OnxbHGoU6SlTzt6y76z/CHAw3y/WJ1w
n1K+rD3+weHQoXkSvfoyar/4yA8P2w7hF4S3VqijcMWA/RWduqobtsVZW23pvDkv
oZSWx1xLGnDjoofqwKpRhCLE+y1998exoJDw1n+ytu3kuiLgIfjT59z+NuR90fRi
wfd08+TFsirdNCoNbzz87KoNrMDHJm8NCnQ0bMdSObmc1IC3s2qa+ai3PrK+phxM
O8A+FW0fnWS4x8aGBGe/FnQBEACsLpYw2Y/kHMdFPAdWMSZ3rcsWBHlpOkLEjpLr
nnyeuYo8wXjRR/SZPHuKZMhhvwYNG2HAWMGGAKk7KnQd6c48fxblMcIMhc1dCTFa
nC02rLfgx6B91//uPyVghqGLF0CJYbknAuN2iftTZiQzSh5CxgKhtO1qalceQPqm
mkb6lAoYu1QFec1kU/Zyq5EwjefVrsQMcjYIw9LH7aDXxrzL5mJDrWesSvrt1mqF
LDWTVmWdrpvbnI3MxitWUQpYOJ1tAbqpqwefviVPAK1HdU2CddoqTTPVHx1EFX52
cgDKp7csUEEbujUIOgCZZEfq0gLPe2ulomC0JKUU65t9iyCE6yufBwANzTydTG2v
SY0FbBN5Zg0ojCB17LbQnfSGBJXgfDB02IOpgDv+wsO2xWyOAvXC6N4SMc+gq3fP
TBTvgbFbRUOVVGbp7qqUanxCKZP53lQTjEYQHqsSaImb6z0LqQMZHi1lecpf0Yz0
eGmCuP5j3PIM5Ie7loWm4cLyCTMtkZEgotcvuBqW62pKXir8lb/N2zGqu121jEwn
21Z3Hs1IPk956l765MMiKwKHeaKEursh9AGnLlTdZQzzwapMFuv1kKY9cf49XD0O
NWMkE2RVrFyfc3g/DM+VvdhLHP0hfnWFKaXFd3b83+n0p1qd77NYPVlbrh11Tc+6
yGbWEQARAQAB/gkDCPPCaNV4AhH6YIy8+HvL9DfVlbI4QdEBwXB2DEW6Mbstv1l8
ZGRgUWmGJQjwlB6xMVwLctrRJiHSXWPZATzLL+GNDvUkW35hveakTtZTOAlp+8dl
ALm5ypmpMjL66OFIQjy9sGczWQxqlkcUgJ0p+MJsWuGiK495p/CJQAvRKqimm2u+
h0wMpFgKSTmUvqRmXMxb1ay074oakhNECTPB1vpDmDxE2Coasxewbg+mxMtwVN7L
IR4NVV5uzQ+Z8+5HtJZYbX7Zcf7w1SEUKtEQBNq9K5uVKYibS31aq1sHAuQwUN79
csldlZrVNkopctbR/2je7gppktTtWXsvg0+xKvKnpjPBT8As8nAiw85wT28OgoPE
8LGWIT2PWggjYDoBF6KlrG6XhriYy9Tq5vJW0ikHr/LPV2frUcCp5r/Ai2m7QGfh
XbIfSt+EQ5UPAOMQoEmV6ge5H8TXE204TaHKCDz6+BfOvh3KJkIsP0H5uy12q5mV
Wj8qyK2AIP2SqXRz4NQqNf+ipmua23e+/UslFPpPfLBa06VwPQcYxtPat4tQTeEX
ipOqz3Yz5xs5yB1/bYJjZr09Iu6ks+IcB7Z0EhF1ZgPygxLqU8BwsVU7FzMo7xLi
LIUkmHiks3/bNaC1qxC/1MPHLZAoG1hKSB/IspiAYac/Y4SWzs1AyGfIq1HuR3ip
3wp9lX7P5RQ/e8ddBXrhX7D7ual+voNvZ9v9nO+SnCwdRHeQY4kB3dfSONa9Zx00
DSmg6hZQwWzx/c8l/Ct0G+QXWFNuCdrob13WhJ2UAiuBNCsyIqM+kAGmlax2jpoy
Do9Xxx9XHyvlrJSI5utWkoaI6k3c/Bf6ncHCw/8O45zSDVlBeLE/2KlFP5DH0YMn
uOQhOC0VDfiXDgW26VhFOSKagfnyWKqDmrNAR/ISc2ima5IHFYgjIV+C33Wd5fAI
wvv0KEFgD9H/uBWCAmHm5sR49fSFaRLJacOiV1RTjELOnA92/DaylS0xln2/D/UV
nstTiVZLnauzW1fOHtp6tbdoqTqpW65ZUA6ZGnDrXZ4bn3Hq24EbTEK6m1tbXN3O
xla/+Lu2zHhJ/+eh5hlixobWTvZY4lbiyPGGoUz8m7T4pRThBgwf0SXqfWyF13tp
sRtYH6zYAWA6Lccw/pCAWJ7UzIpEoePwvlfK2ZorfYHtLQueedE83FKzHgMj5FSM
v2Ni8DNo5NHNWoNdgzgZ4jk8CpIadEEgM5s/u9phHnJrJ64O+7G4Ts5c8lVDKorG
Qd5Th4fvH1mq6zj0Ffk7KRSSQZlEqtqOdA4srVKYGcxPxPrr9OxfT3b2PLOmC4oX
0Uze3UUEzcKW7LLD7bywT9N0uM7qxcTQhSHUFcMAqqvE131xncDjUVBwFoye4YLb
LmkJ1CKflZtyaK2pLaGV1ifRstZgFNEo1vme/msBXLQtfsTb0cngSyLO3JL4Fuai
+Lnii7UPj5XT7ywuGYzaKqbJPV13sEA5CezcXmc8Afh4Udvzw9iIwbIedV0XzSj+
aulZ/YrlJEgPeGD+8C4/DiUBgWLxbl6YkIl9XclEK/d3CwnvCYr5W6stZxxvAhoD
0Lg3zEyELdnjtxMgp9QXTF8XOZcVxmTZum35dkq2pr/Nc3RbZwMV86QPIvsKS52H
uaKkFLNOedX3/M06Lqo8sgIeccfMl+nbU8XHUDUMBH+feqYZGDEDnI2gYPbmie4h
Mupwd4V8T7UmXcoQ8JpFYIACagWp9yvE5enT1Ylro9oqvCVkMcNPuv1d9p2XANJx
OE7Cw4QEGAEKAA8FAme/FnQFCQ8JnAACGy4CKQkQst2boFvzvdrBXSAEGQEKAAYF
Ame/FnQACgkQRZGRqXUJYjCsuA//bzTxJM8GXNjixwTlMpdaRRnEgL1y5stMDKeA
Pfb7VuZkQt0w42JE517AYlT+i2UFpq+2DFY1oLSGxOj5iVhVRyEOUPZbgcbAZ4fk
ChymiyoCaokS0gXmFzKEcZ4FX/jsUxxcCUvjMv6uOttUqI68/g1aWOthx+Ef04rU
KfQvMfvwrNq3fTiS2OBQBEP0NxdpC4Fgl6tKeaLIxb6ZJCMgkHhSSAIN7kUWtV4V
vEEE3JOF13mVdICU634F/W6JsP+wiIr51XDbHzBH9nHrb1JZJK+W7iYMShsr7Wt9
eeKQjzPWH9CeeLmrvgVLge4Xz/QgWQ8QPNQhknsvOggCt8NYIbHzoy7Rbzi9Z5QE
nw1xuwlKgdOB8/JB2HEOXcksh5wnCz9PldtCCqAZNM/3Vyi4PS+jE/fjIIFoOxtQ
5xHVcuu10li36wck7y75H9C6Mm/nEa8vlvkClD8Q3M1PB25mL31BzUjnMMaOWMMG
1OfpIDnPw2z66Dh8ewsB/fBaJM8mbH8Qml0DQaPGhP4g/GqI182bCjf9zZb4AcVf
hv/tJrU0SOYU/JsY2GptPnToxxY+0JeykFrZ/vc3kWHrbtLr6KZ/sJf6Q7RPUjSW
CAvX3PQkO/Ycfwg8C4oLQp6EF0qb4bn65w8UrRqiCCBMM5fIOoNVp7zosEEQbKaM
1pbEAd4Qzg//VikgFvDdtQoQ03X/+NNLBX0EsT1ioU5ZKHS4nz9sNEa5XT2soWg3
YtS6kUwgdwlAsKjFBwasaL5KStQ88yX/1kPF5ns+i59Wg1K2pcYMmuiHaCFy7/Cq
I0069FKJSREpcC6Q9H7IQKIABqOYwlzicDRfZHnDpcBrr+YqHf5tUEoBUxmu6/A5
p9rs4xmuNwRTWVIj8uRE67ojIS6JGXvbvp0I768u7ByZCeZ2N/upEAd59lfTHsRg
lCFgI16ij4p5KTDtSLM523Ah5diUd//uCisfcsVPYN88XmD+FLQ/SxOCu2k0sq0K
r1MzrfaA03HP+O2MGIS0FriFElwSGlj43LqozFkqHeeDtDQKAIL9iunk3P3k2Si6
qgofOJ6+3uggc758UFiGBNdMMcIgU1RKF0x9Ju7k24bMpqR40ftbsuCRHk1VIz58
L8Ln6hm9A2xwFyP8dXozlGAA2dWk5PngIcti8koZt2Fy1psfjjmrW8mq799LS9qo
lG34pzOyPVqhIlV2obSamy1Xn/I3Sf+uAMJHuO0DCo0HcvejfMTHvbTySpE7FIY9
hdBu4dVi6DFr6ea0KdlyT2ZaYvPplWyHRGAJx1shsmPElez+xr+P4BkTE4JJLwK2
xZ4wYpa9frQ2HaMGxhjx5YBrE+nbqR2T74kA/GlUHjlyGSnQzkW0RnQ=
=0bmE
-----END PGP PRIVATE KEY BLOCK-----
`;

// encrypted private key

// console.log(openpgp);
// console.log(openpgp.config);
// console.log(openpgp.enums.compression);

class OpenPGPManager {
  async readPublicKey(publicKeyArmored) {
    return await openpgp.readKey({ armoredKey: publicKeyArmored });
  }

  async decryptPrivateKey(privateKeyArmored, passphrase) {
    return await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      }),
      passphrase,
    });
  }

  async encryptMessage(messageText, encryptionKeys, signingKeys) {
    return await openpgp.encrypt({
      message: await openpgp.createMessage({
        text: messageText,
        date: new Date().getDate(),
      }),
      config: { minRSABits: 32 },
      encryptionKeys,
      signingKeys,
      format: "armored",
    });
  }

  async decryptMessage(encryptedMessage, verificationKeys, decryptionKeys) {
    const message = await openpgp.readMessage({
      armoredMessage: encryptedMessage,
    });
    const { data: decrypted, signatures } = await openpgp.decrypt({
      message,
      verificationKeys,
      decryptionKeys,
    });
    return { decrypted };
  }

  async verifySignature(signatures) {
    try {
      await signatures[0].verified;
      return "Signature is valid";
    } catch (e) {
      throw new Error("Signature could not be verified: " + e.message);
    }
  }
}

// Create an instance of OpenPGPManager
const openPGPManager = new OpenPGPManager();

export async function startProcess(value) {
  const passPhrase = "Adedayomi@97";

  try {
    // Decode the Base64-encoded input
    const encryptedBytes = atob(value);
    const encryptedText = new TextDecoder().decode(
      new Uint8Array([...encryptedBytes].map((char) => char.charCodeAt(0)))
    );

    // Read the private key
    const privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      }),
      passphrase: passPhrase,
    });

    // Decrypt the encrypted text
    const { data: decryptedData } = await openpgp.decrypt({
      message: await openpgp.readMessage({
        armoredMessage: encryptedText,
      }),
      decryptionKeys: privateKey,
    });

    // Return the decrypted text
    return decryptedData;
  } catch (error) {
    console.error("Error decrypting:", error);
    throw new Error(
      "Error decrypting the text. Please check your input and try again."
    );
  }
}

export const startEncryptProcess = async (value) => {
  const passPhrase = "Adedayomi@97";
  const encryptedText = value;
  const publicKey = await openPGPManager.readPublicKey(publicKeyArmored);
  const privateKey = await openPGPManager.decryptPrivateKey(
    privateKeyArmored,
    passPhrase
  );

  try {
    // Encrypt the text
    const encryptedResult = await openPGPManager.encryptMessage(
      encryptedText,
      publicKey,
      privateKey
    );

    // Convert the encrypted result to Base64
    const encryptedBytes = new TextEncoder().encode(encryptedResult);

    // Chunked conversion to base64 to avoid maximum call stack size exceeded error
    let binaryString = "";
    const chunkSize = 8192; // 8 KB chunks
    for (let i = 0; i < encryptedBytes.length; i += chunkSize) {
      binaryString += String.fromCharCode(
        ...encryptedBytes.slice(i, i + chunkSize)
      );
    }

    const encryptedBase64String = btoa(binaryString);
    return encryptedBase64String;
  } catch (error) {
    console.error("Error encrypting:", error);
    throw new Error(
      "Error encrypting the text. Please check your input and try again."
    );
  }
};

class PgpManagerUtil {
  static uint8ArrayToBase64(uint8Array) {
    let binary = "";
    uint8Array.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    return btoa(binary);
  }

  static base64ToUint8Array(base64String) {
    const binaryString = atob(base64String);

    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    return uint8Array;
  }
}

export { OpenPGPManager };
