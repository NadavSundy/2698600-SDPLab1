# AGENTS.md

## AI Policy

Follow the COMS3011A AI policy and all assessment-specific instructions.

### Allowed AI Use

- AI assistance is permitted unless an assessment explicitly restricts it.
- For the current assessment, **Qoder is the only permitted AI tool**.


### Code Generation Attribution

If AI-generated code is included in a commit, the commit message must include:

```text
Assisted-by: Qoder[MODEL-NAME]
```

Example:

```text
Implement user authentication

Assisted-by: Qoder[MODEL-NAME]
```

Use the actual model name shown by Qoder.

If a commit contains no AI-generated code, no `Assisted-by:` line is required.

### README Declaration

If AI is used for code generation, inline editing, or code review, declare that usage in the repository README.

Example:

```markdown
## AI Usage

This repository makes use of AI code generation using the following tools:

- Qoder[MODEL-NAME]

This repository makes use of AI in-line editing using the following tools:

- Qoder[MODEL-NAME]

This repository makes use of AI code review using the following tools:

- Qoder[MODEL-NAME]
```

For any category that was not used, explicitly state the non-usage, for example:

```text
This repository does not use AI code review.
```

All declarations must accurately reflect actual usage.

### Writing and Documentation

AI may be used for writing, planning, reviewing, editing, and generating documentation where permitted.

When required by the course policy, documents created or edited with AI must include a declaration such as:

```text
The preceding document was reviewed and edited with the assistance of the following: Qoder[MODEL-NAME]
```

Use wording that accurately reflects whether the document was planned, reviewed, edited, or generated.



