# Pokédex Library Design Report

## Introduction
The Pokédex Library is a digital homage to the Pokémon universe, crafted to serve as a robust resource for Pokémon trainers and enthusiasts. By tapping into the PokéAPI, this web application offers a detailed and interactive compendium of Pokémon species.

## Design Philosophy

### Font
- **Silkscreen**: This pixel-style font is a nod to the 8-bit aesthetic of the original Pokémon games on the Game Boy. It was selected for its legibility and its ability to transport users back to the days of their first Pokémon adventures.

### Color Scheme
- **Primary Color**: Red (`#dc2625`): Chosen for its boldness and its association with the iconic Poké Ball.
- **Accent Colors**:
  - Green (`#17a34a`): Reflects the various grass-type Pokémon and adds a vibrant contrast.
  - Blue (`#2463eb`): Mirrors the water-type Pokémon and provides a calming balance to the primary red.

These colors were meticulously picked to resonate with the elemental types of Pokémon, enhancing the thematic consistency of the site.

### Theme
- **Game Boy Style**: The website's design pays tribute to the Game Boy console, embodying the simplicity and charm that captured the hearts of a generation. This retro style is not just about aesthetics but also about invoking the timeless spirit of Pokémon.

### Features and Functionality
- **Dynamic Search and Filter**: Users can effortlessly search for Pokémon or filter them based on their capture status, offering a personalized and engaging experience.
- **Infinite Scrolling & Load More**: The homepage initially presents 12 Pokémon entries, with a "load more" button for seamless access to additional records, fostering user curiosity and exploration.
- **Detailed Pokémon Profiles**: A click on a Pokémon card unfolds a wealth of information, from names to types to stats, providing a deep dive into the lore and data of the Pokémon world.

### Technical Skill Set
- **TailwindCSS**: This utility-first CSS framework empowers the site with responsive design and customizability while maintaining design consistency.
- **JavaScript**: Brings the site to life with interactive elements and dynamic content loading, enhancing user interaction.
- **HTML & CSS**: The backbone of the site's structure and style, ensuring accessibility and a seamless user experience across different devices and browsers.

## Conclusion
The Pokédex Library's design is a thoughtful blend of nostalgia and modern web technology. Each decision, from the font to the color scheme to the technical stack, was made to create an immersive experience that resonates with both long-time fans and new visitors alike. The result is a platform that not only serves as a repository of Pokémon data but also as a celebration of the series' enduring legacy.

## Report

### Steps Taken to Create the Prototype

1. **Setting Up the Project Environment**
   - Created a new project directory and initialized a Git repository.
   - Installed Tailwind CSS for styling the application.
   - Included the Google Fonts API to use the 'Silkscreen' font for the project.
   - Added an HTML template to structure the web application.
   - Linked the necessary CSS and JavaScript files.

2. **Fetching Pokémon Data**
   - Utilized the PokeAPI to fetch a list of Pokémon and their details.
   - Created two asynchronous functions, `fetchPokemon` and `fetchPokemonDetails`, to get the list of Pokémon and their detailed data, respectively.

3. **Displaying Pokémon Cards**
   - Implemented the `addCardsToContainer` function to dynamically create and display Pokémon cards.
   - Styled the cards using Tailwind CSS classes and added type-specific background colors.

4. **Handling Pokémon Details**
   - Created the `showPokemonDetails` function to fetch and display detailed information about a selected Pokémon.
   - Implemented the `updateModal` function to update the modal with detailed Pokémon information, including stats, types, weaknesses, and evolutions.

5. **Adding Interactivity**
   - Added event listeners to Pokémon cards to display the modal with detailed information when clicked.
   - Implemented a search bar in the navigation to allow users to search for Pokémon by name or ID.

6. **Loading More Pokémon**
   - Added a "Load More" button to fetch and display more Pokémon when clicked.
   - Implemented pagination by managing the offset and limit parameters in the API requests.

### Resources Used

- **PokeAPI**: The primary source of Pokémon data.
- **Tailwind CSS**: Used for styling the application.
- **Google Fonts API**: Used to include the 'Silkscreen' font.
- **HTML**: Basic structure of the web application.
- **JavaScript**: Main programming language used for fetching data and manipulating the DOM.

### Challenges Faced

1. **Asynchronous Data Fetching**
   - Handling multiple asynchronous API requests and ensuring that the data was fetched and processed correctly.
   - Solution: Used `async` and `await` to handle asynchronous operations effectively.

2. **Dynamic Content Creation**
   - Creating and updating the DOM elements dynamically based on the fetched data.
   - Solution: Used JavaScript to create and manipulate DOM elements, and applied appropriate Tailwind CSS classes for styling.

3. **Managing State**
   - Maintaining the state of the application, such as the current offset for pagination and the selected Pokémon's details.
   - Solution: Used variables to manage the state and update the UI accordingly.

4. **Handling Errors**
   - Ensuring the application handles errors gracefully, such as failed API requests.
   - Solution: Added try-catch blocks to handle errors and display appropriate error messages in the console.

5. **Styling Consistency**
   - Ensuring consistent styling across different types of Pokémon cards and modal content.
   - Solution: Defined a set of classes and used Tailwind CSS utility classes to maintain consistent styling.
