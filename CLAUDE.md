# CLAUDE.md - AI Coding Assistant Rules

## 🎯 Core Principles
- Prioritize **readability, maintainability, and simplicity** over cleverness.
- Follow **SOLID principles** and clean architecture patterns.
- Always write code that is **self-documenting**. Comments explain "why", not "what".
- Assume I want production-ready code, not just a quick prototype.

## 💻 Coding Style
- Use consistent indentation (4 spaces preferred).
- Keep functions small and focused on a single responsibility.
- Variable/function names should be descriptive and follow the language's common conventions.
- Prefer early returns to reduce nesting.
- Handle edge cases and potential errors gracefully.

## 📝 Documentation & Comments
- Add docstrings to all public functions/classes.
- Add inline comments for complex logic or non-obvious decisions.
- Update README or related docs if code changes affect usage.
- Explain key architectural choices when they are not obvious.

## 🧪 Testing
- Write unit tests for new features and bug fixes.
- Keep tests isolated, fast, and deterministic.
- Test edge cases, not just the happy path.
- When fixing a bug, first write a test that reproduces it.

## 🔄 Collaboration
- When refactoring, make small, incremental changes.
- Explain the purpose of significant changes before implementing them.
- Propose alternative approaches if you think there might be a better way.
- Ask clarifying questions if requirements are ambiguous.

## 🚀 Performance
- Optimize for readability first, then performance.
- Only optimize hot paths after profiling.
- Avoid premature optimization.
- Prefer built-in/standard library functions over custom implementations.