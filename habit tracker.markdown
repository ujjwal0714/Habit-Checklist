# Habit Planner Web App

A modern, interactive web application to track and manage daily habits with a sleek card-based UI, progress tracking, and celebratory confetti animations. Built with HTML, CSS, and JavaScript, this app allows users to add habits, mark them as completed, and monitor their progress over a week.

## Features

- **Habit Tracking**: Add and track habits with a visual weekly checklist.
- **Progress Bar**: Displays the percentage of completed habits for the current day with a gradient progress bar.
- **Dynamic Greeting**: Greets the user based on the time of day (Morning, Afternoon, Evening).
- **Week Navigation**: Navigate through weeks to view habit completion history.
- **Remaining Time**: Shows time left until bedtime, updated every second.
- **Confetti Celebration**: Triggers confetti animation and sound when all habits for the day are completed.
- **Local Storage**: Persists habit completion states across sessions.
- **Responsive Design**: Optimized for desktop and tablet screens.
- **Audio Feedback**: Plays click sounds for checkbox interactions and a win sound for 100% completion.

## Project Structure

```
habit-planner/
├── index.html       # Main HTML file
├── style.css        # Stylesheet for the app
├── script.js        # JavaScript for functionality
├── Sounds/          # Directory for audio files
│   ├── click.wav    # Sound for checkbox clicks
│   ├── win.wav      # Sound for 100% completion
└── README.md        # Project documentation
```

## Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- A local server (e.g., Live Server in VS Code) to serve the app and audio files.
- Audio files (`click.wav` and `win.wav`) placed in a `Sounds` directory.

### Installation
1. **Clone or Download**:
   - Clone the repository or download the project files.
   ```bash
   git clone https://github.com/your-repo/habit-planner.git
   ```

2. **Set Up Audio Files**:
   - Ensure `click.wav` and `win.wav` are in the `Sounds` directory relative to `index.html`.

3. **Serve the App**:
   - Use a local server to avoid CORS issues with audio files.
   - For VS Code, install the **Live Server** extension and right-click `index.html` to select "Open with Live Server".
   - Alternatively, use a simple HTTP server:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your browser.

4. **Open the App**:
   - Open `index.html` in your browser via the local server.

## Usage

1. **View Habits**:
   - The main interface displays habits as cards, each with a weekly checklist (Monday to Sunday).
   - Checkboxes indicate completion status for each day.

2. **Add a Habit**:
   - Click the "+ Add Habit" button in the sidebar.
   - Enter the habit name and select a color (Blue, Red, Yellow, Greenyellow, Violet).
   - Submit to add the habit to the list.

3. **Track Progress**:
   - Check off completed habits for the current day.
   - The progress bar updates to show the percentage of completed habits.
   - Achieve 100% completion to trigger confetti and a win sound.

4. **Navigate Weeks**:
   - Use the Previous and Next buttons to view different weeks.
   - The date range updates to reflect the selected week.

5. **Monitor Time**:
   - The remaining time until bedtime is displayed and updates every second.

## Customization

- **Colors**: Modify habit colors in `style.css` under the `input:checked + label.<class>` selectors.
- **Audio**: Replace `click.wav` and `win.wav` in the `Sounds` directory with your preferred sounds.
- **Fonts**: Change the font in `style.css` by updating the `font-family` property (currently set to "Inter").
- **Greeting**: Update the user name in `script.js` (replace "Sankalp" in the greeting logic).

## Known Limitations

- **Mobile Support**: The app is not fully optimized for mobile devices; use on desktop or tablet for the best experience.
- **Audio CORS**: Audio files require a local server to load correctly due to browser security restrictions.
- **Habit Persistence**: Habits are stored in the DOM and not in local storage, so refreshing the page may reset the habit list (checkbox states are preserved).

## Future Improvements

- Add mobile responsiveness for smaller screens.
- Persist habits in local storage to maintain the habit list across sessions.
- Implement month and year views for long-term tracking.
- Add habit deletion and editing functionality.
- Integrate a backend for user accounts and cloud syncing.

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons from [Flaticon](https://www.flaticon.com).
- Confetti animation from [Editable GIFs](https://editablegifs.com).
- Audio files (ensure you have rights to use or replace with your own).