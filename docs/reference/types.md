---
id: types
title: Types
sidebar_position: 1
---

CSDB values are stored as CSV text and decoded according to the column type.

## Implemented Types

The TypeScript runtime currently implements:

| Type | Runtime value | Serialized form |
| --- | --- | --- |
| `text` | string | UTF-8 text |
| `varchar` | string | UTF-8 text, with optional `length` |
| `integer` | number | Base-10 safe integer |
| `bigint` | bigint | Base-10 integer |
| `real` | number | Decimal or scientific notation |
| `numeric` | string | Exact decimal text |
| `boolean` | boolean | `true` or `false` |
| `date` | string | `YYYY-MM-DD` |
| `timestamp` | string | ISO date-time text |
| `json` | object, array, primitive | JSON text |
| `custom` | string | Text with required `type_name` metadata |

## Aliases

| Alias | Canonical type |
| --- | --- |
| `character varying` | `varchar` |
| `int`, `int4` | `integer` |
| `int8` | `bigint` |
| `decimal` | `numeric` |
| `bool` | `boolean` |

## Type Objects

Use object form when a type needs options.

```yaml
columns:
  code:
    type: varchar
    length: 20
  amount:
    type: numeric
    precision: 12
    scale: 2
  location:
    type: custom
    type_name: geography_point
```

## Future Registry

The CSDB v1 specification also names future types such as `char`, `smallint`, `double`, `time`, `uuid`, `binary`, `jsonb`, `array`, `enum`, `xml`, geometric types, network types, range types, `any`, and engine-specific `custom` types.
