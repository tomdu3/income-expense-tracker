# Income Expense Calculator 💰

A simple yet powerful web application to track your income and expenses with full CRUD functionality. Manage your finances effectively with this intuitive tool that persists data using local storage.

![Project Screenshot](/assets/docs/amiresponsive.png)

[Link to deployed app](https://tom-budget-tracker.netlify.app/)

## Features ✨

- **CRUD Operations**: Fully manage your entries with Create, Read, Update, Delete functionality
- **Financial Overview**: Instant visibility of total income, expenses, and net balance
- **Smart Filtering**: Quick-filter entries using radio buttons (All/Income/Expense)
- **Data Persistence**: Automatically saves data to local storage
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Input Management**: Reset button to clear form fields quickly
- **Entry Editing**: Directly modify existing entries in-place
- **Transaction History**: Chronological list of all financial activities

## Live Demo 🚀

[View Live Application](https://tom-budget-tracker.netlify.app/) 

## Installation 💻

1. Clone the repository:

```bash
git clone https://github.com/tomdu3/income-expense-tracker.git
```

2. Open `index.html` in your preferred web browser


## Technology Stack & Tools 🛠️

- **Frontend Core**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **CSS Framework**: 
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons & Styling**:
  - [Font Awesome](https://fontawesome.com/) - Icons library (via CDN)
- **Storage**:
  - Browser Local Storage API for data persistence
- **Hosting**:
  - [Netlify](https://www.netlify.com/) - Web hosting and deployment

## Features Deep Dive 🔍

### Core Functionality
- **Transaction Management**:
  - Add/Edit/Delete individual transactions
  - Bulk delete all transactions with confirmation
  - Real-time balance calculation
  - Data persistence across sessions

### UI/UX Features
- **Responsive Design**:
  - Mobile-first approach
  - Fluid layout adapting to all screen sizes
- **Modern Interface**:
  - Clean, intuitive design
  - Color-coded transactions (green for income, red for expenses)
  - Interactive elements with hover states
- **Smart Interactions**:
  - In-place editing of transactions
  - Keyboard shortcuts (Enter to save, Esc to cancel)
  - Confirmation dialogs for destructive actions
  - Sort transactions by newest/oldest

### Data Management
- **Local Storage**:
  - Automatic data saving
  - Session persistence
  - Data structure optimization
- **Transaction Ordering**:
  - Automatic reordering after deletions
  - Maintained chronological integrity
  - Smart filtering system

## Code Architecture 🏗️

### JavaScript Components
- **Core Functions**:
  ```javascript
  updateCurrentState() // Manages financial calculations
  displayTransactions() // Handles transaction display logic
  editEntry() // In-place editing functionality
  deleteEntry() // Single transaction deletion
  reorderEntries() // Maintains transaction order
  ```
- **Event Handlers**:
  ```javascript
  form.addEventListener() // New transaction handling
  orderBtn.addEventListener() // Sort order toggling
  trashAllBtn.addEventListener() // Bulk deletion
  ```

### Data Structure
```javascript
expenseTrackerData = {
    income: [{description, amount, order}],
    expense: [{description, amount, order}]
}
```

## Acknowledgements 🙏

This project was made possible thanks to these amazing technologies and resources:

- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework that made styling a breeze
- [Font Awesome](https://fontawesome.com/) - For the beautiful icons used throughout the interface
- [favicon.io](https://favicon.io) - For generating the favicon used in the project
- [MDN Web Docs](https://developer.mozilla.org/) - For comprehensive documentation on Local Storage and DOM manipulation
- [Netlify](https://www.netlify.com/) - For providing reliable and easy-to-use hosting services

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Future Enhancements 🚀

- Data export functionality
- Multiple currency support
- Category-based transaction grouping
- Data visualization with charts
- Cloud storage integration

## Copyright Notice
Copyright © 2025 Tomislav Dukez. All rights reserved.

