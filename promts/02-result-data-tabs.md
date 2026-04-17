Add **two sub-tabs** inside the **Result** view to separate "Response Data" from "Extracted Data".

---

## Current behavior

When processing succeeds, the **Result** tab (`ResultView` component) shows metrics cards, confidence bars, and a single JSON block with `result.data` (the data extracted by the AI).

## New behavior

Replace the single JSON block at the bottom of `ResultView` with a **tabbed panel** containing two tabs:

### Tab 1 – "Response Data" (shown by default)

- Displays the **SurveyJS form response data** — i.e., the survey model's current `data` object, which may include user edits made in the "SurveyJS Form" tab.
- Rendered as pretty-printed, syntax-highlighted JSON (same style as the existing JSON block: `bg-gray-900 text-green-400`).
- This data must stay **reactive**: if the user switches to the "SurveyJS Form" tab, edits a value, and switches back to "Result → Response Data", the JSON must reflect the latest values.

### Tab 2 – "Extracted Data"

- Displays the **original AI extraction result** (`result.data`) exactly as returned from the `/api/process` endpoint — this never changes after processing.
- Same JSON styling as Tab 1.

---

## Implementation details

### 1. Share the SurveyJS model instance

Currently `SurveyFormView` creates a `Model` instance internally via `useMemo`. To keep "Response Data" in sync with user edits:

- **Lift the `Model` creation up** to `page.tsx`. Create the survey model once when `appState` transitions to `"result"` (when `result` and `setupData` are available) and store it in state (e.g., `surveyModel`).
- Pass the model instance down to both `SurveyFormView` (which renders the interactive form) and `ResultView` (which reads `surveyModel.data` for "Response Data").
- `SurveyFormView` should accept the model as a prop instead of creating its own. Remove the internal `useMemo` that creates a new model.
- Reset the model on `handleReset` (set `surveyModel` to `null`).

### 2. Update `ResultView` component

Add the following props to `ResultView`:

```ts
interface ResultViewProps {
  result: ProcessResult;
  surveyModel: Model | null;   // the live SurveyJS model (for Response Data)
}
```

Inside `ResultView`:

- Replace the existing "Extracted Data" `<pre>` block with a tabbed panel.
- Use local state `activeDataTab: "response" | "extracted"` (default `"response"`).
- Tab buttons should use the same visual style as the top-level navigation tabs (border-bottom highlight pattern).
- Tab 1 ("Response Data"): render `JSON.stringify(surveyModel?.data ?? {}, null, 2)`.
- Tab 2 ("Extracted Data"): render `JSON.stringify(result.data, null, 2)`.

### 3. Force re-render on survey data change

`surveyModel.data` is a plain object — React won't re-render when it changes. To keep the "Response Data" JSON up-to-date:

- In `page.tsx`, subscribe to `surveyModel.onValueChanged` (SurveyJS event) and increment a counter (e.g., `surveyDataVersion`) in state.
- Pass `surveyDataVersion` as a prop (or key) to `ResultView` so it re-reads `surveyModel.data` whenever any value changes.

### 4. Update types

- Add `"response" | "extracted"` as a local type inside `ResultView` (no need to export).
- No changes to `TabName` or `AppState` — the sub-tabs are internal to `ResultView`.

### 5. Update `page.tsx` rendering

- When rendering `ResultView`, pass the `surveyModel` instance.
- When rendering `SurveyFormView`, pass the shared model.
- Clean up `surveyModel` in `handleReset`.

---

## Visual design for the sub-tabs

```
┌──────────────────────────────────────────────────┐
│  [Response Data]   [Extracted Data]              │
├──────────────────────────────────────────────────┤
│  {                                               │
│    "patientName": "John Doe",                    │
│    "dateOfBirth": "1985-03-15",                  │
│    ...                                           │
│  }                                               │
└──────────────────────────────────────────────────┘
```

- Tabs sit inside the existing white card that currently contains the "Extracted Data" heading and `<pre>` block.
- Active tab: `border-b-2 border-blue-600 text-blue-600`.
- Inactive tab: `text-gray-500 hover:text-gray-700`.

---

## Do NOT change

- Metrics cards, confidence bars, low-confidence warnings, or provider info.
- The top-level navigation tabs (Setup | Result | SurveyJS Form).
- The `/api/process` route or any server-side logic.
- The `ProcessResult` type.
