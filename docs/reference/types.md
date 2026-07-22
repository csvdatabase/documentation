---
id: types
title: Types
sidebar_position: 1
---

CSDB values are stored as CSV text and decoded according to the column type.

## Implemented Types

The TypeScript runtime implements:

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

## Null Values

All implemented column types accept `null` when the column is optional and not
part of the primary key. Required columns and primary key columns cannot be
`null`.

- TypeScript row values include `null`.
- Unquoted empty CSV fields decode as `null` for optional, non-primary-key
  columns.
- `null` serializes as an unquoted empty CSV field.
- Quoted empty strings, written as `""`, remain empty strings and do not become
  `null`.
- Missing values in inserted rows are filled from defaults when a default exists;
  otherwise they become `null` for optional, non-primary-key columns.
- Explicit `null` values are preserved and are not replaced by defaults.

SQL can use the `NULL` literal and `IS NULL` / `IS NOT NULL` predicates.

JSON request and response bodies use JSON `null` for CSDB null values.

## JSON Wire Values

The TypeScript server converts runtime values to lossless JSON values:

| CSDB type | JSON value |
| --- | --- |
| `text`, `varchar`, `custom` | string |
| `integer`, finite `real` | number |
| `bigint` | decimal string |
| `numeric` | decimal string |
| `boolean` | boolean |
| `date`, `timestamp` | string |
| `json` | the stored JSON object, array, primitive, or null |

`bigint` and `numeric` use strings because JSON numbers cannot preserve every
integer or exact decimal. If a `real` column explicitly permits `NaN` or infinity,
the JSON bridge returns `"NaN"`, `"Infinity"`, or `"-Infinity"` rather than an
invalid JSON number.

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

## Specification Type Registry

The specification also names types such as `char`, `smallint`, `double`, `time`, `uuid`, `binary`, `jsonb`, `array`, `enum`, `xml`, geometric types, network types, range types, `any`, and engine-specific `custom` types.
