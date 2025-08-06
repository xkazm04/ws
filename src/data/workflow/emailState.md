# Email states

If AI evaluates **no action is required**, mark it as read and delete.

In order to test this scenario we will need to replace original prompt, so AI can evaluate the received email is not critical.

- [ ]  Open **Gmail Trigger node** and click **pencil** icon to change the content of mocked data

[](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-TqKay7sIlJ/82248123ef73b3f08bbcd5c2621bd2899eaa537e646ec1093ee6ed99404570f8ed684508529d2c0724f8ede88168e90c8620a616ea2b4755dc4ae178ae76b0a38f91306b6138faa6f985606463275b58b3cc0bf68f8f882e903a85b17a1744ae784045cb)

- [ ]  **Copypaste prompt example #2** below into the **Gmail trigger node**

### Example response #2: NO_ACTION

```jsx
[
  {
    "id": "2987504f92c5482f",
    "threadId": "2987504f92c5482f",
    "labelIds": ["UNREAD", "INBOX"],
    "sizeEstimate": 8240,
    "html": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\" xml:lang=\"en\">\n  <head>\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width\">\n    <title></title>\n    <link media=\"all\" rel=\"stylesheet\" href=\"https://testcorp.com/assets/email-styles.css\" />\n  </head>\n  <body>\n    <!-- Email content omitted for brevity -->\n    <p>Dear Team,</p>\n    <p>We're excited to share our August 2025 company newsletter with updates from across TestCorp.</p>\n    <p><strong>This Month's Highlights:</strong></p>\n    <ul>\n      <li><strong>Q2 Results:</strong> We exceeded our revenue targets by 15% and welcomed 250 new customers</li>\n      <li><strong>New Hires:</strong> Please join us in welcoming 8 new team members across Engineering and Sales</li>\n      <li><strong>Office Updates:</strong> The Prague office renovation is complete and looks fantastic</li>\n      <li><strong>Recognition:</strong> Congratulations to the Marketing team for their award-winning campaign</li>\n    </ul>\n    <p><strong>Upcoming Events:</strong></p>\n    <ul>\n      <li>August 15: All-hands meeting (virtual)</li>\n      <li>August 22–23: Annual company retreat</li>\n      <li>September 5: Q3 kickoff meetings</li>\n    </ul>\n    <p><strong>Employee Spotlight:</strong><br>Maria Gonzalez from our Customer Success team has been instrumental in improving client retention.</p>\n    <p>You can read the full newsletter and see photos on our intranet.</p>\n    <p>Best regards,<br>TestCorp Communications Team</p>\n  </body>\n</html>",
    "text": "Dear Team,\n\nWe're excited to share our August 2025 company newsletter with updates from across TestCorp.\n\nThis Month's Highlights:\n\n• Q2 Results: We exceeded our revenue targets by 15% and welcomed 250 new customers\n• New Hires: Please join us in welcoming 8 new team members across Engineering and Sales\n• Office Updates: The Prague office renovation is complete and looks fantastic\n• Recognition: Congratulations to the Marketing team for their award-winning campaign\n\nUpcoming Events:\n• August 15: All-hands meeting (virtual)\n• August 22-23: Annual company retreat\n• September 5: Q3 kickoff meetings\n\nEmployee Spotlight:\nThis month we're featuring Maria Gonzalez from our Customer Success team, who has been instrumental in improving our client retention rates.\n\nYou can read the full newsletter and see photos from recent events on our company intranet.\n\nThank you for your continued dedication and hard work!\n\nBest regards,\nTestCorp Communications Team",
    "textAsHtml": "<p>Dear Team,</p><p>We're excited to share our August 2025 company newsletter with updates from across TestCorp.</p><p><strong>This Month's Highlights:</strong></p><p>• <strong>Q2 Results:</strong> We exceeded our revenue targets by 15% and welcomed 250 new customers<br/>• <strong>New Hires:</strong> Please join us in welcoming 8 new team members across Engineering and Sales<br/>• <strong>Office Updates:</strong> The Prague office renovation is complete and looks fantastic<br/>• <strong>Recognition:</strong> Congratulations to the Marketing team for their award-winning campaign</p><p><strong>Upcoming Events:</strong><br/>• August 15: All-hands meeting (virtual)<br/>• August 22-23: Annual company retreat<br/>• September 5: Q3 kickoff meetings</p><p><strong>Employee Spotlight:</strong><br/>This month we're featuring Maria Gonzalez from our Customer Success team, who has been instrumental in improving our client retention rates.</p><p>You can read the full newsletter and see photos from recent events on our company intranet.</p><p>Thank you for your continued dedication and hard work!</p><p>Best regards,<br/>TestCorp Communications Team</p>",
    "subject": "TestCorp Monthly Newsletter - August 2025",
    "date": "2025-08-04T09:30:15.000Z",
    "to": {
      "value": [
        {
          "address": "you@gmail.com",
          "name": "You"
        }
      ],
      "html": "<span class=\"mp_address_group\"><span class=\"mp_address_name\">You</span> &lt;<a href=\"mailto:you@gmail.com\" class=\"mp_address_email\">you@gmail.com</a>&gt;</span>",
      "text": "\"You\" <you@gmail.com>"
    },
    "from": {
      "value": [
        {
          "address": "noreply@test.com",
          "name": "TestCorp Communications"
        }
      ],
      "html": "<span class=\"mp_address_group\"><span class=\"mp_address_name\">TestCorp Communications</span> &lt;<a href=\"mailto:noreply@test.com\" class=\"mp_address_email\">noreply@test.com</a>&gt;</span>",
      "text": "\"TestCorp Communications\" <noreply@test.com>"
    },
    "messageId": "<7890b5ecg1eb_dc21892137cb@lowworker-6c989d0e7-u3q90.mail>"
  }
]

```

**Subject**: "TestCorp Monthly Newsletter - August 2025"

**Content**: Company newsletter with updates, highlights, and upcoming events

**Triggers NO_ACTION because**:

- Purely informational content
- Newsletter/announcement format
- No questions or requests directed at recipient
- No deadlines or action items
- FYI-style communication

---
## Gmail nodes

- [ ]  Create Gmail nodes: **Mark a message as read**, **Delete a message**

[Complete workflow](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-YTcUdJnXo5/c487cf036b4de43d7377fd4d9431d6953843559c7acb231925cb8dbf69f092a6a21617806c6ef32c9f3e464c6a6e051df1a31f564782f5ffe690bd1cb4c1ec14d056171f5e04ff2be6ca7f3db7adee78f459aa4e681ae543859dd242a334c74d4d437034)

- [ ]  Pass message ID from the predecessors

[Passing ID from Gmail trigger](https://codahosted.io/docs/3PFXo2bENf/blobs/bl-VqkfXdchHj/2ba373b1fd9578e62b0d432b44780caec14ae6544fa4aad8665f196518af708637c78d42658710af1188d1f21f8153784e8944688a05d1ed8d6c1d091e18c09d5aaac082ac3d3e0365feaa760e5587ea916874f27188af1333b4e4a382c11c267eca52ec)

Mocked data comes with certain limitation the actual email does not exist and cannot be Marked as read or Deleted. In next chapter, we will switch to real data from your gmail inbox.
