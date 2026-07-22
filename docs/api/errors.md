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

The CSDB server maps errors to HTTP status codes and a stable response body. It
never returns a TypeScript stack trace to the client.

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Required column \"id\" cannot be null."
  },
  "requestId": "req_01J..."
}
```

| Error | HTTP status | JSON code |
| --- | --- | --- |
| Malformed JSON or command envelope | `400` | `INVALID_REQUEST` |
| Unknown database or table | `404` | `NOT_FOUND` |
| `SQLError` | `422` | `SQL_ERROR` |
| `ValidationError` | `422` | `VALIDATION_ERROR` |
| Unexpected server failure | `500` | `INTERNAL_ERROR` |
