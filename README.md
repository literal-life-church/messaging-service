# Messaging Service

Twilio Functions application used to manage our centralized messaging and automated alert system.

## Get Started

This project requires the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/) and the [Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit) to run on your machine. It is also very convenient to use [NVM](https://github.com/nvm-sh/nvm) to help you select and manage particular versions of Node.JS and NPM on your machine. Here are the steps to do that:

1. [Install NVM](https://github.com/nvm-sh/nvm#install--update-script), per their directions:

    ```shell
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/<latest version tag>/install.sh | bash 
   ```

2. Restart your terminal
3. [Install the Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli) for your platform. If you install this with NPM, it is most convenient to install it globally, with the `-g` switch.
4. [Install the Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started#install-the-twilio-serverless-toolkit) using the Twilio CLI, like this:

    ```shell
    twilio plugins:install @twilio-labs/plugin-serverless
    twilio autocomplete zsh  # Optional, to update the autocomplete cache
    twilio autocomplete bash # Either/or, depending on your shell
    ```

5. Verify that version 3 of the Serverless Toolkit is installed with: `twilio plugins`
6. Log into your Twilio account, using the Account SID and Auth Token from [the console](https://console.twilio.com/): `twilio login`
7. Install the necessary dependencies: `npm i`
8. Run the project with: `npm start` or `twilio serverless:start`
    - **Note 1:** If you get a warning that you do not have a compatible version of NodeJS running on your machine, run: `nvm install xx && nvm use xx`, where `xx` is the major version of Node that the toolkit requires.
    - **Note 2:** Check the required runtime version [here](https://www.twilio.com/docs/runtime/runtime-node-upgrade).
