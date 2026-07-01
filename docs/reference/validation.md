---
id: validation
title: Validation
sidebar_position: 2
---

CSDB readers and writers validate both the file structure and relational model.

## Structure

- The first section must be `--- csdb`.
- Unknown section headers are rejected.
- Human table sections must be grouped as schema then data.
- Machine sections must appear after all human sections.
- Table and database names must use letters, numbers, `_`, `-`, `.`, or `$`.

## Metadata

- `format` must be `CSDB`.
- `version` must be `1`.
- The metadata `tables` list must match table section order.
- Duplicate table names are rejected.

## Schema

- Every table schema needs `name` and ordered `columns`.
- Column names must be valid names.
- Primary key columns must exist and be listed in `required`.
- Required fields, defaults, unique constraints, foreign keys, and indexes must reference known columns.
- Unsupported runtime types are rejected unless represented as supported `custom` types.

## Data

- CSV headers must match schema order exactly.
- Required columns cannot be null.
- Values must decode according to their column type.
- Primary keys, unique constraints, and unique indexes cannot duplicate non-null values.
- Check constraints must evaluate truthy for each row.
- Foreign keys must reference existing target rows unless their source values are null.
