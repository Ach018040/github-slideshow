# AI-Scientist-v2 Integration Notes

TeaSmart can be extended with automated experiment generation and evaluation using **SakanaAI/AI-Scientist-v2**:

- Repository: https://github.com/SakanaAI/AI-Scientist-v2

## Suggested workflow

1. Export cleaned TeaSmart data (sensor trends, operation logs, quality labels) to CSV under `data/exports/`.
2. Run AI-Scientist-v2 in a separate workspace to generate experiment hypotheses and analysis artifacts.
3. Save generated summaries to `teasmart-nextjs/data/research/latest.json`.
4. TeaSmart API route `/api/research` serves this artifact to the dashboard or admin pages.

## Data contract (`latest.json`)

```json
{
  "generated_at": "2026-04-10T00:00:00Z",
  "tool": "AI-Scientist-v2",
  "ideas": [
    {
      "title": "Irrigation timing vs sensory score",
      "priority": "high",
      "summary": "Model suggests morning irrigation improves score by 3-5 points."
    }
  ]
}
```
