## **Optional: Set Asana metadata**

- Task description: Email summarization in 2-3 sentences
- Dynamic due date

**1. Email summarization**

**Prompt extension**

To achieve smart email summarization, extend the prompt in AI Agent Node

- Add instruction for a short **summary** into each response
- Add instruction for a **reason** to test, why emails were evaluated in certain ways
- Add a structure example for the output to achieve stable results

```jsx
Analyze this email and determine if it requires action from the recipient.

Email Subject: {{ $json.subject }}
Email Body: {{ $json.text }}
From: {{ $json.from.value[0].name }} - {{ $json.from.value[0].address }}

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

You must respond with ONLY a valid JSON object in this exact format:
{
  "action": "ACTION_REQUIRED" or "NO_ACTION",
  "reason": "brief explanation of your decision",
  "summary": "2-3 sentence summary of the email content and key points"
}

Do not include any text, explanations, or formatting outside of this JSON object.

```

**Output parsing**

Add output parser in AI Agent node powered by AI to post-process possible syntax errors in AI output

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-hWIKJpP9TM/5a9b0eb9eaccc727164b3c342765c3e0b58283176f1c7074650dce3aea86f3b1357deb18923d199567d0bb3f36bd2bd10178d4107dd4dd9a43cf9639ff0e5f4bf6ac907a5c98d3f4783bc7ada29e2a5d3f79c348035f8147e1231060d113ad50dba43386)

- Enable **Auto-Fix Format**, so Gemini can be used for smart output review
- Add an example of the output structure you want to achieve

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-Zrg7R6uT7P/52efb3b72e9e33c0c91ef7cc266a6abfda311afeea67178bbb384b76faa1ebf40341a6da0e942b293745a51ece6ee3e4a5e7689adb07c0a72340655c9949e9fed3d9aedd7e9e58b080fd6de0465b19be33c62957e9265b4c411431f07f916cace6ab1f6a)

**Calculate due date**

- Use **Code node** to let the workflow know today’s date or other dates related to today
- Use script below or let chatbot generate one

```jsx
// Get today's date
const today = new Date();

// Calculate next week's date (today + 7 days)
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

// Function to format date to YYYY-MM-DDTHH:MM:SS format
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00`;
}

// Format both dates
const todayFormatted = formatDate(today);
const nextWeekFormatted = formatDate(nextWeek);

// Return the formatted dates
return [
  {
    json: {
      todayDate: todayFormatted,
      nextWeekDate: nextWeekFormatted
    }
  }
];

```

- Pass Due date and Summary into Asana task as **Additional fields**
    - Due Date → Due on
    - Summary → Notes

[Asana node setup](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-WdWLBY1N4k/b1744623c4ada1088136a1b7b0f9ed60c8114bf1d98f2da906ed901c623dd2e7648af6a2ac0d19fbce51839c229f392778519b54e18f22e461650b4c69533a1133a6a8c24bf16b59c7ec6bb971c89b2e4f3a268117883a460905b4d9ef2dad9c677c3e49)


[Final workflow](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-LDJ2ZKuMFO/9dd1d1eeb20637eaa757dca0d0e4dcc3c3c09893006b99962526d3e3c33ec1d4dc1f96b7466e342cd8ba5d227e771b5b3af10b10cd51a0f8e49f52a5727e3c07d210b6ef0c58e3c8e65a881277cc2037f75d7c744e8584c9ecb501a34debca47ab523119)