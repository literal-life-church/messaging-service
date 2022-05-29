# Messaging Service

Twilio Functions application used to manage our centralized messaging and automated alert system.

Here are all of the commands it supports:

- `subscribe`: Add a phone number to a channel used for general announcements and calendar event updates.
- `broadcast <Message text>`: Sends a message to all numbers subscribed to the announcments and calendar events channel.
- `status`: Determine where your number is enrolled in any active channels.

The `broadcast` command is gated to prevent unauthorized phone numbers from sending broadcast messages. All new subscribers and any unrecognized messages are collected and sent [via a webhook](#webhooks) for any additional post-processing by the service owner.

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
8. Setup up all of the necessary environment variables per the [Environment Variables](#environment-variables) section
9. Run the project with: `npm start` or `twilio serverless:start`
    - **Note 1:** If you get a warning that you do not have a compatible version of NodeJS running on your machine, run: `nvm install xx && nvm use xx`, where `xx` is the major version of Node that the toolkit requires.
    - **Note 2:** Check the required runtime version [here](https://www.twilio.com/docs/runtime/runtime-node-upgrade).

## Run and Debug

This project is already setup for use with [Visual Studio Code](https://code.visualstudio.com/). Simply open the project with that IDE to get started.

To run your project, select either the Run Local configuration for `localhost` testing or the Run ngrok configuration to publish your local instance on the WAN for testing with Twilio via an [ngrok tunnel](https://ngrok.com). To debug this application, run the application with either of the above configurations, and then run the Attach Debugger profile to attach the VS Code debugger to the running Node instance.

## Environment Variables

While most of the configuration is stored inside of the [Config.private.js](/assets/Config.private.js) file, more sensitive information is offloaded into environment variables.

Here are all of the environment variables this application expects during development and production. All are required, but Twilio can automatically add in some of them, as indicated by the last column.

| Variable Name                        | Purpose                                                                                                                                                        |  Added By Twilio Automatically  |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------:|
| `ACCOUNT_SID`                        | Acts like a username to authorize this application to your Twilio account                                                                                      | :white_check_mark:              |
| `AUTH_TOKEN`                         | Acts like your API key, or account password                                                                                                                    | :white_check_mark:              |
| `AUTHORIZED_BROADCAST_PHONE_NUMBERS` | A comma-separated list of [E.164 formatted phone numbers](https://www.twilio.com/docs/glossary/what-e164) that are authorized to perform a `broadcast` command | :x:                             |
| `NOTIFY_SERVICE_SID`                 | The ID of the Notify service which will collect phone numbers and send messages                                                                                | :x:                             |
| `WEBHOOK_URL`                        | A webhook which can process events of interest, as described below                                                                                             | :x:                             |

## Webhooks

Webhooks are triggered under two circumstances: a new subscriber is recorded or an unknown message is received. That webhook is determined by the `WEBHOOK_URL` environment variable.

When receiving new subscriber, a POST request with the following payload is sent:

```json
{
    "phoneNumber": "<E.164 formatted phone number>",
    "tags": ["<tag 1>", "<tag 2>"],
    "type": "New Subscriber"
}
```

For an unknown message event, a POST request with the following payload is sent:

```json
{
    "message": "<entire message>",
    "phoneNumber": "<E.164 formatted phone number>",
    "type": "Invalid Message"
}
```

## Usage on Twilio

[Twilio has a guide](https://www.twilio.com/blog/2017/12/how-to-set-up-sms-broadcasts-in-five-minutes.html) for setting up their services to work with a broadcast application, like this. The major differences between that article and this application are as follows:

1. Create a new Functions service on Twilio, not a Classic Functions service
2. Ensure that your Functions instance on Twilio has all of the environment variables, as [described above](#environment-variables)
3. Deploy this service from your machine to Twilio functions with: `twilio serveless:deploy`
4. Proceed to use your new Functions service in place of the Classic service used in that article
