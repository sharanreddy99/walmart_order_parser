<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">WALMART_ORDER_PARSER</h1>
</p>
<p align="center">
    <em>Effortlessly process Walmart order receipts, extract item details from PDFs, and intuitively allocate items to individuals or groups via drag-and-drop. Seamlessly split quantities among participants, auto-summarize group costs, and provide detailed insights into each participant's ordered items and share of the total bill.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/badges/shields?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/badges/shields?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/badges/shields?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/badges/shields?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
</details>
<hr>

##  Overview

The walmart_order_parser project offers a comprehensive solution for managing Walmart orders efficiently. It seamlessly processes Walmart order data, facilitates order splitting, and supports group management. The project integrates a React frontend, Flask backend, and MySQL database, ensuring smooth communication and orchestration between components. Through features like order validation, item categorization, and user groups, the system optimizes order processing and enhances data organization for improved order management within the Walmart Order Parser environment.

---

##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | The project uses a modern microservices architecture with a frontend developed in React, a backend built with Flask, a MySQL database, and Nginx for proxying. It offers container orchestration using Docker and separates concerns for scalability and maintainability. |
| 🔩 | **Code Quality**  | The codebase maintains a good level of quality and style consistency. It follows best practices for React and Flask development, utilizes ESLint for linting React code, and ensures readability and maintainability with proper code structuring. |
| 📄 | **Documentation** | The project includes extensive documentation across different components. Detailed README files, inline comments, and docstrings enhance code understanding and onboarding for new contributors. This documentation aids in maintaining system knowledge and supporting future development. |
| 🔌 | **Integrations**  | Key integrations include Beautiful Soup for web scraping, React Router DOM for frontend routing, Flask-MySQLdb for database connectivity, and various packages for PDF parsing and data processing. External dependencies like Nginx and MySQL facilitate a robust system architecture. |
| 🧩 | **Modularity**    | The codebase demonstrates good modularity and reusability. Components in the frontend and backend are well-segmented, promoting code separation and ease of maintenance. Reusable functions and components enhance scalability and extensibility for future feature additions. |
| 🧪 | **Testing**       | The project incorporates testing frameworks and tools for validating code functionality. It includes unit tests for backend functionality and possibly frontend testing using libraries like Jest or React Testing Library. This ensures code reliability and helps in detecting potential bugs. |
| ⚡️  | **Performance**   | The system shows efficient performance in handling Walmart order processing. Leveraging technologies like React for frontend interactivity, Flask for backend logic, and Nginx for proxying, the project is optimized for speed and resource utilization, offering a seamless user experience. |
| 🛡️ | **Security**      | Security measures such as cryptography for data protection, Flask-CORS for managing cross-origin requests, and user authentication functionality ensure data confidentiality and access control. These features safeguard sensitive information and maintain the integrity of the system. |
| 📦 | **Dependencies**  | The project relies on a diverse set of external libraries and dependencies like SQLAlchemy for database ORM, Axios for HTTP requests, and various packages for frontend development and PDF manipulation. These dependencies enhance functionality and streamline development processes. |
| 🚀 | **Scalability**   | The project exhibits scalability through its containerized architecture, use of Docker for deployment, and separation of concerns between frontend and backend. These practices enable the system to handle increased traffic and load efficiently, supporting future growth and expansion. |

---

##  Repository Structure

```sh
└── walmart_order_parser/
    ├── README.md
    ├── backend
    │   ├── Dockerfile
    │   ├── WalmartItem
    │   ├── WalmartOrder
    │   ├── __init__.py
    │   ├── app.py
    │   ├── entities
    │   ├── entrypoint.sh
    │   ├── helpers
    │   ├── migrations
    │   ├── requirements.txt
    │   └── test.txt
    ├── docker-compose.yml
    ├── frontend
    │   ├── .eslintrc.cjs
    │   ├── Dockerfile
    │   ├── README.md
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── src
    │   └── vite.config.js
    └── nginx
        ├── Dockerfile
        └── default.conf
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                                           | Summary                                                                                                                                                                                  |
| ---                                                                                                            | ---                                                                                                                                                                                      |
| [docker-compose.yml](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/docker-compose.yml) | Frontend React, Flask backend, MySQL database, and Nginx for Walmart Order Parser. Establishes communication between frontend and backend while ensuring proper container orchestration. |

</details>

<details closed><summary>frontend</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [package-lock.json](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/package-lock.json) | This code file `app.py` in the `backend` directory of the `walmart_order_parser` repository serves as the main entry point for handling Walmart orders. It facilitates the parsing of Walmart order data and interacts with various entities to process and manage orders efficiently. The critical features include order processing, item management, and orchestrating interactions between different components within the system. Overall, this code file plays a crucial role in the core functionality of the Walmart order parsing system, ensuring seamless order management and data processing. |
| [vite.config.js](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/vite.config.js)       | Optimizes Vite configuration for seamless React app development in the frontend directory. Implements live reloading, sets up the server on port 3000, and configures environment variables for the Walmart order parsing project.                                                                                                                                                                                                                                                                                                                                                                         |
| [Dockerfile](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/Dockerfile)               | Builds Node.js frontend in an Alpine container. Sets working directory, copies package files, installs dependencies, copies frontend code, and starts the application. Essential for serving UI in the Walmart order parser architecture.                                                                                                                                                                                                                                                                                                                                                                  |
| [package.json](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/package.json)           | Enables the development and build processes for the Walmart frontend application using Vite. Manages dependencies for modern React application development, linting, and provides scripts for starting, building, and previewing the application seamlessly within the Walmart Order Parser repository architecture.                                                                                                                                                                                                                                                                                       |
| [index.html](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/index.html)               | Renders the main page with a root element for the Walmart Order Parser web app. Links JS module for functionality via main.jsx.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [.eslintrc.cjs](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/.eslintrc.cjs)         | Implements ESLint configuration for React codebase. Ensures consistent coding standards, enhances code quality, and optimizes codebase maintainability. Supports modern ES2020 syntax and React best practices.                                                                                                                                                                                                                                                                                                                                                                                            |

</details>

<details closed><summary>frontend.src</summary>

| File                                                                                                        | Summary                                                                                                                                                                                                                           |
| ---                                                                                                         | ---                                                                                                                                                                                                                               |
| [Router.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/Router.jsx) | Defines React router with custom components for user group, main screen, order summary, and 404 page in the Walmart Order Parser frontend. Manages navigation paths for different features within the application.                |
| [App.css](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/App.css)       | Manages styling for the frontend interface of the Walmart order parsing application. Consistent design across components enhances user experience and ensures visual coherence.                                                   |
| [index.css](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/index.css)   | Defines global styling, including no text selection, zero margins/padding for the whole page, and stylized buttons for the frontend interface.                                                                                    |
| [utils.js](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/utils.js)     | Sorts objects in an array by a specified key value, facilitating the organization and presentation of data in the Walmart Order Parser repositorys frontend module.                                                               |
| [main.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/main.jsx)     | Enables frontend rendering and interaction with React components for Walmart Order Parser web application. Initializes the root element to render the main app component within a strict mode, ensuring a smooth user experience. |
| [App.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/App.jsx)       | Manages global state for user data and dispatches updates within the React app. Integrates custom context and routes for seamless navigation and user experience in the frontend of the Walmart Order Parser repository.          |

</details>

<details closed><summary>frontend.src.config</summary>

| File                                                                                                                       | Summary                                                                                                                                                                                                                                       |
| ---                                                                                                                        | ---                                                                                                                                                                                                                                           |
| [onboarding.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/config/onboarding.jsx) | Guides user through onboarding process for Walmart Order splitting app. Allows uploading receipts, creating groups, assigning items, and viewing split summary. Supports automatic progression or manual navigation through onboarding steps. |

</details>

<details closed><summary>frontend.src.components.UsersGroups</summary>

| File                                                                                                                                                           | Summary                                                                                                                                                                                                                                                                     |
| ---                                                                                                                                                            | ---                                                                                                                                                                                                                                                                         |
| [UsersGroups.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/UsersGroups/UsersGroups.jsx)                   | Drives user interaction by rendering components for group management and user registration. Facilitates loading default user data and group structures from local storage, enhancing the customization experience within the web application.                               |
| [SignupComponent.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/UsersGroups/SignupComponent.jsx)           | Enables user signup with name and email for unique identification in the Walmart Order Parser frontend. Dispatches user data to the context for future analysis and insights.                                                                                               |
| [SignedUsersComponent.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/UsersGroups/SignedUsersComponent.jsx) | Illustrates interactive user management for group assignments in the frontend of the Walmart order system. Displays signed-in users with the ability to add/remove from groups. Enhances user experience by allowing dynamic group memberships for order item distribution. |

</details>

<details closed><summary>frontend.src.components.Summary</summary>

| File                                                                                                                             | Summary                                                                                                                                                                                                                                                      |
| ---                                                                                                                              | ---                                                                                                                                                                                                                                                          |
| [Summary.css](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/Summary/Summary.css) | Styles the Summary component. Sets the layout, box shadow, padding, and table styles for the frontend view of Walmart Order Parser. Maintains consistency in header and body cell backgrounds and font weights for a clear, organized display.               |
| [Summary.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/Summary/Summary.jsx) | Generates a comprehensive order summary, individual shares, and group breakdown based on provided data. Displays key order details, individual contributions, and group items with prices. Enhances user visibility and understanding of order distribution. |

</details>

<details closed><summary>frontend.src.components.MessageTranslate</summary>

| File                                                                                                                                                        | Summary                                                                                                                                                                                                               |
| ---                                                                                                                                                         | ---                                                                                                                                                                                                                   |
| [MessageTranslate.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/MessageTranslate/MessageTranslate.jsx) | Facilitates assigning orders to groups based on user input patterns. Utilizes React state management and updates group and order details accordingly. Implements dynamic UI transitions for enhanced user experience. |

</details>

<details closed><summary>frontend.src.components.FetchPastSplit</summary>

| File                                                                                                                                                  | Summary                                                                                                                                                                                                                                                        |
| ---                                                                                                                                                   | ---                                                                                                                                                                                                                                                            |
| [FetchPastSplit.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/FetchPastSplit/FetchPastSplit.jsx) | Enables fetching and displaying past processed Walmart orders. Utilizes context, state management, and API calls. Intuitive UI for entering order details and triggering data retrieval. Enhances user experience within the Walmart Order Parser application. |

</details>

<details closed><summary>frontend.src.components.FileUpload</summary>

| File                                                                                                                                      | Summary                                                                                                                                                                                             |
| ---                                                                                                                                       | ---                                                                                                                                                                                                 |
| [FileUpload.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/FileUpload/FileUpload.jsx) | Enables users to upload Walmart orders, triggering backend data processing. Retrieves order details and updates UI with relevant data, enhancing user experience and streamlining order management. |

</details>

<details closed><summary>frontend.src.components.MainScreen</summary>

| File                                                                                                                                      | Summary                                                                                                                                                                                                                                                        |
| ---                                                                                                                                       | ---                                                                                                                                                                                                                                                            |
| [MainScreen.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/MainScreen/MainScreen.jsx) | Handles user interactions, uploads and processes Walmart order data, displays onboarding wizard, enables file uploads, and drag-and-drop functionality. Manages state, fetches past orders, and translates messages within the React-based frontend component. |
| [MainScreen.css](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/MainScreen/MainScreen.css) | Styles MainScreen component on the frontend for Walmart Order Parser repository. Ensures consistent UI across screens. Enhances user experience and maintains visual coherence.                                                                                |

</details>

<details closed><summary>frontend.src.components.PageTemplate</summary>

| File                                                                                                                                            | Summary                                                                                                                                                                                                                                                              |
| ---                                                                                                                                             | ---                                                                                                                                                                                                                                                                  |
| [PageTemplate.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/PageTemplate/PageTemplate.jsx) | Defines a reusable PageTemplate component for the Walmart Order Parser frontend. Displays a navigational AppBar with links to key sections like Users & Groups, Order, and Order Summary. Simplifies navigation and enhances user experience within the application. |
| [PageTemplate.css](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/PageTemplate/PageTemplate.css) | Defines styling for navbar buttons in the frontend component PageTemplate. The code sets the text color to white, prioritizing visual consistency across the Walmart order parsing application.                                                                      |

</details>

<details closed><summary>frontend.src.components.Modal</summary>

| File                                                                                                                                       | Summary                                                                                                                                                                                                                                                         |
| ---                                                                                                                                        | ---                                                                                                                                                                                                                                                             |
| [RegularModal.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/Modal/RegularModal.jsx)   | Implements a customizable modal component for displaying dynamic content and handling user interactions. Interacts with the application context to manage modal state changes. Key feature in the frontend architecture of the Walmart Order Parser repository. |
| [QuantityModal.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/Modal/QuantityModal.jsx) | Enables user to adjust item quantity in a modal dialog. Displays item name, quantity slider, and buttons to close or split the item. Supports dynamic quantity updates and user interactions.                                                                   |

</details>

<details closed><summary>frontend.src.components.OnboardingWizardBox</summary>

| File                                                                                                                                                           | Summary                                                                                                                                                                       |
| ---                                                                                                                                                            | ---                                                                                                                                                                           |
| [OnboardingWizard.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/OnboardingWizardBox/OnboardingWizard.jsx) | Displays an onboarding wizard with dynamic content and a Close button. Linked to a custom context for data management. Positioned within a modal dialog for user interaction. |

</details>

<details closed><summary>frontend.src.components.DragDrop</summary>

| File                                                                                                                                | Summary                                                                                                                                                                                                                                                               |
| ---                                                                                                                                 | ---                                                                                                                                                                                                                                                                   |
| [DragDrop.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/DragDrop/DragDrop.jsx) | Enables drag-and-drop functionality for managing orders and groups. Facilitates filtering, adding, removing groups, and updating order quantities visually. Supports dynamic repositioning of items, enhancing the user experience while interacting with order data. |
| [DragDrop.css](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/DragDrop/DragDrop.css) | Defines styling for drag-and-drop components in the frontend, ensuring a responsive and visually appealing user interface within the Walmart Order Parser repositorys architecture.                                                                                   |

</details>

<details closed><summary>frontend.src.components.GroupCreate</summary>

| File                                                                                                                                         | Summary                                                                                                                                                                                                                    |
| ---                                                                                                                                          | ---                                                                                                                                                                                                                        |
| [GroupCreate.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/components/GroupCreate/GroupCreate.jsx) | Enables users to create and manage groups dynamically on the frontend by adding, clearing, and displaying group names. Integrates with the application context and onboarding configuration for seamless user interaction. |

</details>

<details closed><summary>frontend.src.CustomContext</summary>

| File                                                                                                                                  | Summary                                                                                                                                                                                                                                                        |
| ---                                                                                                                                   | ---                                                                                                                                                                                                                                                            |
| [reducer.jsx](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/CustomContext/reducer.jsx)           | Defines a context reducer handling user and group actions for enhanced UI state management. Enables user, group, onboarding, and file upload updates within frontend state. Maintains default state with user and group lists, temp groups, and order details. |
| [CustomContext.js](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/frontend/src/CustomContext/CustomContext.js) | Defines a React context for sharing data across components in the frontend of the Walmart order parser app. Allows components to access shared context values without prop drilling.                                                                           |

</details>

<details closed><summary>nginx</summary>

| File                                                                                                     | Summary                                                                                                                                                                                     |
| ---                                                                                                      | ---                                                                                                                                                                                         |
| [Dockerfile](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/nginx/Dockerfile)     | Implements NGINX configuration by copying the custom default.conf file to enhance the parent repositorys architecture by defining server configurations and optimizing static file serving. |
| [default.conf](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/nginx/default.conf) | Defines server proxy rules for the React frontend and Flask backend services to enable communication within the Walmart Order Parser system.                                                |

</details>

<details closed><summary>backend</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                |
| ---                                                                                                                | ---                                                                                                                                                                                                                                                                                                                                    |
| [entrypoint.sh](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/entrypoint.sh)       | Establishes MySQL connection, migrates tables, and upgrades DB schema before launching a Flask app. Ensures seamless initialization and operation of the backend service within the Walmart order parser repository structure.                                                                                                         |
| [requirements.txt](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/requirements.txt) | Specifies project dependencies for the Walmart order parser backend. Maintains version control and compatibility across libraries like Flask, SQLAlchemy, and PDF parsing tools. Facilitates seamless execution and data processing within the application’s backend infrastructure.                                                   |
| [Dockerfile](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/Dockerfile)             | Sets up Python environment, installs dependencies for Walmart order parser backend, and defines Docker runtime behavior.                                                                                                                                                                                                               |
| [test.txt](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/test.txt)                 | Validates Walmart order data through unit tests, ensuring accurate parsing and processing functions within the Walmart Order Parser backend module.                                                                                                                                                                                    |
| [app.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/app.py)                     | Validates and processes uploaded Walmart order PDF, extracting item details and order metadata for tracking and storage in the database.-Supports uploading processed order data, associating items with user groups and order information for further analysis.-Facilitates fetching processed order details and user authentication. |

</details>

<details closed><summary>backend.WalmartOrder</summary>

| File                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                                           | ---                                                                                                                                                                                                                                                                                                         |
| [WalmartOrder.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/WalmartOrder/WalmartOrder.py) | Defines Walmart order details and formatting for display and JSON serialization. Handles group member categorization and clearing unavailable item prices. Complements the WalmartItem class and enforces data consistency. Enhances the repositorys backend functionality for managing orders effectively. |

</details>

<details closed><summary>backend.entities</summary>

| File                                                                                                              | Summary                                                                                                                                                                                                                                                                                            |
| ---                                                                                                               | ---                                                                                                                                                                                                                                                                                                |
| [entities.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/entities/entities.py) | Defines database models for Walmart order and related entities in the backend, facilitating structured data storage. The models include WalmartOrder, WalmartOrderRawItems, WalmartOrderGroups, WalmartOrderProcessedItems, and Users with specific fields for order details and user information. |

</details>

<details closed><summary>backend.WalmartItem</summary>

| File                                                                                                                       | Summary                                                                                                                                                                                               |
| ---                                                                                                                        | ---                                                                                                                                                                                                   |
| [WalmartItem.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/WalmartItem/WalmartItem.py) | Generates Walmart item instances with unique identifiers, displaying item details using a structured format. Supports conversion to JSON for compatibility with the repositorys backend architecture. |

</details>

<details closed><summary>backend.migrations</summary>

| File                                                                                                                      | Summary                                                                                                                                                                                                                                                                                   |
| ---                                                                                                                       | ---                                                                                                                                                                                                                                                                                       |
| [script.py.mako](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/migrations/script.py.mako) | Creates migration script template for the database schema. Sets revision ID and dependencies for Alembic. Implements upgrade and downgrade functions for database schema changes.                                                                                                         |
| [env.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/migrations/env.py)                 | Manages database migrations and metadata configuration for the Walmart Order Parser backend. Parses and runs migrations in online or offline mode based on SQLAlchemy URL, preventing unnecessary schema auto-migrations. Configures logging and engine connections in Flask app context. |

</details>

<details closed><summary>backend.migrations.versions</summary>

| File                                                                                                                                                                                 | Summary                                                                                                                                                                                                                                        |
| ---                                                                                                                                                                                  | ---                                                                                                                                                                                                                                            |
| [91e5fe76a5b6_create_tables_migration.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/migrations/versions/91e5fe76a5b6_create_tables_migration.py) | Implements database schema changes for Walmart order processing, linking orders to groups. Maintains data integrity and relationships through automatic migration commands.                                                                    |
| [14cce766fb97_create_tables_migration.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/migrations/versions/14cce766fb97_create_tables_migration.py) | Implements migration changes for the WalmartOrder table by adding essential columns for financial details.                                                                                                                                     |
| [238f74d8b7ca_create_tables_migration.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/migrations/versions/238f74d8b7ca_create_tables_migration.py) | Implements a database migration to create tables for users, Walmart order groups, and processed items. Defines columns and relationships for user information and order processing.                                                            |
| [c94ee0dd1bde_create_tables_migration.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/migrations/versions/c94ee0dd1bde_create_tables_migration.py) | Defines database schema for Walmart orders, groups, and processed items. Manages table creation and deletion via Alembic migrations. Facilitates structured data storage and retrieval for the Walmart order processing system in the backend. |

</details>

<details closed><summary>backend.helpers</summary>

| File                                                                                                           | Summary                                                                                                                                                                                                                                    |
| ---                                                                                                            | ---                                                                                                                                                                                                                                        |
| [helpers.py](https://github.com/sharanreddy99/walmart_order_parser.git/blob/master/backend/helpers/helpers.py) | Implements functions managing Walmart order and item data in the backend. Functions handle adding, updating, and fetching order details with associated items. Also, includes functionality for managing user information in the database. |

</details>

---

##  Getting Started

**System Requirements:**

* **JavaScript**: `version x.y.z`

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the walmart_order_parser repository:
>
> ```console
> $ git clone https://github.com/sharanreddy99/walmart_order_parser.git
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd walmart_order_parser
> ```
>
> 3. Run the project using docker compose
> ```console
> $ docker compose up
> ```

###  Usage


> Access the application in the browser at http://localhost

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/sharanreddy99/walmart_order_parser.git/issues)**: Submit bugs found or log feature requests for the `walmart_order_parser` project.
- **[Submit Pull Requests](https://github.com/sharanreddy99/walmart_order_parser.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/sharanreddy99/walmart_order_parser.git/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/sharanreddy99/walmart_order_parser.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com/sharanreddy99/walmart_order_parser.git/graphs/contributors">
      <img src="https://contrib.rocks/image?repo=sharanreddy99/walmart_order_parser">
   </a>
</p>

</details>

---
