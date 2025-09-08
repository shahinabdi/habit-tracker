# 🤝 Contributing to Habit Tracker

Thank you for your interest in contributing to the Habit Tracker project! This document provides guidelines and information for contributors.

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/☕_Support_Development-Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/shahinabdi)

**Every contribution matters - from code to feedback to spreading the word!**

</div>

---

## 🌟 Ways to Contribute

### 💻 Code Contributions
- **🐛 Bug fixes** - Help resolve issues and improve stability
- **✨ New features** - Implement requested or innovative features
- **🎨 UI/UX improvements** - Enhance the user experience
- **⚡ Performance optimizations** - Make the app faster and more efficient
- **📚 Documentation** - Improve guides, comments, and explanations

### 🗣️ Non-Code Contributions
- **🐛 Bug reports** - Help identify issues and problems
- **💡 Feature requests** - Suggest new functionality
- **📖 Documentation improvements** - Fix typos, clarify instructions
- **🎨 Design suggestions** - Propose UI/UX enhancements
- **📢 Community support** - Help other users in discussions
- **⭐ Project promotion** - Share and star the repository

---

## 🚀 Getting Started

### 🔧 Development Setup

1. **📥 Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/habit-tracker.git
   cd habit-tracker
   ```

2. **📦 Install Dependencies**
   ```bash
   npm install
   ```

3. **🏃‍♂️ Start Development Server**
   ```bash
   npm run dev
   ```

4. **🔍 Run Linting**
   ```bash
   npm run lint
   ```

5. **🏗️ Build for Production**
   ```bash
   npm run build
   ```

### 🛠️ Technology Stack

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **React 18.3.1** | UI Framework | [React Docs](https://react.dev/) |
| **TypeScript 5.5.3** | Type Safety | [TypeScript Docs](https://www.typescriptlang.org/) |
| **Tailwind CSS 3.4.1** | Styling | [Tailwind Docs](https://tailwindcss.com/) |
| **Vite 5.4.2** | Build Tool | [Vite Docs](https://vitejs.dev/) |
| **Lucide React** | Icons | [Lucide Icons](https://lucide.dev/) |

---

## 📝 Contribution Guidelines

### 🎯 Code Standards

#### **TypeScript Best Practices**
- Use strict TypeScript settings
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

#### **React Best Practices**
- Use functional components with hooks
- Implement proper error boundaries
- Follow React performance best practices
- Use TypeScript for prop types

#### **Styling Guidelines**
- Use Tailwind CSS utility classes
- Follow responsive design principles
- Maintain consistent spacing and typography
- Use semantic color classes

#### **File Structure**
```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

### 🔄 Git Workflow

#### **Branch Naming**
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates

#### **Commit Messages**
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

Examples:
feat(habits): add habit deletion functionality
fix(calendar): resolve date navigation bug
docs(readme): update installation instructions
style(ui): improve button hover states
```

#### **Commit Types**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

---

## 🐛 Bug Reports

### 📋 Before Submitting

1. **🔍 Search existing issues** to avoid duplicates
2. **✅ Ensure it's actually a bug** and not expected behavior
3. **🧪 Test in the latest version** to confirm the issue persists

### 📝 Bug Report Template

```markdown
## 🐛 Bug Description
A clear and concise description of the bug.

## 🔄 Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## 🎯 Expected Behavior
What you expected to happen.

## 📱 Environment
- OS: [e.g. Windows 10, macOS 11.6, Ubuntu 20.04]
- Browser: [e.g. Chrome 95, Firefox 94, Safari 15]
- Version: [e.g. 1.0.0]

## 📸 Screenshots
If applicable, add screenshots to help explain the problem.

## 📄 Additional Context
Any other context about the problem.
```

---

## ✨ Feature Requests

### 💭 Before Submitting

1. **🔍 Check existing issues** for similar requests
2. **💡 Consider the scope** - does it fit the project goals?
3. **🎯 Think about implementation** - is it technically feasible?

### 📝 Feature Request Template

```markdown
## 🎯 Feature Description
A clear and concise description of what you want to happen.

## 🔄 Use Case
Describe the problem this feature would solve.

## 💡 Proposed Solution
A clear and concise description of what you want to happen.

## 🔀 Alternatives Considered
A clear and concise description of any alternative solutions.

## 📊 Additional Context
Add any other context, mockups, or examples about the feature request.
```

---

## 🔄 Pull Request Process

### 📋 Before Submitting

1. **🔍 Check existing PRs** to avoid duplicates
2. **🎯 Create focused PRs** - one feature/fix per PR
3. **✅ Test your changes** thoroughly
4. **📚 Update documentation** if needed

### 📝 Pull Request Template

```markdown
## 📋 Description
Brief description of changes made.

## 🔗 Related Issue
Fixes #(issue number)

## 🧪 Testing
- [ ] Manual testing completed
- [ ] All existing tests pass
- [ ] New tests added (if applicable)

## 📸 Screenshots
If applicable, add screenshots of UI changes.

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 🔍 Review Process

1. **📤 Submit PR** with clear description
2. **🔄 Automated checks** must pass
3. **👀 Code review** by maintainers
4. **💬 Address feedback** and make changes
5. **✅ Approval and merge** by maintainers

---

## 🌟 Recognition

### 🏆 Contributors Hall of Fame

Contributors will be recognized in the following ways:

- **📜 Contributors list** in README.md
- **🎉 Release notes** mentioning significant contributions
- **🏅 Special badges** for major contributors
- **📢 Social media shoutouts** for notable contributions

### 💎 Contribution Levels

| Level | Contributions | Recognition |
|-------|---------------|-------------|
| **🌱 Contributor** | 1+ merged PRs | Listed in contributors |
| **⭐ Active Contributor** | 5+ merged PRs | Special mention in releases |
| **🏅 Core Contributor** | 15+ merged PRs | Core team invitation |
| **💎 Maintainer** | Ongoing maintenance | Full project access |

---

## 📞 Contact & Support

### 💬 Communication Channels

| Purpose | Method | Link |
|---------|--------|------|
| **🐛 Bug Reports** | GitHub Issues | [Report Bug](https://github.com/shahinabdi/habit-tracker/issues/new?template=bug_report.md) |
| **✨ Feature Requests** | GitHub Issues | [Request Feature](https://github.com/shahinabdi/habit-tracker/issues/new?template=feature_request.md) |
| **💬 Discussion** | GitHub Discussions | [Join Discussion](https://github.com/shahinabdi/habit-tracker/discussions) |
| **📧 Direct Contact** | Email | [fxappfeedback@proton.me](mailto:fxappfeedback@proton.me) |

### 🤝 Community Guidelines

- **🌟 Be respectful** and inclusive to all community members
- **💡 Provide constructive feedback** and helpful suggestions
- **📚 Help others learn** and grow in their contributions
- **🎯 Stay on topic** in discussions and issues
- **🔍 Search before posting** to avoid duplicates

---

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

<div align="center">

## 🙏 Thank You!

**Your contributions make this project better for everyone!**

[![Buy Me A Coffee](https://img.shields.io/badge/☕_Support_Development-Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/shahinabdi)

---

### 💻 Built with ❤️ by [Shahin ABDI](https://github.com/shahinabdi)

*Building the future of personal development, one contribution at a time.*

</div>
