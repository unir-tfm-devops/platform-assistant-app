# React TypeScript Web App

A modern React TypeScript application with a well-organized folder structure and best practices.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Modern Structure**: Organized folder structure for scalability
- **Reusable Components**: Pre-built components (Button, Card)
- **Custom Hooks**: Example localStorage hook
- **Utility Functions**: Common helper functions
- **Tailwind CSS**: Modern utility-first CSS framework
- **Responsive Design**: Mobile-first responsive layout

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   └── Card.tsx
├── pages/              # Page components
│   └── Home.tsx
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts
├── utils/              # Utility functions
│   └── index.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── assets/             # Static assets (images, icons)
├── styles/             # Additional stylesheets
├── App.tsx             # Main App component
├── App.css             # App-specific styles
├── index.tsx           # Application entry point
└── index.css           # Global styles with Tailwind
```

## 🛠️ Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## 🎨 Components

### Button Component
A flexible button component with multiple variants and sizes:
```tsx
<Button 
  variant="primary" 
  size="medium" 
  onClick={handleClick}
>
  Click me
</Button>
```

### Card Component
A reusable card component for content containers:
```tsx
<Card title="Card Title" onClick={handleCardClick}>
  Card content goes here
</Card>
```

## 🔧 Custom Hooks

### useLocalStorage
A hook for managing localStorage with TypeScript support:
```tsx
const [value, setValue] = useLocalStorage('key', initialValue);
```

## 📦 Utility Functions

- `formatDate()` - Format dates to readable strings
- `capitalize()` - Capitalize first letter of strings
- `debounce()` - Debounce function calls
- `generateId()` - Generate random IDs
- `isValidEmail()` - Validate email format
- `truncateText()` - Truncate text to specified length
- `formatNumber()` - Format numbers with commas
- `sleep()` - Async sleep function

## 🎯 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Development

### Adding New Components
1. Create your component in `src/components/`
2. Add TypeScript interfaces to `src/types/index.ts`
3. Import and use in your pages

### Adding New Pages
1. Create your page component in `src/pages/`
2. Add routing if needed
3. Import and use in your App component

### Adding New Hooks
1. Create your hook in `src/hooks/`
2. Follow the naming convention `use[HookName].ts`
3. Export and use in your components

## 🎨 Styling

This project uses **Tailwind CSS** for styling. You can:

- Use Tailwind utility classes directly in components
- Add custom styles in `src/index.css`
- Create component-specific styles in `src/styles/`

## 📝 TypeScript

The project includes comprehensive TypeScript support:

- Strict type checking enabled
- Common interfaces defined in `src/types/index.ts`
- Full IntelliSense support in your IDE

## 🚀 Deployment

To build for production:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 📚 Learning Resources

- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
