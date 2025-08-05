# Email states

If AI evaluates **no action** is required, mark it as read and delete

## 1. Gmail nodes

- [ ]  Create Gmail nodes: **Mark a message as read**, **Delete a message**

[Complete workflow](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-YTcUdJnXo5/c487cf036b4de43d7377fd4d9431d6953843559c7acb231925cb8dbf69f092a6a21617806c6ef32c9f3e464c6a6e051df1a31f564782f5ffe690bd1cb4c1ec14d056171f5e04ff2be6ca7f3db7adee78f459aa4e681ae543859dd242a334c74d4d437034)

- [ ]  Pass message ID from the predecessors

[Passing ID from Gmail trigger](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-VqkfXdchHj/2ba373b1fd9578e62b0d432b44780caec14ae6544fa4aad8665f196518af708637c78d42658710af1188d1f21f8153784e8944688a05d1ed8d6c1d091e18c09d5aaac082ac3d3e0365feaa760e5587ea916874f27188af1333b4e4a382c11c267eca52ec)


---

## 2. Production test

Let's try to use automation to read your real inbox email

- [ ]  **Deactivate "Delete a message"** node (right click + Deactivate option)

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-VIHvBXOlGZ/3e0ca23ecabeaf1e2abfcc30327158f02dd8025149f111aa8d0943222b99b0da4949adea6a7f9ec049523ae03e514ab0215cd7736f2ac0da3c53f12ae780c8f84632a38b7c767e886521ac663e3c8d56181f488747049a2b55f91cc9fce32e023afb9463)

Alternatively, click on the node and use keyboard shortcut **“D”**

- [ ]  1. **Unpin** mocked data in **Gmail trigger node**
- [ ]  2. **Fetch Test Event** to check a real email will be received

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-rHF_pU9e6a/9cba1024b2a48e3e303e28c2e7ca051188b6f5dea25838e5a67ce472986e7ce350545353e85f58a0b39677a8c9e44b71ab38ec09a134a3d67f31dc9e1e7d105111e22ffa13953ab7d68f05225182d40e03eb01da4d538f10b772e9de4d743f5c9ef55b24)