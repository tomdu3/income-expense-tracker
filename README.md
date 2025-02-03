# Income Expense Calculator 💰

A simple yet powerful web application to track your income and expenses with full CRUD functionality. Manage your finances effectively with this intuitive tool that persists data using local storage.

![Project Screenshot](screenshots/app-preview.png) <!-- TODO: Add actual screenshot later -->

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

[View Live Application](https://your-netlify-app-url.netlify.app) <!-- TODO: Replace with your actual URL -->

## Installation 💻

1. Clone the repository:

```bash
git clone https://github.com/tomdu3/income-expense-tracker.git
```

2. Open `index.html` in your preferred web browser

## Tech Stack 🛠️

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Pure CSS (or Tailwind CSS if implemented) <!-- TODO: Replace with your actual styling framework -->
- **Persistence**: Browser Local Storage
- **Hosting**: Netlify

## Key Functionality 🔑

- Add new income/expense entries with descriptions and amounts
- Edit existing entries directly in the list
- Delete individual entries with confirmation
- Filter transactions by type (All/Income/Expense)
- Automatic calculation of:
  - Total Income
  - Total Expenses
  - Net Balance
- Data persistence across sessions
- Mobile-first responsive design

## Usage Guide 📖

1. **Add Entry**:

   - Select Income/Expense type
   - Enter description and amount
   - Click "Add Entry"

2. **Edit Entry**:

   - Click edit icon (✏️) on any entry
   - Modify values in the updated form
   - Click "Update Entry"

3. **Delete Entry**:

   - Click delete icon (🗑️) on any entry
   - Confirm deletion

4. **Filter Entries**:

   - Use radio buttons to filter:
     - All transactions
     - Income only
     - Expenses only

5. **Reset Form**:
   - Click "Reset" to clear input fields

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments 🙏

- Inspired by personal finance management tools
- Built with vanilla web technologies
- Local storage implementation MDN Web Docs <!-- TODO: Add the link -->
