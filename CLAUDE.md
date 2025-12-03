# CLAUDE.md - AI Assistant Guide for Vocabulator

**Last Updated**: 2025-12-03
**Repository**: vocabulator
**Status**: New Repository - Initial Setup Phase

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Development Workflow](#development-workflow)
4. [Code Conventions](#code-conventions)
5. [AI Assistant Guidelines](#ai-assistant-guidelines)
6. [Testing Strategy](#testing-strategy)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Purpose
Vocabulator is a vocabulary learning and management application designed to help users expand their vocabulary through interactive learning experiences.

### Current State
- **Status**: Empty repository, awaiting initial project setup
- **Branch**: `claude/claude-md-miqhv1q6mfp00mov-01Q8bt73iaw3smB7c5cqzc4H`
- **Main Branch**: To be determined during setup

### Technology Stack (To Be Determined)
When setting up the project, consider these technology options:
- **Frontend**: React, Vue, Svelte, or vanilla JavaScript
- **Backend**: Node.js, Python (Flask/Django), or Go
- **Database**: PostgreSQL, MongoDB, or SQLite
- **Build Tools**: Vite, Webpack, or esbuild
- **Testing**: Jest, Vitest, Pytest, or Go testing

---

## Repository Structure

### Recommended Directory Layout

```
vocabulator/
├── .github/                    # GitHub workflows and templates
│   ├── workflows/              # CI/CD pipelines
│   └── ISSUE_TEMPLATE/         # Issue templates
├── docs/                       # Documentation
│   ├── api/                    # API documentation
│   ├── architecture/           # Architecture decisions
│   └── user-guide/             # User documentation
├── src/                        # Source code
│   ├── api/                    # API routes/endpoints
│   ├── components/             # UI components (if applicable)
│   ├── models/                 # Data models
│   ├── services/               # Business logic
│   ├── utils/                  # Utility functions
│   └── config/                 # Configuration files
├── tests/                      # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests
├── scripts/                    # Build and maintenance scripts
├── public/                     # Static assets (if web app)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── CLAUDE.md                   # This file - AI assistant guide
├── README.md                   # Project documentation
├── CONTRIBUTING.md             # Contribution guidelines
└── LICENSE                     # License information
```

### Key Files to Create

1. **README.md**: Project overview, setup instructions, usage examples
2. **CONTRIBUTING.md**: Guidelines for contributing to the project
3. **LICENSE**: Choose appropriate license (MIT, Apache 2.0, GPL, etc.)
4. **.gitignore**: Ignore node_modules, build artifacts, environment files
5. **package.json** or equivalent: Project dependencies and scripts

---

## Development Workflow

### Git Workflow

1. **Branch Naming Convention**
   - Feature branches: `feature/<description>`
   - Bug fixes: `fix/<description>`
   - Documentation: `docs/<description>`
   - AI assistant branches: `claude/<session-id>`

2. **Commit Message Format**
   ```
   <type>: <subject>

   <body>

   <footer>
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

   Example:
   ```
   feat: add word lookup API endpoint

   Implement REST API endpoint for looking up word definitions
   using external dictionary API. Includes caching layer for
   performance optimization.

   Closes #123
   ```

3. **Pull Request Process**
   - Create descriptive PR titles
   - Include summary of changes
   - Reference related issues
   - Ensure all tests pass
   - Request review before merging

### Development Commands (To Be Established)

```bash
# Setup
npm install          # or pip install -r requirements.txt, go mod download

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
npm run format       # Format code

# Testing
npm run test         # Run all tests
npm run test:unit    # Run unit tests only
npm run test:e2e     # Run end-to-end tests

# Database (if applicable)
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

---

## Code Conventions

### General Principles

1. **Simplicity Over Complexity**
   - Write clear, readable code
   - Avoid premature optimization
   - Use meaningful variable and function names
   - Keep functions small and focused

2. **Consistency**
   - Follow established patterns in the codebase
   - Use consistent naming conventions
   - Maintain consistent code formatting

3. **Documentation**
   - Document complex logic with comments
   - Keep README and docs up-to-date
   - Include examples in documentation
   - Write self-documenting code when possible

### Language-Specific Conventions

#### JavaScript/TypeScript
```javascript
// Use camelCase for variables and functions
const userName = 'John';
function getUserName() { }

// Use PascalCase for classes and components
class UserProfile { }
const UserCard = () => { };

// Use UPPER_SNAKE_CASE for constants
const MAX_RETRY_ATTEMPTS = 3;

// Prefer const over let, avoid var
const immutableValue = 42;
let mutableValue = 0;

// Use async/await over Promise chains
async function fetchData() {
  const response = await fetch(url);
  return await response.json();
}
```

#### Python
```python
# Use snake_case for variables and functions
user_name = 'John'
def get_user_name():
    pass

# Use PascalCase for classes
class UserProfile:
    pass

# Use UPPER_SNAKE_CASE for constants
MAX_RETRY_ATTEMPTS = 3

# Use type hints
def process_word(word: str, count: int) -> dict:
    return {"word": word, "count": count}
```

### File Naming Conventions

- **JavaScript/TypeScript**:
  - Components: `PascalCase.tsx` or `PascalCase.jsx`
  - Utilities: `camelCase.ts` or `kebab-case.ts`
  - Tests: `*.test.ts` or `*.spec.ts`

- **Python**:
  - Modules: `snake_case.py`
  - Tests: `test_*.py`

- **Configuration**: `kebab-case.json`, `kebab-case.yml`

---

## AI Assistant Guidelines

### When Working on This Project

1. **Always Read Before Writing**
   - Read existing files before making modifications
   - Understand the current codebase structure
   - Check for existing patterns and conventions
   - Never propose changes to code you haven't read

2. **Use the Todo System**
   - Create todos at the start of complex tasks
   - Mark todos as in_progress when starting
   - Complete todos immediately after finishing
   - Keep only one todo in_progress at a time

3. **Commit Practices**
   - Only commit when explicitly asked
   - Write clear, descriptive commit messages
   - Follow the project's commit message format
   - Stage only relevant files
   - Never commit sensitive data or credentials

4. **Testing Requirements**
   - Write tests for new features
   - Run existing tests before committing
   - Fix any failing tests before pushing
   - Don't mark tasks complete if tests fail

5. **Code Review Mindset**
   - Avoid over-engineering solutions
   - Don't add unnecessary features
   - Keep changes focused on the task
   - Don't refactor unrelated code
   - Trust existing code and framework guarantees

6. **Security Awareness**
   - Validate user input at system boundaries
   - Avoid command injection vulnerabilities
   - Prevent XSS and SQL injection
   - Don't expose sensitive data
   - Use environment variables for secrets

### Common Anti-Patterns to Avoid

❌ **Don't Do This**:
- Creating multiple helper functions for one-time operations
- Adding extensive error handling for impossible scenarios
- Over-abstracting simple logic
- Adding comments to unchanged code
- Creating backwards-compatibility hacks
- Making changes beyond the requested task

✅ **Do This Instead**:
- Write straightforward code for the current need
- Validate only at system boundaries
- Keep it simple until complexity is justified
- Document only complex or non-obvious logic
- Make clean changes without compatibility shims
- Stay focused on the specific task

---

## Testing Strategy

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage for business logic
- **Integration Tests**: Cover all API endpoints and data flows
- **E2E Tests**: Test critical user workflows

### Test Organization

```
tests/
├── unit/
│   ├── models/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
└── e2e/
    └── workflows/
```

### Writing Good Tests

```javascript
// Good test structure
describe('WordService', () => {
  describe('addWord', () => {
    it('should add a new word to the vocabulary list', async () => {
      // Arrange
      const word = { term: 'ephemeral', definition: 'lasting for a short time' };

      // Act
      const result = await wordService.addWord(word);

      // Assert
      expect(result.id).toBeDefined();
      expect(result.term).toBe('ephemeral');
    });

    it('should reject duplicate words', async () => {
      // Test implementation
    });
  });
});
```

### Test Naming Convention

- Describe what the test does
- Use `should` or `must` for expected behavior
- Be specific about the scenario being tested

---

## Common Tasks

### Setting Up the Project

```bash
# Clone the repository
git clone <repository-url>
cd vocabulator

# Create and checkout development branch
git checkout -b feature/initial-setup

# Initialize project (example for Node.js)
npm init -y
npm install <dependencies>

# Create basic structure
mkdir -p src/{api,models,services,utils,config}
mkdir -p tests/{unit,integration,e2e}
mkdir -p docs/{api,architecture,user-guide}

# Create essential files
touch README.md CONTRIBUTING.md .gitignore .env.example
```

### Adding a New Feature

1. Create a feature branch
2. Write tests first (TDD approach)
3. Implement the feature
4. Ensure all tests pass
5. Update documentation
6. Create pull request

### Fixing a Bug

1. Create a bug fix branch
2. Write a test that reproduces the bug
3. Fix the bug
4. Verify the test passes
5. Check for similar issues
6. Create pull request

### Updating Documentation

1. Keep CLAUDE.md updated with structural changes
2. Update README.md for user-facing changes
3. Update API documentation for endpoint changes
4. Add architecture decision records (ADRs) for major decisions

---

## Troubleshooting

### Common Issues

**Issue**: Dependencies not installing
**Solution**: Check Node.js/Python version, clear cache, delete lock files

**Issue**: Tests failing after changes
**Solution**: Run tests individually to isolate issues, check for breaking changes

**Issue**: Git push fails with 403
**Solution**: Ensure branch starts with `claude/` and matches session ID

**Issue**: Build errors
**Solution**: Check for TypeScript errors, missing imports, configuration issues

### Getting Help

1. Check existing documentation in `/docs`
2. Review similar code in the codebase
3. Check issue tracker for known problems
4. Consult project README for setup instructions

---

## Project Evolution

### As the Project Grows

This CLAUDE.md file should be updated regularly to reflect:
- New architectural decisions
- Changes to development workflows
- Updated dependency information
- New testing requirements
- Additional conventions and patterns
- Performance considerations
- Deployment procedures
- API changes and versioning

### Maintenance Checklist

- [ ] Update after major architectural changes
- [ ] Review quarterly for accuracy
- [ ] Add new sections as needs arise
- [ ] Remove outdated information
- [ ] Keep examples current with codebase
- [ ] Document new patterns and conventions

---

## Additional Resources

### External Documentation
- [Project Wiki](link-when-available)
- [API Documentation](link-when-available)
- [Design System](link-when-available)

### Related Projects
- List related projects or dependencies
- Link to relevant open-source projects

### Contact
- Project maintainers: TBD
- Discussion forum: TBD
- Issue tracker: GitHub Issues

---

**Note to AI Assistants**: This document is your primary reference for understanding how to work effectively with this codebase. Always consult this file before making significant changes. When in doubt, ask the user for clarification rather than making assumptions.

**Last Review**: 2025-12-03
**Next Review Due**: After initial project setup or within 3 months
