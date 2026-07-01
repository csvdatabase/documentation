---
id: errors
title: Errors
sidebar_position: 6
---

The TypeScript implementation exports three public error classes:

- `CSDBError`: base class for CSDB library errors.
- `ValidationError`: invalid file structure, metadata, schema, values, constraints, or relationships.
- `SQLError`: unsupported or invalid SQL syntax.

Python should expose the same hierarchy:

```py
class CSDBError(Exception): ...
class ValidationError(CSDBError): ...
class SQLError(CSDBError): ...
```

Typical handling:

```ts
try {
  db.validate();
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(error.message);
  }
}
```
