# AI Agent

Gemini analyzes email content to determine if action is required.
[](https://codaio.imgix.net/docs/3PFXo2bENf/blobs/bl-aGGkcB4Nvn/d43663275387da7b3f811eb99c0746b3f9234c54f4444227d8bbf084078b70432a3f5668c47967604f663d2d0190e6a85d529bbbe1e01278b411fe9385db3d6c903e8038ba5cdef53f75b83e6b239f875273c5afc9a1c90d106800bee8f06bc4a91d525b?fit=max&fm=webp&lossless=true)

**Option 1: AI Agent + Gemini Chat model**

- Simplifies API setup into a predefined node

**Option 2: Using HTTP Request Node (Alternative)**

- Use if advance Gemini setup required (web search, advance API filtering)
- Method: POST
- URL**:** https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
- Reference: [Gemini documentation](https://ai.google.dev/gemini-api/docs)

---

### **A. Add nodes to leverage LLM functionality**

- [ ]  Click on **"plus"** icon next to the **Gmail trigger** and add **AI Agent node**

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-CQx0C1IMtl/be33fb927991fe8fc60f70487437c3e148018d6afd6335753701a31e0a00dba947643245a6916a1d69fccc37567c03bd9ea53f71ef127c889bce42418b73569c2100467fb4a7828d38b3e4ef2fffeac7dc18ba7821adcb24efd1006ac25e0a27d21df311)

- [ ]  Click on “plus” icon below **AI Agent** and add **Gemini Chat Model** to the node
[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-KyN9IkHzqQ/94942d89446a2bac6ac57755048e9fd6141f68fdb780acadca80c126bee57988911aa1bbc9be864db57ce32eecb464f5f51fb111692f5f73acaab5cd590b2dac1622dd1feb3e16bcfcf7b95032880081ee6817a48f0c0db2bed25025e9ef765099242a5c)

<aside>

**Gemini Chat Model** can be replaced by other providers to test their capabilties (**OpenAI**, **Claude, Perplexity**, …)

</aside>


### **B. Passing the prompt**
- [ ]  Open **AI Agent node**, change **Source** to “**Define below”**

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-E6q3SN3hzN/f18d30378923f3c635512307a689dc0b0f9687ddbc063e85839bce12001eaacf5a25f2108d0fcf82ca9b264e613e00dab22d6619aa20a8a8ebe0c3924da02ffb59d2e4a1f88b909d280ca7fee362cde9312141b43bc26305026f91e1ec2e0791e61e6c54)

- [ ]  Copypaste following prompt directly into the **Prompt** window

```markdown
# Prompt instructions
Analyze this email and determine if it requires action from the recipient.
- Email Subject: {{ $json.subject }}
- Email Body: {{ $json.text }}
- From: {{ $json.from.value[0].name }} - {{ $json.from.value[0].address }}

Respond with only **"ACTION_REQUIRED"** or **"NO_ACTION"** and a brief reason.

Consider these as requiring action:
- Questions directed at recipient
- Requests for information, approval, or tasks
- Meeting invitations requiring response
- Urgent matters or deadlines

Consider these as NOT requiring action:
- FYI/informational emails
- Newsletters or announcements
- Auto-generated notifications
- Simple acknowledgments
```


**Example: Attribute mapping**
For manual data mapping drag and drop values from predecessor directly to the prompt
- `subject` → Email Subject
- `text` -> Email Body
- `from.value.value[0].address`  → From

[Prompt mapping](https://codaio.imgix.net/docs/3PFXo2bENf/blobs/bl-WRzkrs-mR6/99fb29aa18a091ff56582f3f9e3617bc7104c8e78a64b01afe5cd6dc3dd8cfade0abdf7433eaf731f78a3fbee61779638cbf7a9373f44afaeb88126a67a28c749dd21ee0266a732838d581fde3fd47f4c69ae8c0c0f24d4577c58614ddd94a4c00109795?fit=max&fm=webp&lossless=true)

---

<aside>

**Tips**

- Add **token limit** to the chat model to prevent costly runs
- Use **output parser** with another chat model inside in case very specific output format needed
- **How to prompt**: [https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf](https://services.google.com/fh/files/misc/gemini-for-google-workspace-prompting-guide-101.pdf)*
</aside>

---
### **C. Running the agent**
- [ ]  Execute the step

[Step execution](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-81Aw99mDCV/a9e433b1cc31179f03f45d0cc0963e1f2be3638f7d86fe1ef18aa1c16915972e95582bdc78f2df2f973bd36ea85743629d82c89622024bac1a00758694f2cd8226110d13344d7a760712f52f0f172280b15fa05e6d1604f58f107de5daf2b28c573e1382)

LLM models evaluates email body agains the prompt instructions and responds with the verdict