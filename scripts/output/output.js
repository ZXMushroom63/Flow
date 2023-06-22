addNode(
  "output",
  ["Output"],
  ["Out"],
  (output) => {
    return output;
  },
  "darkorange",
  {
    "data-flag-isOutput": "true",
  },
  {
    no_out: true,
    doc: `Serves as an output for an individual value. The value it gets from 'Out' is displayed in the toolbar.`,
  }
);