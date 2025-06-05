# Reflection: AI-Assisted Implementation of Game of Life

## Tool Used
**Tool:** Cursor

I chose Cursor as my AI-assisted development tool because I am more comfortable with code-centric tools than with no-code/low-code platforms like Lovable or Base44. Cursor allows for more precise control over the codebase size and structure, whereas no-code tools can generate a large amount of code very quickly, often making it difficult to manage or customize.

## Prompting Strategy
### Effective Prompts
Prompts that worked well were those where I clearly specified which part of the application to focus on, and instructed the agent to only address that part. For example:

> "Now make the grid size customizable. Give a scroll menu that lets the user pick a size nxn in multiples of 5 from 10 to 60. Focus on that part of the component only."

Another effective strategy was to ask the agent to summarize each change it made after implementing it. By adding "Summarize the changes you made" at the end of requests, I encouraged the agent to focus on the specific task and provided me with a clear understanding of what was changed.

### Ineffective Prompts
Prompts that were too vague or broad did not work well. For instance, when I initially provided all the assignment instructions at once and asked the agent to implement everything, it resulted in a single large JavaScript file with an HTML file. The code was not modular, missed features, and contained bugs.

## Tool Evaluation
### Strengths
- **Precision with Direct Prompts:** Cursor excels when given clear, specific instructions. It can implement separate components with correct logic and good code quality.
- **UI/UX Assistance:** Cursor was especially helpful with HTML and CSS, areas where I have less expertise. It produced a visually appealing and functional UI for the simulation with minimal effort.

### Weaknesses & Limitations
- **Prompt Dependency:** The effectiveness of Cursor is highly dependent on the quality of the prompts. Vague or broad prompts lead to suboptimal results.
- **No Major Limitations Noticed:** Once I refined my prompting strategy, Cursor consistently delivered high-quality, working code for each specific request.

## Code Quality
- **Manual Improvements:** Due to the use of specific and well-thought-out prompts, I did not need to manually improve or rewrite any of the generated code. All code produced was readable, modular, and maintainable.
- **Modularity & Structure:** The codebase is well-structured, with separate files for game logic, grid rendering, controls, and app initialization. Naming conventions are clear and descriptive.
- **Model-View-Controller (MVC) Pattern:**
  - **Model:** The `GameOfLife` class encapsulates the game state and logic.
  - **View:** The `Grid` class handles rendering the grid and updating the UI.
  - **Controller:** The `Controls` class manages user input and simulation state.
  - The code loosely follows the MVC pattern, with a clear separation of concerns between logic, UI, and user interaction.

## Summary
Cursor proved to be a powerful tool for AI-assisted development when used with precise, targeted prompts. It enabled the creation of a modular, maintainable, and visually appealing implementation of Conway's Game of Life, while also providing valuable assistance in areas outside my core expertise. 