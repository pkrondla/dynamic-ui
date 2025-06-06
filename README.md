# Dynamic Configurable UI

A powerful and flexible UI framework that allows users to customize their software system screens through an intuitive design interface. This project enables end-users to configure their screens without requiring developer intervention, making it perfect for businesses that need to adapt their application interface to specific workflows and requirements.

## 🌟 Features

### Design Mode
- **Field Visibility Control**: Easily hide or unhide fields on any screen
- **Drag-and-Drop Interface**: Move fields between panels with intuitive drag-and-drop functionality
- **Customizable Tab Order**: Define the tab sequence for optimal form navigation
- **Design Persistence**: Save and load screen configurations

### Render Mode
- **Dynamic Field Rendering**: Fields are displayed according to the saved design configuration
- **Visibility Management**: Fields respect their visibility settings from design mode
- **Custom Tab Navigation**: Tab order follows the user-defined sequence

## 🛠️ Technology Stack

- React 19
- TypeScript
- Material-UI (MUI)
- Ant Design
- React DnD (Drag and Drop)
- Emotion (Styled Components)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dynamic-ui.git
cd dynamic-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`

## 💻 Usage

### Design Mode
1. Switch to Design Mode using the mode toggle
2. Drag fields between panels to reorganize the layout
3. Use the visibility toggle to show/hide fields
4. Set the tab order by clicking on fields in sequence
5. Save your design configuration

### Render Mode
1. Switch to Render Mode
2. The screen will render according to your saved design
3. Navigate through fields using the configured tab order
4. Hidden fields will remain hidden as per the design

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── data/          # Mock data and configurations
├── types/         # TypeScript type definitions
└── App.tsx        # Main application component
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the component library
- Ant Design for additional UI components
- React DnD for drag-and-drop functionality

## 📧 Contact

Project Link: [https://github.com/pkrondla/dynamic-ui](https://github.com/yourusername/dynamic-ui)
