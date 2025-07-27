# Contributing to Eco Swachh

Thank you for your interest in contributing to Eco Swachh! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug Reports**: Help us identify and fix issues
- 💡 **Feature Requests**: Suggest new features and improvements
- 📝 **Documentation**: Improve our documentation
- 🔧 **Code Contributions**: Submit pull requests with code changes
- 🧪 **Testing**: Help us test the application
- 🌐 **Translations**: Help translate the application
- 📢 **Community**: Help spread the word about Eco Swachh

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git
- A GitHub account
- Basic knowledge of React, TypeScript, and Next.js

### Development Setup

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub
   # Then clone your fork
   git clone https://github.com/nilavtalukdar06/smart-waste-management.git
   cd smart-waste-management
   ```

2. **Set up the development environment**

   ```bash
   # Install dependencies
   npm install

   # Copy environment variables
   cp .env.example .env.local

   # Edit .env.local with your development credentials
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript configuration
- **ESLint**: Follow the project's ESLint rules
- **Prettier**: Use Prettier for code formatting
- **Naming**: Use descriptive names for variables, functions, and files

### File Structure

Follow the existing project structure:

```
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # React components
├── lib/          # Utility libraries and configurations
├── models/       # Database models
├── hooks/        # Custom React hooks
├── utils/        # Utility functions
└── types/        # TypeScript type definitions
```

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Add JSDoc comments for complex components
- Follow the existing component patterns

### API Guidelines

- Use proper HTTP status codes
- Implement error handling
- Add input validation with Zod
- Follow RESTful conventions

### Database Guidelines

- Use Mongoose schemas for data modeling
- Implement proper indexing
- Add validation at the schema level
- Use transactions when necessary

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

1. **Check existing issues** to avoid duplicates
2. **Test on the latest version** of the application
3. **Reproduce the issue** consistently

### Bug Report Template

```markdown
## Bug Description

Brief description of the bug

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What you expected to happen

## Actual Behavior

What actually happened

## Environment

- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome 120, Firefox 115]
- Node.js version: [e.g. 18.17.0]

## Additional Information

Screenshots, logs, or any other relevant information
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
## Feature Description

Brief description of the feature

## Problem Statement

What problem does this feature solve?

## Proposed Solution

How would you like to see this implemented?

## Alternative Solutions

Any alternative approaches you've considered?

## Additional Context

Any other context or screenshots about the feature request
```

## 🔧 Submitting Pull Requests

### Before Submitting

1. **Ensure your code follows the style guidelines**
2. **Add tests for new features**
3. **Update documentation if needed**
4. **Test your changes thoroughly**

### Pull Request Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist

- [ ] I have read the contributing guidelines
- [ ] My code follows the project's style guidelines
- [ ] I have updated the documentation accordingly
- [ ] I have added tests for my changes
- [ ] All tests pass locally
```

### Commit Message Guidelines

Use conventional commit messages:

```
type(scope): description

Examples:
feat(auth): add OAuth login support
fix(api): resolve user registration validation issue
docs(readme): update installation instructions
style(components): format code with prettier
refactor(utils): simplify date formatting function
test(api): add unit tests for waste reporting
chore(deps): update dependencies
```

### Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### Writing Tests

- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Mock external dependencies

## 📝 Documentation

### Documentation Guidelines

- Keep documentation up to date
- Use clear and concise language
- Include code examples
- Add screenshots when helpful
- Follow the existing documentation style

### Documentation Structure

```
docs/
├── api/           # API documentation
├── deployment/    # Deployment guides
├── development/   # Development setup
├── user-guide/    # User documentation
└── contributing/  # Contributing guidelines
```

## 🌐 Internationalization

### Translation Guidelines

- Use translation keys for all user-facing text
- Provide context for translators
- Test translations in different languages
- Maintain consistency across the application

## 🔒 Security

### Security Guidelines

- Never commit sensitive information
- Follow security best practices
- Report security vulnerabilities privately
- Use environment variables for secrets

### Reporting Security Issues

If you discover a security vulnerability, please report it privately:

1. **Email**: nilavtalukdar9@gmail.com
2. **Subject**: [SECURITY] Vulnerability Description
3. **Include**: Detailed description and steps to reproduce

## 🏷️ Labels and Milestones

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority issue
- `priority: low`: Low priority issue
- `priority: medium`: Medium priority issue

### Milestones

- `v1.0.0`: Initial release
- `v1.1.0`: Feature updates
- `v1.2.0`: Performance improvements
- `v2.0.0`: Major version update

## 🎯 Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `hotfix/*`: Hot fix branches

### Release Process

1. **Create release branch** from `develop`
2. **Update version** in package.json
3. **Update changelog**
4. **Run tests** and ensure they pass
5. **Merge to main** and tag release
6. **Deploy** to production
7. **Merge back** to develop

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the project's values

### Communication

- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for general questions
- Be patient and helpful with newcomers
- Respect different opinions and approaches

## 📞 Getting Help

### Resources

- **Documentation**: [Project Wiki](https://github.com/nilavtalukdar06/smart-waste-management/wiki)
- **Issues**: [GitHub Issues](https://github.com/nilavtalukdar06/smart-waste-management/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nilavtalukdar06/smart-waste-management/discussions)
- **Email**: contributors@ecoswachh.com

### Mentorship

We offer mentorship for new contributors:

- **Pair programming** sessions
- **Code reviews** with detailed feedback
- **Documentation** improvements
- **Testing** guidance

## 🏆 Recognition

### Contributors

We recognize contributors in several ways:

- **Contributors list** in README.md
- **Special mentions** in release notes
- **Contributor badges** on GitHub profiles
- **Thank you messages** in documentation

### Hall of Fame

Outstanding contributors are added to our Hall of Fame:

- **Consistent contributions** over time
- **High-quality code** and documentation
- **Community support** and mentorship
- **Innovative ideas** and solutions

---

Thank you for contributing to Eco Swachh! Together, we can make India cleaner and more sustainable. 🌱🇮🇳
