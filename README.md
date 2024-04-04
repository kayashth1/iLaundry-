# iLaundry 

Welcome to iLaundry, a laundry service website built using Node.js, Express, MongoDB, Passport.js, Stripe, and other technologies.

## Features

- User authentication with local registration/login
- Schedule laundry pickup and delivery
- Integrated payment system with Stripe
- Service page to showcase available laundry services

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm:

    ```
    npm install
    ```

4. Set up environment variables by creating a `.env` file in the root directory and adding the following variables:

    ```
    API_KEY=your_stripe_api_key
    ```

5. Ensure you have MongoDB installed and running on your machine.

6. Start the server:

    ```
    npm start
    ```

7. Visit `http://localhost:3000` in your web browser to access the website.

## Usage

- Visit the homepage to explore available options.
- Sign up or log in to schedule laundry pickup/delivery.
- Browse the service page to view available laundry services.
- Use the Stripe checkout for secure payments.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Passport.js
- Stripe
- EJS (Embedded JavaScript) for templating

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
