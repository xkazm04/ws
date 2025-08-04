# Google Email (gmail)

This is the trickiest part. We need a service account in order to connect to Google programmatically. As a second step within N8n, you have to log in yourself. It creates an authentication token that is subsequently used for any communication with Google's Workspace services.

- [ ]  Click on Create credential as described above and from the drop-down menu select “Gmail OAuth2 API”

[Credentials - Gmail OAuth](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-Id9Ra2rhus/18c247d22cd29b4dca71effbff9a0e60a7e4171c0ed4dd7270612afaf4413afaf1e6b7d5a5e838fda5caea80e5410b25ba74112ec67a3af4e9ed79fccd25ce13106343e8547bf3b0b2610bc3bfb5a67c92a4ad401d567f2333f04d8ea3731434b5207d58)

- [ ]  Pass **Client ID**, **Client Secret** per credential file
    
- [Credentials](https://ai.google.dev/gemini-api/docs)
    
- [ ]  Now that these generic credentials are inserted, you will be able to authenticate with your own account. Click on Sign in with Google. Choose your account and sign in.

[Scopes](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-fH4KfBp7bt/27379decb5e4263610784fa4db10906f9ee4d86c264d8194a70d88d182a26653c1feaa49ee1131cb5f69f4fff023197a45b9579c29b74e50d82352422f81552d19bc11d53345d628dd78b40b0306a624d3cc48efa08559ac49745ac2c9c25411409b4629)

- [ ]  Click on the top of your window and change the name of your credentials to your **“username Gmail account”.** Save credentials and close the window.