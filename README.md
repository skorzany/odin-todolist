# odin-todolist

A 'ToDo' app, made in vanilla JavaScript for The Odin Project.<br/>
You can see it live in action on [GitHub Pages](https://skorzany.github.io/odin-todolist/).<br/>
Icons used in the project are the courtesy of [Pictogrammers](https://pictogrammers.com/).<br/><br/>
The main goal was to practice working with objects and developing the app based<br/>
on an MVC (Model View Controller) design pattern. The app allows the user to<br/>
create, delete, edit and view 'projects' with arbitrary number of associated tasks.<br/>
It utilizes localStorage API for emulating the database access.<br/><br/>
Project designed for desktop *exclusively*. I hope you like it!

## Additional notes
Although the app does what was required, there's still room for improvement.<br/>
Some possible additions might include:<br/>
- a splash screen containing info about current date and a list of tasks<br/>
scheduled for that day,
- preserving the state of user interface between sessions using localStorage,<br/>
instead of an empty cache (projects that are open/closed, task in focus etc.),
- implementing a proper ProjectList class instead of operating on a bare Array,
- currently, user has to click the 'X' (save & close) button to keep changes to a task.<br/>
Displaying a warning about discarding unsaved changes was considered,<br/>
but it turned out to be too annoying to constantly dismiss.<br/>
Maybe allow to *silently* save the task data when the user views a different one?<br/>
- providing a monkey patch for Chrome to correctly highlight sidebar icons,<br/>
because there is a known display issue when applying backdrop-filter on nested elements<br/>
(works fine on Firefox though).<br/><br/>

For now, that's all. Thank you!