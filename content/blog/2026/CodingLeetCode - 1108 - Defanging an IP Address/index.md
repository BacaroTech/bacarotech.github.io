+++
title = "CodingLeetCode - 1108 - Defanging an IP Address"
date = 2026-02-25T14:00:35Z
draft = false
featured = false
weight = 100
description = ""
tags = ['coding', 'corso', 'typescript']
authors = []
series = ["CodingLeetCode"]
+++

## sol1.ts

```typescript
function defangIPaddr(address: string): string {
    let singlePieces: string[] = address.split('.');
    return singlePieces[0] + "[.]" + singlePieces[1] + "[.]" + singlePieces[2] + "[.]" + singlePieces[3];
};
```

