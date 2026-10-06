# Capability model

## Current public schema

`src/config/capabilities.js` is the canonical capability data source. Each
capability contains only the fields used by the current public Services page:

- `id`: stable unique key for rendering.
- `title`: displayed capability name.
- `description`: displayed summary.
- `icon`: statically imported Lucide component reference.
- `services`: list of service labels; Services currently displays the first
  four labels on each card.

`CapabilityCard` renders these fields, and `/services` maps the canonical
`CAPABILITIES` array to the card component. Icons are imported explicitly in
the config; names are not resolved dynamically.

## Future extensions

Individual capability routes, SEO metadata and a future CMS are not part of the
current public architecture milestone. Add a `slug`, short summary, grouping or
other fields only when a reviewed consumer needs them. Avoid keeping duplicate
fields such as both `focus` and `services` for the same list of card labels.
