---

# TaskNest

## Description
The **TaskNest** is a simple yet effective tool for managing tasks. With a sleek design and user-friendly interface, it allows users to add, filter, and organize their daily tasks efficiently. The app provides a minimalistic experience, ensuring that users can focus on what needs to get done.

## Features
- Add and remove tasks easily.
- Filter tasks based on their status: All, Checked (completed), or Unchecked (pending).
- Persistent storage of tasks using local storage, so tasks are not lost when the app is refreshed.
- Responsive design for both desktop and mobile viewports.
- Visually appealing gradient background with a clean input field for task entry.

## Technologies Used
- **HTML5**: Markup structure of the app.
- **CSS3**: Styling and layout, including a gradient background and custom input field design.
- **JavaScript**: Interactivity such as adding, deleting, and filtering tasks, and local storage management.
- **Font Awesome**: For adding icons (e.g., for buttons).

## Installation
To run this app locally:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd todo-app
   ```
3. Open `index.html` in your preferred browser:
   ```bash
   open index.html
   ```
   Or you can use Live Server for real-time updates.

## Usage
1. Enter a task in the input field.
2. Click the **Add** button (or press **Enter**) to add the task to your to-do list.
3. Filter tasks using the dropdown to show:
   - **All**: Displays all tasks.
   - **Checked**: Displays completed tasks.
   - **Unchecked**: Displays tasks that are still pending.
4. The app automatically saves your tasks in the browser's local storage, so they remain after a refresh.

## Responsive Design
The app is fully responsive, with adjustments made for different screen sizes. On smaller screens, the **filter dropdown** appears below the input field and add button, while the **input field** and **add button** remain in the same row.

## Design Details
- **Background Gradient**: 
  ```css
  background-image: linear-gradient(319deg, #663dff 0%, #aa00ff 37%, #cc4499 100%);
  ```
- **Input Field**:
  - **Background**: Semi-transparent white with 0.6 opacity.
  - **Text Color**: `#aa00ff` (purple) for an elegant contrast.
- **Icons**: Font Awesome icons are used for buttons and task status indicators.

## Contributing
If you would like to contribute:
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## Live
The site is live at: 

## Contact
For questions or feedback, feel free to reach out to manitoshraj.mj121@gmail.com or create an issue in this repository.

---
